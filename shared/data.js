/* ===========================================================
   MOCK DATA LAYER (v2)
   Simulates the Azure SQL database for this static demo.
   In production this entire file is replaced by calls to
   the Azure Functions API. Data resets on every page reload
   (read from localStorage if present, else falls back to
   the seed data below, so reviewers can poke at it without
   losing state between tabs in the same session).
=========================================================== */

const STORAGE_KEY = "booklist_demo_state_v3";

const SCHOOLS = ["ABE", "CLS", "EEE", "MAE", "SMA", "SB", "SoC", "MAD", "LSC"];

// Financial year runs Apr -> Apr. FY"N" = 1 Apr (N-1) to 31 Mar (N), labelled by the year it ends in,
// matching common SG institutional convention (adjust if your colleagues use the other convention).
const FINANCIAL_YEARS = ["FY2025", "FY2026", "FY2027"];

// Library admin verifies the projected-licenses + markup costing line and can override it.
const PROCUREMENT_MARKUP_PCT = 5;

const SEED_DATA = {

  // ---- who is allowed to log in, and as what role ----
  userAccess: [
    { email: "s.tan@sp.edu.sg", role: "lecturer", school: "MAD", name: "Sarah Tan", isActive: true },
    { email: "r.kumar@sp.edu.sg", role: "lecturer", school: "MAD", name: "Ravi Kumar", isActive: true },
    { email: "j.lim@sp.edu.sg", role: "lecturer", school: "SB", name: "Jeremy Lim", isActive: true },
    { email: "m.ong@sp.edu.sg", role: "lecturer", school: "SB", name: "Michelle Ong", isActive: true },
    { email: "kwok_pui_fong@sp.edu.sg", role: "admin", school: null, name: "Kwok Pui Fong", isActive: true },
    { email: "Kavery_Tamil_Selven_RAMASWAMY@sp.edu.sg", role: "admin", school: null, name: "Kavery Tamil Selven Ramaswamy", isActive: true },
    { email: "LEM_Lei_Kin@sp.edu.sg", role: "admin", school: null, name: "Lem Lei Kin", isActive: true },
    { email: "Jennifer_GAN@sp.edu.sg", role: "admin", school: null, name: "Jennifer Gan", isActive: true },
    { email: "contact@pearson.com", role: "vendor", school: null, name: "Pearson SG", isActive: true },
    { email: "orders@mcgrawhill.com", role: "vendor", school: null, name: "McGraw Hill", isActive: true },
    { email: "sales@cengage.com", role: "vendor", school: null, name: "Cengage Learning", isActive: false }
  ],

  // ---- master list: modules per lecturer, per semester, per FY ----
  modules: [
    { id: "mod-1", moduleCode: "DM2031", moduleName: "Intro to Digital Fabrication", school: "MAD", semester: "Sem 2", academicYear: "FY2026", lecturerEmail: "s.tan@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-2", moduleCode: "DM2090", moduleName: "Materials and Processes", school: "MAD", semester: "Sem 2", academicYear: "FY2026", lecturerEmail: "s.tan@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-3", moduleCode: "DM2112", moduleName: "Capstone Studio", school: "MAD", semester: "Sem 2", academicYear: "FY2026", lecturerEmail: "s.tan@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-4", moduleCode: "DM2045", moduleName: "Visual Communication Theory", school: "MAD", semester: "Sem 1", academicYear: "FY2026", lecturerEmail: "r.kumar@sp.edu.sg", isLegacy: true, legacyNote: "Replaced by DM2046 (Visual Comm & Media Theory) from FY2027", legacyTaggedBy: "admin" },
    { id: "mod-5", moduleCode: "BZ1010", moduleName: "Principles of Marketing", school: "SB", semester: "Sem 1", academicYear: "FY2026", lecturerEmail: "j.lim@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-6", moduleCode: "BZ2210", moduleName: "Financial Accounting II", school: "SB", semester: "Sem 2", academicYear: "FY2026", lecturerEmail: "m.ong@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-7", moduleCode: "DM1020", moduleName: "Foundations of Design", school: "MAD", semester: "Sem 1", academicYear: "FY2025", lecturerEmail: "s.tan@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null },
    { id: "mod-8", moduleCode: "BZ1005", moduleName: "Business Communication", school: "SB", semester: "Sem 2", academicYear: "FY2025", lecturerEmail: "j.lim@sp.edu.sg", isLegacy: false, legacyNote: null, legacyTaggedBy: null }
  ],

  // ---- book requests: 1 or more books per module ----
  // procurementOverride: if set, admin's manually-overridden final costing amount for this book (replaces auto 5% markup calc)
  bookRequests: [
    {
      id: "req-1", moduleId: "mod-1", bookTitle: "Design Thinking 101", author: "A. Reyes", edition: "3rd ed.",
      isbn: "978-1-234567-01-1", price: 48.00, projectedLicenses: 35, verifiedLicenses: null,
      lastApprovedValue: 22, changeCount: 2, status: "pending_approval", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 30, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2026-04-02T09:10:00", requiresApproval: false, approvalStatus: "n/a" },
        { action: "Change 1 (notified only)", value: 22, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2026-04-18T11:32:00", requiresApproval: false, approvalStatus: "n/a" },
        { action: "Change 2 (awaiting approval)", value: 35, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2026-06-29T09:14:00", requiresApproval: true, approvalStatus: "pending" }
      ]
    },
    {
      id: "req-2", moduleId: "mod-2", bookTitle: "Materials Science Basics", author: "K. Wong", edition: "3rd ed.",
      isbn: "978-1-234567-04-5", price: 52.50, projectedLicenses: 15, verifiedLicenses: null,
      lastApprovedValue: 15, changeCount: 1, status: "one_change_used", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 18, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2026-04-03T10:00:00", requiresApproval: false, approvalStatus: "n/a" },
        { action: "Change 1 (notified only)", value: 15, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2026-04-20T08:45:00", requiresApproval: false, approvalStatus: "n/a" }
      ]
    },
    {
      id: "req-3", moduleId: "mod-2", bookTitle: "Practical Fabrication Workbook", author: "A. Reyes", edition: "1st ed.",
      isbn: "978-1-234567-09-0", price: 36.00, projectedLicenses: null, verifiedLicenses: null,
      lastApprovedValue: null, changeCount: 0, status: "not_submitted", procurementOverride: null, markupEnabled: true, extraLicenses: 0, history: []
    },
    {
      id: "req-4", moduleId: "mod-3", bookTitle: "Capstone Project Management Guide", author: "T. Foo", edition: "2nd ed.",
      isbn: "978-1-234567-11-3", price: 44.00, projectedLicenses: null, verifiedLicenses: null,
      lastApprovedValue: null, changeCount: 0, status: "not_submitted", procurementOverride: null, markupEnabled: true, extraLicenses: 0, history: []
    },
    {
      id: "req-5", moduleId: "mod-4", bookTitle: "Visual Communication: Theory and Practice", author: "L. Cheng", edition: "4th ed.",
      isbn: "978-1-234567-15-1", price: 39.90, projectedLicenses: 28, verifiedLicenses: 28,
      lastApprovedValue: 28, changeCount: 0, status: "verified", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 28, actor: "r.kumar@sp.edu.sg", role: "lecturer", timestamp: "2026-01-15T09:00:00", requiresApproval: false, approvalStatus: "n/a" },
        { action: "Verification (3 weeks post-semester)", value: 28, actor: "r.kumar@sp.edu.sg", role: "lecturer", timestamp: "2026-02-10T14:20:00", requiresApproval: false, approvalStatus: "n/a" }
      ]
    },
    {
      id: "req-6", moduleId: "mod-5", bookTitle: "Principles of Marketing, Asia Edition", author: "P. Kotler", edition: "16th ed.",
      isbn: "978-1-234567-20-5", price: 65.00, projectedLicenses: 60, verifiedLicenses: null,
      lastApprovedValue: 60, changeCount: 0, status: "submitted", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 60, actor: "j.lim@sp.edu.sg", role: "lecturer", timestamp: "2026-01-20T13:00:00", requiresApproval: false, approvalStatus: "n/a" }
      ]
    },
    {
      id: "req-7", moduleId: "mod-6", bookTitle: "Financial Accounting: Tools for Business Decision Making", author: "P. Kimmel", edition: "9th ed.",
      isbn: "978-1-234567-25-0", price: 58.50, projectedLicenses: 40, verifiedLicenses: null,
      lastApprovedValue: 40, changeCount: 0, status: "submitted", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 40, actor: "m.ong@sp.edu.sg", role: "lecturer", timestamp: "2026-04-05T16:40:00", requiresApproval: false, approvalStatus: "n/a" }
      ]
    },
    {
      id: "req-8", moduleId: "mod-7", bookTitle: "Foundations of Design Thinking", author: "R. Goh", edition: "1st ed.",
      isbn: "978-1-234567-30-4", price: 41.00, projectedLicenses: 25, verifiedLicenses: 24,
      lastApprovedValue: 25, changeCount: 0, status: "verified", procurementOverride: null, markupEnabled: true, extraLicenses: 0,
      history: [
        { action: "Original submission", value: 25, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2025-04-10T09:00:00", requiresApproval: false, approvalStatus: "n/a" },
        { action: "Verification (3 weeks post-semester)", value: 24, actor: "s.tan@sp.edu.sg", role: "lecturer", timestamp: "2025-05-02T10:00:00", requiresApproval: false, approvalStatus: "n/a" }
      ]
    }
  ],

  // ---- vendors and their raw uploaded lists (all vendors = publishers; no duplicate books across vendors) ----
  vendors: [
    { id: "v-1", name: "Pearson SG", contactEmail: "contact@pearson.com", isActive: true },
    { id: "v-2", name: "McGraw Hill", contactEmail: "orders@mcgrawhill.com", isActive: true },
    { id: "v-3", name: "Cengage Learning", contactEmail: "sales@cengage.com", isActive: false }
  ],

  vendorLists: [
    { id: "vl-1", vendorId: "v-1", vendorName: "Pearson SG", fileName: "pearson_q3.csv", uploadedAt: "2026-06-27T10:00:00", status: "not_converted", rowCount: 18, uploadedVia: "csv" },
    { id: "vl-2", vendorId: "v-2", vendorName: "McGraw Hill", fileName: "mgh_list_jun.csv", uploadedAt: "2026-06-22T15:30:00", status: "converted", rowCount: 24, uploadedVia: "fixed_csv_template", convertedAt: "2026-06-23T09:00:00", convertedBy: "kwok_pui_fong@sp.edu.sg" },
    { id: "vl-3", vendorId: "v-1", vendorName: "Pearson SG", fileName: "pearson_activation_status.csv", uploadedAt: "2026-06-29T08:00:00", status: "activation_upload", rowCount: 22, uploadedVia: "csv" }
  ],

  // ---- the admin-managed book catalogue (single source of truth; unique books, one vendor each) ----
  // status: "draft" (just imported) | "live" (in use)
  // lockedBy: email of admin currently editing this row, or null (only 1 editor at a time, platform-wide)
  libraryBooks: [
    { id: "b-1", vendorId: "v-2", moduleId: "mod-1", school: "MAD", academicYear: "FY2026", isbn: "978-1-234567-01-1", title: "Design Thinking 101", author: "A. Reyes", price: 48.00, importedFrom: "mgh_list_jun.csv", status: "live", lockedBy: null, lastEditedBy: "kwok_pui_fong@sp.edu.sg", lastEditedAt: "2026-06-23T09:00:00" },
    { id: "b-2", vendorId: "v-2", moduleId: "mod-2", school: "MAD", academicYear: "FY2026", isbn: "978-1-234567-04-5", title: "Materials Science Basics", author: "K. Wong", price: 52.50, importedFrom: "mgh_list_jun.csv", status: "live", lockedBy: null, lastEditedBy: "kwok_pui_fong@sp.edu.sg", lastEditedAt: "2026-06-23T09:00:00" },
    { id: "b-3", vendorId: "v-1", moduleId: "mod-5", school: "SB", academicYear: "FY2026", isbn: "978-1-234567-20-5", title: "Principles of Marketing, Asia Edition", author: "P. Kotler", price: 65.00, importedFrom: "manual entry", status: "live", lockedBy: null, lastEditedBy: "Jennifer_GAN@sp.edu.sg", lastEditedAt: "2026-05-10T14:00:00" }
  ],

  // ---- lecturer-submitted verification lists (per the sample CSV template) ----
  verificationUploads: [
    {
      id: "vu-1", bookRequestId: "req-1", moduleId: "mod-1", uploadedBy: "s.tan@sp.edu.sg", uploadedAt: "2026-06-20T10:00:00",
      students: [
        { name: "Wong Jia Hui", email: "student01@sp.edu.sg" },
        { name: "Muhammad Faiz Bin Rahman", email: "student02@sp.edu.sg" },
        { name: "Priya Nair", email: "student03@sp.edu.sg" },
        { name: "Chen Wei Ming", email: "student04@sp.edu.sg" }
      ]
    },
    {
      id: "vu-2", bookRequestId: "req-6", moduleId: "mod-5", uploadedBy: "j.lim@sp.edu.sg", uploadedAt: "2026-06-25T09:30:00",
      students: [
        { name: "Tan Mei Ling", email: "student06@sp.edu.sg" },
        { name: "Lucas Soh", email: "student07@sp.edu.sg" }
      ]
    }
  ],

  activationRecords: [
    { studentEmail: "student01@sp.edu.sg", studentName: "Wong Jia Hui", bookTitle: "Design Thinking 101", vendorName: "Pearson SG", activated: true },
    { studentEmail: "student02@sp.edu.sg", studentName: "Muhammad Faiz Bin Rahman", bookTitle: "Design Thinking 101", vendorName: "Pearson SG", activated: true },
    { studentEmail: "student03@sp.edu.sg", studentName: "Priya Nair", bookTitle: "Design Thinking 101", vendorName: "Pearson SG", activated: false },
    { studentEmail: "student05@sp.edu.sg", studentName: "Unknown Extra Student", bookTitle: "Design Thinking 101", vendorName: "Pearson SG", activated: true }
  ],

  // ---- reconciliation reports (generated by admin running the checklist) ----
  reconciliationReports: [
    {
      id: "rec-1", moduleId: "mod-1", bookRequestId: "req-1", generatedBy: "kwok_pui_fong@sp.edu.sg", generatedAt: "2026-06-29T11:00:00",
      matchedCount: 2, notActivatedCount: 1, notOnLecturerListCount: 1,
      details: [
        { studentEmail: "student01@sp.edu.sg", studentName: "Wong Jia Hui", onLecturerList: true, activatedByVendor: true, status: "matched" },
        { studentEmail: "student02@sp.edu.sg", studentName: "Muhammad Faiz Bin Rahman", onLecturerList: true, activatedByVendor: true, status: "matched" },
        { studentEmail: "student03@sp.edu.sg", studentName: "Priya Nair", onLecturerList: true, activatedByVendor: false, status: "not_activated" },
        { studentEmail: "student04@sp.edu.sg", studentName: "Chen Wei Ming", onLecturerList: true, activatedByVendor: false, status: "not_activated" },
        { studentEmail: "student05@sp.edu.sg", studentName: "Unknown Extra Student", onLecturerList: false, activatedByVendor: true, status: "not_on_lecturer_list" }
      ]
    }
  ],

  // ---- notifications (admin inbox) ----
  notifications: [
    { id: "n-1", recipientRole: "admin", message: "Sarah Tan changed license count for DM2031 — Design Thinking 101 (2nd change, requires approval)", relatedId: "req-1", requiresAction: true, isRead: false, timestamp: "2026-06-29T09:14:00" },
    { id: "n-2", recipientRole: "admin", message: "Sarah Tan changed license count for DM2090 — Materials Science Basics (1st change, FYI only)", relatedId: "req-2", requiresAction: false, isRead: false, timestamp: "2026-04-20T08:45:00" },
    { id: "n-3", recipientRole: "admin", message: "Jeremy Lim submitted projected licenses for BZ1010 — Principles of Marketing", relatedId: "req-6", requiresAction: false, isRead: true, timestamp: "2026-01-20T13:00:00" },
    { id: "n-4", recipientRole: "admin", message: "Pearson SG uploaded a new vendor list: pearson_q3.csv", relatedId: "vl-1", requiresAction: true, isRead: false, timestamp: "2026-06-27T10:00:00" },
    { id: "n-5", recipientRole: "admin", message: "Pearson SG uploaded activation status: pearson_activation_status.csv", relatedId: "vl-3", requiresAction: false, isRead: false, timestamp: "2026-06-29T08:00:00" }
  ],

  // ---- full change log (critical actions only, all roles) ----
  changeLog: [
    { id: "cl-1", entityType: "BookRequest", entityId: "req-1", actor: "s.tan@sp.edu.sg", role: "lecturer", action: "Submitted projected licenses", oldValue: null, newValue: "30", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-04-02T09:10:00" },
    { id: "cl-2", entityType: "BookRequest", entityId: "req-1", actor: "s.tan@sp.edu.sg", role: "lecturer", action: "Changed projected licenses (change 1 of 2)", oldValue: "30", newValue: "22", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-04-18T11:32:00" },
    { id: "cl-3", entityType: "BookRequest", entityId: "req-1", actor: "s.tan@sp.edu.sg", role: "lecturer", action: "Changed projected licenses (change 2 of 2)", oldValue: "22", newValue: "35", requiresApproval: true, approvalStatus: "pending", timestamp: "2026-06-29T09:14:00" },
    { id: "cl-4", entityType: "BookRequest", entityId: "req-2", actor: "s.tan@sp.edu.sg", role: "lecturer", action: "Changed projected licenses (change 1 of 2)", oldValue: "18", newValue: "15", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-04-20T08:45:00" },
    { id: "cl-5", entityType: "BookRequest", entityId: "req-5", actor: "r.kumar@sp.edu.sg", role: "lecturer", action: "Verified license count", oldValue: "28", newValue: "28", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-02-10T14:20:00" },
    { id: "cl-6", entityType: "VendorList", entityId: "vl-2", actor: "kwok_pui_fong@sp.edu.sg", role: "admin", action: "Converted vendor list to library format", oldValue: "mgh_list_jun.csv (raw)", newValue: "24 books imported, tagged to modules", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-06-23T09:00:00" },
    { id: "cl-7", entityType: "UserAccess", entityId: "r.kumar@sp.edu.sg", actor: "kwok_pui_fong@sp.edu.sg", role: "admin", action: "Added lecturer access", oldValue: null, newValue: "r.kumar@sp.edu.sg (MAD)", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-06-15T16:02:00" },
    { id: "cl-8", entityType: "UserAccess", entityId: "sales@cengage.com", actor: "kwok_pui_fong@sp.edu.sg", role: "admin", action: "Deactivated vendor access", oldValue: "active", newValue: "inactive", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-05-30T11:00:00" },
    { id: "cl-9", entityType: "VendorList", entityId: "vl-3", actor: "contact@pearson.com", role: "vendor", action: "Uploaded activation status list", oldValue: null, newValue: "pearson_activation_status.csv (22 rows)", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-06-29T08:00:00" },
    { id: "cl-10", entityType: "Module", entityId: "mod-4", actor: "Jennifer_GAN@sp.edu.sg", role: "admin", action: "Tagged module as legacy", oldValue: "active", newValue: "legacy — Replaced by DM2046 (Visual Comm & Media Theory) from FY2027", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-06-10T13:00:00" },
    { id: "cl-11", entityType: "ReconciliationReport", entityId: "rec-1", actor: "kwok_pui_fong@sp.edu.sg", role: "admin", action: "Ran activation reconciliation for DM2031 — Design Thinking 101", oldValue: null, newValue: "2 matched, 1 not activated, 1 not on lecturer list", requiresApproval: false, approvalStatus: "n/a", timestamp: "2026-06-29T11:00:00" }
  ],

  // ---- platform settings (admin-configurable) ----
  settings: {
    maxChangesAllowed: 2,
    verificationWindowWeeks: 3,
    currentAcademicYear: "FY2026",
    notifyAdminOnFirstChange: true,
    notifyAdminOnSecondChange: true,
    requireApprovalAtChange: 2
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const fresh = JSON.parse(JSON.stringify(SEED_DATA));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetDemoData() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// expose a single in-memory DB object for the app pages to use
const DB = loadState();

function persist() { saveState(DB); }

function findUserByEmail(email) {
  return DB.userAccess.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
}

function getModulesForLecturer(email, fy) {
  return DB.modules.filter(m => m.lecturerEmail === email && (!fy || m.academicYear === fy));
}

function getRequestsForModule(moduleId) {
  return DB.bookRequests.filter(r => r.moduleId === moduleId);
}

function getModuleById(id) {
  return DB.modules.find(m => m.id === id);
}

function getModulesForFY(fy) {
  return DB.modules.filter(m => m.academicYear === fy);
}

function getBookRequestsForFY(fy) {
  const moduleIds = getModulesForFY(fy).map(m => m.id);
  return DB.bookRequests.filter(r => moduleIds.includes(r.moduleId));
}

// has the LECTURER uploaded a verification (student) list for this book request?
function lecturerHasUploadedFor(bookRequestId) {
  return DB.verificationUploads.some(vu => vu.bookRequestId === bookRequestId);
}

// has a VENDOR uploaded activation status for this book title?
// (matched by title since activationRecords aren't keyed to a specific bookRequestId in this demo data shape)
function vendorHasUploadedFor(bookTitle) {
  return DB.activationRecords.some(a => a.bookTitle === bookTitle);
}

// Procurement costing line for a book request.
// Mutually exclusive: either the 5% markup applies to projected licenses,
// or admin types extra licenses (added at base price, no markup) — never both.
// procurementOverride (legacy field) still wins if explicitly set, for backward compatibility.
function calcProcurementAmount(req) {
  if (req.procurementOverride !== null && req.procurementOverride !== undefined) {
    return req.procurementOverride;
  }
  const licenses = req.projectedLicenses || 0;
  const price = req.price || 0;
  const extra = req.extraLicenses || 0;

  if (req.markupEnabled) {
    return price * licenses * (1 + PROCUREMENT_MARKUP_PCT / 100);
  }
  return price * (licenses + extra);
}

function nowISO() {
  return new Date().toISOString();
}

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' });
}

function fmtDateShort(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'short' });
}

function fmtMoney(n) {
  if (n === null || n === undefined) return "—";
  return "$" + n.toFixed(2);
}
