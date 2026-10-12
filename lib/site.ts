// Shop-wide settings and links.

export const site = {
  name: 'Maarjud',

  // Orders are sent by message and paid through GCash.
  // TODO: put the shop's Instagram username here (without the @), for example 'maarjud.ph'.
  // While it is empty the bag shows the order message to copy, but no "Open Instagram" button.
  instagram: '',

  // TODO: the shop's email address, if it has one. While it is empty the Connect With Us page shows no email.
  email: '',

  // Google Analytics measurement ID. It only runs on the live site, and only for visitors who choose Accept on the
  // privacy notice (see components/Analytics.tsx). Leave it empty to switch analytics off.
  googleAnalyticsId: 'G-MEP6B95DRM',
};

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
