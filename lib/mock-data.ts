// ── Knowledge Base ──────────────────────────────────────────────

export type BuyerStatus = 'Active' | 'Inactive'

export interface BuyerInfo {
  key: string
  buyerId: string
  buyerName: string
  region: string
  entity: string
  status: BuyerStatus
}

export const buyerInfoData: BuyerInfo[] = [
  { key: '1', buyerId: 'BUY-001', buyerName: 'Shopee Singapore Pte Ltd', region: 'SEA', entity: 'SG', status: 'Active' },
  { key: '2', buyerId: 'BUY-002', buyerName: 'Shopee Thailand Co Ltd', region: 'SEA', entity: 'TH', status: 'Active' },
  { key: '3', buyerId: 'BUY-003', buyerName: 'Shopee Vietnam LLC', region: 'SEA', entity: 'VN', status: 'Active' },
  { key: '4', buyerId: 'BUY-004', buyerName: 'Shopee Philippines Inc', region: 'SEA', entity: 'PH', status: 'Active' },
  { key: '5', buyerId: 'BUY-005', buyerName: 'Shopee Malaysia Sdn Bhd', region: 'SEA', entity: 'MY', status: 'Inactive' },
  { key: '6', buyerId: 'BUY-006', buyerName: 'Shopee Indonesia PT', region: 'SEA', entity: 'ID', status: 'Active' },
  { key: '7', buyerId: 'BUY-007', buyerName: 'Sea Taiwan Ltd', region: 'EA', entity: 'TW', status: 'Active' },
  { key: '8', buyerId: 'BUY-008', buyerName: 'Sea Brazil LTDA', region: 'LATAM', entity: 'BR', status: 'Inactive' },
]

export interface SupplierTermDate {
  key: string
  supplierId: string
  supplierName: string
  paymentTerm: string
  dueDateRule: string
  region: string
}

export const supplierTermDateData: SupplierTermDate[] = [
  { key: '1', supplierId: 'SUP-001', supplierName: 'Accenture Pte Ltd', paymentTerm: 'Net 30', dueDateRule: 'Invoice Date + 30 days', region: 'SEA' },
  { key: '2', supplierId: 'SUP-002', supplierName: 'AWS Singapore Pte Ltd', paymentTerm: 'Net 15', dueDateRule: 'Invoice Date + 15 days', region: 'SEA' },
  { key: '3', supplierId: 'SUP-003', supplierName: 'Google Asia Pacific Pte Ltd', paymentTerm: 'Net 45', dueDateRule: 'Invoice Date + 45 days', region: 'SEA' },
  { key: '4', supplierId: 'SUP-004', supplierName: 'Microsoft Thailand Co Ltd', paymentTerm: 'Net 30', dueDateRule: 'Invoice Date + 30 days', region: 'SEA' },
  { key: '5', supplierId: 'SUP-005', supplierName: 'Deloitte Advisory Vietnam', paymentTerm: 'Net 60', dueDateRule: 'Invoice Date + 60 days', region: 'SEA' },
  { key: '6', supplierId: 'SUP-006', supplierName: 'Alibaba Cloud (HK) Ltd', paymentTerm: 'Net 30', dueDateRule: 'Invoice Date + 30 days', region: 'EA' },
  { key: '7', supplierId: 'SUP-007', supplierName: 'Tencent Cloud International', paymentTerm: 'Net 15', dueDateRule: 'Invoice Date + 15 days', region: 'EA' },
  { key: '8', supplierId: 'SUP-008', supplierName: 'Mercado Pago Brasil', paymentTerm: 'Net 30', dueDateRule: 'Invoice Date + 30 days', region: 'LATAM' },
]

export interface SupplierBankAccount {
  key: string
  supplierId: string
  bankName: string
  accountNo: string
  currency: string
  country: string
}

export const supplierBankAccountData: SupplierBankAccount[] = [
  { key: '1', supplierId: 'SUP-001', bankName: 'DBS Bank Singapore', accountNo: '****7821', currency: 'SGD', country: 'Singapore' },
  { key: '2', supplierId: 'SUP-002', bankName: 'OCBC Bank', accountNo: '****3345', currency: 'SGD', country: 'Singapore' },
  { key: '3', supplierId: 'SUP-003', bankName: 'Bangkok Bank PCL', accountNo: '****9012', currency: 'THB', country: 'Thailand' },
  { key: '4', supplierId: 'SUP-004', bankName: 'Kasikorn Bank', accountNo: '****4456', currency: 'THB', country: 'Thailand' },
  { key: '5', supplierId: 'SUP-005', bankName: 'Vietcombank', accountNo: '****6678', currency: 'VND', country: 'Vietnam' },
  { key: '6', supplierId: 'SUP-006', bankName: 'Bank of China (HK)', accountNo: '****1123', currency: 'HKD', country: 'Hong Kong' },
  { key: '7', supplierId: 'SUP-007', bankName: 'CTBC Bank Taiwan', accountNo: '****5590', currency: 'TWD', country: 'Taiwan' },
  { key: '8', supplierId: 'SUP-008', bankName: 'Banco Bradesco SA', accountNo: '****8834', currency: 'BRL', country: 'Brazil' },
]

// ── Case Management ──────────────────────────────────────────────

export type CaseGolden = 'Golden' | 'Non-Golden'
export type InvoiceReviewGroundTruth = 'Pass' | 'Fail'
export type MatchGroundTruth = 'Matched' | 'N/A'
export type APVoucherGroundTruth = 'Submit to EBS' | 'Rejected'

export interface TestCase {
  key: string
  caseId: string
  paymentRequestId: string
  paymentGroupId: string
  invoiceNo: string
  supplierName: string
  region: string
  entity: string
  amount: number
  currency: string
  invoiceDate: string
  updateTime: string
  invoiceReviewGroundTruth: InvoiceReviewGroundTruth
  matchGroundTruth: MatchGroundTruth
  apVoucherGroundTruth: APVoucherGroundTruth
  status: 'Active' | 'Archived'
  isGolden: CaseGolden
  tags: string[]
}

export const auditCaseData: TestCase[] = [
  // ── Active cases ──
  { key: '1', caseId: 'Case-SG-20250105-000001', paymentRequestId: 'PR-001', paymentGroupId: 'PG-001', invoiceNo: 'INV-2025-0001', supplierName: 'Accenture Pte Ltd', region: 'SEA', entity: 'SG', amount: 145000, currency: 'SGD', invoiceDate: '2025-01-05', updateTime: '2025-03-15 14:30', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Golden', tags: ['three-way-match', 'header-check'] },
  { key: '2', caseId: 'Case-SG-20250108-000002', paymentRequestId: 'PR-002', paymentGroupId: 'PG-001', invoiceNo: 'INV-2025-0002', supplierName: 'AWS Singapore Pte Ltd', region: 'SEA', entity: 'SG', amount: 87200, currency: 'SGD', invoiceDate: '2025-01-08', updateTime: '2025-03-15 13:45', invoiceReviewGroundTruth: 'Fail', matchGroundTruth: 'N/A', apVoucherGroundTruth: 'Rejected', status: 'Active', isGolden: 'Golden', tags: ['amount-mismatch'] },
  { key: '3', caseId: 'Case-TH-20250112-000003', paymentRequestId: 'PR-003', paymentGroupId: 'PG-002', invoiceNo: 'INV-2025-0003', supplierName: 'Google Asia Pacific Pte Ltd', region: 'SEA', entity: 'TH', amount: 320000, currency: 'THB', invoiceDate: '2025-01-12', updateTime: '2025-03-14 09:15', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Non-Golden', tags: ['line-item', 'tax-check'] },
  { key: '4', caseId: 'Case-TH-20250115-000004', paymentRequestId: 'PR-004', paymentGroupId: 'PG-002', invoiceNo: 'INV-2025-0004', supplierName: 'Microsoft Thailand Co Ltd', region: 'SEA', entity: 'TH', amount: 215000, currency: 'THB', invoiceDate: '2025-01-15', updateTime: '2025-03-13 16:20', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Golden', tags: ['golden', 'three-way-match'] },
  { key: '5', caseId: 'Case-VN-20250120-000005', paymentRequestId: 'PR-005', paymentGroupId: 'PG-003', invoiceNo: 'INV-2025-0005', supplierName: 'Deloitte Advisory Vietnam', region: 'SEA', entity: 'VN', amount: 98000, currency: 'VND', invoiceDate: '2025-01-20', updateTime: '2025-03-12 11:00', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Non-Golden', tags: ['under-review'] },
  { key: '6', caseId: 'Case-TW-20250201-000006', paymentRequestId: 'PR-006', paymentGroupId: 'PG-004', invoiceNo: 'INV-2025-0006', supplierName: 'Alibaba Cloud (HK) Ltd', region: 'EA', entity: 'TW', amount: 56000, currency: 'TWD', invoiceDate: '2025-02-01', updateTime: '2025-03-11 10:45', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Golden', tags: ['header-check'] },
  { key: '7', caseId: 'Case-TW-20250205-000007', paymentRequestId: 'PR-007', paymentGroupId: 'PG-004', invoiceNo: 'INV-2025-0007', supplierName: 'Tencent Cloud International', region: 'EA', entity: 'TW', amount: 134000, currency: 'TWD', invoiceDate: '2025-02-05', updateTime: '2025-03-10 15:30', invoiceReviewGroundTruth: 'Fail', matchGroundTruth: 'N/A', apVoucherGroundTruth: 'Rejected', status: 'Active', isGolden: 'Non-Golden', tags: ['bank-mismatch', 'amount-mismatch'] },
  { key: '8', caseId: 'Case-BR-20250210-000008', paymentRequestId: 'PR-008', paymentGroupId: 'PG-005', invoiceNo: 'INV-2025-0008', supplierName: 'Mercado Pago Brasil', region: 'LATAM', entity: 'BR', amount: 47000, currency: 'BRL', invoiceDate: '2025-02-10', updateTime: '2025-03-09 12:15', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Golden', tags: ['golden', 'three-way-match'] },
  { key: '9', caseId: 'Case-PH-20250214-000009', paymentRequestId: 'PR-009', paymentGroupId: 'PG-006', invoiceNo: 'INV-2025-0009', supplierName: 'Shopee Philippines Inc', region: 'SEA', entity: 'PH', amount: 290000, currency: 'PHP', invoiceDate: '2025-02-14', updateTime: '2025-03-08 14:50', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Non-Golden', tags: ['line-item'] },
  { key: '10', caseId: 'Case-ID-20250220-000010', paymentRequestId: 'PR-010', paymentGroupId: 'PG-007', invoiceNo: 'INV-2025-0010', supplierName: 'Shopee Indonesia PT', region: 'SEA', entity: 'ID', amount: 185000, currency: 'IDR', invoiceDate: '2025-02-20', updateTime: '2025-03-07 09:30', invoiceReviewGroundTruth: 'Fail', matchGroundTruth: 'N/A', apVoucherGroundTruth: 'Rejected', status: 'Active', isGolden: 'Golden', tags: ['golden', 'tax-check'] },
  { key: '11', caseId: 'Case-MY-20250301-000011', paymentRequestId: 'PR-011', paymentGroupId: 'PG-008', invoiceNo: 'INV-2025-0011', supplierName: 'AWS Singapore Pte Ltd', region: 'SEA', entity: 'MY', amount: 62000, currency: 'MYR', invoiceDate: '2025-03-01', updateTime: '2025-03-06 16:00', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Non-Golden', tags: ['header-check'] },
  { key: '12', caseId: 'Case-SG-20250305-000012', paymentRequestId: 'PR-012', paymentGroupId: 'PG-009', invoiceNo: 'INV-2025-0012', supplierName: 'Accenture Pte Ltd', region: 'SEA', entity: 'SG', amount: 210000, currency: 'SGD', invoiceDate: '2025-03-05', updateTime: '2025-03-15 11:20', invoiceReviewGroundTruth: 'Pass', matchGroundTruth: 'Matched', apVoucherGroundTruth: 'Submit to EBS', status: 'Active', isGolden: 'Golden', tags: ['golden', 'under-review'] },
]

// ── Agent Management ─────────────────────────────────────────────

// Flow is the top-level concept; each Flow contains one or more Steps.
export interface AgentFlow {
  id: string
  name: string
  description: string
  steps: AgentStepDef[]
}

export interface AgentStepDef {
  id: string        // e.g. 'INVOICE_REVIEW'
  name: string      // human-readable
  flowId: string
}

export const flowData: AgentFlow[] = [
  {
    id: 'FLOW-001',
    name: 'Invoice Processing',
    description: 'End-to-end flow that covers invoice review, PO matching, and AP voucher creation.',
    steps: [
      { id: 'INVOICE_REVIEW', name: 'Invoice Review',  flowId: 'FLOW-001' },
      { id: 'MATCH',          name: 'PO Matching',     flowId: 'FLOW-001' },
      { id: 'AP_VOUCHER',     name: 'AP Voucher',      flowId: 'FLOW-001' },
    ],
  },
]

// Flat step id type (union of all step ids across all flows)
export type AgentStep = 'INVOICE_REVIEW' | 'MATCH' | 'AP_VOUCHER' | 'SUPPLIER_VERIFY' | 'BANK_CHECK' | 'BANK_RECON' | 'EXCEPTION_MGT'
export type AgentStatus = 'ACTIVE' | 'TESTING' | 'DEPRECATED'

// ── Golden Case (shared between GoldenCaseManagement and RegressionTest) ──

export interface GoldenCase {
  key: string
  caseId: string
  paymentRequestId: string
  paymentGroupId: string
  invoiceNo: string
  supplier: string
  region: string
  groundTruth: 'Pass' | 'Fail' | 'Matched' | 'NA' | 'Submitted to EBS' | 'Pending'
  patterns: string[]
  amount: number
  currency: string
  addedBy: { name: string; email: string }
  addedDate: string
}

export type GoldenCasesState = Record<'INVOICE_REVIEW' | 'MATCH' | 'AP_VOUCHER', GoldenCase[]>

export const INITIAL_GOLDEN_CASES: GoldenCasesState = {
  INVOICE_REVIEW: [
    { key: "1",  caseId: "CASE-001", paymentRequestId: "PR-2025-00134", paymentGroupId: "PG-2025-0021", invoiceNo: "INV-2025-0001", supplier: "Accenture Pte Ltd",         region: "SG", groundTruth: "Pass", patterns: ["header-check"], amount: 48500, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-01-10" },
    { key: "2",  caseId: "CASE-002", paymentRequestId: "PR-2025-00157", paymentGroupId: "PG-2025-0022", invoiceNo: "INV-2025-0002", supplier: "AWS Singapore Pte Ltd",   region: "SG", groundTruth: "Fail", patterns: ["supplier-name-mismatch"], amount: 12300, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-01-15" },
    { key: "3",  caseId: "CASE-012", paymentRequestId: "PR-2025-00198", paymentGroupId: "PG-2025-0031", invoiceNo: "INV-2025-0012", supplier: "Accenture Pte Ltd",         region: "SG", groundTruth: "Pass", patterns: ["date-out-of-range"], amount: 76200, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-01-22" },
    { key: "4",  caseId: "CASE-014", paymentRequestId: "PR-2025-00203", paymentGroupId: "PG-2025-0033", invoiceNo: "INV-2025-0014", supplier: "Google Asia Pacific",     region: "SG", groundTruth: "Fail", patterns: ["amount-mismatch"], amount: 9850, currency: "SGD", addedBy: { name: "Tan Mei Ling", email: "tanml@shopee.com" }, addedDate: "2025-02-03" },
    { key: "5",  caseId: "CASE-021", paymentRequestId: "PR-2025-00245", paymentGroupId: "PG-2025-0041", invoiceNo: "INV-2025-0021", supplier: "DHL Express Pte Ltd",      region: "SG", groundTruth: "Pass", patterns: ["gst-calculation-error"], amount: 3200, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-02-11" },
    { key: "6",  caseId: "CASE-033", paymentRequestId: "PR-2025-00312", paymentGroupId: "PG-2025-0052", invoiceNo: "INV-2025-0033", supplier: "Deloitte Singapore",       region: "SG", groundTruth: "Fail", patterns: ["duplicate-invoice"], amount: 128000, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-02-18" },
    { key: "7",  caseId: "CASE-045", paymentRequestId: "PR-2025-00389", paymentGroupId: "PG-2025-0061", invoiceNo: "INV-2025-0045", supplier: "Grab Singapore Pte Ltd",   region: "SG", groundTruth: "Pass", patterns: ["header-check"], amount: 5670, currency: "SGD", addedBy: { name: "Tan Mei Ling", email: "tanml@shopee.com" }, addedDate: "2025-03-01" },
    { key: "8",  caseId: "CASE-058", paymentRequestId: "PR-2025-00421", paymentGroupId: "PG-2025-0074", invoiceNo: "INV-2025-0058", supplier: "Microsoft Singapore",     region: "SG", groundTruth: "Pass", patterns: ["gst-calculation-error", "header-check"], amount: 34900, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-03-12" },
  ],
  MATCH: [
    { key: "1", caseId: "CASE-003", paymentRequestId: "PR-2025-00161", paymentGroupId: "PG-2025-0023", invoiceNo: "INV-2025-0003", supplier: "Accenture Pte Ltd",       region: "SG", groundTruth: "Matched", patterns: ["three-way-match-fail"], amount: 48500, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-01-11" },
    { key: "2", caseId: "CASE-008", paymentRequestId: "PR-2025-00175", paymentGroupId: "PG-2025-0027", invoiceNo: "INV-2025-0008", supplier: "Siemens Singapore",      region: "SG", groundTruth: "NA", patterns: ["line-item-qty-mismatch"], amount: 220000, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-01-19" },
    { key: "3", caseId: "CASE-016", paymentRequestId: "PR-2025-00211", paymentGroupId: "PG-2025-0034", invoiceNo: "INV-2025-0016", supplier: "Salesforce Singapore",   region: "SG", groundTruth: "Matched", patterns: ["unit-price-discrepancy"], amount: 67400, currency: "SGD", addedBy: { name: "Tan Mei Ling", email: "tanml@shopee.com" }, addedDate: "2025-02-05" },
    { key: "4", caseId: "CASE-024", paymentRequestId: "PR-2025-00267", paymentGroupId: "PG-2025-0043", invoiceNo: "INV-2025-0024", supplier: "DHL Express Pte Ltd",     region: "SG", groundTruth: "NA", patterns: ["three-way-match-fail"], amount: 3200, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-02-14" },
    { key: "5", caseId: "CASE-039", paymentRequestId: "PR-2025-00341", paymentGroupId: "PG-2025-0057", invoiceNo: "INV-2025-0039", supplier: "Oracle Singapore",        region: "SG", groundTruth: "Matched", patterns: ["line-item-qty-mismatch"], amount: 95000, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-02-25" },
    { key: "6", caseId: "CASE-052", paymentRequestId: "PR-2025-00401", paymentGroupId: "PG-2025-0069", invoiceNo: "INV-2025-0052", supplier: "SAP Asia Pacific",       region: "SG", groundTruth: "Matched", patterns: ["unit-price-discrepancy"], amount: 183500, currency: "SGD", addedBy: { name: "Tan Mei Ling", email: "tanml@shopee.com" }, addedDate: "2025-03-08" },
  ],
  AP_VOUCHER: [
    { key: "1", caseId: "CASE-005", paymentRequestId: "PR-2025-00168", paymentGroupId: "PG-2025-0025", invoiceNo: "INV-2025-0005", supplier: "AWS Singapore Pte Ltd",    region: "SG", groundTruth: "Submitted to EBS", patterns: ["gl-account-wrong"], amount: 12300, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-01-13" },
    { key: "2", caseId: "CASE-011", paymentRequestId: "PR-2025-00193", paymentGroupId: "PG-2025-0030", invoiceNo: "INV-2025-0011", supplier: "Google Asia Pacific",    region: "SG", groundTruth: "Pending", patterns: ["cost-center-mismatch"], amount: 9850, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-01-20" },
    { key: "3", caseId: "CASE-027", paymentRequestId: "PR-2025-00278", paymentGroupId: "PG-2025-0047", invoiceNo: "INV-2025-0027", supplier: "Deloitte Singapore",     region: "SG", groundTruth: "Submitted to EBS", patterns: ["gl-account-wrong"], amount: 128000, currency: "SGD", addedBy: { name: "Tan Mei Ling", email: "tanml@shopee.com" }, addedDate: "2025-02-17" },
    { key: "4", caseId: "CASE-041", paymentRequestId: "PR-2025-00355", paymentGroupId: "PG-2025-0059", invoiceNo: "INV-2025-0041", supplier: "Microsoft Singapore",    region: "SG", groundTruth: "Submitted to EBS", patterns: ["cost-center-mismatch"], amount: 34900, currency: "SGD", addedBy: { name: "Li Wei", email: "liwei@shopee.com" }, addedDate: "2025-02-28" },
    { key: "5", caseId: "CASE-063", paymentRequestId: "PR-2025-00438", paymentGroupId: "PG-2025-0081", invoiceNo: "INV-2025-0063", supplier: "Grab Singapore Pte Ltd",  region: "SG", groundTruth: "Pending", patterns: ["gl-account-wrong", "cost-center-mismatch"], amount: 5670, currency: "SGD", addedBy: { name: "Chen Jing", email: "chenjing@shopee.com" }, addedDate: "2025-03-15" },
  ],
}

// Helper: get step def by id
export function getStepDef(stepId: string): AgentStepDef | undefined {
  for (const flow of flowData) {
    const found = flow.steps.find((s) => s.id === stepId)
    if (found) return found
  }
  return undefined
}

// Helper: get flow by stepId
export function getFlowByStep(stepId: string): AgentFlow | undefined {
  return flowData.find((f) => f.steps.some((s) => s.id === stepId))
}

export interface Agent {
  key: string
  id: string
  agentName: string
  flowId: string
  step: AgentStep
  liveVersion?: string
  testingVersions?: string[]
  status: AgentStatus
  lastUpdated: string
  description: string
  /** Region codes this agent is configured for. Empty = all regions. */
  regions: string[]
}

export const agentListData: Agent[] = [
  {
    key: '1', id: 'AGT-001',
    agentName: 'Invoice Header Extractor',
    flowId: 'FLOW-001', step: 'INVOICE_REVIEW',
    liveVersion: 'v1.3.0', testingVersions: [], status: 'ACTIVE',
    lastUpdated: '2025-03-15 10:22',
    description: 'Extracts header fields (vendor, date, amount) from raw invoice PDFs using vision model.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
  {
    key: '2', id: 'AGT-002',
    agentName: 'Line Item Validator',
    flowId: 'FLOW-001', step: 'INVOICE_REVIEW',
    liveVersion: 'v1.2.0', testingVersions: ['v1.3.0-beta', 'v1.4.0-beta'], status: 'ACTIVE',
    lastUpdated: '2025-03-18 14:05',
    description: 'Validates each invoice line item against PO data and flags discrepancies.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
  {
    key: '3', id: 'AGT-003',
    agentName: 'PO Matching Agent',
    flowId: 'FLOW-001', step: 'MATCH',
    liveVersion: 'v2.1.0', testingVersions: ['v2.2.0-beta'], status: 'ACTIVE',
    lastUpdated: '2025-03-10 09:30',
    description: 'Matches invoices to purchase orders using fuzzy logic and embedding similarity.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
  {
    key: '4', id: 'AGT-004',
    agentName: 'Three-Way Match Auditor',
    flowId: 'FLOW-001', step: 'MATCH',
    liveVersion: undefined, testingVersions: ['v1.1.0-beta'], status: 'TESTING',
    lastUpdated: '2025-02-28 16:45',
    description: 'Legacy three-way match logic. Superseded by PO Matching Agent v2.x.',
    regions: ['SG'],
  },
  {
    key: '5', id: 'AGT-005',
    agentName: 'AP Voucher Generator',
    flowId: 'FLOW-001', step: 'AP_VOUCHER',
    liveVersion: 'v1.2.0', testingVersions: [], status: 'ACTIVE',
    lastUpdated: '2025-03-12 11:00',
    description: 'Generates AP voucher entries in SAP format from matched invoice data.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
  {
    key: '6', id: 'AGT-006',
    agentName: 'Voucher Approval Router',
    flowId: 'FLOW-001', step: 'AP_VOUCHER',
    liveVersion: undefined, testingVersions: ['v0.9.1-beta'], status: 'TESTING',
    lastUpdated: '2025-03-19 08:15',
    description: 'Routes generated vouchers to the correct approval workflow based on amount and cost center.',
    regions: ['SG', 'TH', 'MY'],
  },
  {
    key: '7', id: 'AGT-007',
    agentName: 'Supplier Data Validator',
    flowId: '', step: 'SUPPLIER_VERIFY',
    liveVersion: 'v1.0.0', testingVersions: ['v1.1.0-beta'], status: 'ACTIVE',
    lastUpdated: '2025-03-01 09:00',
    description: 'Validates supplier registration data against government registries and internal blacklists.',
    regions: ['SG', 'MY', 'VN', 'PH', 'ID'],
  },
  {
    key: '8', id: 'AGT-008',
    agentName: 'Bank Account Verifier',
    flowId: '', step: 'BANK_CHECK',
    liveVersion: 'v1.1.0', testingVersions: [], status: 'ACTIVE',
    lastUpdated: '2025-03-17 13:40',
    description: 'Cross-checks supplier bank account details against known fraud patterns and SWIFT directory.',
    regions: ['SG', 'TW', 'BR'],
  },
  {
    key: '9', id: 'AGT-009',
    agentName: 'Bank Statement Reconciler',
    flowId: '', step: 'BANK_RECON',
    liveVersion: 'v2.0.1', testingVersions: ['v2.1.0-beta', 'v2.2.0-beta', 'v2.3.0-beta'], status: 'ACTIVE',
    lastUpdated: '2025-03-08 10:15',
    description: 'Reconciles bank statements against AP ledger entries using transaction ID matching.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
  {
    key: '10', id: 'AGT-010',
    agentName: 'Exception Classifier',
    flowId: '', step: 'EXCEPTION_MGT',
    liveVersion: 'v1.0.0', testingVersions: [], status: 'ACTIVE',
    lastUpdated: '2025-03-05 15:30',
    description: 'Classifies unmatched transactions into exception categories and routes for manual review.',
    regions: ['SG', 'TH', 'VN', 'MY', 'PH', 'TW', 'ID', 'BR'],
  },
]

// ── Agent Detail (AGT-002 as the selected agent) ─────────────────

  export interface AgentVersionInfo {
  version: string
  state: 'LIVE' | 'TESTING' | 'ARCHIVED' | 'DEPRECATED'
  publishedAt?: string
  createdAt?: string
  publishedBy?: string
  createdBy?: string
  /** undefined = no test run ever; 'passed' | 'failed' = result of last run */
  lastTestStatus?: 'passed' | 'failed'
  lastTestRunId?: string
  /** whether regression test history records exist for this version */
  hasRegressionHistory?: boolean
  }

export interface AgentDetailData {
  id: string
  agentName: string
  description: string
  flowId: string
  step: AgentStep
  agentPlatform: string
  hashId: string
  hashKey: string
  agentLink: string
  systemPrompt: string
  userPromptTemplate: string
  versions: {
    all: AgentVersionInfo[]
  }
}

export const agentDetailData: AgentDetailData = {
  id: 'AGT-002',
  agentName: 'Line Item Validator',
  description: 'Validates each invoice line item against PO data and flags discrepancies. Supports multi-currency comparison and tolerance thresholds.',
  flowId: 'FLOW-001',
  step: 'INVOICE_REVIEW',
  agentPlatform: 'Smart',
  hashId: 'HASH-A1B2C3D4',
  hashKey: 'sk-hash-xK8mN2pQrT5vW9zA',
  agentLink: 'https://agent.internal.shopee.com/line-item-validator',
  systemPrompt: `You are an AP invoice validation assistant for Shopee's finance team.

Your task is to validate invoice line items against the provided Purchase Order (PO) data.

Rules:
1. Compare unit price, quantity, and total amount for each line item
2. Flag discrepancies exceeding ±2% tolerance threshold
3. Check currency consistency across all line items
4. Verify tax codes match the supplier's registered tax profile
5. Return structured JSON output with validation results

Output format:
{
  "status": "PASS" | "FAIL" | "REVIEW",
  "line_items": [...],
  "flags": [...],
  "confidence_score": 0.0-1.0
}`,
  userPromptTemplate: `Validate the following invoice against the PO data:

Invoice Data:
{{invoice_json}}

PO Reference Data:
{{po_json}}

Supplier Profile:
{{supplier_profile}}

Please perform a complete line-item validation and return results in the specified JSON format.`,
  versions: {
    all: [
      { version: 'v1.3.0', state: 'LIVE', publishedAt: '2025-03-15 10:22', publishedBy: 'ops_user_01' },
      { version: 'v1.4.0-beta', state: 'TESTING', createdAt: '2025-03-18 14:05', createdBy: 'ops_user_02', lastTestStatus: 'passed', lastTestRunId: 'RUN-2043' },
      { version: 'v1.5.0-beta', state: 'TESTING', createdAt: '2025-03-20 09:10', createdBy: 'ops_user_02', lastTestStatus: 'failed', lastTestRunId: 'RUN-2042' },
      { version: 'v1.2.0', state: 'DEPRECATED', publishedAt: '2025-02-20 09:30', publishedBy: 'ops_user_01', hasRegressionHistory: true },
      { version: 'v1.1.0', state: 'DEPRECATED', publishedAt: '2025-01-15 14:15', publishedBy: 'ops_user_03', hasRegressionHistory: true },
      { version: 'v1.0.1', state: 'ARCHIVED', publishedAt: '2024-12-10 11:00', publishedBy: 'ops_user_01' },
      { version: 'v1.0.0', state: 'DEPRECATED', publishedAt: '2024-11-01 08:45', publishedBy: 'ops_user_03', hasRegressionHistory: true },
    ],
  },
}

// ── Archived Cases Mock Data ─────────────────────────────────────
export type CaseStep = 'INVOICE_REVIEW' | 'MATCH' | 'AP_VOUCHER'
export type ArchivedGroundTruth = 'Pass' | 'Fail' | 'Matched' | 'Rejected' | 'Submitted'
export type ArchiveReasonType = 'Auto Archive' | 'Manual Move'

export interface ArchivedCaseMock {
  key: string
  caseId: string
  paymentRequestId: string
  paymentGroupId: string
  invoiceNo: string
  supplierName: string
  region: string
  entity: string
  amount: number
  currency: string
  invoiceDate: string
  reviewDate: string
  isGolden: CaseGolden
  groundTruth: ArchivedGroundTruth
  tags: string[]
  step: CaseStep
  archivedAt: string
  archiveReason: ArchiveReasonType
  archiveReasonText?: string
  archivedBy?: string
}

export const INITIAL_ARCHIVED_CASES: ArchivedCaseMock[] = [
  {
    key: 'arc-1', // first archived case
    caseId: 'Case-SG-20230815-000001',
    paymentRequestId: 'PR-001',
    paymentGroupId: 'PG-001',
    invoiceNo: 'INV-20230815-001',
    supplierName: 'Sheng Siong Group',
    region: 'SEA',
    entity: 'SG',
    amount: 42500,
    currency: 'SGD',
    invoiceDate: '2023-08-10',
    reviewDate: '2023-08-15',
    isGolden: 'Non-Golden',
    groundTruth: 'Pass',
    tags: ['three-way-match'],
    step: 'INVOICE_REVIEW',
    archivedAt: '2024-08-15T00:00:00.000Z',
    archiveReason: 'Retention Period Exceeded',
    archivedBy: 'System',
  },
  {
    key: 'arc-2',
    caseId: 'Case-SG-20230901-000002',
    paymentRequestId: 'PR-002',
    paymentGroupId: 'PG-001',
    invoiceNo: 'INV-20230901-042',
    supplierName: 'Cold Storage SG',
    region: 'SEA',
    entity: 'SG',
    amount: 18750,
    currency: 'SGD',
    invoiceDate: '2023-08-28',
    reviewDate: '2023-09-01',
    isGolden: 'Golden',
    groundTruth: 'Matched',
    tags: ['golden', 'line-item'],
    step: 'MATCH',
    archivedAt: '2024-09-01T00:00:00.000Z',
    archiveReason: 'Invalid Payment Request Status',
    archivedBy: 'System',
  },
  {
    key: 'arc-3',
    caseId: 'Case-SG-20231005-000003',
    paymentRequestId: 'PR-003',
    paymentGroupId: 'PG-002',
    invoiceNo: 'INV-20231005-018',
    supplierName: 'NTUC Fairprice Co-op',
    region: 'SEA',
    entity: 'SG',
    amount: 67800,
    currency: 'SGD',
    invoiceDate: '2023-10-01',
    reviewDate: '2023-10-05',
    isGolden: 'Non-Golden',
    groundTruth: 'Fail',
    tags: ['amount-mismatch'],
    step: 'INVOICE_REVIEW',
    archivedAt: '2024-10-05T00:00:00.000Z',
    archiveReason: 'Retention Period Exceeded',
    archivedBy: 'System',
  },
  {
    key: 'arc-4',
    caseId: 'Case-SG-20231018-000004',
    paymentRequestId: 'PR-004',
    paymentGroupId: 'PG-002',
    invoiceNo: 'INV-20231018-007',
    supplierName: 'Giant Hypermarket',
    region: 'SEA',
    entity: 'SG',
    amount: 31200,
    currency: 'SGD',
    invoiceDate: '2023-10-15',
    reviewDate: '2023-10-18',
    isGolden: 'Non-Golden',
    groundTruth: 'Submitted',
    tags: ['header-check'],
    step: 'AP_VOUCHER',
    archivedAt: '2024-10-18T00:00:00.000Z',
    archiveReason: 'Manual Move',
    archiveReasonText: 'Duplicate case - merged with PR-003',
    archivedBy: 'john.tan@shopee.com',
  },
  {
    key: 'arc-5',
    caseId: 'Case-SG-20231108-000005',
    paymentRequestId: 'PR-005',
    paymentGroupId: 'PG-003',
    invoiceNo: 'INV-20231108-022',
    supplierName: 'Prime Supermarket',
    region: 'SEA',
    entity: 'SG',
    amount: 15400,
    currency: 'SGD',
    invoiceDate: '2023-11-05',
    reviewDate: '2023-11-08',
    isGolden: 'Non-Golden',
    groundTruth: 'Rejected',
    tags: ['bank-mismatch'],
    step: 'MATCH',
    archivedAt: '2024-11-08T00:00:00.000Z',
    archiveReason: 'Invalid Payment Request Status',
    archivedBy: 'System',
  },
  {
    key: 'arc-6',
    caseId: 'Case-SG-20231201-000006',
    paymentRequestId: 'PR-006',
    paymentGroupId: 'PG-004',
    invoiceNo: 'INV-20231201-015',
    supplierName: 'DFI Retail Group',
    region: 'SEA',
    entity: 'SG',
    amount: 89600,
    currency: 'SGD',
    invoiceDate: '2023-11-28',
    reviewDate: '2023-12-01',
    isGolden: 'Golden',
    groundTruth: 'Pass',
    tags: ['golden', 'three-way-match'],
    step: 'INVOICE_REVIEW',
    archivedAt: '2024-12-01T00:00:00.000Z',
    archiveReason: 'Retention Period Exceeded',
    archivedBy: 'System',
  },
  {
    key: 'arc-7',
    caseId: 'Case-SG-20240110-000007',
    paymentRequestId: 'PR-007',
    paymentGroupId: 'PG-005',
    invoiceNo: 'INV-20240110-003',
    supplierName: 'Dairy Farm SG',
    region: 'SEA',
    entity: 'SG',
    amount: 24300,
    currency: 'SGD',
    invoiceDate: '2024-01-08',
    reviewDate: '2024-01-10',
    isGolden: 'Non-Golden',
    groundTruth: 'Matched',
    tags: ['line-item'],
    step: 'MATCH',
    archivedAt: '2025-01-10T00:00:00.000Z',
    archiveReason: 'Manual Move',
    archiveReasonText: 'Test case - no longer needed',
    archivedBy: 'alice.chong@shopee.com',
  },
  {
    key: 'arc-8',
    caseId: 'Case-SG-20240205-000008',
    paymentRequestId: 'PR-008',
    paymentGroupId: 'PG-005',
    invoiceNo: 'INV-20240205-041',
    supplierName: 'HAO Mart',
    region: 'SEA',
    entity: 'SG',
    amount: 11200,
    currency: 'SGD',
    invoiceDate: '2024-02-01',
    reviewDate: '2024-02-05',
    isGolden: 'Non-Golden',
    groundTruth: 'Pass',
    tags: ['tax-check'],
    step: 'AP_VOUCHER',
    archivedAt: '2025-02-05T00:00:00.000Z',
    archiveReason: 'Retention Period Exceeded',
    archivedBy: 'System',
  },
  {
    key: 'arc-9',
    caseId: 'Case-TH-20240220-000009',
    paymentRequestId: 'PR-009',
    paymentGroupId: 'PG-006',
    invoiceNo: 'INV-20240220-089',
    supplierName: 'Lotus\'s Bangkok Ltd',
    region: 'SEA',
    entity: 'TH',
    amount: 52300,
    currency: 'THB',
    invoiceDate: '2024-02-15',
    reviewDate: '2024-02-20',
    isGolden: 'Non-Golden',
    groundTruth: 'Pass',
    tags: ['three-way-match'],
    step: 'INVOICE_REVIEW',
    archivedAt: '2025-02-20T00:00:00.000Z',
    archiveReason: 'Manual Move',
    archiveReasonText: 'Supplier requested case review',
    archivedBy: 'michael.wong@shopee.com',
  },
  {
    key: 'arc-10',
    caseId: 'Case-TH-20240305-000010',
    paymentRequestId: 'PR-010',
    paymentGroupId: 'PG-007',
    invoiceNo: 'INV-20240305-012',
    supplierName: 'Central World Mall',
    region: 'SEA',
    entity: 'TH',
    amount: 78900,
    currency: 'THB',
    invoiceDate: '2024-03-01',
    reviewDate: '2024-03-05',
    isGolden: 'Non-Golden',
    groundTruth: 'Rejected',
    tags: ['amount-mismatch'],
    step: 'MATCH',
    archivedAt: '2025-03-05T00:00:00.000Z',
    archiveReason: 'Invalid Payment Request Status',
    archivedBy: 'System',
  },
  {
    key: 'arc-11',
    caseId: 'Case-MY-20240315-000011',
    paymentRequestId: 'PR-011',
    paymentGroupId: 'PG-008',
    invoiceNo: 'INV-20240315-045',
    supplierName: 'Mid Valley Megamall',
    region: 'SEA',
    entity: 'MY',
    amount: 35600,
    currency: 'MYR',
    invoiceDate: '2024-03-10',
    reviewDate: '2024-03-15',
    isGolden: 'Golden',
    groundTruth: 'Pass',
    tags: ['golden', 'line-item'],
    step: 'AP_VOUCHER',
    archivedAt: '2025-03-15T00:00:00.000Z',
    archiveReason: 'Retention Period Exceeded',
    archivedBy: 'System',
  },
  {
    key: 'arc-12',
    caseId: 'Case-VN-20240325-000012',
    paymentRequestId: 'PR-012',
    paymentGroupId: 'PG-009',
    invoiceNo: 'INV-20240325-056',
    supplierName: 'Saigon Square',
    region: 'SEA',
    entity: 'VN',
    amount: 28400,
    currency: 'VND',
    invoiceDate: '2024-03-20',
    reviewDate: '2024-03-25',
    isGolden: 'Non-Golden',
    groundTruth: 'Matched',
    tags: ['header-check'],
    step: 'MATCH',
    archivedAt: '2025-03-25T00:00:00.000Z',
    archiveReason: 'Manual Move',
    archiveReasonText: 'Corrected invoice data - case no longer valid',
    archivedBy: 'sarah.lee@shopee.com',
  },
]

// ── Feedback Management (Human-in-the-Loop) ─────────────────────────
export type FeedbackStatus = 'Pending' | 'Processing' | 'Processed' | 'Rejected'
export type FeedbackStep = 'Invoice Review' | 'Match' | 'AP Voucher'
export type FeedbackType = 'Mark Wrong' | 'Text'

export interface FeedbackItem {
  key: string
  feedbackId: string
  prId: string
  caseId: string
  step: FeedbackStep
  feedbackType: FeedbackType
  content: string
  relatedAgent: string // e.g., "Agent-SG v2.1"
  submittedBy: string
  submittedAt: string
  status: FeedbackStatus
  rejectReason?: string
}

export type SuggestionStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Withdrawn'
export type SuggestionType = 'Add Rule' | 'Modify Rule'
export type ErrorType = 'Missing Rule' | 'Wrong Rule'
export type ConfidenceLevel = 'High' | 'Medium' | 'Low'

export interface RelatedFeedback {
  prId: string
  step: FeedbackStep
  contentSummary: string
}

export interface FeedbackSuggestion {
  key: string
  suggestionId: string
  agentName: string
  liveVersion: string
  suggestionType: SuggestionType
  errorType: ErrorType
  affectedField: string
  confidence: ConfidenceLevel
  reasoning: string
  promptDiff: string
  relatedFeedbacks: RelatedFeedback[]
  status: SuggestionStatus
  rejectReason?: string
  processedBy?: string
  processedAt?: string
  createdAt: string
}

export const feedbackData: FeedbackItem[] = [
  // Pending (4)
  {
    key: 'fb-1',
    feedbackId: 'FB-2025-0001',
    prId: 'PR-2025-001',
    caseId: 'CASE-001',
    step: 'Invoice Review',
    feedbackType: 'Mark Wrong',
    content: 'Invoice date validation failed - should reject due to document date is outside acceptable range',
    relatedAgent: 'Agent-SG v2.1',
    submittedBy: 'John Doe',
    submittedAt: '2025-03-22 14:30',
    status: 'Pending',
  },
  {
    key: 'fb-2',
    feedbackId: 'FB-2025-0002',
    prId: 'PR-2025-002',
    caseId: 'CASE-002',
    step: 'Match',
    feedbackType: 'Text',
    content: 'PO quantity mismatch not detected - received 100 units but invoice shows 105 units',
    relatedAgent: 'Agent-TH v1.9',
    submittedBy: 'Jane Smith',
    submittedAt: '2025-03-22 13:45',
    status: 'Pending',
  },
  {
    key: 'fb-3',
    feedbackId: 'FB-2025-0003',
    prId: 'PR-2025-003',
    caseId: 'CASE-003',
    step: 'AP Voucher',
    feedbackType: 'Mark Wrong',
    content: 'GL account mapping incorrect - cost center should be CC-2002 not CC-2001',
    relatedAgent: 'Agent-SG v2.1',
    submittedBy: 'Mike Johnson',
    submittedAt: '2025-03-22 11:20',
    status: 'Pending',
  },
  {
    key: 'fb-4',
    feedbackId: 'FB-2025-0004',
    prId: 'PR-2025-004',
    caseId: 'CASE-004',
    step: 'Invoice Review',
    feedbackType: 'Text',
    content: 'Tax calculation error - should apply 7% GST based on supplier location, not 10%',
    relatedAgent: 'Agent-ID v2.0',
    submittedBy: 'Sarah Lee',
    submittedAt: '2025-03-22 10:15',
    status: 'Pending',
  },
  // Processing (2)
  {
    key: 'fb-5',
    feedbackId: 'FB-2025-0005',
    prId: 'PR-2025-005',
    caseId: 'CASE-005',
    step: 'Match',
    feedbackType: 'Mark Wrong',
    content: 'Supplier master data mismatch not flagged - vendor name variations should be detected',
    relatedAgent: 'Agent-SG v2.1',
    submittedBy: 'David Wilson',
    submittedAt: '2025-03-21 15:50',
    status: 'Processing',
  },
  {
    key: 'fb-6',
    feedbackId: 'FB-2025-0006',
    prId: 'PR-2025-006',
    caseId: 'CASE-006',
    step: 'AP Voucher',
    feedbackType: 'Text',
    content: 'Duplicate invoice detection missed - same invoice number appeared twice in different batches',
    relatedAgent: 'Agent-TH v1.9',
    submittedBy: 'Emma Brown',
    submittedAt: '2025-03-21 14:25',
    status: 'Processing',
  },
  // Processed (2)
  {
    key: 'fb-7',
    feedbackId: 'FB-2025-0007',
    prId: 'PR-2025-007',
    caseId: 'CASE-007',
    step: 'Invoice Review',
    feedbackType: 'Mark Wrong',
    content: 'Amount tolerance threshold too high - should reject 2% variance not allow 5%',
    relatedAgent: 'Agent-SG v2.1',
    submittedBy: 'Robert King',
    submittedAt: '2025-03-20 09:00',
    status: 'Processed',
  },
  {
    key: 'fb-8',
    feedbackId: 'FB-2025-0008',
    prId: 'PR-2025-008',
    caseId: 'CASE-008',
    step: 'Match',
    feedbackType: 'Text',
    content: 'Line item details missing from validation - should cross-check all line items against PO',
    relatedAgent: 'Agent-VN v2.2',
    submittedBy: 'Lisa Zhang',
    submittedAt: '2025-03-20 08:30',
    status: 'Processed',
  },
  // Rejected (2)
  {
    key: 'fb-9',
    feedbackId: 'FB-2025-0009',
    prId: 'PR-2025-009',
    caseId: 'CASE-009',
    step: 'Invoice Review',
    feedbackType: 'Mark Wrong',
    content: 'System working as designed - early invoice flagging is intentional per business rules',
    relatedAgent: 'Agent-SG v2.1',
    submittedBy: 'Tom Harris',
    submittedAt: '2025-03-19 16:45',
    status: 'Rejected',
    rejectReason: 'This behavior is by design per the latest business requirements',
  },
  {
    key: 'fb-10',
    feedbackId: 'FB-2025-0010',
    prId: 'PR-2025-010',
    caseId: 'CASE-010',
    step: 'AP Voucher',
    feedbackType: 'Text',
    content: 'Cost center validation already implemented - no need for additional changes',
    relatedAgent: 'Agent-TH v1.9',
    submittedBy: 'Nancy Davis',
    submittedAt: '2025-03-19 15:20',
    status: 'Rejected',
    rejectReason: 'Duplicate of previous feedback - already addressed in v2.3',
  },
]

// Feedback Suggestion Mock Data
export const feedbackSuggestionData: FeedbackSuggestion[] = [
  // Pending (4)
  {
    key: 'sugg-1',
    suggestionId: 'SUGG-2025-0001',
    agentName: 'Agent-SG',
    liveVersion: 'v2.0',
    suggestionType: 'Add Rule',
    errorType: 'Missing Rule',
    affectedField: 'invoice_date',
    confidence: 'High',
    reasoning: 'Detected pattern where invoices with dates outside 90-day window are rejected. Adding rule to validate invoice date range at entry point will catch 98% of similar cases.',
    promptDiff: `+ Check if invoice_date is within 90 days from PO date
+ Flag if variance exceeds 90 days with error code INV_DATE_OUT_RANGE`,
    relatedFeedbacks: [
      { prId: 'PR-2025-001', step: 'Invoice Review', contentSummary: 'Invoice date validation failed' },
      { prId: 'PR-2025-007', step: 'Invoice Review', contentSummary: 'Amount tolerance threshold too high' },
    ],
    status: 'Pending',
    createdAt: '2025-03-22 14:45',
  },
  {
    key: 'sugg-2',
    suggestionId: 'SUGG-2025-0002',
    agentName: 'Agent-TH',
    liveVersion: 'v1.9',
    suggestionType: 'Modify Rule',
    errorType: 'Wrong Rule',
    affectedField: 'tax_amount',
    confidence: 'Medium',
    reasoning: 'Current GST calculation uses fixed 10% rate. Need to adjust based on supplier location. Thailand entities should use 7% for specific product categories.',
    promptDiff: `- Calculate tax_amount = amount * 0.10
+ IF supplier_country == 'TH' THEN tax_amount = amount * 0.07
+ ELSE IF supplier_country == 'SG' THEN tax_amount = amount * 0.08`,
    relatedFeedbacks: [
      { prId: 'PR-2025-004', step: 'Invoice Review', contentSummary: 'Tax calculation error' },
    ],
    status: 'Pending',
    createdAt: '2025-03-22 13:20',
  },
  {
    key: 'sugg-3',
    suggestionId: 'SUGG-2025-0003',
    agentName: 'Agent-SG',
    liveVersion: 'v2.0',
    suggestionType: 'Add Rule',
    errorType: 'Missing Rule',
    affectedField: 'supplier_name',
    confidence: 'High',
    reasoning: 'Vendor name variations (e.g., "Accenture", "Accenture Pte Ltd", "Accenture Singapore") should be flagged for master data validation before matching.',
    promptDiff: `+ Add supplier_name_variations rule
+ Match against supplier master with fuzzy matching (similarity > 85%)
+ Flag discrepancies for manual review`,
    relatedFeedbacks: [
      { prId: 'PR-2025-005', step: 'Match', contentSummary: 'Supplier master data mismatch' },
    ],
    status: 'Pending',
    createdAt: '2025-03-22 12:00',
  },
  {
    key: 'sugg-4',
    suggestionId: 'SUGG-2025-0004',
    agentName: 'Agent-VN',
    liveVersion: 'v2.2',
    suggestionType: 'Add Rule',
    errorType: 'Missing Rule',
    affectedField: 'invoice_number',
    confidence: 'Low',
    reasoning: 'Occasional false positives on duplicate detection. Need better logic to distinguish between invoice number variations and true duplicates. May need business rule clarification.',
    promptDiff: `+ Implement duplicate_invoice_check with conditions:
+   - Exact match on invoice_number AND supplier_id AND amount
+   - Date range check (within 7 days)
+ Flag only if all conditions met`,
    relatedFeedbacks: [
      { prId: 'PR-2025-006', step: 'AP Voucher', contentSummary: 'Duplicate invoice detection' },
    ],
    status: 'Pending',
    createdAt: '2025-03-22 11:30',
  },
  // Accepted (2)
  {
    key: 'sugg-5',
    suggestionId: 'SUGG-2025-0005',
    agentName: 'Agent-SG',
    liveVersion: 'v2.0',
    suggestionType: 'Modify Rule',
    errorType: 'Wrong Rule',
    affectedField: 'amount_variance',
    confidence: 'High',
    reasoning: 'Current 5% threshold too lenient causing false approvals. Should be 2% for high-value invoices (>$50K) and 3% for others.',
    promptDiff: `- IF amount_variance > 0.05 THEN reject
+ IF amount_variance > 0.02 AND invoice_amount > 50000 THEN reject
+ IF amount_variance > 0.03 AND invoice_amount <= 50000 THEN reject`,
    relatedFeedbacks: [
      { prId: 'PR-2025-003', step: 'AP Voucher', contentSummary: 'GL account mapping' },
    ],
    status: 'Accepted',
    processedBy: 'Admin User',
    processedAt: '2025-03-21 16:30',
    createdAt: '2025-03-21 10:00',
  },
  {
    key: 'sugg-6',
    suggestionId: 'SUGG-2025-0006',
    agentName: 'Agent-TH',
    liveVersion: 'v1.9',
    suggestionType: 'Add Rule',
    errorType: 'Missing Rule',
    affectedField: 'line_item_qty',
    confidence: 'High',
    reasoning: 'All line items should be validated against PO quantities. Currently only checking header-level totals.',
    promptDiff: `+ FOR EACH line_item IN invoice:
+   CHECK line_item.quantity AGAINST po.line_item.quantity
+   FLAG if variance > 2%`,
    relatedFeedbacks: [
      { prId: 'PR-2025-008', step: 'Match', contentSummary: 'Line item details missing' },
    ],
    status: 'Accepted',
    processedBy: 'Admin User',
    processedAt: '2025-03-20 14:15',
    createdAt: '2025-03-20 09:30',
  },
  // Rejected (1)
  {
    key: 'sugg-7',
    suggestionId: 'SUGG-2025-0007',
    agentName: 'Agent-SG',
    liveVersion: 'v2.0',
    suggestionType: 'Add Rule',
    errorType: 'Missing Rule',
    affectedField: 'invoice_timing',
    confidence: 'Medium',
    reasoning: 'Flag invoices received before PO creation date',
    promptDiff: `+ ADD early_invoice_check
+ IF invoice_date < po_creation_date THEN flag as early`,
    relatedFeedbacks: [
      { prId: 'PR-2025-009', step: 'Invoice Review', contentSummary: 'Early invoice flagging' },
    ],
    status: 'Rejected',
    rejectReason: 'This behavior is by design per latest business requirements v2.3',
    processedBy: 'Admin User',
    processedAt: '2025-03-19 17:00',
    createdAt: '2025-03-19 16:45',
  },
  // Withdrawn (1)
  {
    key: 'sugg-8',
    suggestionId: 'SUGG-2025-0008',
    agentName: 'Agent-ID',
    liveVersion: 'v2.0',
    suggestionType: 'Modify Rule',
    errorType: 'Wrong Rule',
    affectedField: 'cost_center',
    confidence: 'Medium',
    reasoning: 'Cost center mapping needs update',
    promptDiff: `- cost_center_mapping: CC-2001
+ cost_center_mapping: CC-2002`,
    relatedFeedbacks: [
      { prId: 'PR-2025-010', step: 'AP Voucher', contentSummary: 'Cost center validation' },
    ],
    status: 'Withdrawn',
    processedBy: 'Admin User',
    processedAt: '2025-03-19 10:30',
    createdAt: '2025-03-18 15:00',
  },
]

// ── Agent B Run Detail ───────────────────────────────────────────────
export type AgentBSuggestionStatus = 'Pending' | 'Accepted' | 'Rejected'
export type AgentBSuggestionType = 'ADD_RULE' | 'MODIFY_RULE' | 'DATA_POINT'

export interface AgentBRuleChange {
  type: AgentBSuggestionType
  title: string
  feedbackSource: {
    prNo: string
    checkItem: string
    comment: string
  }
  analysisNotes: string
  ruleChange: {
    currentRule?: string
    suggestedRule?: string
    newRule?: string
    observation?: string
    insertInto?: string
  }
}

export interface AgentBSuggestion {
  key: string
  ruleChange: AgentBRuleChange
  confidence: number
  status: AgentBSuggestionStatus
}

export interface AgentBRunDetail {
  runId: string
  caseId: string
  invoiceNo: string
  supplierName: string
  step: FeedbackStep
  region: string
  entity: string
  runAt: string
  agentVersion: string
  agentName: string
  suggestions: AgentBSuggestion[]
  analysisNotes: string
}

export const agentBRunData: Record<string, AgentBRunDetail> = {
  'RUN-B-001': {
    runId: 'RUN-B-001',
    caseId: 'CASE-001',
    invoiceNo: 'INV-2025-0001',
    supplierName: 'Accenture Pte Ltd',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    runAt: '2025-03-20 10:28',
    agentVersion: 'v2.1.0',
    agentName: 'Invoice Format Check Agent',
    suggestions: [
      {
        key: 's1',
        confidence: 0.92,
        status: 'Pending',
        ruleChange: {
          type: 'ADD_RULE',
          title: 'Add BIR Information Validation Rule',
          feedbackSource: {
            prNo: 'PR-2024-08821',
            checkItem: 'Invoice Info Check',
            comment: 'Invoice info needs to check BIR information, this rule was not in the prompt',
          },
          analysisNotes: 'The human reviewer flagged that BIR (Business Identification Number) validation is entirely absent from the current Invoice Format Check Agent prompt. BIR is a mandatory field for PH entity supplier invoices under local tax compliance requirements. Recommend adding as a hard-fail rule.',
          ruleChange: {
            newRule: `Rule: BIR Information Validation (PH Entity)
Applicability: Invoices where supplier entity = PH
Check: BIR (Business Identification Number) must be
present on invoice face and must match supplier
master data BIR field exactly.
Failure condition: BIR absent or mismatch → REJECT
with reason: "BIR validation failed"`,
            insertInto: 'Invoice Format Check Agent → Section: Required Invoice Fields',
          },
        },
      },
      {
        key: 's2',
        confidence: 0.87,
        status: 'Pending',
        ruleChange: {
          type: 'MODIFY_RULE',
          title: 'Update Date Format Validation',
          feedbackSource: {
            prNo: 'PR-2024-08831',
            checkItem: 'Invoice Date Format',
            comment: 'Date format is incorrect, should be DD/MM/YYYY not MM/DD/YYYY',
          },
          analysisNotes: 'Current prompt accepts MM/DD/YYYY as a valid date format. Multiple reviewers have flagged that the regional standard is DD/MM/YYYY. Accepting MM/DD/YYYY risks misreading dates (e.g. 01/02 could mean Jan 2 or Feb 1). Recommend changing validation to enforce DD/MM/YYYY only.',
          ruleChange: {
            currentRule: `Rule: Invoice Date Format
Invoice date must be within 90 days of today.

Accepted formats: MM/DD/YYYY, DD/MM/YYYY
Partial match accepted for date format.
Cross-check date against PO issue date.`,
            suggestedRule: `Rule: Invoice Date Format
Invoice date must be within 90 days of today.

Accepted format: DD/MM/YYYY only.
Reject invoices with MM/DD/YYYY format with reason:
"Invalid date format — use DD/MM/YYYY"
Cross-check date against PO issue date.`,
          },
        },
      },
    ],
    analysisNotes: 'Agent B analyzed 2 feedback items for Invoice Format Check Agent. Two rule gaps were identified: (1) BIR validation is entirely absent from current prompt for PH entity invoices; (2) date format validation accepts MM/DD/YYYY but reviewers expect DD/MM/YYYY. One prompt modification and one new rule are recommended.',
  },
}

// ── Feedback Suggestion Run List ─────────────────────────────────────
export type SuggestionRunStatus = 'Pending Review' | 'Accepted' | 'Rejected' | 'Running'

export interface SuggestionRun {
  key: string
  runId: string           // Agent Run ID (e.g RUN-B-001)
  triggeredAt: string
  agentName: string
  step: FeedbackStep
  caseCount: number
  suggestionCount: number
  status: SuggestionRunStatus
  acceptedCount: number
  rejectedCount: number
  pendingCount: number
}

export const suggestionRunData: SuggestionRun[] = [
  {
    key: 'run-1',
    runId: 'RUN-B-001',
    triggeredAt: '2025-03-20 10:28',
    agentName: 'Invoice Format Check Agent',
    step: 'INVOICE_REVIEW',
    caseCount: 1,
    suggestionCount: 2,
    status: 'Pending Review',
    acceptedCount: 0,
    rejectedCount: 0,
    pendingCount: 2,
  },
  {
    key: 'run-2',
    runId: 'RUN-B-002',
    triggeredAt: '2025-03-19 14:18',
    agentName: 'PO Match Agent',
    step: 'MATCH',
    caseCount: 1,
    suggestionCount: 1,
    status: 'Accepted',
    acceptedCount: 1,
    rejectedCount: 0,
    pendingCount: 0,
  },
  {
    key: 'run-3',
    runId: 'RUN-B-003',
    triggeredAt: '2025-03-21 09:12',
    agentName: 'AP Voucher Agent',
    step: 'AP_VOUCHER',
    caseCount: 1,
    suggestionCount: 1,
    status: 'Pending Review',
    acceptedCount: 0,
    rejectedCount: 0,
    pendingCount: 1,
  },
]

// ── Statistics ──────────────────────────────────────�������───────────────
export type StatisticsStep = 'INVOICE_REVIEW' | 'MATCH' | 'AP_VOUCHER'

export interface DailyMetrics {
  date: string // YYYY-MM-DD
  totalCount: number
  automationRate: number // percentage 0-100
  pendingRate: number
  hardAccuracy: number
  precisionPositive: number
  precisionNegative: number
  riskExposureSGD: number
  feedbackCoverageRate: number
}

export interface StepStatistics {
  step: StatisticsStep
  dailyMetrics: DailyMetrics[]
}

// Generate last 7 days of data
function generateDailyMetrics(step: StatisticsStep): DailyMetrics[] {
  const today = new Date()
  const metrics: DailyMetrics[] = []

  const baseData = {
    INVOICE_REVIEW: { totalCount: 65, automationRate: 72, pendingRate: 18, hardAccuracy: 87, precisionPositive: 91, precisionNegative: 84, riskExposure: 12500, feedbackCoverage: 44 },
    MATCH: { totalCount: 58, automationRate: 68, pendingRate: 20, hardAccuracy: 85, precisionPositive: 89, precisionNegative: 82, riskExposure: 0, feedbackCoverage: 38 },
    AP_VOUCHER: { totalCount: 52, automationRate: 70, pendingRate: 16, hardAccuracy: 88, precisionPositive: 92, precisionNegative: 85, riskExposure: 0, feedbackCoverage: 41 },
  }

  const base = baseData[step]

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const variance = Math.sin(i / 3) * 5 // Creates smooth variation
    const riskVariance = i === 4 ? 18000 : Math.random() * 5000 + 3000 // Spike on day 4

    metrics.push({
      date: dateStr,
      totalCount: base.totalCount + Math.floor(Math.random() * 20 - 10),
      automationRate: Math.min(100, Math.max(60, base.automationRate + variance)),
      pendingRate: Math.min(40, Math.max(10, base.pendingRate - variance / 2)),
      hardAccuracy: Math.min(100, Math.max(75, base.hardAccuracy + variance)),
      precisionPositive: Math.min(100, Math.max(85, base.precisionPositive + variance / 2)),
      precisionNegative: Math.min(100, Math.max(75, base.precisionNegative + variance / 2)),
      riskExposureSGD: step === 'INVOICE_REVIEW' ? Math.floor(riskVariance) : 0,
      feedbackCoverageRate: Math.min(100, Math.max(30, base.feedbackCoverage + Math.random() * 10)),
    })
  }

  return metrics
}

export const statisticsData: StepStatistics[] = [
  { step: 'INVOICE_REVIEW', dailyMetrics: generateDailyMetrics('INVOICE_REVIEW') },
  { step: 'MATCH', dailyMetrics: generateDailyMetrics('MATCH') },
  { step: 'AP_VOUCHER', dailyMetrics: generateDailyMetrics('AP_VOUCHER') },
]

// ── Agent B Run Overview ────────────────────────────────────────────
export type AgentRunCardStatus = 'Analyzing' | 'Completed' | 'Failed'

export interface AgentRunCard {
  agentName: string
  step: FeedbackStep
  status: AgentRunCardStatus
  feedbackCount: number
  suggestionCount?: number
  runDetailId: string // Links to agentBRunData key
}

export interface AgentBRunOverview {
  runId: string
  triggeredBy: string
  triggeredAt: string
  feedbackCount: number
  agentCount: number
  completedCount: number
  overallStatus: 'In Progress' | 'Completed' | 'Failed'
  agentCards: AgentRunCard[]
}

export const agentBRunOverviewData: Record<string, AgentBRunOverview> = {
  'RUN-OV-001': {
    runId: 'RUN-OV-001',
    triggeredBy: 'Li Wei',
    triggeredAt: '2025-03-20 10:28',
    feedbackCount: 3,
    agentCount: 2,
    completedCount: 1,
    overallStatus: 'In Progress',
    agentCards: [
      {
        agentName: 'Invoice Format Check Agent',
        step: 'INVOICE_REVIEW',
        status: 'Completed',
        feedbackCount: 2,
        suggestionCount: 2,
        runDetailId: 'RUN-B-001',
      },
      {
        agentName: 'Duplicate Invoice Agent',
        step: 'INVOICE_REVIEW',
        status: 'Analyzing',
        feedbackCount: 1,
        runDetailId: 'RUN-B-002',
      },
    ],
  },
  'RUN-OV-002': {
    runId: 'RUN-OV-002',
    triggeredBy: 'Zhang Min',
    triggeredAt: '2025-03-19 14:18',
    feedbackCount: 2,
    agentCount: 1,
    completedCount: 1,
    overallStatus: 'Completed',
    agentCards: [
      {
        agentName: 'PO Match Agent',
        step: 'MATCH',
        status: 'Completed',
        feedbackCount: 2,
        suggestionCount: 4,
        runDetailId: 'RUN-B-001',
      },
    ],
  },
}
