import type { Maintenance, StatusView } from '@flarewatch/shared';
import { calculateUptimePercent, getMonitorError, getLatestLatency } from '@/lib/uptime';

export function useMonitorStatus(\n  monitorId: string,\n  state: StatusView,\n  maintenances: Maintenance[],\n) {
  return {
    uptimePercent: calculateUptimePercent(monitorId, state, maintenances),
    error: getMonitorError(monitorId, state),
    latency: getLatestLatency(monitorId, state),
  };
}
