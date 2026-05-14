import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

const TAG1_STYLES = [
  { background: '#f3f4f6', color: '#1a1a1a' },
  { background: '#fff7ed', color: '#c2410c' },
  { background: '#ecfdf5', color: '#047857' },
];

const TAG2_STYLE = { background: '#f3f4f6', color: '#1a1a1a' };

function OutcomeCard({
  item,
  index,
}: {
  item: {
    id: string;
    number: string;
    title: string;
    description: string;
    tag1: string;
    tag2: string;
  };
  index: number;
}) {
  const tag1Style = TAG1_STYLES[index % TAG1_STYLES.length];

  return (
    <div
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #f3f4f6',
        borderBottom: '4px solid #f3f4f6',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        minHeight: 196,
      }}
    >
      <div style={{ padding: '25px 25px 28px', display: 'flex', flexDirection: 'column', gap: 7, minHeight: '100%' }}>
        <div
          style={{
            position: 'absolute',
            top: 9,
            right: 17,
            fontFamily: 'Inter, sans-serif',
            fontSize: 48,
            lineHeight: '48px',
            fontWeight: 900,
            color: '#e8e5df',
          }}
        >
          {item.number}
        </div>

        <div style={{ paddingRight: 44 }}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 900,
              color: '#1a1a1a',
              whiteSpace: 'pre-line',
            }}
          >
            {item.title}
          </div>
        </div>

        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            lineHeight: '17.88px',
            color: '#6b7280',
            whiteSpace: 'pre-line',
            flex: 1,
          }}
        >
          {item.description}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 10 }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 2,
              background: tag1Style.background,
              color: tag1Style.color,
              fontFamily: 'Inter, sans-serif',
              fontSize: 9,
              lineHeight: '13.5px',
              fontWeight: 900,
              letterSpacing: '0.9px',
              textTransform: 'uppercase',
            }}
          >
            {item.tag1}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 2,
              background: TAG2_STYLE.background,
              color: TAG2_STYLE.color,
              fontFamily: 'Inter, sans-serif',
              fontSize: 9,
              lineHeight: '13.5px',
              fontWeight: 900,
              letterSpacing: '0.9px',
              textTransform: 'uppercase',
            }}
          >
            {item.tag2}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Top3OutcomesSection() {
  const outcomeItems = useNewsletterStore((s) => s.outcomeItems);
  const outcomesHeaderLabel = useNewsletterStore((s) => s.outcomesHeaderLabel);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingBottom: 10,
          borderBottom: '2px solid #041627',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, background: '#041627', flexShrink: 0 }} />
          <div
            style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: 12,
              lineHeight: '16px',
              color: '#1a1a1a',
              textTransform: 'uppercase',
            }}
          >
            TOP 3 OUTCOMES — LAST 30 DAYS
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 9,
            lineHeight: '13.5px',
            fontWeight: 700,
            letterSpacing: '0.9px',
            color: '#9ca3af',
            textTransform: 'uppercase',
          }}
        >
          {outcomesHeaderLabel}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
        {outcomeItems.map((item, index) => (
          <OutcomeCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
