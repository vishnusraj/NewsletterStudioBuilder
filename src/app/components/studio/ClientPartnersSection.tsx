import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

function PartnerCard({
  name,
  badgeLabel,
  badgeBg,
  badgeColor,
  description,
  extraBottomPadding,
}: {
  name: string;
  badgeLabel: string;
  badgeBg: string;
  badgeColor: string;
  description: string;
  extraBottomPadding?: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #f3f4f6',
        borderRadius: 2,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ padding: `25px 25px ${extraBottomPadding ?? 25}px`, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 900,
            letterSpacing: '1.4px',
            color: '#1a1a1a',
          }}
        >
          {name}
        </div>
        <div style={{ alignSelf: 'flex-start', background: badgeBg, borderRadius: 2, padding: '2px 8px' }}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              lineHeight: '15px',
              fontWeight: 700,
              color: badgeColor,
              textTransform: 'uppercase',
            }}
          >
            {badgeLabel}
          </div>
        </div>
        <div
          style={{
            paddingTop: 8,
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            lineHeight: '19.5px',
            color: '#4b5563',
            whiteSpace: 'pre-line',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export function ClientPartnersSection() {
  const clientPartnersData = useNewsletterStore((s) => s.clientPartnersData);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 32, width: '100%' }}>
      <PartnerCard {...clientPartnersData.client} />
      <PartnerCard {...clientPartnersData.partner} extraBottomPadding={44.5} />
    </div>
  );
}
