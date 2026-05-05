import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

export function MonthlySnapshotSection() {
  const monthlySnapshotData = useNewsletterStore((s) => s.monthlySnapshotData);

  return (
    <div
      style={{
        width: '100%',
        background: '#041627',
        borderRadius: 2,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          lineHeight: '15px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#9ca3af',
        }}
      >
        {monthlySnapshotData.periodLabel}
      </div>

      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          lineHeight: '28px',
          fontWeight: 700,
          color: '#ffffff',
        }}
      >
        {monthlySnapshotData.headline}
      </div>

      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          lineHeight: '19.5px',
          color: '#d1d5db',
          whiteSpace: 'pre-line',
        }}
      >
        {monthlySnapshotData.bodyText}
      </div>
    </div>
  );
}
