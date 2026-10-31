import type { PageConfig } from '@flarewatch/shared';

export const pageConfig: PageConfig = {
  title: 'The Storm SMP — Network Status',
  logo: '/storm-mark.svg',
  favicon: '/storm-mark.svg',
  links: [
    { label: 'The Storm SMP', link: 'https://thestormsmp.com', highlight: true },
    { label: 'Minecraft Server', link: 'https://thestormsmp.com' },
    { label: 'Status API', link: '/api/data' },
  ],
  group: {
    'Minecraft Network': ['minecraft-java', 'minecraft-dns'],
    'Website & DNS': ['website-dns', 'www-dns'],
    'Domain & Infrastructure': ['domain-registration'],
  },
};
