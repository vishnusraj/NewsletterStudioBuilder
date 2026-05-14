import React from 'react';
import { useNewsletterStore } from '../../store/useNewsletterStore';

// ── Status/color helpers ──────────────────────────────────────────────────────

const S: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Section component (rendered as live React root inside canvas) ──────────────

export function ProductionSupportSection() {
  const { psData } = useNewsletterStore();
  const { rows, reportedColor, resolvedColor, resolutionNote, carriedNote, periodLabel } = psData;

  const totalReported  = rows.reduce((s, r) => s + Number(r.reported || 0), 0);
  const totalResolved  = rows.reduce((s, r) => s + Number(r.resolved  || 0), 0);
  const resolutionRate = totalReported > 0 ? Math.round((totalResolved / totalReported) * 100) : 0;
  const carriedForward = Math.max(0, totalReported - totalResolved);

  const maxVal    = Math.max(...rows.flatMap(r => [Number(r.reported || 0), Number(r.resolved || 0)]), 1);
  const MAX_BAR_H = 95; // px — visible chart area height minus label area
  const barH      = (v: number) => Math.max(15, Math.round((Number(v || 0) / maxVal) * MAX_BAR_H));

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
        {/* Left: PRODUCTION SUPPORT */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: '#041627', width: 8, height: 8, flexShrink: 0 }} />
          <span style={{ fontFamily: 'Impact, sans-serif', fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1a1a1a', lineHeight: '16px' }}>
            PRODUCTION SUPPORT
          </span>
        </div>
        {/* Right: period label */}
        <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
          {periodLabel}
        </span>
      </div>

      {/* ── 3-column grid ─────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        columnGap: 24,
        rowGap: 24,
        width: '100%',
        minHeight: 323,
        alignItems: 'start',
      }}>

        {/* ── Bar Chart Card (spans cols 1-2) ──────────────────────────────── */}
        <div style={{
          gridColumn: '1 / span 2',
          background: 'white',
          borderRadius: 2,
          position: 'relative',
          padding: '25px 25px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          height: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Border + shadow overlay */}
          <div style={{ position: 'absolute', inset: 0, border: '1px solid #f3f4f6', borderRadius: 2, boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', pointerEvents: 'none' }} />

          {/* Chart title */}
          <div style={{ position: 'relative' }}>
            <span style={{ ...S, fontWeight: 900, fontSize: 14, color: '#1a1a1a', lineHeight: '20px' }}>
              Support Tickets — Reported vs. Resolved
            </span>
          </div>

          {/* Bars container */}
          <div style={{
            height: 135,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 48,
            position: 'relative',
            flexShrink: 0,
          }}>
            {rows.map(row => (
              <div key={row.id} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', flexShrink: 0 }}>
                {/* Bar pair */}
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
                  {/* Reported bar */}
                  <div style={{
                    background: reportedColor,
                    height: barH(row.reported),
                    width: 20,
                    borderRadius: '2px 2px 0 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: barH(row.reported) > 22 ? 7 : 2,
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    <span style={{ ...S, color: 'white', fontSize: 10, fontWeight: 900, lineHeight: '15px', textAlign: 'center' }}>
                      {row.reported}
                    </span>
                  </div>
                  {/* Resolved bar */}
                  <div style={{
                    background: resolvedColor,
                    height: barH(row.resolved),
                    width: 20,
                    borderRadius: '2px 2px 0 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: barH(row.resolved) > 22 ? 7 : 2,
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    <span style={{ ...S, color: 'white', fontSize: 10, fontWeight: 900, lineHeight: '15px', textAlign: 'center' }}>
                      {row.resolved}
                    </span>
                  </div>
                </div>
                {/* System label */}
                <div style={{ paddingTop: 8, flexShrink: 0 }}>
                  <span style={{ ...S, fontWeight: 700, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {row.systemName}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Legend row */}
          <div style={{
            position: 'relative',
            height: 32,
            flexShrink: 0,
            marginTop: 'auto',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px solid #f9fafb', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', paddingTop: 17 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ background: reportedColor, width: 12, height: 12, flexShrink: 0 }} />
                <span style={{ ...S, fontWeight: 700, fontSize: 10, color: '#6b7280', textTransform: 'uppercase' }}>
                  Reported ({totalReported})
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ background: resolvedColor, width: 12, height: 12, flexShrink: 0 }} />
                <span style={{ ...S, fontWeight: 700, fontSize: 10, color: '#6b7280', textTransform: 'uppercase' }}>
                  Resolved ({totalResolved})
                </span>
              </div>
            </div>
          </div>
          {/* Bottom padding spacer */}
          <div style={{ height: 22, flexShrink: 0 }} />
        </div>

        {/* ── Resolution Stats column (col 3) ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: '3' }}>

          {/* Resolution Rate card */}
          <div style={{ background: 'white', borderRadius: 2, position: 'relative', padding: 25, width: '100%', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', inset: 0, border: '1px solid #f3f4f6', borderRadius: 2, boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...S, fontWeight: 900, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
                RESOLUTION RATE
              </span>
              <span style={{ ...S, fontWeight: 900, fontSize: 36, color: '#1a1a1a', lineHeight: '40px' }}>
                {resolutionRate}%
              </span>
              <span style={{ ...S, fontWeight: 700, fontSize: 10, color: '#6b7280' }}>
                {totalResolved} of {totalReported} resolved
              </span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 7.5 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path clipRule="evenodd" fillRule="evenodd" fill="#006B5F"
                    d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0zm2.78 4.22a.75.75 0 0 0-1.06 0L5.25 6.69 4.28 5.72a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0 0-1.06z"
                  />
                </svg>
                <span style={{ ...S, fontWeight: 900, fontSize: 10, color: '#006b5f', textTransform: 'uppercase' }}>
                  {resolutionNote}
                </span>
              </div>
            </div>
          </div>

          {/* Carried Forward card */}
          <div style={{ background: 'white', borderRadius: 2, position: 'relative', padding: 25, width: '100%', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', inset: 0, border: '1px solid #f3f4f6', borderRadius: 2, boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...S, fontWeight: 900, fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.9px' }}>
                CARRIED FORWARD
              </span>
              <span style={{ ...S, fontWeight: 900, fontSize: 36, color: '#1a1a1a', lineHeight: '40px' }}>
                {carriedForward}
              </span>
              <span style={{ ...S, fontWeight: 700, fontSize: 10, color: '#6b7280' }}>
                Scheduled for next month
              </span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 7.5 }}>
                {/* Orange arrow icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 12, height: 12, flexShrink: 0, transform: 'rotate(90deg)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path clipRule="evenodd" fillRule="evenodd" fill="#EA580C"
                      d="M6 .75a.75.75 0 0 1 .75.75v7.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L1.72 7.28a.75.75 0 0 1 1.06-1.06L5.25 8.69V1.5A.75.75 0 0 1 6 .75z"
                    />
                  </svg>
                </div>
                <span style={{ ...S, fontWeight: 900, fontSize: 10, color: '#ea580c', textTransform: 'uppercase' }}>
                  {carriedNote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
