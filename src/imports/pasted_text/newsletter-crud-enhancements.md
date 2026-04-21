Enhance the "Newsletter Studio" application to support full CRUD (Create, Read, Update, Delete) operations across ALL sections, including:

- Card-based sections (e.g., Modernisation & Innovation)
- Structured sections (e.g., Key Metrics, Business Impact tables)
- Footer section

⚠️ CORE PRINCIPLE:
- EVERYTHING must be dynamic and editable
- No hardcoded content
- Layout remains structurally consistent
- All data is driven by global state

-----------------------------------
🧩 1. FULL CRUD — ALL SECTIONS
-----------------------------------

Apply CRUD capabilities to ALL section types:

✔ Add items  
✔ Edit items  
✔ Delete items  
✔ Duplicate items  
✔ Reorder items (optional drag & drop)

-----------------------------------
📊 2. KEY METRICS — FULLY DYNAMIC
-----------------------------------

Convert Key Metrics into dynamic, editable items:

Each metric should support:
- Title (e.g., "Total Tickets")
- Value (numeric/text)
- Subtext (optional)
- Trend / indicator (optional)

-----------------------------------
RIGHT PANEL CONTROL:
-----------------------------------

- Display list of all metrics
- Allow:
  ✔ Add new metric  
  ✔ Edit metric fields  
  ✔ Delete metric  
  ✔ Duplicate metric  

-----------------------------------
LAYOUT RULE:
-----------------------------------

- Auto-adjust grid:
  - 1 → full width
  - 2 → 2-column
  - 3+ → responsive grid

-----------------------------------
📋 3. BUSINESS IMPACT — FULL CRUD TABLE
-----------------------------------

Convert Business Impact into a fully editable table:

-----------------------------------
TABLE STRUCTURE:
-----------------------------------

Columns (example):
- Initiative / Item
- Description
- Impact
- Status (optional)

-----------------------------------
RIGHT PANEL CONTROL:
-----------------------------------

- Show all rows
- Allow:
  ✔ Add row  
  ✔ Edit row fields  
  ✔ Delete row  
  ✔ Duplicate row  

-----------------------------------
INLINE EDITING:
-----------------------------------

- Cells editable directly on canvas
- Sync with right panel

-----------------------------------
TABLE BEHAVIOR:
-----------------------------------

- Dynamic row rendering
- Maintain table layout integrity
- No column structure break

-----------------------------------
🧩 4. CARD-BASED SECTIONS (ALREADY DYNAMIC)
-----------------------------------

Ensure consistency across:

- Modernisation & Innovation
- Customer Stories
- Portfolio Summary

Each supports:
✔ Add / Delete / Duplicate  
✔ Right panel editing  
✔ Inline editing  
✔ Auto layout  

-----------------------------------
🖥️ 5. RIGHT PANEL — UNIVERSAL CONTROL CENTER
-----------------------------------

For ANY selected section:

Display:
- Section type
- List of items (cards / rows / metrics)

Allow:
✔ Add item  
✔ Edit item  
✔ Delete item  
✔ Duplicate item  

-----------------------------------
📐 6. AUTO LAYOUT SYSTEM
-----------------------------------

- Cards → grid auto-adjust
- Tables → row-based layout
- Metrics → responsive blocks

⚠️ Maintain:
- Exact spacing
- Alignment
- Design fidelity

-----------------------------------
🧾 7. EDITABLE FOOTER (INCLUDED)
-----------------------------------

Footer must support:

✔ Inline editing  
✔ Right panel editing  
✔ Optional multiple items  

-----------------------------------
FOOTER STRUCTURE:
-----------------------------------

{
  footer: {
    title: "",
    description: "",
    contact: {
      email: "",
      phone: "",
      address: ""
    },
    links: []
  }
}

-----------------------------------
💾 8. GLOBAL STATE MANAGEMENT
-----------------------------------

- Use Zustand / Redux
- ALL sections must read/write from global state

Structure:

{
  cover: {...},
  sections: [...],
  keyMetrics: [...],
  businessImpact: [...],
  footer: {...},
  theme: {...}
}

-----------------------------------
🔁 9. REAL-TIME SYNC
-----------------------------------

- Any CRUD operation:
  → Instantly updates preview  
  → Syncs with global state  
  → Persists via localStorage  

-----------------------------------
📤 10. EXPORT SUPPORT
-----------------------------------

- Ensure ALL dynamic data renders correctly in:
  ✔ PDF  
  ✔ PNG / JPG  

- Maintain:
  - Layout
  - Styling
  - Data accuracy

-----------------------------------
🧪 11. VALIDATION RULES
-----------------------------------

- Prevent invalid inputs
- Ensure:
  - Metrics values are valid
  - Table rows are consistent
  - Required fields handled

-----------------------------------
🚨 12. FAILURE CONDITIONS
-----------------------------------

❌ Cannot add/delete metrics  
❌ Cannot edit Business Impact rows  
❌ Table breaks after edit  
❌ Layout breaks after CRUD operations  
❌ Footer not editable  
❌ State not synced  

-----------------------------------
🎯 FINAL OBJECTIVE
-----------------------------------

Deliver a fully dynamic, enterprise-grade newsletter builder where:

✔ ALL sections support full CRUD  
✔ Both card-based and table-based sections are editable  
✔ Right panel acts as a universal editor  
✔ Layout remains visually consistent  
✔ Data is persistent and reliable  

⚠️ No section should remain static or partially editable.