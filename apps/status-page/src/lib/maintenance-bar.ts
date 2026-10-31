import {
  coversMonitor,
  nextMaintenanceOccurrence,
  type Maintenance,
} from '@flarewatch/shared';

/** Return a visual-only history status when a maintenance window overlaps a day. */
export function maintenanceBarStatus(
  monitorId: string,
  date: Date,
  maintenances: Maintenance[],
): 'partial' | 'down' | undefined {
  const dayStart = date.getTime();
  const dayEnd = dayStart + 24 * 60 * 60 * 1000;
  let status: 'partial' | 'down' | undefined;

  for (const maintenance of maintenances) {
    if (maintenance.color !== 'yellow' && maintenance.color !== 'red') continue;
    if (!coversMonitor(maintenance, monitorId)) continue;

    const occurrence = nextMaintenanceOccurrence(maintenance, dayStart);
    if (!occurrence) continue;

    const occurrenceEnd = occurrence.end ?? Number.POSITIVE_INFINITY;
    if (occurrence.start >= dayEnd || occurrenceEnd <= dayStart) continue;

    if (maintenance.color === 'red') return 'down';
    status = 'partial';
  }

  return status;
}
