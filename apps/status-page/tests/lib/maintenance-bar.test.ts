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

const yellow = window(
  'yellow',
  '2026-10-30T10:00:00Z',
  '2026-10-30T11:00:00Z',
  'yellow',
  ['site'],
);
const red = window('red', '2026-10-30T10:00:00Z', '2026-10-30T11:00:00Z', 'red', ['site']);

describe('maintenanceBarStatus', () => {
  it('shows yellow for an overlapping yellow window', () => {
    expect(maintenanceBarStatus('site', date, [yellow])).toBe('partial');
  });

  it('shows red for an overlapping red window', () => {
    expect(maintenanceBarStatus('site', date, [red])).toBe('down');
  });

  it('ignores monitors excluded from the window', () => {
    const other = window(
      'other',
      '2026-10-30T10:00:00Z',
      '2026-10-30T11:00:00Z',
      'yellow',
      ['other'],
    );
    expect(maintenanceBarStatus('site', date, [other])).toBeUndefined();
  });

  it('ignores windows outside the selected day', () => {
    const tomorrow = window(
      'tomorrow',
      '2026-10-31T10:00:00Z',
      '2026-10-31T11:00:00Z',
      'yellow',
      ['site'],
    );
    expect(maintenanceBarStatus('site', date, [tomorrow])).toBeUndefined();
  });

  it('supports open-ended windows', () => {
    const openEnded = window('open', '2026-10-30T10:00:00Z', undefined, 'red', ['site']);
    expect(maintenanceBarStatus('site', date, [openEnded])).toBe('down');
  });

  it('gives red priority when windows overlap', () => {
    expect(maintenanceBarStatus('site', date, [yellow, red])).toBe('down');
  });

  it('supports windows covering every monitor', () => {
    const all = window('all', '2026-10-30T10:00:00Z', '2026-10-30T11:00:00Z', 'yellow');
    expect(maintenanceBarStatus('site', date, [all])).toBe('partial');
  });

  it('supports recurring windows', () => {
    const recurring = {
      ...window(
        'daily',
        '2026-10-29T10:00:00Z',
        '2026-10-29T11:00:00Z',
        'yellow',
        ['site'],
      ),
      repeat: { every: 'day' },
    };
    expect(maintenanceBarStatus('site', date, [recurring])).toBe('partial');
  });
});
