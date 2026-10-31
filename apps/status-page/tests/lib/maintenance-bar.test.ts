import { describe, expect, it } from 'vite-plus/test';
import type { Maintenance } from '@flarewatch/shared';
import { maintenanceBarStatus } from '@/lib/maintenance-bar';

const date = new Date('2026-10-30T00:00:00.000Z');

function window(
  id: string,
  start: string,
  end: string | undefined,
  color: 'yellow' | 'red',
  monitors?: string[],
): Maintenance {
  return {
    id,
    start,
    ...(end !== undefined && { end }),
    body: 'Planned maintenance',
    color,
    ...(monitors && { monitors }),
    createdAt: 0,
    updatedAt: 0,
  };
}

describe('maintenanceBarStatus', () => {
  it('shows yellow for a day that overlaps yellow maintenance', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window(
          'yellow',
          '2026-10-30T10:00:00Z',
          '2026-10-30T11:00:00Z',
          'yellow',
          ['site'],
        ),
      ]),
    ).toBe('partial');
  });

  it('shows red for a day that overlaps red maintenance', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window('red', '2026-10-30T10:00:00Z', '2026-10-30T11:00:00Z', 'red', ['site']),
      ]),
    ).toBe('down');
  });

  it('does not color a monitor excluded from the maintenance window', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window(
          'yellow',
          '2026-10-30T10:00:00Z',
          '2026-10-30T11:00:00Z',
          'yellow',
          ['other'],
        ),
      ]),
    ).toBeUndefined();
  });

  it('does not color a day outside the maintenance window', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window(
          'yellow',
          '2026-10-31T10:00:00Z',
          '2026-10-31T11:00:00Z',
          'yellow',
          ['site'],
        ),
      ]),
    ).toBeUndefined();
  });

  it('colors an open-ended maintenance window', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window('red', '2026-10-30T10:00:00Z', undefined, 'red', ['site']),
      ]),
    ).toBe('down');
  });

  it('lets red take priority over yellow when both overlap', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window(
          'yellow',
          '2026-10-30T10:00:00Z',
          '2026-10-30T11:00:00Z',
          'yellow',
          ['site'],
        ),
        window('red', '2026-10-30T12:00:00Z', '2026-10-30T13:00:00Z', 'red', ['site']),
      ]),
    ).toBe('down');
  });

  it('supports a maintenance window that covers every monitor', () => {
    expect(
      maintenanceBarStatus('site', date, [
        window('yellow', '2026-10-30T10:00:00Z', '2026-10-30T11:00:00Z', 'yellow'),
      ]),
    ).toBe('partial');
  });

  it('supports recurring windows that overlap the selected day', () => {
    expect(
      maintenanceBarStatus('site', date, [
        {
          ...window(
            'daily',
            '2026-10-29T10:00:00Z',
            '2026-10-29T11:00:00Z',
            'yellow',
            ['site'],
          ),
          repeat: { every: 'day' },
        },
      ]),
    ).toBe('partial');
  });
});
