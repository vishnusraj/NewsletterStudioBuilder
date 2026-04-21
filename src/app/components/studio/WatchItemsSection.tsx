import React from 'react';
import { useNewsletterStore, type WatchItem } from '../../store/useNewsletterStore';

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

function WatchCard({ item }: { item: WatchItem }) {
  return (
    <div
      style={{
        background: 'white',
        minHeight: 164,
        position: 'relative',
        borderRadius: 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid #f3f4f6',
          borderRadius: 2,
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4
            style={{
              ...S,
              margin: 0,
              fontWeight: 900,
              fontSize: 14,
              lineHeight: '20px',
              color: '#1a1a1a',
              textTransform: 'uppercase',
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              ...S,
              margin: 0,
              fontWeight: 400,
              fontSize: 10,
              lineHeight: '16.25px',
              color: '#6b7280',
            }}
          >
            {item.description}
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            background: item.badgeBg,
            borderRadius: 2,
            padding: '0.5px 8px',
          }}
        >
          <span
            style={{
              ...S,
              fontWeight: 900,
              fontSize: 9,
              lineHeight: '13.5px',
              color: item.badgeColor,
              textTransform: 'uppercase',
            }}
          >
            {item.badgeLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WatchItemsSection() {
  const { watchItems } = useNewsletterStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', ...S }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
        <span
          style={{
            ...S,
            fontFamily: 'Impact, sans-serif',
            fontSize: 10,
            color: '#9ca3af',
            textTransform: 'uppercase',
            lineHeight: '15px',
          }}
        >
          TOP 3 STRATEGIC WATCH ITEMS
        </span>
      </div>

      {watchItems.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 24,
            width: '100%',
          }}
        >
          {watchItems.map(item => (
            <WatchCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', fontSize: 12 }}>
          No watch items. Use the Data tab to add items.
        </div>
      )}
    </div>
  );
}
