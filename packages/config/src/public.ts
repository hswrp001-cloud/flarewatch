import type { PageConfig } from '@flarewatch/shared';

export const pageConfig: PageConfig = {
  title: 'The Storm SMP — Network Status',
  logo: '/storm-mark.svg',
  favicon: '/storm-mark.svg',
  links: [
    { label: 'Main Website', link: 'https://thestormsmp.com', highlight: true },
    { label: 'Dajo', link: 'https://dajo.thestormsmp.com' },
    { label: 'Hudo', link: 'https://hudo.thestormsmp.com' },
    { label: 'Syphon', link: 'https://syphon.thestormsmp.com' },
    { label: 'David', link: 'https://david.thestormsmp.com' },
    { label: 'WWW', link: 'https://www.thestormsmp.com' },
    { label: 'Documentation', link: 'https://docs.thestormsmp.com' },
  ],
  group: {
    'Minecraft Network': ['minecraft-java', 'minecraft-dns'],
    'Website & DNS': ['website-dns', 'www-dns'],
    'Domain & Infrastructure': ['domain-registration'],
  },
};
