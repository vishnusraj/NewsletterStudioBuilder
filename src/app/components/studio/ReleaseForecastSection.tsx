import React from 'react';
import { useNewsletterStore, type RFStatus, type RFRow } from '../../store/useNewsletterStore';

// ── Design tokens ─────────────────────────────────────────────────────────────

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ─────────────────────────────────────────────────────────────────────────────
// STATUS TOKEN MAP
//
// Each status has three style dimensions:
//   text  — the label + percentage color
//   bar   — the progress bar fill color
//   track — the bar track background (slightly tinted for closed)
//   pill  — optional pill badge style (background + border)
//
// CLOSED design intent:
//   • Completed, not disabled — use a lighter accessible green
//   • Bar always renders at 100%, with a soft green fill and hatched overlay
//   • Keep the same project/release text treatment as active rows
// ─────────────────────────────────────────────────────────────────────────────

interface StatusToken {
  text:  string;   // label text color
  bar:   string;   // progress bar fill
  track: string;   // progress bar track background
}

const STATUS_TOKEN: Record<RFStatus, StatusToken> = {
  'ON TRACK': { text: '#006b5f', bar: '#006b5f', track: '#f3f4f6' },
  'AT RISK':  { text: '#d97706', bar: '#f59e0b', track: '#fef3c7' },
  'DELAYED':  { text: '#dc2626', bar: '#ef4444', track: '#fee2e2' },
  'NEW':      { text: '#2563eb', bar: '#3b82f6', track: '#eff6ff' },
  'CLOSED':   { text: '#15803d', bar: '#22c55e', track: '#dcfce7' },
};

// Whether a status is considered "complete" (progress always 100%)
const IS_COMPLETE: Record<RFStatus, boolean> = {
  'ON TRACK': false,
  'AT RISK':  false,
  'DELAYED':  false,
  'NEW':      false,
  'CLOSED':   true,   // CLOSED always renders at 100%
};

// ── Section component ─────────────────────────────────────────────────────────

export function ReleaseForecastSection() {
  const { rfData } = useNewsletterStore();
  const { cards, rows } = rfData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', ...S }}>

      {/* ── HorizontalBorder (section heading) ─────────────────────────────── */}
      <div style={{
        position: 'relative',
        paddingBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderBottom: '2px solid #041627', pointerEvents: 'none' }} />
        {/* Left: RELEASE FORECAST */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: '#041627', width: 8, height: 8, flexShrink: 0 }} />
          <span style={{ fontFamily: 'Impact, sans-serif', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1a1a1a', lineHeight: '16px' }}>
            RELEASE FORECAST
          </span>
        </div>
        {/* Right: label */}
        <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
          UPCOMING RELEASES
        </span>
      </div>

      {/* ── Upcoming Release Cards ─────────────────────────────────────────── */}
      {cards.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(cards.length, 3)}, minmax(0, 1fr))`,
          gap: 24,
          width: '100%',
        }}>
          {cards.map(card => (
            <UpcomingCard key={card.id} title={card.title} date={card.date} description={card.description} />
          ))}
        </div>
      )}

      {/* ── Forecast Table ─────────────────────────────────────────────────── */}
      {rows.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: 2,
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Border */}
          <div style={{ position: 'absolute', inset: 0, border: '1px solid #f3f4f6', borderRadius: 2, pointerEvents: 'none' }} />

          {/* Header row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 1px',
            position: 'relative',
          }}>
            <TableHeader label="PROJECT"      flex="0 0 17%" />
            <TableHeader label="RELEASE ITEM" flex="1 1 0" />
            <TableHeader label="PROGRESS"     flex="0 0 12%" />
            <TableHeader label="SCHEDULE"     flex="0 0 22%" />
            <TableHeader label="STATUS"       flex="0 0 13%" align="right" />
          </div>

          {/* Data rows */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 1 }}>
            {rows.map(row => (
              <ForecastRow key={row.id} row={row} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {rows.length === 0 && cards.length === 0 && (
        <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', ...S, fontSize: 12 }}>
          No forecast data. Use the Data tab to add rows.
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function UpcomingCard({ title, date, description }: { title: string; date: string; description: string }) {
  return (
    <div style={{ background: 'white', position: 'relative', height: 81, boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* Green left border */}
      <div style={{ position: 'absolute', inset: 0, borderLeft: '2px solid #0b9f6e', border: '1px solid #f3f4f6', borderLeftWidth: 2, borderLeftColor: '#0b9f6e', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', height: '100%', paddingLeft: 22, paddingRight: 20, paddingTop: 20, paddingBottom: 20, boxSizing: 'border-box', flexDirection: 'column', gap: 4 }}>
        {/* Title + date badge */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
          <span style={{ ...S, fontWeight: 900, fontSize: 14, color: '#1a1a1a', lineHeight: '20px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </span>
          <span style={{
            ...S, fontWeight: 900, fontSize: 8, color: '#9a3412',
            background: '#ffedd5', borderRadius: 4, padding: '2px 6px',
            textTransform: 'uppercase', flexShrink: 0, lineHeight: '12px',
          }}>
            {date}
          </span>
        </div>
        {/* Description */}
        <span style={{ ...S, fontSize: 10, color: '#6b7280', lineHeight: '15px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
          {description}
        </span>
      </div>
    </div>
  );
}

function TableHeader({ label, flex, align }: { label: string; flex: string; align?: 'right' | 'left' }) {
  return (
    <div style={{ flex, padding: '10px 16px', boxSizing: 'border-box' }}>
      <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', textAlign: align === 'right' ? 'right' : 'left' }}>
        {label}
      </span>
    </div>
  );
}

function ForecastRow({ row }: { row: RFRow }) {
  const token  = STATUS_TOKEN[row.status] ?? STATUS_TOKEN['ON TRACK'];
  const closed = IS_COMPLETE[row.status];
  const displayPct = closed ? 100 : Math.min(100, Math.max(0, row.progress));

  // Business rule:
  // rows at or below 75% should use the same orange accent treatment
  // as the existing FXExchange row, except NEW rows stay blue.
  const accentToken =
    !closed && row.status !== 'NEW' && displayPct <= 75
      ? STATUS_TOKEN['AT RISK']
      : token;

  // colorOverride takes priority over status-based bar color
  const effectiveBarColor = row.colorOverride || accentToken.bar;
  const effectiveTrack    = row.colorOverride
    ? `${row.colorOverride}22`   // 13% opacity tint as track background
    : accentToken.track;

  const rowBg = 'transparent';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      marginBottom: -1,
      paddingTop: 1,
      background: rowBg,
      opacity: 1,
    }}>
      {/* Top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px solid #f3f4f6', pointerEvents: 'none' }} />

      {/* Project */}
      <div style={{ flex: '0 0 17%', padding: '20px 16px', boxSizing: 'border-box' }}>
        <span style={{
          ...S, fontWeight: 900, fontSize: 11, lineHeight: 'normal', whiteSpace: 'nowrap',
          color: '#1a1a1a',
        }}>
          {row.project}
        </span>
      </div>

      {/* Release item */}
      <div style={{ flex: '1 1 0', padding: '20px 16px', boxSizing: 'border-box' }}>
        <span style={{
          ...S, fontWeight: 400, fontSize: 11, lineHeight: 'normal',
          color: '#4b5563',
        }}>
          {row.releaseItem}
        </span>
      </div>

      {/* Progress % text */}
      <div style={{ flex: '0 0 12%', padding: '20px 16px', boxSizing: 'border-box' }}>
        {closed ? (
          // CLOSED: show a ✓ check mark instead of a raw %, emphasising completion
          <span style={{ ...S, fontWeight: 900, fontSize: 11, color: accentToken.text, lineHeight: 'normal', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 10, lineHeight: 1 }}>✓</span>
            <span>100%</span>
          </span>
        ) : (
          <span style={{ ...S, fontWeight: 900, fontSize: 11, color: accentToken.text, lineHeight: 'normal' }}>
            {displayPct}%
          </span>
        )}
      </div>

      {/* Progress bar + schedule */}
      <div style={{ flex: '0 0 22%', padding: '16.5px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* Bar track */}
        <div style={{
          background: effectiveTrack,
          height: 6,
          borderRadius: 9999,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          flexShrink: 0,
        }}>
          {/* Bar fill */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            right: `${100 - displayPct}%`,
            background: effectiveBarColor,
            transition: 'right 0.3s ease',
            // CLOSED: subtle "hatched" texture via repeating-linear-gradient
            ...(closed ? {
              backgroundImage: `repeating-linear-gradient(
                135deg,
                transparent,
                transparent 4px,
                rgba(255,255,255,0.25) 4px,
                rgba(255,255,255,0.25) 8px
              )`,
              backgroundColor: accentToken.bar,
            } : {}),
          }} />
        </div>

        {/* Schedule text */}
        <span style={{
          ...S, fontWeight: 700, fontSize: 9, lineHeight: 'normal',
          textTransform: 'uppercase',
          color: accentToken.text,
        }}>
          {row.schedule}
        </span>
      </div>

      {/* Status badge */}
      <div style={{ flex: '0 0 13%', padding: '21.5px 16px', boxSizing: 'border-box', display: 'flex', justifyContent: 'flex-end' }}>
        {closed ? (
          // CLOSED gets a pill badge to distinguish it as a terminal state
          <span style={{
            ...S,
            fontWeight: 700,
            fontSize: 8,
            color: accentToken.text,
            background: '#f0fdf4',
            border: `1px solid #86efac`,
            borderRadius: 9999,
            padding: '2px 6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 'normal',
            whiteSpace: 'nowrap',
          }}>
            ✓ CLOSED
          </span>
        ) : (
          <span style={{ ...S, fontWeight: 900, fontSize: 9, color: accentToken.text, textTransform: 'uppercase', textAlign: 'right', lineHeight: 'normal' }}>
            {row.status}
          </span>
        )}
      </div>
    </div>
  );
}
