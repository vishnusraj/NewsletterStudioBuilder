import React, { useRef, useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { TopBar } from './components/studio/TopBar';
import { LeftPanel } from './components/studio/LeftPanel';
import { RightPanel } from './components/studio/RightPanel';
import { NewsletterCanvas } from './components/studio/NewsletterCanvas';
import { useNewsletterStore } from './store/useNewsletterStore';

export default function App() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const createVersion = useNewsletterStore(s => s.createVersion);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = React.useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = React.useState(false);

  const flushInlineEditsAndSave = React.useCallback(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.isContentEditable) {
      active.blur();
      requestAnimationFrame(() => createVersion());
      return;
    }
    createVersion();
  }, [createVersion]);

  // ── Global Ctrl/Cmd + S keyboard shortcut — creates a version checkpoint ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        flushInlineEditsAndSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flushInlineEditsAndSave]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top Bar */}
      <TopBar canvasRef={canvasRef} />

      {/* Main Studio Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Panel - Section Manager */}
        {!leftPanelCollapsed && <LeftPanel />}

        {/* Center - Newsletter Canvas */}
        <NewsletterCanvas canvasRef={canvasRef} />

        {/* Right Panel - Properties */}
        {!rightPanelCollapsed && <RightPanel />}

        <button
          type="button"
          onClick={() => setLeftPanelCollapsed((collapsed) => !collapsed)}
          aria-label={leftPanelCollapsed ? 'Show left panel' : 'Hide left panel'}
          aria-pressed={!leftPanelCollapsed}
          title={leftPanelCollapsed ? 'Show left panel' : 'Hide left panel'}
          style={{
            position: 'absolute',
            top: 16,
            left: leftPanelCollapsed ? 10 : 282,
            zIndex: 20,
            width: 34,
            height: 34,
            borderRadius: 999,
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#334155',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'left 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#334155';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.12)';
          }}
        >
          {leftPanelCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        <button
          type="button"
          onClick={() => setRightPanelCollapsed((collapsed) => !collapsed)}
          aria-label={rightPanelCollapsed ? 'Show right panel' : 'Hide right panel'}
          aria-pressed={!rightPanelCollapsed}
          title={rightPanelCollapsed ? 'Show right panel' : 'Hide right panel'}
          style={{
            position: 'absolute',
            top: 16,
            right: rightPanelCollapsed ? 10 : 298,
            zIndex: 20,
            width: 34,
            height: 34,
            borderRadius: 999,
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#334155',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'right 0.18s ease, box-shadow 0.18s ease, color 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0f172a';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#334155';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.12)';
          }}
        >
          {rightPanelCollapsed ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* ── Edit-mode inline editing visual cues ──────────────────────────── */
        /* Activated by the data-edit-canvas attribute set on the canvas div.   */
        /* This replaces per-element mouseenter/mouseleave event listeners.     */

        /* Cover fields */
        [data-edit-canvas] [data-cover-field][contenteditable="true"]:hover {
          background-color: rgba(59, 130, 246, 0.08) !important;
          border-radius: 2px;
        }
        [data-edit-canvas] [data-cover-field][contenteditable="true"]:focus {
          background-color: rgba(59, 130, 246, 0.12) !important;
          outline: 2px solid #2563eb !important;
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* Static section text elements */
        [data-edit-canvas] [data-editable-text][contenteditable="true"]:hover {
          background-color: rgba(59, 130, 246, 0.06) !important;
          border-radius: 2px;
        }
        [data-edit-canvas] [data-editable-text][contenteditable="true"]:focus {
          background-color: rgba(59, 130, 246, 0.10) !important;
          outline: 2px solid #2563eb !important;
          outline-offset: 2px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
