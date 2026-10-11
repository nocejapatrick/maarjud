#!/usr/bin/env python3
"""Get product photos ready for the site.

For every photo it is given, this script:
  - turns it the right way up (phones store the rotation separately from the picture)
  - crops it to the 2:3 portrait shape that every tile and product photo uses
  - resizes it to 1600 x 2400 (a smaller photo is left at its own size, never enlarged)
  - saves it as a standard sRGB JPG, which also converts iPhone HEIC photos
  - leaves out everything except the picture itself, so no location or camera details

The originals are never changed. Results go to public/images/.

Usage:
  python3 scripts/prepare_photos.py                       every photo in new-photos/
  python3 scripts/prepare_photos.py ~/Desktop/red.heic    one photo (or several, or a folder)
  python3 scripts/prepare_photos.py --keep top            when cropping, keep the top of the photo
  python3 scripts/prepare_photos.py --overwrite           replace photos that are already in public/images/

The result is named after the original: "Red Satin 1.HEIC" becomes red-satin-1.jpg. Name the original the way
you want the file to be called, then use it in lib/products.ts as /images/red-satin-1.jpg.
"""

import argparse
import io
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image, ImageCms, ImageOps
except ImportError:
    sys.exit('This script needs Pillow. Install it with:  python3 -m pip install Pillow')

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / 'new-photos'
OUT = ROOT / 'public' / 'images'

# Twice the size the site lays photos out at (850 x 1275), so the large product photo stays sharp on
# high-resolution screens. The site makes its own smaller copies from this for each visitor.
WIDTH, HEIGHT = 1600, 2400
# High on purpose: the site compresses again, and compressing twice is what smudges fabric detail.
QUALITY = 88

PHOTO_TYPES = {'.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif'}
HEIC_TYPES = {'.heic', '.heif'}
# where the kept part sits when a photo has to be cropped: (across, down), each from 0 to 1
KEEP = {'center': (0.5, 0.5), 'top': (0.5, 0.0), 'bottom': (0.5, 1.0), 'left': (0.0, 0.5), 'right': (1.0, 0.5)}

SRGB = ImageCms.createProfile('sRGB')


def find_photos(sources):
    """Every photo named directly, plus the photos inside any folder named."""
    photos, problems = [], []
    for source in sources:
        if source.is_dir():
            inside = sorted(p for p in source.iterdir() if p.is_file() and not p.name.startswith('.'))
            photos += [p for p in inside if p.suffix.lower() in PHOTO_TYPES]
        elif not source.exists():
            problems.append(f'{source}: not found')
        elif source.suffix.lower() not in PHOTO_TYPES:
            problems.append(f'{source.name}: not a photo type this script reads')
        else:
            photos.append(source)
    return photos, problems


def output_name(photo):
    name = re.sub(r'[^a-z0-9]+', '-', photo.stem.lower()).strip('-')
    return f'{name or "photo"}.jpg'


def open_photo(photo, scratch):
    if photo.suffix.lower() in HEIC_TYPES:
        try:
            import pillow_heif

            pillow_heif.register_heif_opener()
        except ImportError:
            # Pillow cannot read HEIC by itself, but macOS can: have it make a full-quality copy to work from
            if not shutil.which('sips'):
                raise RuntimeError('cannot read HEIC photos here. Fix with:  python3 -m pip install pillow-heif')
            copy = Path(scratch) / 'copy.tiff'
            done = subprocess.run(['sips', '-s', 'format', 'tiff', str(photo), '--out', str(copy)], capture_output=True, text=True)
            if done.returncode != 0 or not copy.exists():
                raise RuntimeError(f'macOS could not convert it ({done.stderr.strip() or "no reason given"})')
            photo = copy
    image = Image.open(photo)
    image.load()
    return image


def to_srgb(image):
    """Plain 8-bit sRGB, which is what every browser assumes. Phones shoot in a wider colour space; if that
    were simply dropped rather than converted, colours would come out duller than the fabric really is."""
    if image.mode == 'P':
        image = image.convert('RGBA' if 'transparency' in image.info else 'RGB')
    if image.mode in ('RGBA', 'LA'):
        # a JPG cannot be see-through, so anything transparent is put on white
        image = image.convert('RGBA')
        ground = Image.new('RGBA', image.size, 'white')
        ground.alpha_composite(image)
        ground.info['icc_profile'] = image.info.get('icc_profile')
        image = ground.convert('RGB')
        image.info['icc_profile'] = ground.info['icc_profile']
    profile = image.info.get('icc_profile')
    if profile and image.mode in ('RGB', 'L', 'CMYK'):
        try:
            return ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(io.BytesIO(profile)), SRGB, outputMode='RGB')
        except (ImageCms.PyCMSError, OSError, ValueError):
            pass  # a damaged profile: treat the photo as sRGB already
    return image.convert('RGB')


def crop_to_shape(image, keep):
    """Cut the photo down to 2:3 portrait, taking the spare off the sides or off the top and bottom."""
    width, height = image.size
    across, down = KEEP[keep]
    if width * HEIGHT > height * WIDTH:  # too wide
        new_width = round(height * WIDTH / HEIGHT)
        left = round((width - new_width) * across)
        return image.crop((left, 0, left + new_width, height))
    new_height = round(width * HEIGHT / WIDTH)
    top = round((height - new_height) * down)
    return image.crop((0, top, width, top + new_height))


def prepare(photo, destination, keep):
    """Returns the notes worth telling the user about this photo."""
    notes = []
    with tempfile.TemporaryDirectory() as scratch:
        image = ImageOps.exif_transpose(open_photo(photo, scratch))
    image = to_srgb(image)

    if image.width > image.height:
        notes.append('landscape photo, so only a tall slice from it is kept; check the result')
    image = crop_to_shape(image, keep)
    if image.width > WIDTH:
        image = image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    elif image.width < WIDTH:
        notes.append(f'smaller than {WIDTH} x {HEIGHT}, so it may look soft when shown large')

    # Copy only the pixels across, so nothing the camera recorded (location, date, device) rides along.
    clean = Image.new('RGB', image.size)
    clean.paste(image)
    clean.save(destination, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
    return clean.size, notes


def size_text(path):
    size = path.stat().st_size
    return f'{size / 1_000_000:.1f} MB' if size >= 1_000_000 else f'{round(size / 1000)} KB'


def shown(path):
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def main():
    parser = argparse.ArgumentParser(description='Crop, resize and clean product photos for the site.')
    parser.add_argument('sources', nargs='*', type=Path, help='photos or folders (default: new-photos/)')
    parser.add_argument('--keep', choices=sorted(KEEP), default='center', help='which part of the photo to keep when cropping (default: center)')
    parser.add_argument('--overwrite', action='store_true', help='replace photos of the same name that are already there')
    parser.add_argument('--out', type=Path, default=OUT, help='where to save the results (default: public/images/)')
    args = parser.parse_args()

    if not args.sources:
        if not INBOX.exists():
            INBOX.mkdir()
            sys.exit(f'Made the folder {shown(INBOX)}/. Put your photos in it and run this again.')
        args.sources = [INBOX]

    photos, problems = find_photos(args.sources)
    if not photos and not problems:
        sys.exit('No photos found. Put them in new-photos/ or name them after the command.')

    args.out.mkdir(parents=True, exist_ok=True)
    made = skipped = 0
    for photo in photos:
        destination = args.out / output_name(photo)
        if destination.resolve() == photo.resolve():
            problems.append(f'{photo.name}: is already in the output folder; keep originals somewhere else, such as new-photos/')
            continue
        if destination.exists() and not args.overwrite:
            print(f'skipped  {photo.name}: {shown(destination)} already exists (add --overwrite to replace it)')
            skipped += 1
            continue
        try:
            (width, height), notes = prepare(photo, destination, args.keep)
        except Exception as error:  # one unreadable photo should not stop the rest
            problems.append(f'{photo.name}: {error}')
            continue
        made += 1
        print(f'ready    {photo.name} ({size_text(photo)}) -> {shown(destination)}  {width} x {height}, {size_text(destination)}')
        for note in notes:
            print(f'         note: {note}')

    for problem in problems:
        print(f'failed   {problem}')
    print(f'\n{made} ready, {skipped} skipped, {len(problems)} failed.')
    if made:
        print('Next: use each file in lib/products.ts as /images/<name>.jpg')
    sys.exit(1 if problems else 0)


if __name__ == '__main__':
    main()
