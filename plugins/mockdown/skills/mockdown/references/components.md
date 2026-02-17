# Mockdown ASCII Component Library

Use these exact patterns when building wireframes. All components use box-drawing characters and fixed-width alignment. The output must look correct in a monospace terminal/markdown code block.

---

## Core Characters

- Borders: `┌ ┐ └ ┘ ─ │ ├ ┤ ┬ ┴ ┼`
- Fills: `█ ░ ▓ ▒`
- Bullets: `*` (use ASCII asterisk for reliable width)
- Arrows/indicators: `v ^ > < *` (use ASCII for reliable width)
- Checkbox: `[x]` (checked), `[ ]` (unchecked)
- Radio: `(●)` (selected), `( )` (unselected)
- Toggle: `[●━━━]` (on), `[━━━●]` (off)

---

## Primitives (Basics)

These are the foundational drawing elements. Combine them to build any custom component.

### Text

Free-floating labels, headings, or paragraph text. Just place it directly — no border needed.

```
  Page Title

  Some descriptive body text goes here.
  It can span multiple lines.
```

### Box

A generic rectangular container. Use for any custom component not covered below.

```
┌──────────────────────────┐
│                          │
│                          │
│                          │
└──────────────────────────┘
```

### Line

Horizontal or vertical separators to divide sections.

```
────────────────────────────────    (horizontal)

│                                   (vertical)
│
│
```

### Arrow

Directional indicators for flows, pointers, or connections.

```
──────►          (right)
◄──────          (left)
                 (down)
  │
  │
  ▼

  ▲              (up)
  │
  │
```

Use arrows to indicate user flows, data direction, or navigation between screens.

---

## UI Elements

---

## Navigation Bar

```
┌──────────┬──────────────┬────┬───────┬───────────────┐
│   Logo   │  Dashboard   │ [  │ Add ] │   [ Profile ] │
├──────────┴──────────────┴────┴───────┴───────────────┤
│  Home    Analytics    Reports    Settings   Log Out  │
└──────────────────────────────────────────────────────┘
```

## Button

```
[ Submit ]    [ Cancel ]    [+ Add New ]
```

Variants:
```
[ Primary Action ]     (standard)
[► Play ]              (with icon)
```

## Input Field

```
┌─ Label ──────────────────────┐
│  Placeholder text...         │
└──────────────────────────────┘
```

Or inline:
```
Email:  [ user@example.com         ]
```

## Search Box

```
[ Search...                       ]
```

## Dropdown / Select

```
[▼ Select option  ]
```

Expanded:
```
┌──────────────────┐
│ Option 1         │
│ Option 2         │
│ Option 3         │
└──────────────────┘
```

## Card

```
┌──────────────────────┐
│  Card Title          │
│──────────────────────│
│                      │
│  Card content here   │
│                      │
└──────────────────────┘
```

With status indicator:
```
┌──────────────────────┐
│  Card Title          │
│──────────────────────│
│  ● Value             │
└──────────────────────┘
```

## Metric / Stat Card

```
┌──────────────────────┐
│  Metric Label        │
│                      │
│       1,234          │
│      +12%            │
└──────────────────────┘
```

## Table

```
┌────────────┬────────────┬────────────┬─────────┐
│  Name      │  Role      │  Status    │  Action │
├────────────┼────────────┼────────────┼─────────┤
│  Alice     │  Admin     │  Active    │ [ Edit ]│
│  Bob       │  User      │  Inactive  │ [ Edit ]│
│  Carol     │  Editor    │  Active    │ [ Edit ]│
└────────────┴────────────┴────────────┴─────────┘
```

## Modal / Dialog

Basic modal:

```
┌─────────────────────────────────────┐
│  Dialog Title                    X  │
│─────────────────────────────────────│
│                                     │
│  Are you sure you want to delete    │
│  this item? This cannot be undone.  │
│                                     │
│          [ Cancel ]  [ Delete ]     │
└─────────────────────────────────────┘
```

With backdrop overlay (use `░` to show dimmed background behind the modal):

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░┌─────────────────────────────────────┐░░░░░░░░░░░░░
░░░░░░░░░│  Delete Item                     X  │░░░░░░░░░░░░░
░░░░░░░░░│─────────────────────────────────────│░░░░░░░░░░░░░
░░░░░░░░░│                                     │░░░░░░░░░░░░░
░░░░░░░░░│  Are you sure you want to delete    │░░░░░░░░░░░░░
░░░░░░░░░│  this item? This cannot be undone.  │░░░░░░░░░░░░░
░░░░░░░░░│                                     │░░░░░░░░░░░░░
░░░░░░░░░│          [ Cancel ]  [ Delete ]     │░░░░░░░░░░░░░
░░░░░░░░░└─────────────────────────────────────┘░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

Use the backdrop version when showing a modal overlaying a page to convey that the background is dimmed/disabled. You can also show the actual page content behind it using lighter characters:

```
░░Logo░░░░Dashboard░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░┌─────────────────────────────────────┐░░░░░░░░░░░░░
░░░░░░░░░│  Confirm Action                  X  │░░░░░░░░░░░░░
░░░░░░░░░│─────────────────────────────────────│░░░░░░░░░░░░░
░░░░░░░░░│                                     │░░░░░░░░░░░░░
░░░░░░░░░│  Save changes before leaving?       │░░░░░░░░░░░░░
░░░░░░░░░│                                     │░░░░░░░░░░░░░
░░░░░░░░░│    [ Discard ]  [ Cancel ]  [ Save ]│░░░░░░░░░░░░░
░░░░░░░░░└─────────────────────────────────────┘░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

## Tabs

```
┌────────┐
│  Tab 1 │  Tab 2    Tab 3    Tab 4
├────────┴────────────────────────────┐
│                                     │
│  Tab content area                   │
│                                     │
└─────────────────────────────────────┘
```

## Sidebar Navigation

```
┌──────────────┐
│  Nav         │
│              │
│  * Link 1    │
│  * Link 2    │
│  * Link 3    │
│  * Link 4    │
│  * Link 5    │
│              │
└──────────────┘
```

## Breadcrumb

```
Home  ›  Products  ›  Category  ›  Item
```

## Pagination

```
[ < ]  1  2  [3]  4  5  ...  20  [ > ]
```

## Progress Bar

```
Progress: [████████████░░░░░░░░] 60%
```

## Activity Feed / List

```
┌─────────────────────────────────────────┐
│  Activity Feed                          │
│                                         │
│  * User X updated Card 1      2m ago    │
│  * User Y commented on Report 5m ago    │
│  * Backup completed          10m ago    │
│  * User Z exported data      12m ago    │
│  * ...                                  │
└─────────────────────────────────────────┘
```

## Chart / Graph Placeholder

```
┌─────────────────────────────────────────┐
│  Chart Title                            │
│                                         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                         │
└─────────────────────────────────────────┘
```

Or bar chart:
```
  Revenue
  Q1  ████████████████  $40k
  Q2  ████████████████████  $50k
  Q3  ██████████████  $35k
  Q4  ████████████████████████  $60k
```

## Image / Media Placeholder

```
┌──────────────────────────┐
│                          │
│      [ Image / Icon ]    │
│                          │
└──────────────────────────┘
```

## Form Layout

```
┌─ Name ───────────────────────────┐
│  John Doe                        │
└──────────────────────────────────┘

┌─ Email ──────────────────────────┐
│  john@example.com                │
└──────────────────────────────────┘

┌─ Role ───────────────────────────┐
│  [▼ Select role  ]               │
└──────────────────────────────────┘

[x] I agree to terms
[ ] Subscribe to newsletter

            [ Cancel ]  [ Submit ]
```

## Split Panel / Layout

Use `│` to separate columns:

```
┌──────────────┬───────────────────────────────────────┐
│  Sidebar     │  Main Content                         │
│              │                                       │
│  * Item 1    │  Content goes here...                 │
│  * Item 2    │                                       │
│  * Item 3    │                                       │
└──────────────┴───────────────────────────────────────┘
```

## Toast / Notification

```
┌──────────────────────────────────┐
│  ✓ Changes saved successfully    │
└──────────────────────────────────┘
```

## Filter Bar

```
[▼ Date ]  [▼ Region]  [ Search...          ]  [ Apply ]
```

---

## Alignment Templates & Formulas

### Padding Formula
```
inner_content_width = target_width - 2 (borders) - padding
padding_spaces = target_width - content_length - 2
```

### Single Line Content
For content that fits on one line:
```
┌─[ target_width chars total ]───┐
│ Left content      Right pad    │
└────────────────────────────────┘
Padding = target_width - content_length - 2
```

Example (target = 30, content = "Title"):
```
┌────────────────────────────┐
│ Title                      │  (30 - 5 - 2 = 23 spaces)
└────────────────────────────┘
```

### Multi-Line Content
Each line must maintain the same total width:
```
┌─[ 37 chars total ]──────────────┐
│ This is a longer line of text   │
│ that needs to wrap and still    │
│ maintain perfect alignment      │
└─────────────────────────────────┘
```

### Nested Components
Calculate widths hierarchically:
```
Outer container: 60 chars
  └─ Inner container A: 28 chars (fits inside outer)
  └─ Inner container B: 28 chars (fits inside outer)
  └─ Gap between: 1 char
  └─ Padding: 1 left

  Total: 1 + 28 + 1 + 28 = 58 inner (+ 2 borders = 60)
```

Example:
```
┌──────────────────────────────────────────────────────────┐
│ ┌──────────────────────────┐ ┌──────────────────────────┐│
│ │ Card 1 Content           │ │ Card 2 Content           ││
│ └──────────────────────────┘ └──────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### Grid Layout Formula
For N columns with G-char gaps:
```
col_width = (main_width - ((N-1) * G)) / N
```

Example: 3 cards in 56-char main area with 2-char gaps:
```
col_width = (56 - 4) / 3 = 17.33 → Use 17, 18, 17 or adjust gaps
```

---

## Common Alignment Pitfalls

### Pitfall 1: Right Border Drift
❌ **WRONG** - Lines have different widths:
```
┌────────────────────────────┐
│ Long text here that extends│
│ Short                     │
│ Another long line of text  │
└────────────────────────────┘
```

✅ **CORRECT** - All lines same width:
```
┌────────────────────────────┐
│ Long text here that extends│
│ Short                      │
│ Another long line of text  │
└────────────────────────────┘
```

### Pitfall 2: Misaligned Table Columns
❌ **WRONG** - Uneven column widths:
```
┌────────┬─────────────┬────────┐
│ Name   │ Email       │ Status │
├────────┼─────────────┼────────┤
│ Alice  │ a@test.com  │ Active │
│ Bob    │ bob@test.com│ Inactive│
└────────┴─────────────┴────────┘
```

✅ **CORRECT** - Uniform column widths:
```
┌──────────┬─────────────┬──────────┐
│ Name     │ Email       │ Status   │
├──────────┼─────────────┼──────────┤
│ Alice    │ a@test.com  │ Active   │
│ Bob      │ bob@test.com│ Inactive │
└──────────┴─────────────┴──────────┘
```

### Pitfall 3: Nested Container Overflow
❌ **WRONG** - Inner box wider than outer:
```
┌────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │ This overflows the parent    │ │
│ └──────────────────────────────┘ │
└────────────────────────────┘
```

✅ **CORRECT** - Inner box fits with padding:
```
┌────────────────────────────┐
│ ┌────────────────────────┐ │
│ │ This fits properly     │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

### Pitfall 4: Multi-line Text Breaking Borders
❌ **WRONG** - Second line shorter:
```
┌────────────────────────────┐
│ This is a very long piece │
│ of text                   │
└────────────────────────────┘
```

✅ **CORRECT** - All lines padded equally:
```
┌────────────────────────────┐
│ This is a very long piece  │
│ of text that wraps nicely  │
└────────────────────────────┘
```

---

## Layout Composition Rules

1. **Always wrap the full wireframe in a markdown code block** (triple backticks)
2. **Use consistent widths** — pick a total width (60-80 chars) and stick to it
3. **Align columns** — use spaces to align content within table cells and grid layouts
4. **Nest components** — cards inside grids, forms inside modals, etc.
5. **Label sections** — use text labels like "Nav", "Sidebar", "Main Content" to clarify layout intent
6. **Use whitespace** — empty lines between sections improve readability
7. **Keep it lo-fi** — this is a wireframe, not a pixel-perfect mockup. Convey structure and hierarchy, not visual design.
