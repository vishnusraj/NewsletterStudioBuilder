import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNewsletterStore, type RFStatus, WATCH_BADGE_PRESETS } from '../../store/useNewsletterStore';
import { ModernisationEditor, PortfolioEditor, MetricsEditor, BusinessImpactEditor, WatchItemsEditor, OutcomesEditor, MonthlySnapshotEditor, ClientPartnersEditor, ThankYouEditor } from './SectionDataEditor';

// ── All valid RF statuses (order matters — shown in dropdown) ─────────────────
// 'CLOSED' is added as the last terminal state.
const RF_STATUSES: RFStatus[] = ['ON TRACK', 'AT RISK', 'DELAYED', 'NEW', 'CLOSED'];

// ── Status color tokens (matches ReleaseForecastSection.tsx exactly) ──────────
const STATUS_COLOR: Record<RFStatus, string> = {
  'ON TRACK': '#006b5f',
  'AT RISK':  '#d97706',
  'DELAYED':  '#dc2626',
  'NEW':      '#2563eb',
  'CLOSED':   '#6b7280',   // neutral gray — finalized / archived
};

// Status badge backgrounds for the dropdown labels
const STATUS_BG: Record<RFStatus, string> = {
  'ON TRACK': '#d1fae5',
  'AT RISK':  '#fef3c7',
  'DELAYED':  '#fee2e2',
  'NEW':      '#dbeafe',
  'CLOSED':   '#f3f4f6',   // neutral gray background
};

// Whether a status is a terminal/complete state (progress must be 100)
const STATUS_COMPLETE: Record<RFStatus, boolean> = {
  'ON TRACK': false,
  'AT RISK':  false,
  'DELAYED':  false,
  'NEW':      false,
  'CLOSED':   true,
};

// ── Shared micro styles ───────────────────────────────────────────────────────

const cell: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 3,
  padding: '3px 5px',
  fontSize: 10,
  fontFamily: 'Inter, sans-serif',
  color: '#374151',
  background: 'white',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const label: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: 'Inter, sans-serif',
  marginBottom: 3,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: '#374151',
  fontFamily: 'Inter, sans-serif',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 8,
  marginTop: 4,
};

function Divider() {
  return <div style={{ height: 1, background: '#f3f4f6', margin: '10px 0' }} />;
}

// ── Production Support editor ─────────────────────────────────────────────────

function PSEditor() {
  const {
    psData, updatePSRow, addPSRow, deletePSRow,
    setPSColor, setPSPeriodLabel, setPSNote, resetPSData, importedData,
    setPSData,
  } = useNewsletterStore();

  const { rows, reportedColor, resolvedColor, resolutionNote, carriedNote, periodLabel } = psData;

  // Auto-sync from importedData
  const prevImportKey = useRef<string>('');
  useEffect(() => {
    if (!importedData?.production_support) return;
    const ps = importedData.production_support;
    const key = JSON.stringify(ps);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    const chartRows = ps.chart_data ?? [];
    if (!chartRows.length) return;

    const newRows = chartRows.map((row, i) => ({
      id: `ps-imported-${i}-${Date.now()}`,
      systemName:  row.system_name   ?? `System ${i + 1}`,
      reported:    Number(row.tickets_reported ?? 0),
      resolved:    Number(row.tickets_resolved ?? 0),
    }));

    const stats: any = ps.stats ?? ps;
    setPSData({
      ...psData,
      rows: newRows,
      resolutionNote: stats.resolution_note || psData.resolutionNote,
      carriedNote:    stats.carried_note    || psData.carriedNote,
    });
  }, [importedData]);

  const totalReported = rows.reduce((s, r) => s + Number(r.reported || 0), 0);
  const totalResolved = rows.reduce((s, r) => s + Number(r.resolved  || 0), 0);
  const rate = totalReported > 0 ? Math.round((totalResolved / totalReported) * 100) : 0;

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>

      {/* Live KPIs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <KpiChip label="Reported" value={String(totalReported)} />
        <KpiChip label="Resolved" value={String(totalResolved)} />
        <KpiChip label="Rate" value={`${rate}%`} color="#006b5f" />
        <KpiChip label="Carried" value={String(Math.max(0, totalReported - totalResolved))} color="#ea580c" />
      </div>

      <Divider />

      <p style={sectionTitle}>Section Header</p>
      <div style={{ marginBottom: 12 }}>
        <p style={label}>Right-side Label</p>
        <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={periodLabel} onChange={e => setPSPeriodLabel(e.target.value)} />
      </div>

      <Divider />

      {/* Chart data table */}
      <p style={sectionTitle}>Chart Data</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 48px 24px', gap: 4, alignItems: 'center' }}>
          <span style={{ ...label, margin: 0 }}>System</span>
          <span style={{ ...label, margin: 0, textAlign: 'center' }}>Rep.</span>
          <span style={{ ...label, margin: 0, textAlign: 'center' }}>Res.</span>
          <span />
        </div>

        {rows.map(row => (
          <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 48px 48px 24px', gap: 4, alignItems: 'center' }}>
            <input
              style={cell}
              value={row.systemName}
              onChange={e => updatePSRow(row.id, { systemName: e.target.value })}
            />
            <input
              style={{ ...cell, textAlign: 'center' }}
              type="number" min={0}
              value={row.reported}
              onChange={e => updatePSRow(row.id, { reported: Math.max(0, Number(e.target.value)) })}
            />
            <input
              style={{ ...cell, textAlign: 'center' }}
              type="number" min={0}
              value={row.resolved}
              onChange={e => updatePSRow(row.id, { resolved: Math.max(0, Number(e.target.value)) })}
            />
            <button
              onClick={() => deletePSRow(row.id)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Remove row"
            >
              <Trash2 size={11} />
            </button>
          </div>
        ))}

        <button
          onClick={addPSRow}
          style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
            fontSize: 10, color: '#3b82f6', background: 'none',
            border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer',
            marginTop: 2, fontFamily: 'Inter, sans-serif',
          }}
        >
          <Plus size={11} /> Add system
        </button>
      </div>

      <Divider />

      {/* Bar colours */}
      <p style={sectionTitle}>Bar Colours</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <ColorRow label="Reported" color={reportedColor} onChange={v => setPSColor('reportedColor', v)} />
        <ColorRow label="Resolved" color={resolvedColor} onChange={v => setPSColor('resolvedColor', v)} />
      </div>

      <Divider />

      {/* Notes */}
      <p style={sectionTitle}>Stat Notes</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div>
          <p style={label}>Resolution Note</p>
          <input
            style={cell}
            value={resolutionNote}
            onChange={e => setPSNote('resolutionNote', e.target.value)}
          />
        </div>
        <div>
          <p style={label}>Carried Note</p>
          <input
            style={cell}
            value={carriedNote}
            onChange={e => setPSNote('carriedNote', e.target.value)}
          />
        </div>
      </div>

      <Divider />
      <ResetButton label="Reset PS data" onReset={resetPSData} />
    </div>
  );
}

// ── Release Forecast editor ───────────────────────────────────────────────────

function RFEditor() {
  const {
    rfData, updateRFRow, addRFRow, deleteRFRow,
    updateRFCard, addRFCard, deleteRFCard, setRFHeaderLabel, resetRFData, importedData, setRFData,
  } = useNewsletterStore();

  const { cards, rows, headerLabel } = rfData;

  // Auto-sync from importedData
  const prevImportKey = useRef<string>('');
  useEffect(() => {
    if (!importedData?.release_forecast) return;
    const rf = importedData.release_forecast;
    const key = JSON.stringify(rf);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    const newRows = (rf.table ?? []).map((row, i) => {
      const rawStatus = String(row.status ?? '').toUpperCase()
        // Normalize Excel variants → canonical values (mirrors dataMapper.ts)
        .replace(/^COMPLETE[D]?$/, 'CLOSED')
        .replace(/^DONE$/, 'CLOSED')
        .replace(/^CLOSED?$/, 'CLOSED')
        .replace(/^ON[- _]TRACK$/, 'ON TRACK')
        .replace(/^AT[- _]RISK$/, 'AT RISK');

      const status: RFStatus = RF_STATUSES.includes(rawStatus as RFStatus)
        ? (rawStatus as RFStatus) : 'ON TRACK';

      // Business rule: CLOSED always means 100% progress
      const rawProgress = Math.min(100, Math.max(0, Number(String(row.progress_pct ?? 0).replace('%', ''))));
      const progress = STATUS_COMPLETE[status] ? 100 : rawProgress;

      return {
        id:          `rf-imported-${i}-${Date.now()}`,
        project:     row.project      ?? '',
        releaseItem: row.release_item ?? '',
        progress,
        schedule:    row.schedule ?? '',
        status,
      };
    });

    const newCards = (rf.upcoming_cards ?? []).map((c, i) => ({
      id:          `rf-card-imported-${i}-${Date.now()}`,
      title:       c.card_title       ?? '',
      date:        c.card_date        ?? '',
      description: c.card_description ?? '',
    }));

    setRFData({
      headerLabel: rfData.headerLabel,
      cards: newCards.length ? newCards : rfData.cards,
      rows:  newRows.length  ? newRows  : rfData.rows,
    });
  }, [importedData]);

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif' }}>

      <p style={sectionTitle}>Section Header</p>
      <div style={{ marginBottom: 12 }}>
        <p style={label}>Right-side Label</p>
        <input style={{ ...cell, textTransform: 'uppercase', fontWeight: 700 }} value={headerLabel} onChange={e => setRFHeaderLabel(e.target.value)} />
      </div>

      <Divider />

      {/* Upcoming cards */}
      <p style={sectionTitle}>Upcoming Release Cards</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cards.map(card => (
          <div key={card.id} style={{ border: '1px solid #e5e7eb', borderRadius: 4, padding: 8, position: 'relative', background: '#fafafa' }}>
            <button
              onClick={() => deleteRFCard(card.id)}
              style={{ position: 'absolute', top: 6, right: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626', padding: 2, display: 'flex' }}
            >
              <Trash2 size={11} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>
                <p style={label}>Title</p>
                <input style={cell} value={card.title} onChange={e => updateRFCard(card.id, { title: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 4 }}>
                <div>
                  <p style={label}>Description</p>
                  <input style={cell} value={card.description} onChange={e => updateRFCard(card.id, { description: e.target.value })} />
                </div>
                <div>
                  <p style={label}>Date</p>
                  <input style={cell} value={card.date} onChange={e => updateRFCard(card.id, { date: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addRFCard}
          style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
            fontSize: 10, color: '#3b82f6', background: 'none',
            border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Plus size={11} /> Add card
        </button>
      </div>

      <Divider />

      {/* Forecast table */}
      <p style={sectionTitle}>Forecast Table</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {rows.map(row => (
          <RFRowEditor key={row.id} row={row} onUpdate={updateRFRow} onDelete={deleteRFRow} />
        ))}
        <button
          onClick={addRFRow}
          style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
            fontSize: 10, color: '#3b82f6', background: 'none',
            border: '1px dashed #bfdbfe', borderRadius: 3, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', marginTop: 2,
          }}
        >
          <Plus size={11} /> Add row
        </button>
      </div>

      <Divider />
      <ResetButton label="Reset RF data" onReset={resetRFData} />
    </div>
  );
}

function WatchItemsDataEditor() {
  const { importedData, setWatchItems, watchItems } = useNewsletterStore();
  const prevImportKey = useRef<string>('');

  useEffect(() => {
    if (!importedData?.watch_items?.length) return;
    const key = JSON.stringify(importedData.watch_items);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    const newItems = importedData.watch_items.map((item, i) => {
      const type = String(item.badge_type ?? '').toLowerCase();
      const preset =
        type === 'orange' ? WATCH_BADGE_PRESETS.inputNeeded :
        type === 'green' ? WATCH_BADGE_PRESETS.positiveSignal :
        WATCH_BADGE_PRESETS.watch;

      return {
        id: `watch-imported-${i}-${Date.now()}`,
        title: item.title ?? `Watch Item ${i + 1}`,
        description: item.description ?? '',
        badgeLabel: item.badge_label ?? preset.badgeLabel,
        badgeBg: preset.badgeBg,
        badgeColor: preset.badgeColor,
      };
    });

    setWatchItems(newItems.length ? newItems : watchItems);
  }, [importedData, setWatchItems, watchItems]);

  return <WatchItemsEditor />;
}

function ClientPartnersDataEditor() {
  const { importedData, updateClientPartnerCard } = useNewsletterStore();
  const prevImportKey = useRef<string>('');

  useEffect(() => {
    if (!importedData?.client_partners) return;
    const key = JSON.stringify(importedData.client_partners);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    const cp = importedData.client_partners;
    updateClientPartnerCard('client', {
      name: cp.client_name ?? undefined,
      badgeLabel: cp.client_badge ?? undefined,
      description: cp.client_description ?? undefined,
    });
    updateClientPartnerCard('partner', {
      name: cp.partner_name ?? undefined,
      badgeLabel: cp.partner_badge ?? undefined,
      description: cp.partner_description ?? undefined,
    });
  }, [importedData, updateClientPartnerCard]);

  return <ClientPartnersEditor />;
}

function MonthlySnapshotDataEditor() {
  const { importedData, setMonthlySnapshotData } = useNewsletterStore();
  const prevImportKey = useRef<string>('');

  useEffect(() => {
    if (!importedData?.monthly_snapshot) return;
    const key = JSON.stringify(importedData.monthly_snapshot);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    setMonthlySnapshotData({
      periodLabel: importedData.monthly_snapshot.period_label ?? undefined,
      headline: importedData.monthly_snapshot.headline ?? undefined,
      bodyText: importedData.monthly_snapshot.body_text ?? undefined,
    });
  }, [importedData, setMonthlySnapshotData]);

  return <MonthlySnapshotEditor />;
}

function Top3OutcomesDataEditor() {
  const { importedData, setOutcomeItems, outcomeItems } = useNewsletterStore();
  const prevImportKey = useRef<string>('');

  useEffect(() => {
    if (!importedData?.top3_outcomes?.length) return;
    const key = JSON.stringify(importedData.top3_outcomes);
    if (key === prevImportKey.current) return;
    prevImportKey.current = key;

    const newItems = importedData.top3_outcomes.map((item, i) => ({
      id: `outcome-imported-${i}-${Date.now()}`,
      number: item.outcome_number ?? String(i + 1).padStart(2, '0'),
      title: item.title ?? `Outcome ${i + 1}`,
      description: item.description ?? '',
      tag1: item.tag1 ?? 'VALUE CREATED',
      tag2: item.tag2 ?? 'PROGRAMME',
    }));

    setOutcomeItems(newItems.length ? newItems : outcomeItems);
  }, [importedData, setOutcomeItems, outcomeItems]);

  return <OutcomesEditor />;
}

function RFRowEditor({
  row,
  onUpdate,
  onDelete,
}: {
  row: { id: string; project: string; releaseItem: string; progress: number; schedule: string; status: RFStatus; colorOverride?: string };
  onUpdate: (id: string, f: any) => void;
  onDelete: (id: string) => void;
}) {
  const pct     = Math.min(100, Math.max(0, row.progress));
  const color   = STATUS_COLOR[row.status] ?? '#006b5f';
  const bgColor = STATUS_BG[row.status]   ?? '#f3f4f6';
  const isClosed   = STATUS_COMPLETE[row.status] ?? false;
  // Show a warning when the stored progress is < 100 but status is a complete-state
  const showClosedWarning = isClosed && row.progress < 100;

  // When status changes to CLOSED → auto-set progress to 100
  // When status changes away from CLOSED → leave progress at 100 (user can adjust)
  const handleStatusChange = (newStatus: RFStatus) => {
    if (STATUS_COMPLETE[newStatus]) {
      // Auto-apply 100% progress for terminal statuses
      onUpdate(row.id, { status: newStatus, progress: 100 });
    } else {
      onUpdate(row.id, { status: newStatus });
    }
  };

  return (
    <div style={{
      border: `1px solid ${isClosed ? '#d1d5db' : '#e5e7eb'}`,
      borderRadius: 4,
      padding: 8,
      background: isClosed ? '#f9fafb' : '#fafafa',
      opacity: isClosed ? 0.9 : 1,
      transition: 'all 0.15s',
    }}>

      {/* Status badge strip at the top of each row card */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 9999,
            background: bgColor, color, textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em',
            border: `1px solid ${color}22`,
          }}>
            {isClosed ? '✓ ' : ''}{row.status}
          </span>
          {isClosed && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>
              <CheckCircle2 size={10} color="#9ca3af" /> Finalized
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(row.id)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626', padding: 2, display: 'flex', flexShrink: 0 }}
          title="Remove row"
        >
          <Trash2 size={11} />
        </button>
      </div>

      {/* Project + Item */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        <input
          style={{ ...cell, flex: '0 0 80px' }}
          placeholder="Project"
          value={row.project}
          onChange={e => onUpdate(row.id, { project: e.target.value })}
        />
        <input
          style={{ ...cell, flex: 1 }}
          placeholder="Release item"
          value={row.releaseItem}
          onChange={e => onUpdate(row.id, { releaseItem: e.target.value })}
        />
      </div>

      {/* Progress slider */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
          <p style={{ ...label, margin: 0 }}>Progress</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {isClosed && <CheckCircle2 size={10} color="#9ca3af" />}
            <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: 'Inter, sans-serif' }}>
              {isClosed ? '100%' : `${pct}%`}
            </span>
          </div>
        </div>

        {/* CLOSED: show locked-at-100% bar; others: show interactive slider */}
        {isClosed ? (
          <div style={{ position: 'relative' }}>
            {/* Locked progress bar at 100% */}
            <div style={{
              background: '#e5e7eb', height: 8, borderRadius: 999,
              overflow: 'hidden', cursor: 'not-allowed',
            }}>
              <div style={{
                height: '100%', width: '100%', background: '#9ca3af',
                backgroundImage: `repeating-linear-gradient(
                  135deg,
                  transparent, transparent 4px,
                  rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px
                )`,
                transition: 'width 0.2s ease',
              }} />
            </div>
            <p style={{ fontSize: 9, color: '#9ca3af', margin: '3px 0 0', fontFamily: 'Inter, sans-serif' }}>
              Progress locked to 100% for CLOSED status
            </p>
          </div>
        ) : (
          <>
            <input
              type="range"
              min={0} max={100} step={1}
              value={pct}
              onChange={e => onUpdate(row.id, { progress: Number(e.target.value) })}
              style={{ width: '100%', accentColor: color, cursor: 'pointer' }}
            />
            {/* Progress bar preview */}
            <div style={{ background: '#f3f4f6', height: 4, borderRadius: 999, overflow: 'hidden', marginTop: 3 }}>
              <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.2s ease' }} />
            </div>
          </>
        )}

        {/* Validation warning: CLOSED but progress stored < 100 */}
        {showClosedWarning && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            marginTop: 4, padding: '4px 6px', borderRadius: 3,
            background: '#fef9c3', border: '1px solid #fde68a',
          }}>
            <AlertTriangle size={10} color="#ca8a04" />
            <span style={{ fontSize: 9, color: '#92400e', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>
              Progress is {row.progress}% but status is CLOSED. It will display as 100%.
            </span>
          </div>
        )}
      </div>

      {/* Schedule + Status dropdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 4 }}>
        <div>
          <p style={label}>Schedule</p>
          <input style={cell} value={row.schedule} onChange={e => onUpdate(row.id, { schedule: e.target.value })} />
        </div>
        <div>
          <p style={label}>Status</p>
          <select
            style={{
              ...cell,
              padding: '3px 4px',
              color,
              fontWeight: 700,
              border: `1px solid ${color}44`,
              background: bgColor,
            }}
            value={row.status}
            onChange={e => handleStatusChange(e.target.value as RFStatus)}
          >
            {RF_STATUSES.map(s => (
              <option key={s} value={s} style={{ color: STATUS_COLOR[s], fontWeight: 600, background: STATUS_BG[s] }}>
                {s === 'CLOSED' ? '✓ CLOSED' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bar color override */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, padding: '6px 8px', background: '#f8fafc', borderRadius: 4, border: '1px solid #f3f4f6' }}>
        <div style={{ flex: 1 }}>
          <p style={{ ...label, marginBottom: 2 }}>Bar Color Override</p>
          <p style={{ fontSize: 8, color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>
            Overrides status color. Leave empty to use default.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
          <input
            type="color"
            value={row.colorOverride ?? color}
            onChange={e => onUpdate(row.id, { colorOverride: e.target.value })}
            style={{ width: 28, height: 24, border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', padding: 1 }}
            title="Pick custom bar color"
          />
          {row.colorOverride && (
            <button
              onClick={() => onUpdate(row.id, { colorOverride: undefined })}
              style={{ fontSize: 9, padding: '2px 6px', border: '1px solid #e5e7eb', borderRadius: 3, background: 'white', cursor: 'pointer', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}
              title="Remove override — use status color"
            >
              ✕ Reset
            </button>
          )}
          {!row.colorOverride && (
            <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Auto</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared atoms ──────────────────────────────────────────────────────────────

function KpiChip({ label: lbl, value, color = '#1a1a1a' }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ flex: 1, background: '#f9fafb', borderRadius: 4, padding: '5px 6px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
      <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>{lbl}</div>
      <div style={{ fontSize: 13, fontWeight: 900, color, fontFamily: 'Inter, sans-serif', marginTop: 1 }}>{value}</div>
    </div>
  );
}

function ColorRow({ label: lbl, color, onChange }: { label: string; color: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
      <label style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: color, border: '2px solid #e5e7eb', flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: '#4b5563', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{lbl}</span>
        <span style={{ fontSize: 9, color: '#9ca3af', fontFamily: 'monospace' }}>{color}</span>
        <input
          type="color"
          value={color}
          onChange={e => onChange(e.target.value)}
          style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
        />
      </label>
    </div>
  );
}

function ResetButton({ label: lbl, onReset }: { label: string; onReset: () => void }) {
  return (
    <button
      onClick={onReset}
      style={{
        display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
        fontSize: 10, color: '#6b7280', background: 'none',
        border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', marginTop: 2,
      }}
    >
      <RotateCcw size={11} /> {lbl}
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ChartDataEditor() {
  const { sections, selectedSectionId } = useNewsletterStore();
  const selected = sections.find(s => s.id === selectedSectionId);
  const sectionType = selected?.type ?? '';

  const isPS  = sectionType === 'production-support';
  const isCP  = sectionType === 'client-partners';
  const isRF  = sectionType === 'release-forecast';
  const isMS  = sectionType === 'monthly-snapshot';
  const isMod = sectionType === 'modernisation';
  const isPF  = sectionType === 'portfolio';
  const isMet = sectionType === 'metrics';
  const isBI  = sectionType === 'business-impact';
  const isOut = sectionType === 'top3-outcomes';
  const isWI  = sectionType === 'watch-items';
  const isTY  = sectionType === 'thank-you';

  if (isCP) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Client & Partners" emoji="🤝" />
      <ClientPartnersDataEditor />
    </div>
  );

  if (isPS) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Production Support" emoji="🛠️" />
      <PSEditor />
    </div>
  );

  if (isRF) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Release Forecast" emoji="🚀" />
      <RFEditor />
    </div>
  );

  if (isMS) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Monthly Snapshot" emoji="📋" />
      <MonthlySnapshotDataEditor />
    </div>
  );

  if (isMod) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Modernisation & Innovation" emoji="⚡" />
      <ModernisationEditor />
    </div>
  );

  if (isPF) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Portfolio at a Glance" emoji="📁" />
      <PortfolioEditor />
    </div>
  );

  if (isMet) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Key Metrics" emoji="📊" />
      <MetricsEditor />
    </div>
  );

  if (isBI) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Business Impact" emoji="💼" />
      <BusinessImpactEditor />
    </div>
  );

  if (isOut) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Top 3 Outcomes" emoji="🏆" />
      <Top3OutcomesDataEditor />
    </div>
  );

  if (isWI) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Strategic Watch Items" emoji="👁️" />
      <WatchItemsDataEditor />
    </div>
  );

  if (isTY) return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <SectionBanner label="Thank You" emoji="🙏" />
      <ThankYouEditor />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>📊</div>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 6px 0', fontFamily: 'Inter, sans-serif' }}>
        Section Data Editor
      </p>
      <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>
        Select a dynamic section to edit its data here.
      </p>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        <FeatureHint icon="🤝" text="Client & Partners — stakeholder intro cards" />
        <FeatureHint icon="📊" text="Key Metrics — add, edit, delete cards" />
        <FeatureHint icon="📋" text="Monthly Snapshot — live summary block" />
        <FeatureHint icon="💼" text="Business Impact — full table CRUD" />
        <FeatureHint icon="🏆" text="Top 3 Outcomes — dynamic outcome cards" />
        <FeatureHint icon="👁️" text="Watch Items — strategic watch cards" />
        <FeatureHint icon="🛠️" text="Production Support — bar chart data" />
        <FeatureHint icon="🚀" text="Release Forecast — rows + progress bars" />
        <FeatureHint icon="⚡" text="Modernisation — initiative cards" />
        <FeatureHint icon="📁" text="Portfolio — platform cards" />
      </div>
    </div>
  );
}

function SectionBanner({ label, emoji }: { label: string; emoji: string }) {
  return (
    <div style={{
      padding: '10px 14px',
      background: '#f9fafb',
      borderBottom: '1px solid #f3f4f6',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <span style={{ fontSize: 14 }}>{emoji}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}>{label}</span>
    </div>
  );
}

function FeatureHint({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 10px', borderRadius: 4,
      background: '#f9fafb', border: '1px solid #f3f4f6',
      textAlign: 'left',
    }}>
      <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 10, color: '#6b7280', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }}>{text}</span>
    </div>
  );
}
