// Shop-wide settings and links.

export const site = {
  name: 'Maarjud',

  // Orders are sent by message and paid through GCash.
  // The shop's Instagram username, without the @ (instagram.com/maarjud). Leave it empty to hide every Instagram button.
  instagram: 'maarjud',

  // A Facebook Page for orders on Messenger: its username, or the number in its profile.php?id= address. Empty since the
  // shop's Page was removed (October 2026), which hides every Messenger button; fill it in to bring them back.
  messenger: '',

  // TODO: the shop's email address, if it has one. While it is empty the Connect With Us page shows no email.
  email: '',

  // Google Analytics measurement ID. It only runs on the live site, and only for visitors who choose Accept on the
  // privacy notice (see components/Analytics.tsx). Leave it empty to switch analytics off.
  googleAnalyticsId: 'G-MEP6B95DRM',
};

/** the apps customers can message the shop on, in the order they are offered; an empty setting leaves its app out */
export const messageChannels = [
  ...(site.instagram ? [{ name: 'Instagram', href: `https://ig.me/m/${site.instagram}` }] : []),
  ...(site.messenger ? [{ name: 'Messenger', href: `https://m.me/${site.messenger}` }] : []),
];

/** "Instagram", "Messenger" or "Instagram or Messenger", for running text */
export const channelNames = messageChannels.map((channel) => channel.name).join(' or ') || 'Instagram';

/** Messenger can open with the message already typed in; Instagram links cannot carry text */
export function channelLink(channel: (typeof messageChannels)[number], message: string): string {
  return channel.name === 'Messenger' ? `${channel.href}?text=${encodeURIComponent(message)}` : channel.href;
}

export const mainNav = [
  { label: 'Scrunchies', href: '/' },
  { label: 'Hair Clips', href: '/hair-clips' },
  { label: 'Our Story', href: '#' },
  { label: 'Connect With Us', href: '/connect' },
];

export const secondaryNav = [
  { label: 'Journal', href: '#' },
  { label: 'Instagram', href: site.instagram ? `https://www.instagram.com/${site.instagram}/` : '#' },
  { label: 'Contact', href: '/connect' },
];

export const policyNav = [
  { label: 'Shipping & Returns', href: '#' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Accessibility', href: '#' },
];
