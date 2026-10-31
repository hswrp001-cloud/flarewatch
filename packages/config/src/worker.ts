import type { WorkerConfig } from '@flarewatch/shared';

/**
 * The Storm SMP production monitors.
 *
 * Website DNS checks and the Minecraft TCP check run directly. Full HTTP
 * checks for sites in this Cloudflare zone need an external check location
 * (Globalping or flarewatch-proxy).
 */
export const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'test',
      name: 'Network Test Site',
      method: 'DNS',
      target: 'test.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://thestormsmp.com',
    },
    {
      id: 'main-website',
      name: 'Main website',
      method: 'DNS',
      target: 'thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://thestormsmp.com',
    },
    {
      id: 'dajo',
      name: 'Dajo',
      method: 'DNS',
      target: 'dajo.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://dajo.thestormsmp.com',
    },
    {
      id: 'hudo',
      name: 'Hudo',
      method: 'DNS',
      target: 'hudo.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://hudo.thestormsmp.com',
    },
    {
      id: 'syphon',
      name: 'Syphon',
      method: 'DNS',
      target: 'syphon.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://syphon.thestormsmp.com',
    },
    {
      id: 'david',
      name: 'David',
      method: 'DNS',
      target: 'david.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://david.thestormsmp.com',
    },
    {
      id: 'main-website-www',
      name: 'Main website (www)',
      method: 'DNS',
      target: 'www.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://www.thestormsmp.com',
    },
    {
      id: 'documentation',
      name: 'Documentation',
      method: 'DNS',
      target: 'docs.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://docs.thestormsmp.com',
    },
    {
      id: 'minecraft-dns',
      name: 'Minecraft Address DNS',
      method: 'DNS',
      target: 'play.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://thestormsmp.com',
    },
    {
      id: 'domain-registration',
      name: 'Domain Registration',
      method: 'DOMAIN',
      target: 'thestormsmp.com',
      domainExpiryDays: 30,
      checkEveryMinutes: 1440,
      link: 'https://thestormsmp.com',
    },
  ],
};
