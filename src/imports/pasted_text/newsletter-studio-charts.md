Enhance the "Newsletter Studio" application by adding fully dynamic, data-driven charting and forecast customization capabilities.

⚠️ CORE PRINCIPLE:
- Charts and visualizations must be fully driven by user input (table or form)
- Layout and styling must remain consistent with the original design system
- Visual components must auto-render based on data

-----------------------------------
📊 1. PRODUCTION SUPPORT – FULLY CUSTOMIZABLE CHARTS
-----------------------------------

Enable complete customization of the Production Support section:

🧩 COMPONENTS:
- Bar charts (primary)
- Metrics summary cards

-----------------------------------
📥 DATA INPUT METHODS
-----------------------------------

Users can input data via:

1. Editable Data Table (Spreadsheet-like UI)
   - Columns:
     - Category (e.g., Week/Month)
     - Reported
     - Resolved
     - Additional metrics (optional)

2. Manual Input Fields
   - Add/remove rows dynamically
   - Inline editing

3. Excel Upload (mapped to chart data)

-----------------------------------
📊 CHART BEHAVIOR
-----------------------------------

- Automatically generate bar charts based on input data
- Each dataset should:
  - Map to a bar group
  - Use consistent color tokens

- Support:
  - Multiple datasets (e.g., Reported vs Resolved)
  - Dynamic scaling
  - Axis auto-adjustment

-----------------------------------
🎨 CHART CUSTOMIZATION
-----------------------------------

Users can:
- Modify dataset labels
- Choose colors (via color picker / HEX)
- Toggle visibility of datasets

⚠️ Constraints:
- Must follow design system styling
- No arbitrary styling outside defined tokens

-----------------------------------
📦 TECH REQUIREMENTS (CHARTS)
-----------------------------------

Use:
- Recharts OR Chart.js (preferred: Recharts for React)

Ensure:
- Responsive rendering inside fixed layout
- High-resolution export compatibility

-----------------------------------
📈 2. METRICS CARDS (DYNAMIC)
-----------------------------------

- KPI cards must update automatically based on input data
- Example:
  - Total reported
  - Total resolved
  - Resolution %

- Allow:
  - Custom labels
  - Dynamic calculations

-----------------------------------
🚀 3. RELEASE FORECAST – FULLY CUSTOMIZABLE
-----------------------------------

Enable dynamic control of Release Forecast section.

-----------------------------------
📥 DATA INPUT
-----------------------------------

Users can edit via:

- Table format:
  Columns:
  - Feature / Initiative Name
  - Status (On Track / Risk / Delayed)
  - Progress (%) ← KEY FIELD
  - Timeline (optional)

- Add/remove rows dynamically

-----------------------------------
📊 PROGRESS VISUALIZATION
-----------------------------------

- Progress bars must:
  - Reflect exact % value from "Progress" column
  - Auto-render width dynamically
  - Maintain design styling

Example:
- 75% → bar fills 75% width
- 100% → full bar
- 0% → empty

-----------------------------------
🎨 STATUS STYLING
-----------------------------------

Apply predefined styles based on status:
- On Track → Green
- At Risk → Orange
- Delayed → Red

Allow:
- Optional color override (within token system)

-----------------------------------
📅 SCHEDULE / TIMELINE SUPPORT (OPTIONAL ENHANCEMENT)
-----------------------------------

- Allow users to define:
  - Start date
  - End date

- Generate:
  - Visual timeline indicator OR
  - Enhanced progress bar with date markers

-----------------------------------
⚙️ 4. REAL-TIME SYNC
-----------------------------------

- Any change in:
  - Data table
  - Input fields
  - Excel upload

→ Must instantly update:
  - Charts
  - Metrics
  - Progress bars

No manual refresh allowed.

-----------------------------------
📤 5. EXPORT ACCURACY (CRITICAL)
-----------------------------------

- Charts and progress bars must export EXACTLY as rendered

Requirements:
- High resolution (300 DPI)
- No pixel distortion
- No canvas blur

Use:
- SVG-based rendering preferred (for charts)
- Puppeteer for export accuracy

-----------------------------------
🧱 6. DATA STRUCTURE UPDATE
-----------------------------------

Extend JSON schema:

{
  productionSupport: {
    chartData: [...],
    metrics: {...}
  },
  releaseForecast: [
    {
      name: "",
      status: "",
      progress: 75
    }
  ]
}

-----------------------------------
🧪 7. VALIDATION RULES
-----------------------------------

- Prevent invalid inputs:
  - Progress must be 0–100
  - Numeric validation for metrics

- Handle empty states gracefully

-----------------------------------
🎯 FINAL OBJECTIVE
-----------------------------------

Create a fully data-driven system where:

✔ Users can input/edit chart data via table or Excel  
✔ Bar charts auto-generate based on data  
✔ Metrics update dynamically  
✔ Release forecast progress bars reflect exact values  
✔ All visuals are customizable (within design system)  
✔ Export output is pixel-perfect and high-quality  

⚠️ Balance:
- Data & visuals = dynamic
- Layout & structure = consistent