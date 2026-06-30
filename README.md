# Digital Courseware Platform — Clickable Mockup

A static, hardcoded-data prototype of a 3-platform system for coordinating digital courseware license
requests between **lecturers**, a **library admin**, and **book vendors** each financial year
(Apr–Apr) at SP.

This is a **design and flow demo only**. There is no backend, no real database, no real
authentication — everything is wired against a hardcoded JSON object in `shared/data.js`
and persisted to `localStorage` purely so reviewers can click around without losing state
mid-demo. Refreshing the page keeps your changes; clicking "Reset demo data" wipes them
back to the seed state.

## How to view this

### Option A — GitHub Pages (recommended for sharing with colleagues)
1. Push this repo to GitHub.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Visit `https://<your-username>.github.io/<repo-name>/`

### Option B — locally
Just open `index.html` in a browser. No build step, no server. One CDN dependency
(jsPDF, for the costing PDF export) loaded from cdnjs.

## Structure

```
/                   landing page linking to all 3 apps + demo login table
/admin/             admin console (5 tabs: requests, catalogue, vendors, activation check, log)
/lecturer/          lecturer portal (FY tabs, module cards, submit/edit licenses, change log)
/vendor/            vendor portal — placeholder shell only, per current scope
/shared/styles.css  shared design tokens/components, each app sets its own --accent
/shared/data.js     hardcoded "database" + helper functions, loaded by every page
```

Each of the 3 platforms is a fully separate static site (separate `index.html`/login,
separate dashboard). In production each would point at the real Azure Functions API
instead of `shared/data.js`.

## Demo login emails

| Role | Email | What you'll see |
|---|---|---|
| Lecturer | `s.tan@sp.edu.sg` | Sarah Tan (MAD) — a request pending approval (2nd change), one with 1 change used, one not submitted |
| Lecturer | `r.kumar@sp.edu.sg` | Ravi Kumar (MAD) — module DM2045 tagged as legacy |
| Lecturer | `j.lim@sp.edu.sg` | Jeremy Lim (SB) — modules in both FY2025 and FY2026, try the FY tabs |
| Lecturer | `m.ong@sp.edu.sg` | Michelle Ong (SB) — freshly submitted request, no changes made |
| Admin | `kwok_pui_fong@sp.edu.sg` | Kwok Pui Fong — full dashboard access |
| Admin | `Kavery_Tamil_Selven_RAMASWAMY@sp.edu.sg` | Kavery Tamil Selven Ramaswamy — full dashboard access |
| Admin | `LEM_Lei_Kin@sp.edu.sg` | Lem Lei Kin — full dashboard access |
| Admin | `Jennifer_GAN@sp.edu.sg` | Jennifer Gan — full dashboard access |
| Vendor | `contact@pearson.com` | Pearson SG — placeholder uploads screen |
| (any other email) | — | Login rejected, to demonstrate the "not on the list" behaviour |

## What's actually demonstrated here

**Core flow (v1)**
- Email-against-list login for all 3 roles
- The 1-free-change, 2nd-change-needs-approval flow, including the hidden-number "pending" state
- Admin approval screen with full change history and explicit revert-on-reject
- Vendor list → library catalogue converter with column mapping and preview
- Multi-book-per-module support
- Critical-only change log, filterable by role
- Sample CSV download for lecturers and vendors

**v2**
- Editable book catalogue tab (Title, ISBN/SKU, Author, Module, School, Price), with a
  platform-wide single-editor lock and full before/after change logging. Books are
  enforced unique by ISBN/SKU — every vendor is treated as sole publisher of their titles.
- SP school codes (ABE, CLS, EEE, MAE, SMA, SB, SoC, MAD, LSC) and `sp.edu.sg` emails.
- "Manage admins" panel, separate from lecturer/vendor access, with a guard against
  removing the last active admin.
- Financial year tabs (Apr–Apr) on lecturer and admin dashboards, admin-controlled.
- Legacy module tagging with a note; tagged modules stay visible with a badge.
- Activation reconciliation, auto-matched by student email, with a saved report log.
- Costing tabulation with a copy-to-clipboard approval email and PDF export.

**v3 (this round)**
- **Upload vendor list via fixed Excel template** — a second upload path alongside the
  existing CSV upload, both landing in the same Vendor list tab ready to convert. The
  fixed-template approach means no column mapping is needed once vendors are using it
  consistently (the freeform CSV path still goes through the mapping converter).
- **Activation check now lists every requested book** for the active FY, with a clear
  "Lecturer uploaded? / Vendor uploaded?" status per book, rather than a dropdown that
  only showed books with an existing lecturer upload. The "Run check" button is disabled
  until both sides have uploaded.
- **New admin "Modules" tab** — view all modules for the FY, with lecturer, school,
  semester, and a one-click "Tag legacy" / "Unflag" action (prompts for a reason, logs it).
- **Lecturers can tag their own modules as legacy** — a "Tag as legacy" button now sits
  on every module card in the lecturer portal. Doing so notifies admin and is recorded in
  the change log with the lecturer as actor, distinguishing it from admin-initiated tags.
- **Four real named admin users**: Kwok Pui Fong, Kavery Tamil Selven Ramaswamy, Lem Lei
  Kin, and Jennifer Gan.
- **Procurement costing with auto-calculated 5% markup** — the Costing & submission modal
  now shows vendor unit price, projected licenses, the auto-calculated amount (price ×
  licenses × 1.05), and an editable "Final" field admin can override; overrides are
  change-logged with old vs new amount. The approval email and PDF both use whichever
  final amount is in effect (auto or overridden).

**v4 (this round)**
- **Delete activation check reports** — each report in the report log now has a Delete
  button (with a confirm prompt) so stale or test checks can be cleared out; the deletion
  itself is change-logged with a snapshot of what was deleted.
- **Upload books directly to the catalogue via CSV** — alongside the vendor-list upload
  path, admin can now bulk-add books straight into the catalogue tab via a CSV upload,
  skipping the vendor-list-then-convert step entirely. Same fixed-template idea, same
  duplicate-by-ISBN/SKU protection.
- **All uploads restricted to CSV** — every upload path (vendor list, vendor CSV template,
  catalogue CSV upload) now only accepts `.csv` files; choosing an `.xlsx`/`.xls` file is
  rejected client-side with a message asking the user to save as CSV first. The earlier
  "fixed Excel template" language has been renamed to "fixed CSV template" throughout.
- **Original price column added to Costing & submission**, shown before the markup/extra
  columns so the unmarked-up vendor price is always visible alongside the final figure.
- **+5% markup is now a checkbox, with a mutually exclusive "extra licenses" override**:
  ticking the box applies the standard 5% markup to projected licenses (and resets/disables
  the extra-licenses field); unticking it (or typing a number into extra licenses) switches
  to costing at base price × (projected + extra licenses), with no markup. The "Final
  amount" field still allows a direct manual override on top of either mode. The
  approval email and PDF both show which basis (+5% or +N extra) was used per book.

The procurement flow this is built around: lecturer talks to a vendor about what books
are needed and shares the module code → vendor sends curation the pricelist and book
details → curation asks lecturers to project license counts → library team costs each
book at vendor price + 5% of the projected amount → that costing goes up for purchase
approval → after purchase, lecturer confirms final license numbers (3 weeks post-semester,
counted as one of their 2 allowed changes) → both vendor and lecturer upload verification
lists → library staff reconcile the two, matched by student email.

## What's intentionally NOT built yet

- Real authentication (Azure AD / session tokens) — see main technical spec
- Real file upload parsing — buttons show toast messages instead of processing files
- Vendor activation-status comparison logic — flagged as "Keep in View" in the brief;
  the reconciliation tab on the admin side demonstrates the matching logic against
  hardcoded sample data, but the vendor's own upload screen is still a shell
- Email notifications (Logic Apps) — represented only as in-app notification records
- Real Excel master list import — `modules` and `userAccess` are seeded by hand
- Multi-editor conflict resolution beyond the simple single-lock pattern (e.g. lock
  timeouts if an admin closes their browser mid-edit)

## Open question carried over

Whether the book catalogue should be scoped per financial year (current behaviour) or be
one running catalogue reused across years — currently built as per-FY, pending
confirmation with your colleagues.

## Next step

Once this is reviewed internally, the plan is to rebuild this against:
- **Azure Static Web Apps** ×3 (one per platform)
- **Azure Functions** (shared backend API)
- **Azure SQL Database** (replacing `shared/data.js`)
- **Azure Blob Storage** (CSV uploads)
- **Logic Apps** (email notifications)

See the project's technical spec doc for the full schema and resource list.
