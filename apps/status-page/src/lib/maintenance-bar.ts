import { coversMonitor, nextMaintenanceOccurrence, type Maintenance } from '@flarewatch/shared';

/** Return a visual-only history status when a maintenance window overlaps a day. */
export function maintenanceBarStatus(
  monitorId: string,
  date: Date,
  maintenances: Maintenance[],
): 'up' | 'partial' | 'down' | undefined {
  const dayStart = date.getTime();
  const dayEnd = dayStart + 24 * 60 * 60 * 1000;
  let status: 'up' | 'partial' | 'down' | undefined;

  for (const maintenance of maintenances) {
    if (maintenance.barColor !== 'green' && maintenance.barColor !== 'yellow' && maintenance.barColor !== 'red') continue;
    if (!coversMonitor(maintenance, monitorId)) continue;

    const occurrence = nextMaintenanceOccurrence(maintenance, dayStart);
    if (!occurrence) continue;

    const occurrenceEnd = occurrence.end ?? Number.POSITIVE_INFINITY;
    if (occurrence.start >= dayEnd || occurrenceEnd <= dayStart) continue;

    if (maintenance.barColor === 'red') return 'down';
    if (maintenance.barColor === 'yellow') status = 'partial';
    else if (status === undefined) status = 'up';
  }

  return status;
}

/** Milliseconds covered by yellow/red maintenance in a time window (overlaps counted once). */
export function maintenanceDowntimeMs(
  monitorId: string,
  startMs: number,
  endMs: number,
  maintenances: Maintenance[],
): number {
  if (endMs <= startMs) return 0;

  const intervals: Array<[number, number]> = [];
  for (const maintenance of maintenances) {
    if (maintenance.color !== 'yellow' && maintenance.color !== 'red') continue;
    if (!coversMonitor(maintenance, monitorId)) continue;

    let cursor = startMs;
    for (let occurrenceCount = 0; occurrenceCount < 1000 && cursor < endMs; occurrenceCount++) {
      const occurrence = nextMaintenanceOccurrence(maintenance, cursor);
      if (!occurrence || occurrence.start >= endMs) break;

      const occurrenceEnd = occurrence.end ?? endMs;
      const overlapStart = Math.max(startMs, occurrence.start);
      const overlapEnd = Math.min(endMs, occurrenceEnd);
      if (overlapEnd > overlapStart) intervals.push([overlapStart, overlapEnd]);

      if (occurrence.end === undefined) break;
      const nextCursor = Math.max(occurrence.end, occurrence.start + 1);
      if (nextCursor <= cursor) break;
      cursor = nextCursor;
    }
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let totalMs = 0;
  let activeStart: number | undefined;
  let activeEnd: number | undefined;

  for (const [start, end] of intervals) {
    if (activeStart === undefined || activeEnd === undefined) {
      activeStart = start;
      activeEnd = end;
    } else if (start <= activeEnd) {
      activeEnd = Math.max(activeEnd, end);
    } else {
      totalMs += activeEnd - activeStart;
      activeStart = start;
      activeEnd = end;
    }
  }

  if (activeStart !== undefined && activeEnd !== undefined) {
    totalMs += activeEnd - activeStart;
  }
  return totalMs;
}
