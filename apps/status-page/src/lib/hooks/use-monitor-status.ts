import type { Maintenance, StatusView } from '@flarewatch/shared';
import { calculateUptimePercent, getMonitorError, getLatestLatency } from '@/lib/uptime';

export function useMonitorStatus(
  monitorId: string,
  state: StatusView,
  maintenances: Maintenance[],
) {
  return {
    uptimePercent: calculateUptimePercent(monitorId, state, maintenances),
    error: getMonitorError(monitorId, state),
    latency: getLatestLatency(monitorId, state),
  };
}
