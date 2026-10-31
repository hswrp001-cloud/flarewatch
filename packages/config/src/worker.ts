import type { WorkerConfig } from '@flarewatch/shared';

/**
 * The Storm SMP production monitors.
 *
 * HTTP checks for domains inside the same Cloudflare zone must use an
 * external check location (Globalping or flarewatch-proxy). DNS checks and
 * the Minecraft TCP check run directly and do not depend on that proxy.
 */
export const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'minecraft-java',
      name: 'Minecraft Java Server',
      method: 'TCP_PING',
      target: 'play.thestormsmp.com:25630',
      maxLatencyMs: 1500,
      timeout: 10000,
      link: 'https://thestormsmp.com',
    },
    {
      id: 'website-dns',
      name: 'Main Website DNS',
      method: 'DNS',
      target: 'thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://thestormsmp.com',
    },
    {
      id: 'www-dns',
      name: 'WWW Website DNS',
      method: 'DNS',
      target: 'www.thestormsmp.com',
      dnsRecordType: 'A',
      checkEveryMinutes: 1,
      link: 'https://www.thestormsmp.com',
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
