import React, { useState, useRef } from 'react';
import {
  History, X, RotateCcw, Trash2, Check, Edit3,
  Clock, GitBranch, AlertTriangle, Plus, ChevronRight,
} from 'lucide-react';
import { useNewsletterStore, type Version } from '../../store/useNewsletterStore';

const F: React.CSSProperties = { fontFamily: 'Inter, sans-serif' };

// ── Time formatter ─────────────────────────────────────────────────────────────
function fmtTime(ts: number): string {
  const d = new Date(ts);
  const diff = Math.floor((Date.now() - ts) / 60_000);
  if (diff < 1)  return 'just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ── Inline name editor ─────────────────────────────────────────────────────────
function VersionRow({
  version,
  isActive,
  onRestore,
  onDelete,
  onRename,
}: {
  version: Version;
  isActive: boolean;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}) {
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(version.name);
  const [delConfirm, setDelConf] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commitName = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== version.name) onRename(version.id, trimmed);
    else setDraft(version.name);
    setEditing(false);
  };

  const handleDelete = () => {
    if (!delConfirm) {
      setDelConf(true);
      setTimeout(() => setDelConf(false), 3000);
    } else {
      onDelete(version.id);
    }
  };

  return (
    <div style={{
      padding: '10px 14px',
      borderBottom: '1px solid #1e293b',
      background: isActive ? 'rgba(59,130,246,0.08)' : 'transparent',
      display: 'flex', flexDirection: 'column', gap: 5,
      transition: 'background 0.12s',
    }}
    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
    >
      {/* Top row: name + timestamp */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {isActive && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
        )}
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={e => { if (e.key === 'Enter') commitName(); if (e.key === 'Escape') { setDraft(version.name); setEditing(false); } }}
            autoFocus
            style={{
              flex: 1, background: '#0f172a', border: '1px solid #3b82f6',
              borderRadius: 4, padding: '3px 6px', color: '#e2e8f0',
              fontSize: 11, fontFamily: 'Inter, sans-serif', outline: 'none',
            }}
          />
        ) : (
          <span style={{
            flex: 1, fontSize: 11, fontWeight: 600,
            color: isActive ? '#60a5fa' : '#e2e8f0',
            lineHeight: 1.3, ...F,
          }}>
            {version.name}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <Clock size={9} color="#475569" />
          <span style={{ fontSize: 9, color: '#475569', ...F }}>{fmtTime(version.timestamp)}</span>
        </div>
      </div>

      {/* Action row */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {/* Restore */}
        {!isActive && (
          <button
            onClick={() => onRestore(version.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px',
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: 4, color: '#60a5fa', cursor: 'pointer', fontSize: 10, fontWeight: 600, ...F,
            }}
          >
            <RotateCcw size={10} /> Restore
          </button>
        )}
        {isActive && (
          <span style={{ fontSize: 9, color: '#3b82f6', fontWeight: 700, ...F, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Check size={11} /> Active
          </span>
        )}
        {/* Rename */}
        <button
          onClick={() => { setEditing(true); setTimeout(() => inputRef.current?.select(), 10); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 3, padding: '3px 7px',
            background: 'none', border: '1px solid #1e293b',
            borderRadius: 4, color: '#64748b', cursor: 'pointer', fontSize: 10, ...F,
          }}
        >
          <Edit3 size={9} /> Rename
        </button>
        {/* Delete */}
        <button
          onClick={handleDelete}
          style={{
            display: 'flex', alignItems: 'center', gap: 3, padding: '3px 7px',
            background: delConfirm ? 'rgba(220,38,38,0.12)' : 'none',
            border: `1px solid ${delConfirm ? '#dc2626' : '#1e293b'}`,
            borderRadius: 4, color: delConfirm ? '#f87171' : '#64748b',
            cursor: 'pointer', fontSize: 10, ...F,
          }}
        >
          <Trash2 size={9} /> {delConfirm ? 'Confirm' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

interface VersionPanelProps {
  onClose: () => void;
}

export function VersionPanel({ onClose }: VersionPanelProps) {
  const {
    versions, activeVersionId,
    createVersion, restoreVersion, deleteVersion, renameVersion, clearVersions,
  } = useNewsletterStore();

  const [clearConfirm, setClearConfirm] = useState(false);
  const [newName, setNewName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleCreate = () => {
    const name = newName.trim() || undefined;
    createVersion(name);
    setNewName('');
    setShowNameInput(false);
  };

  const handleClearAll = () => {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 4000);
    } else {
      clearVersions();
      setClearConfirm(false);
    }
  };

  // Sort newest first
  const sorted = [...versions].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 52, right: 0, bottom: 0,
        width: 340, zIndex: 310,
        background: '#0f172a',
        borderLeft: '1px solid #1e293b',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.2s ease',
      }}>

        {/* Header */}
        <div style={{
          padding: '14px 16px',
          borderBottom: '1px solid #1e293b',
          display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <History size={14} color="#60a5fa" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>Version History</p>
            <p style={{ margin: 0, fontSize: 10, color: '#475569', marginTop: 2 }}>
              {versions.length} of 15 versions · auto-rotates oldest
            </p>
          </div>
          <button onClick={onClose} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Create version controls */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
          {showNameInput ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setShowNameInput(false); setNewName(''); } }}
                placeholder="Version name (optional)"
                autoFocus
                style={{
                  flex: 1, background: '#1e293b', border: '1px solid #334155',
                  borderRadius: 6, padding: '6px 10px', color: '#e2e8f0',
                  fontSize: 11, outline: 'none', ...F,
                }}
              />
              <button onClick={handleCreate} style={{ padding: '6px 10px', background: '#2563eb', border: 'none', borderRadius: 6, color: 'white', cursor: 'pointer', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, ...F }}>
                <Check size={12} /> Save
              </button>
              <button onClick={() => { setShowNameInput(false); setNewName(''); }} style={{ padding: '6px 8px', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={12} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={handleCreate}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '7px 12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  border: 'none', borderRadius: 6, color: 'white',
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, ...F,
                  boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
                }}
              >
                <Plus size={12} /> Save Version Now
              </button>
              <button
                onClick={() => setShowNameInput(true)}
                title="Save with custom name"
                style={{ padding: '7px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Edit3 size={12} />
              </button>
            </div>
          )}
          <p style={{ margin: '6px 0 0', fontSize: 9, color: '#334155', ...F }}>
            Ctrl+S also saves a version checkpoint automatically.
          </p>
        </div>

        {/* Version list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sorted.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <GitBranch size={32} color="#1e293b" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ fontSize: 12, color: '#475569', margin: '0 0 6px', fontWeight: 600, ...F }}>No versions saved yet</p>
              <p style={{ fontSize: 11, color: '#334155', margin: 0, lineHeight: 1.5, ...F }}>
                Click "Save Version Now" to capture the current state. Restore any saved version instantly.
              </p>
            </div>
          ) : (
            sorted.map(v => (
              <VersionRow
                key={v.id}
                version={v}
                isActive={v.id === activeVersionId}
                onRestore={restoreVersion}
                onDelete={deleteVersion}
                onRename={renameVersion}
              />
            ))
          )}
        </div>

        {/* Footer controls */}
        {versions.length > 0 && (
          <div style={{ padding: '12px 14px', borderTop: '1px solid #1e293b', flexShrink: 0 }}>
            <button
              onClick={handleClearAll}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                width: '100%', justifyContent: 'center',
                background: clearConfirm ? 'rgba(220,38,38,0.1)' : 'none',
                border: `1px solid ${clearConfirm ? '#dc2626' : '#1e293b'}`,
                borderRadius: 6, color: clearConfirm ? '#f87171' : '#475569',
                cursor: 'pointer', fontSize: 11, fontWeight: 600, ...F,
                transition: 'all 0.15s',
              }}
            >
              <AlertTriangle size={11} />
              {clearConfirm ? '⚠️ Confirm — clear all versions' : 'Clear all versions'}
            </button>
            <p style={{ margin: '6px 0 0', fontSize: 9, color: '#334155', textAlign: 'center', ...F }}>
              This removes all history but keeps current working state.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
