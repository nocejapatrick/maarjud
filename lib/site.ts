// Shop-wide settings and links.

export const site = {
  name: 'Maarjud',

  // Orders are sent by message and paid through GCash.
  // TODO: put the shop's Instagram username here (without the @), for example 'maarjud.ph'.
  // While it is empty the bag shows the order message to copy, but no "Open Instagram" button.
  instagram: '',

  // The shop's Facebook Page (facebook.com/maarjud), for orders on Messenger: its username, or the number in its
  // profile.php?id= address if it ever has none. Customers reach it at m.me/<this>.
  messenger: 'maarjud',

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
  { label: 'Instagram', href: '#' },
  { label: 'Contact', href: '/connect' },
];

export const policyNav = [
  { label: 'Shipping & Returns', href: '#' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Accessibility', href: '#' },
];
