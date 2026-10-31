import { vi } from 'vite-plus/test';
import { workerConfig } from '@flarewatch/config/worker';
import { authMiddlewareServer } from '@/server/auth-middleware';
import { stubMonitorWorker } from './bindings';

export const BADGE_TIME = Date.parse('2025-01-15T12:00:00Z') / 1000;

export function stubBadgeView(status: 'up' | 'down' = 'up', extra = {}): void {
  vi.stubEnv('DEV', false);
  if (!workerConfig.monitors.some((monitor) => monitor.id === 'demo_example')) {
    workerConfig.monitors = [
      ...workerConfig.monitors,
      {
        id: 'demo_example',
        name: 'Badge test monitor',
        method: 'GET',
        target: 'https://example.com',
        maxLatencyMs: 10,
        private: workerConfig.monitors.length > 0 && workerConfig.monitors.every((monitor) => monitor.private),
      },
    ];
  }
  stubMonitorWorker(async () =>
    Response.json({
      lastUpdate: BADGE_TIME,
      maintenances: [],
      announcements: [],
      monitors: {
        'minecraft-java': {
          status,
          startedAt: BADGE_TIME,
          incidents: status === 'down' ? [{ start: [BADGE_TIME], error: ['Outage'] }] : [],
          ...extra,
        },
      },
    }),
  );
}

type Handler = (ctx: { request: Request }) => Promise<Response>;

export function callBadge(route: { options: unknown }, path: string): Promise<Response> {
  const options = route.options as { server?: { handlers?: Record<string, Handler> } };
  const handler = options.server?.handlers?.GET;
  if (!handler) throw new Error(`Missing GET handler for ${path}`);
  const request = new Request(`https://flarewatch.test${path}`);
  return authMiddlewareServer({
    request,
    pathname: new URL(request.url).pathname,
    next: () => handler({ request }),
  } as never) as Promise<Response>;
}
