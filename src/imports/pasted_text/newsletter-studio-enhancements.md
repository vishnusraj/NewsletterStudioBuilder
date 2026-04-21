Enhance the "Newsletter Studio" application to support:

1. Universal editing across ALL sections  
2. Full Excel-driven data updates (100% coverage)  
3. Complete color customization across ALL elements  
4. Robust versioning system (save, restore, reset)  

⚠️ CORE PRINCIPLE:
- NO partial implementations
- EVERYTHING must be editable, data-driven, and persistent
- Layout must remain consistent and unbreakable

-----------------------------------
🖥️ 1. UNIVERSAL RIGHT PANEL EDITING
-----------------------------------

Fix and enforce:

✔ EVERY section must be editable via right panel on selection  

Applies to:
- Cover  
- Key Metrics  
- Business Impact  
- Production Support  
- Release Forecast  
- Modernisation & Innovation  
- Customer Stories  
- Portfolio Summary  
- Footer  

-----------------------------------
RIGHT PANEL BEHAVIOR:
-----------------------------------

On selecting ANY section:

Display:
- Section title  
- Editable fields  
- List of items (cards / rows / metrics)

Allow:
✔ Add / Edit / Delete / Duplicate  
✔ Inline + panel editing sync  
✔ Color editing (where applicable)  

❌ No section should be read-only  

-----------------------------------
📊 2. FULL CRUD — ALL SECTION TYPES
-----------------------------------

Support CRUD for:

✔ Cards (Innovation, Stories, etc.)  
✔ Metrics (Key Metrics)  
✔ Tables (Business Impact)  
✔ Charts (Production Support)  
✔ Forecast rows (Release Forecast)  
✔ Footer blocks  

-----------------------------------
📥 3. EXCEL BULK UPDATE (FULL COVERAGE)
-----------------------------------

Fix Excel integration to update ALL sections:

-----------------------------------
EXCEL MUST SUPPORT:
-----------------------------------

✔ Cover:
- Title, subtitle, date, labels  

✔ Key Metrics:
- Title, value, subtext  

✔ Business Impact:
- All table rows  

✔ Production Support:
- Chart data + metrics  

✔ Release Forecast:
- Name, status, progress  

✔ Card Sections:
- Title, description  

✔ Footer:
- Email, phone, address, text  

-----------------------------------
🧠 MAPPING SYSTEM:
-----------------------------------

- Provide UI to map:
  Excel columns → UI fields  

Support:
✔ Re-import  
✔ Partial updates  
✔ Overwrite confirmation  

-----------------------------------
🔁 REAL-TIME SYNC:
-----------------------------------

After Excel import:

✔ UI updates instantly  
✔ Global state updates  
✔ Saved to localStorage  

-----------------------------------
🎨 4. FULL COLOR CUSTOMIZATION
-----------------------------------

Enable for ALL elements:

✔ Color picker  
✔ HEX input  

Applies to:
- Cover  
- Cards  
- Metrics  
- Tables  
- Charts  
- Progress bars  
- Footer  

-----------------------------------
📊 5. RELEASE FORECAST COLOR OVERRIDE
-----------------------------------

Fix behavior:

- Default: status-based colors  
- BUT:

✔ Allow manual override  
✔ Persist custom color  
✔ Override takes priority  

Rule:
User-defined color > status color  

-----------------------------------
📈 6. CHART CUSTOMIZATION
-----------------------------------

- Charts must support:
✔ Data updates via Excel  
✔ Dataset color editing  
✔ Label editing  

- Must persist across:
✔ Mode switch  
✔ Refresh  
✔ Version restore  

-----------------------------------
💾 7. STATE MANAGEMENT + PERSISTENCE
-----------------------------------

- Use global state (Zustand/Redux)

- Persist via localStorage

Structure:

{
  cover: {...},
  keyMetrics: [...],
  businessImpact: [...],
  productionSupport: {...},
  releaseForecast: [...],
  sections: [...],
  footer: {...},
  theme: {...}
}

-----------------------------------
🧠 8. VERSIONING SYSTEM (NEW)
-----------------------------------

Introduce full version control.

-----------------------------------
VERSION CREATION:
-----------------------------------

Create version when:
✔ User clicks "Save"  

Optional:
✔ Auto-save checkpoints  

Each version stores:
- Full app state  
- Timestamp  
- Optional name  

-----------------------------------
📦 VERSION STRUCTURE:
-----------------------------------

{
  versions: [
    {
      id: "v1",
      name: "Draft 1",
      timestamp: "...",
      data: { full state }
    }
  ],
  currentVersionId: "v3"
}

-----------------------------------
🖥️ VERSION UI:
-----------------------------------

Provide UI (header or side panel):

Display:
- Version list  
- Timestamp  
- Name  

Allow:
✔ Switch version  
✔ Rename version  
✔ Delete version  

-----------------------------------
🔁 VERSION SWITCH:
-----------------------------------

On selecting a version:

✔ Load version data  
✔ Update global state  
✔ Update UI instantly  

-----------------------------------
💾 AUTO-SAVE vs VERSION:
-----------------------------------

- Auto-save → updates working state  
- Manual save → creates new version  

Optional:
- Show “Unsaved changes” indicator  

-----------------------------------
🔄 RESET VERSIONS:
-----------------------------------

Provide:

✔ “Reset All Versions”  

Behavior:
- Clear all versions  
- Clear localStorage  
- Load default template  

⚠️ Confirmation required  

-----------------------------------
📤 EXPORT RULE:
-----------------------------------

- Export uses CURRENT active version  

-----------------------------------
⚙️ STORAGE RULES:
-----------------------------------

- Store in localStorage (or IndexedDB)

- Limit:
  - Max 10–20 versions  
  - Remove oldest automatically  

-----------------------------------
🧪 9. VALIDATION RULES
-----------------------------------

- Prevent invalid Excel mapping  
- Validate inputs  
- Handle partial/missing data  

-----------------------------------
🚨 10. FAILURE CONDITIONS
-----------------------------------

❌ Any section not editable  
❌ Excel not updating all sections  
❌ Footer/cover not syncing  
❌ Colors not customizable  
❌ Forecast colors not overrideable  
❌ Version not saving/restoring correctly  
❌ Data mismatch after switching version  

-----------------------------------
🎯 FINAL OBJECTIVE
-----------------------------------

Deliver a fully consistent system where:

✔ ALL sections are editable via right panel  
✔ Excel controls entire app data  
✔ ALL elements support color customization  
✔ Charts and forecast visuals are user-controlled  
✔ Versioning allows save, restore, reset  
✔ Data is persistent and reliable  

⚠️ No partial implementation allowed — everything must work uniformly.