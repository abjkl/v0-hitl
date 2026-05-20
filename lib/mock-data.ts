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
    { key: "1",  caseId: "CASE-001", paymentRequestId: "PR-2025-00134", paymentGroupId: "PG-2025-0021", invoiceNo: "INV-2025-0001", supplier: "Accenture Pte Ltd",         region: "SG", groundTruth: "Pass", patterns: ["header-check"], amount: 48500, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-01-10" },
    { key: "2",  caseId: "CASE-002", paymentRequestId: "PR-2025-00157", paymentGroupId: "PG-2025-0022", invoiceNo: "INV-2025-0002", supplier: "AWS Singapore Pte Ltd",   region: "SG", groundTruth: "Fail", patterns: ["supplier-name-mismatch"], amount: 12300, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-01-15" },
    { key: "3",  caseId: "CASE-012", paymentRequestId: "PR-2025-00198", paymentGroupId: "PG-2025-0031", invoiceNo: "INV-2025-0012", supplier: "Accenture Pte Ltd",         region: "SG", groundTruth: "Pass", patterns: ["date-out-of-range"], amount: 76200, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-01-22" },
    { key: "4",  caseId: "CASE-014", paymentRequestId: "PR-2025-00203", paymentGroupId: "PG-2025-0033", invoiceNo: "INV-2025-0014", supplier: "Google Asia Pacific",     region: "SG", groundTruth: "Fail", patterns: ["amount-mismatch"], amount: 9850, currency: "SGD", addedBy: { name: "tan.meiling@shopee.com", email: "tanml@shopee.com" }, addedDate: "2025-02-03" },
    { key: "5",  caseId: "CASE-021", paymentRequestId: "PR-2025-00245", paymentGroupId: "PG-2025-0041", invoiceNo: "INV-2025-0021", supplier: "DHL Express Pte Ltd",      region: "SG", groundTruth: "Pass", patterns: ["gst-calculation-error"], amount: 3200, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-02-11" },
    { key: "6",  caseId: "CASE-033", paymentRequestId: "PR-2025-00312", paymentGroupId: "PG-2025-0052", invoiceNo: "INV-2025-0033", supplier: "Deloitte Singapore",       region: "SG", groundTruth: "Fail", patterns: ["duplicate-invoice"], amount: 128000, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-02-18" },
    { key: "7",  caseId: "CASE-045", paymentRequestId: "PR-2025-00389", paymentGroupId: "PG-2025-0061", invoiceNo: "INV-2025-0045", supplier: "Grab Singapore Pte Ltd",   region: "SG", groundTruth: "Pass", patterns: ["header-check"], amount: 5670, currency: "SGD", addedBy: { name: "tan.meiling@shopee.com", email: "tanml@shopee.com" }, addedDate: "2025-03-01" },
    { key: "8",  caseId: "CASE-058", paymentRequestId: "PR-2025-00421", paymentGroupId: "PG-2025-0074", invoiceNo: "INV-2025-0058", supplier: "Microsoft Singapore",     region: "SG", groundTruth: "Pass", patterns: ["gst-calculation-error", "header-check"], amount: 34900, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-03-12" },
  ],
  MATCH: [
    { key: "1", caseId: "CASE-003", paymentRequestId: "PR-2025-00161", paymentGroupId: "PG-2025-0023", invoiceNo: "INV-2025-0003", supplier: "Accenture Pte Ltd",       region: "SG", groundTruth: "Matched", patterns: ["three-way-match-fail"], amount: 48500, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-01-11" },
    { key: "2", caseId: "CASE-008", paymentRequestId: "PR-2025-00175", paymentGroupId: "PG-2025-0027", invoiceNo: "INV-2025-0008", supplier: "Siemens Singapore",      region: "SG", groundTruth: "NA", patterns: ["line-item-qty-mismatch"], amount: 220000, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-01-19" },
    { key: "3", caseId: "CASE-016", paymentRequestId: "PR-2025-00211", paymentGroupId: "PG-2025-0034", invoiceNo: "INV-2025-0016", supplier: "Salesforce Singapore",   region: "SG", groundTruth: "Matched", patterns: ["unit-price-discrepancy"], amount: 67400, currency: "SGD", addedBy: { name: "tan.meiling@shopee.com", email: "tanml@shopee.com" }, addedDate: "2025-02-05" },
    { key: "4", caseId: "CASE-024", paymentRequestId: "PR-2025-00267", paymentGroupId: "PG-2025-0043", invoiceNo: "INV-2025-0024", supplier: "DHL Express Pte Ltd",     region: "SG", groundTruth: "NA", patterns: ["three-way-match-fail"], amount: 3200, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-02-14" },
    { key: "5", caseId: "CASE-039", paymentRequestId: "PR-2025-00341", paymentGroupId: "PG-2025-0057", invoiceNo: "INV-2025-0039", supplier: "Oracle Singapore",        region: "SG", groundTruth: "Matched", patterns: ["line-item-qty-mismatch"], amount: 95000, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-02-25" },
    { key: "6", caseId: "CASE-052", paymentRequestId: "PR-2025-00401", paymentGroupId: "PG-2025-0069", invoiceNo: "INV-2025-0052", supplier: "SAP Asia Pacific",       region: "SG", groundTruth: "Matched", patterns: ["unit-price-discrepancy"], amount: 183500, currency: "SGD", addedBy: { name: "tan.meiling@shopee.com", email: "tanml@shopee.com" }, addedDate: "2025-03-08" },
  ],
  AP_VOUCHER: [
    { key: "1", caseId: "CASE-005", paymentRequestId: "PR-2025-00168", paymentGroupId: "PG-2025-0025", invoiceNo: "INV-2025-0005", supplier: "AWS Singapore Pte Ltd",    region: "SG", groundTruth: "Submitted to EBS", patterns: ["gl-account-wrong"], amount: 12300, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-01-13" },
    { key: "2", caseId: "CASE-011", paymentRequestId: "PR-2025-00193", paymentGroupId: "PG-2025-0030", invoiceNo: "INV-2025-0011", supplier: "Google Asia Pacific",    region: "SG", groundTruth: "Pending", patterns: ["cost-center-mismatch"], amount: 9850, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-01-20" },
    { key: "3", caseId: "CASE-027", paymentRequestId: "PR-2025-00278", paymentGroupId: "PG-2025-0047", invoiceNo: "INV-2025-0027", supplier: "Deloitte Singapore",     region: "SG", groundTruth: "Submitted to EBS", patterns: ["gl-account-wrong"], amount: 128000, currency: "SGD", addedBy: { name: "tan.meiling@shopee.com", email: "tanml@shopee.com" }, addedDate: "2025-02-17" },
    { key: "4", caseId: "CASE-041", paymentRequestId: "PR-2025-00355", paymentGroupId: "PG-2025-0059", invoiceNo: "INV-2025-0041", supplier: "Microsoft Singapore",    region: "SG", groundTruth: "Submitted to EBS", patterns: ["cost-center-mismatch"], amount: 34900, currency: "SGD", addedBy: { name: "li.wei@shopee.com", email: "liwei@shopee.com" }, addedDate: "2025-02-28" },
    { key: "5", caseId: "CASE-063", paymentRequestId: "PR-2025-00438", paymentGroupId: "PG-2025-0081", invoiceNo: "INV-2025-0063", supplier: "Grab Singapore Pte Ltd",  region: "SG", groundTruth: "Pending", patterns: ["gl-account-wrong", "cost-center-mismatch"], amount: 5670, currency: "SGD", addedBy: { name: "chen.jing@shopee.com", email: "chenjing@shopee.com" }, addedDate: "2025-03-15" },
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
export type FeedbackStatus = 'Pending' | 'Processing' | 'New Version Generated'
export type FeedbackStep = 'INVOICE_REVIEW' | 'MATCH' | 'AP_VOUCHER'

export interface FeedbackItem {
  key: string
  feedbackId: string
  caseId: string
  invoiceNo: string
  prNo: string
  poNo: string
  supplierName: string
  step: FeedbackStep
  region: string
  entity: string
  status: FeedbackStatus
  agentBRunId: string
  agentName: string
  agentVersion: string
  suggestedChange: string
  createdAt: string
  updatedAt: string
  processedBy?: string
  processedAt?: string
}

export const feedbackData: FeedbackItem[] = [
  {
    key: 'fb-1',
    feedbackId: 'FB-2025-0001',
    caseId: 'CASE-001',
    invoiceNo: 'INV-2025-0001',
    prNo: 'PR-2025-0001',
    poNo: 'PO-2024-0001',
    supplierName: 'Accenture Pte Ltd',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    status: 'Processing',
    agentBRunId: 'RUN-OV-001',
    agentName: 'Invoice Review Agent',
    agentVersion: 'v1.3.0',
    suggestedChange: 'Update ground truth from Pass to Fail due to amount mismatch',
    createdAt: '2025-03-20 10:30',
    updatedAt: '2025-03-20 10:30',
    processedBy: 'Alice Tan',
    processedAt: '2025-03-20 11:15',
  },
  {
    key: 'fb-2',
    feedbackId: 'FB-2025-0002',
    caseId: 'CASE-002',
    invoiceNo: 'INV-2025-0002',
    prNo: 'PR-2025-0002',
    poNo: 'PO-2024-0002',
    supplierName: 'AWS Singapore Pte Ltd',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    status: 'Pending',
    agentBRunId: 'RUN-OV-001',
    agentName: 'Invoice Review Agent',
    agentVersion: 'v1.3.0',
    suggestedChange: 'Add pattern "duplicate-invoice" to detection list',
    createdAt: '2025-03-20 10:32',
    updatedAt: '2025-03-20 10:32',
  },
  {
    key: 'fb-3',
    feedbackId: 'FB-2025-0003',
    caseId: 'CASE-003',
    invoiceNo: 'INV-2025-0003',
    prNo: 'PR-2025-0003',
    poNo: 'PO-2024-0003',
    supplierName: 'Accenture Pte Ltd',
    step: 'MATCH',
    region: 'SEA',
    entity: 'SG',
    status: 'New Version Generated',
    agentBRunId: 'RUN-OV-002',
    agentName: 'Match Agent',
    agentVersion: 'v2.1.0',
    suggestedChange: 'Update match status from N/A to Matched after PO data correction',
    createdAt: '2025-03-19 14:20',
    updatedAt: '2025-03-19 16:45',
  },
  {
    key: 'fb-4',
    feedbackId: 'FB-2025-0004',
    caseId: 'CASE-008',
    invoiceNo: 'INV-2025-0008',
    prNo: 'PR-2025-0008',
    poNo: 'PO-2024-0008',
    supplierName: 'Siemens Singapore',
    step: 'MATCH',
    region: 'SEA',
    entity: 'SG',
    status: 'Pending',
    agentBRunId: 'RUN-OV-002',
    agentName: 'Match Agent',
    agentVersion: 'v2.1.0',
    suggestedChange: 'Remove pattern "line-item-qty-mismatch" - false positive',
    createdAt: '2025-03-19 14:25',
    updatedAt: '2025-03-19 17:10',
  },
  {
    key: 'fb-5',
    feedbackId: 'FB-2025-0005',
    caseId: 'CASE-005',
    invoiceNo: 'INV-2025-0005',
    prNo: 'PR-2025-0005',
    poNo: 'PO-2024-0005',
    supplierName: 'AWS Singapore Pte Ltd',
    step: 'AP_VOUCHER',
    region: 'SEA',
    entity: 'SG',
    status: 'Processing',
    agentBRunId: 'RUN-OV-001',
    agentName: 'AP Voucher Agent',
    agentVersion: 'v1.0.0',
    suggestedChange: 'Update GL account mapping from 5100 to 5200',
    createdAt: '2025-03-21 09:15',
    updatedAt: '2025-03-21 09:15',
    processedBy: 'Bob Chen',
    processedAt: '2025-03-21 10:02',
  },
  {
    key: 'fb-6',
    feedbackId: 'FB-2025-0006',
    caseId: 'CASE-011',
    invoiceNo: 'INV-2025-0011',
    prNo: 'PR-2025-0011',
    poNo: 'PO-2024-0011',
    supplierName: 'Google Asia Pacific',
    step: 'AP_VOUCHER',
    region: 'SEA',
    entity: 'SG',
    status: 'Pending',
    agentBRunId: 'RUN-OV-001',
    agentName: 'AP Voucher Agent',
    agentVersion: 'v1.0.0',
    suggestedChange: 'Change cost center from CC-1001 to CC-1002',
    createdAt: '2025-03-21 09:20',
    updatedAt: '2025-03-21 09:20',
  },
  {
    key: 'fb-7',
    feedbackId: 'FB-2025-0007',
    caseId: 'CASE-012',
    invoiceNo: 'INV-2025-0012',
    prNo: 'PR-2025-0012',
    poNo: 'PO-2024-0012',
    supplierName: 'Accenture Pte Ltd',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    status: 'Pending',
    agentBRunId: 'RUN-OV-002',
    agentName: 'Invoice Review Agent',
    agentVersion: 'v1.4.0-beta',
    suggestedChange: 'Add pattern "header-check" based on missing vendor code',
    createdAt: '2025-03-22 11:00',
    updatedAt: '2025-03-22 11:00',
  },
  {
    key: 'fb-8',
    feedbackId: 'FB-2025-0008',
    caseId: 'CASE-014',
    invoiceNo: 'INV-2025-0014',
    prNo: 'PR-2025-0014',
    poNo: 'PO-2024-0014',
    supplierName: 'Google Asia Pacific',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    status: 'New Version Generated',
    agentBRunId: 'RUN-OV-002',
    agentName: 'Invoice Review Agent',
    agentVersion: 'v1.4.0-beta',
    suggestedChange: 'Confirm amount mismatch pattern - tolerance exceeded by 5%',
    createdAt: '2025-03-22 11:05',
    updatedAt: '2025-03-22 14:30',
  },
  {
    key: 'fb-9',
    feedbackId: 'FB-2025-0009',
    caseId: 'CASE-016',
    invoiceNo: 'INV-2025-0016',
    prNo: 'PR-2025-0016',
    poNo: 'PO-2024-0016',
    supplierName: 'Salesforce Singapore',
    step: 'MATCH',
    region: 'SEA',
    entity: 'SG',
    status: 'New Version Generated',
    agentBRunId: 'RUN-OV-001',
    agentName: 'Match Agent',
    agentVersion: 'v2.0.0',
    suggestedChange: 'Flag unit price discrepancy - USD to SGD conversion error',
    createdAt: '2025-03-23 08:45',
    updatedAt: '2025-03-23 08:45',
    processedBy: 'Alice Tan',
    processedAt: '2025-03-23 09:30',
  },
  {
    key: 'fb-10',
    feedbackId: 'FB-2025-0010',
    caseId: 'CASE-021',
    invoiceNo: 'INV-2025-0021',
    prNo: 'PR-2025-0021',
    poNo: 'PO-2024-0021',
    supplierName: 'DHL Express Pte Ltd',
    step: 'INVOICE_REVIEW',
    region: 'SEA',
    entity: 'SG',
    status: 'Pending',
    agentBRunId: 'RUN-OV-001',
    agentName: 'Invoice Review Agent',
    agentVersion: 'v1.3.0',
    suggestedChange: 'Remove GST calculation error flag - tax rate is correct',
    createdAt: '2025-03-23 08:50',
    updatedAt: '2025-03-23 10:15',
  },
  {
    key: 'fb-11',
    feedbackId: 'FB-2025-0011',
    caseId: 'CASE-024',
    invoiceNo: 'INV-2025-0024',
    supplierName: 'DHL Express Pte Ltd',
    step: 'MATCH',
    region: 'SEA',
    entity: 'SG',
    status: 'New Version Generated',
    agentBRunId: 'RUN-OV-002',
    suggestedChange: 'Update three-way match status - GR confirmed',
    createdAt: '2025-03-24 15:30',
    updatedAt: '2025-03-24 15:30',
  },
  {
    key: 'fb-12',
    feedbackId: 'FB-2025-0012',
    caseId: 'CASE-027',
    invoiceNo: 'INV-2025-0027',
    supplierName: 'Deloitte Singapore',
    step: 'AP_VOUCHER',
    region: 'SEA',
    entity: 'SG',
    status: 'New Version Generated',
    agentBRunId: 'RUN-OV-002',
    suggestedChange: 'Correct GL account from 4100 to 4200 for consulting services',
    createdAt: '2025-03-24 15:35',
    updatedAt: '2025-03-24 17:00',
  },
]

// ── Agent B Run Detail ───────────────────────────────────────────────
export type AgentBSuggestionStatus = 'Pending' | 'Accepted' | 'Rejected'
export type AgentBSuggestionType = 'MODIFY_PROMPT' | 'DATA_POINT'

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
    currentPrompt?: string
    suggestedPrompt?: string
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
        confidence: 0.91,
        status: 'New Version Generated',
        ruleChange: {
          type: 'MODIFY_PROMPT',
          title: 'Adjust Date Format Validation Logic',
          feedbackSource: {
            prNo: 'PR-2024-08821',
            checkItem: 'Invoice Date Format',
            comment: 'Current validation accepts MM/DD/YYYY but reviewers expect DD/MM/YYYY for consistency',
          },
          analysisNotes: 'Multiple reviewers noted inconsistency in date format acceptance. Current rule allows MM/DD/YYYY (US format) but company standard requires DD/MM/YYYY for uniformity across Asia-Pacific. Recommend tightening validation to strictly enforce DD/MM/YYYY only.',
          ruleChange: {
            currentRule: `Rule: Invoice Date Format
Accepts date formats: DD/MM/YYYY or MM/DD/YYYY
If date format invalid → flag as FAIL`,
            suggestedRule: `Rule: Invoice Date Format
Accepts date format: DD/MM/YYYY only (company standard for SEA/EA regions)
If date format other than DD/MM/YYYY → flag as FAIL`,
          },
        },
      },
      {
        key: 's2',
        confidence: 0.87,
        status: 'Pending',
        ruleChange: {
          type: 'MODIFY_PROMPT',
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
      {
        key: 's3',
        confidence: 0.89,
        status: 'Pending',
        ruleChange: {
          type: 'MODIFY_PROMPT',
          title: 'Enhance Prompt with Currency Handling Guidelines',
          feedbackSource: {
            prNo: 'PR-2024-08845',
            checkItem: 'Currency Normalization',
            comment: 'Agent should normalize all currencies to SGD using latest exchange rates before validation',
          },
          analysisNotes: 'The current prompt does not provide guidance on multi-currency invoice handling. Reviewers flagged that invoices in USD, EUR, and other currencies require normalization to SGD for proper matching and amount validation. Recommend adding explicit currency handling guidance to the system prompt.',
          ruleChange: {
            currentPrompt: `You are an Invoice Format Check Agent. Your role is to validate invoice format compliance and identify any structural issues.

Key Responsibilities:
1. Check invoice header information (vendor name, invoice date, invoice number)
2. Validate invoice line items (description, quantity, unit price)
3. Verify invoice footer (total amount, tax calculation if applicable)
4. Ensure date format is DD/MM/YYYY
5. Cross-reference with PO data for completeness

Report any format violations as FAIL with detailed reasons.`,
            suggestedPrompt: `You are an Invoice Format Check Agent. Your role is to validate invoice format compliance and identify any structural issues.

Key Responsibilities:
1. Check invoice header information (vendor name, invoice date, invoice number)
2. Validate invoice line items (description, quantity, unit price)
3. Verify invoice footer (total amount, tax calculation if applicable)
4. Ensure date format is DD/MM/YYYY
5. Cross-reference with PO data for completeness

Currency Handling:
- If invoice is in foreign currency (USD, EUR, etc.), normalize all amounts to SGD
- Use current exchange rate from financial system
- Apply normalization before any amount validations
- Document original currency and exchange rate used in report

Report any format violations as FAIL with detailed reasons.`,
          },
        },
      },
    ],
    analysisNotes: 'Agent B analyzed 2 feedback items for Invoice Format Check Agent. One rule modification and one prompt modification are recommended to improve format validation consistency and expand the Agent prompt with enhanced guidelines.',
  },
  'RUN-B-002': {
    runId: 'RUN-B-002',
    triggeredBy: 'John Smith',
    triggeredAt: '2025-03-19 14:18',
    feedbackCount: 1,
    agentCount: 1,
    completedCount: 1,
    region: 'SEA',
    entity: 'SG',
    runAt: '2025-03-19 14:18',
    agentVersion: 'v2.0.0',
    agentName: 'PO Match Agent',
    suggestions: [
      {
        key: 's1',
        confidence: 0.95,
        status: 'New Version Generated',
        ruleChange: {
          type: 'MODIFY_PROMPT',
          title: 'Tighten Line-Item Quantity Matching Tolerance',
          feedbackSource: {
            prNo: 'PR-2024-08832',
            checkItem: 'Line Item Quantity Match',
            comment: 'Current tolerance of 10% is too loose; should be 5% or less',
          },
          analysisNotes: 'Multiple reviewers noted false PASS results when invoice quantities were 7-10% off from PO. This is unacceptable in procurement. Recommend lowering tolerance from 10% to 5% for strict compliance. Risk of accepting fraudulent or erroneous invoices is too high.',
          ruleChange: {
            currentRule: `Rule: Line-Item Quantity Match
PO quantity must match invoice line-item quantity
with tolerance of ±10%.
If mismatch > 10%, flag as FAIL.
Allow partial match if reason documented.`,
            suggestedRule: `Rule: Line-Item Quantity Match
PO quantity must match invoice line-item quantity
with tolerance of ±5%.
If mismatch > 5%, flag as FAIL.
No partial match exceptions allowed.`,
          },
        },
      },
    ],
    analysisNotes: 'Agent B analyzed 1 feedback item for PO Match Agent. One rule modification recommended: tighten line-item quantity matching tolerance from ±10% to ±5% for stricter compliance.',
  },
  'RUN-B-003': {
    runId: 'RUN-B-003',
    triggeredBy: 'Sarah Johnson',
    triggeredAt: '2025-03-21 09:12',
    feedbackCount: 1,
    agentCount: 1,
    completedCount: 1,
    region: 'SEA',
    entity: 'SG',
    runAt: '2025-03-21 09:12',
    agentVersion: 'v1.0.0',
    agentName: 'AP Voucher Agent',
    suggestions: [
      {
        key: 's1',
        confidence: 0.88,
        status: 'Pending',
        ruleChange: {
          type: 'DATA_POINT',
          title: 'Observation: GL Account Mapping Pattern Identified',
          feedbackSource: {
            prNo: 'PR-2024-08850',
            checkItem: 'GL Account Assignment',
            comment: 'Noticed pattern in GL account selection for IT service vendors',
          },
          analysisNotes: 'While reviewing AP Voucher processing, multiple IT service vendors (Salesforce, AWS, Microsoft) are being mapped to GL account 5100. However, some of these should map to 5150 (Cloud Services) instead of 5100 (Software License). This is a recurring data pattern that reviewers flagged. No rule change needed; just documenting the observation for manual review and potential future rule development.',
          ruleChange: {
            observation: `Observation: GL Account Assignment Pattern
Multiple IT service vendors are being assigned to GL account 5100 (Software License) when they should potentially be assigned to GL account 5150 (Cloud Services).

Affected vendors:
- Salesforce: Currently 5100, consider 5150
- AWS: Currently 5100, consider 5150  
- Microsoft Azure: Currently 5100, consider 5150

Pattern: Cloud-based SaaS solutions are being over-classified as software licenses. Recommend manual review of GL mapping rules for IT services.

Frequency: Identified in ~15% of IT service invoices in current batch.`,
          },
        },
      },
    ],
    analysisNotes: 'Agent B analyzed 1 feedback item for AP Voucher Agent. One data-point observation documented: potential GL account mapping issue for cloud-based IT services. Recommended for manual review; no rule change at this time.',
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
    status: 'New Version Generated',
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
    triggeredBy: 'li.wei@shopee.com',
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
        agentName: 'PO Match Agent',
        step: 'MATCH',
        status: 'Completed',
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
        agentName: 'AP Voucher Agent',
        step: 'AP_VOUCHER',
        status: 'Completed',
        feedbackCount: 1,
        suggestionCount: 1,
        runDetailId: 'RUN-B-003',
      },
    ],
  },
}

// ── Risk Layer Configuration ─────────────────────────────────────

export type RiskLayerStatus = 'Active' | 'Inactive' | 'Draft'

// Parameter types for the 11 control parameters
export enum ParameterType {
  // Supplier Trust
  LAST_APPROVED_TXN = 'last_approved_txn',
  CUMULATIVE_APPROVED = 'cumulative_approved',
  // Invoice Amount
  AMOUNT_INCL_TAX = 'amount_incl_tax',
  // Matching Quality
  MATCH_VARIANCE = 'match_variance',
  // Doc Strength
  TAGGING_CHECK = 'tagging_check',
  CONTENT_VALIDATION = 'content_validation',
  // Compliance
  CROSS_BORDER = 'cross_border',
  // Anomaly Check
  DUPLICATE_INV = 'duplicate_inv',
  NEAR_DUPLICATE = 'near_duplicate',
  BANK_ACCT_CHANGE = 'bank_acct_change',
}

// operatorType drives which operator set is available:
//   'numeric'  → >, <, =, >=, <=, !=
//   'duration' → >, <, =, >=, <=
//   'boolean'  → no operator shown (pure flag check)
//   'enum'     → =, !=
export type OperatorType = 'numeric' | 'duration' | 'boolean' | 'enum'

export const OPERATORS_FOR_TYPE: Record<OperatorType, string[]> = {
  numeric:  ['>', '<', '=', '>=', '<=', '!='],
  duration: ['>', '<', '=', '>=', '<='],
  boolean:  [],
  enum:     ['=', '!='],
}

export type ConditionOperator = '>' | '<' | '=' | '>=' | '<=' | '!='

export interface ParameterDefinition {
  id: ParameterType
  name: string
  controlBlock: string
  description: string
  inputType: 'month' | 'count_month' | 'currency' | 'none'
  operatorType: OperatorType
  defaultOperator: ConditionOperator | null   // null for boolean fields
  defaultConfig?: Record<string, unknown>
}

export const PARAMETER_DEFINITIONS: ParameterDefinition[] = [
  // Supplier Trust
  { id: ParameterType.LAST_APPROVED_TXN,  name: 'Last Approved Txn',    controlBlock: 'Supplier Trust',   description: 'Time since last approved transaction',   inputType: 'month',       operatorType: 'duration', defaultOperator: '<',  defaultConfig: { value: 6 } },
  { id: ParameterType.CUMULATIVE_APPROVED, name: 'Cumulative Approved', controlBlock: 'Supplier Trust',   description: 'Number of approved PRs within period',  inputType: 'count_month', operatorType: 'numeric',  defaultOperator: '>',  defaultConfig: { count: 5, months: 12 } },
  // Invoice Amount
  { id: ParameterType.AMOUNT_INCL_TAX,    name: 'Amount incl. Tax',     controlBlock: 'Invoice Amount',   description: 'Invoice amount including tax',           inputType: 'currency',    operatorType: 'numeric',  defaultOperator: '<=', defaultConfig: { currency: 'SGD', value: 10000 } },
  // Matching Quality
  { id: ParameterType.MATCH_VARIANCE,     name: 'Match Variance',       controlBlock: 'Matching Quality', description: 'Allowed variance in PO matching',        inputType: 'currency',    operatorType: 'numeric',  defaultOperator: '<=', defaultConfig: { currency: 'SGD', value: 100 } },
  // Doc Strength
  { id: ParameterType.TAGGING_CHECK,      name: 'Tagging Check',        controlBlock: 'Doc Strength',     description: 'Document tagging verification',          inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
  { id: ParameterType.CONTENT_VALIDATION, name: 'Content Validation',   controlBlock: 'Doc Strength',     description: 'Document content validation',            inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
  // Compliance
  { id: ParameterType.CROSS_BORDER,       name: 'Cross Border',         controlBlock: 'Compliance',       description: 'Cross-border transaction check',         inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
  // Anomaly Check
  { id: ParameterType.DUPLICATE_INV,      name: 'Duplicate Invoice',    controlBlock: 'Anomaly Check',    description: 'Check for duplicate invoices',           inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
  { id: ParameterType.NEAR_DUPLICATE,     name: 'Near Duplicate',       controlBlock: 'Anomaly Check',    description: 'Check for near-duplicate invoices',      inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
  { id: ParameterType.BANK_ACCT_CHANGE,   name: 'Bank Account Change',  controlBlock: 'Anomaly Check',    description: 'Detect recent bank account changes',     inputType: 'none',        operatorType: 'boolean',  defaultOperator: null },
]

export interface ConditionNode {
  type: 'condition'
  id: string
  parameterId: ParameterType
  operator: ConditionOperator | null   // null for boolean fields
  config: Record<string, unknown>
}

export interface GroupNode {
  type: 'group'
  id: string
  operator: 'AND' | 'OR'
  children: RuleNode[]
}

export type RuleNode = ConditionNode | GroupNode

export interface ChangeLogEntry {
  timestamp: string
  user: string
  action: 'Created' | 'Updated' | 'Activated' | 'Deactivated'
  details?: string
}

export interface RiskLayerConfig {
  id: string
  region: string
  entity: string
  description: string
  rootRuleNode: GroupNode
  status: RiskLayerStatus
  lastUpdatedBy: string
  lastUpdatedAt: string
  changeLog: ChangeLogEntry[]
}

// Helper to generate unique IDs
let riskLayerIdCounter = 1000
export function generateRuleNodeId(): string {
  return `node-${++riskLayerIdCounter}`
}

// Mock Risk Layer Configurations
// region = country code (SG, MY, TW, BR, ...)
// entity = business entity code (SPXSG, SPXMY, SPETW, ...)
export const INITIAL_RISK_LAYER_CONFIGS: RiskLayerConfig[] = [
  {
    id: 'RL-001',
    region: 'SG',
    entity: 'SPXSG',
    description: 'Standard risk assessment rules for SPX Singapore with supplier trust and amount checks.',
    status: 'Active',
    lastUpdatedBy: 'li.wei@shopee.com',
    lastUpdatedAt: '2025-04-15 14:30',
    rootRuleNode: {
      type: 'group',
      id: 'root-001',
      operator: 'AND',
      children: [
        {
          type: 'group',
          id: 'grp-001-1',
          operator: 'OR',
          children: [
            { type: 'condition', id: 'cond-001-1', parameterId: ParameterType.LAST_APPROVED_TXN, operator: '<', config: { value: 6 } },
            { type: 'condition', id: 'cond-001-2', parameterId: ParameterType.CUMULATIVE_APPROVED, operator: '>', config: { count: 5, months: 12 } },
          ],
        },
        { type: 'condition', id: 'cond-001-3', parameterId: ParameterType.AMOUNT_INCL_TAX, operator: '<=', config: { currency: 'SGD', value: 50000 } },
        { type: 'condition', id: 'cond-001-4', parameterId: ParameterType.DUPLICATE_INV, operator: null, config: {} },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-15 14:30', user: 'li.wei@shopee.com', action: 'Updated', details: 'Adjusted amount threshold from 30,000 to 50,000 SGD' },
      { timestamp: '2025-04-10 09:15', user: 'chen.jing@shopee.com', action: 'Activated' },
      { timestamp: '2025-04-08 16:45', user: 'li.wei@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-002',
    region: 'SG',
    entity: 'SPSG',
    description: 'SPE Singapore risk rules focusing on matching quality and document strength.',
    status: 'Active',
    lastUpdatedBy: 'tan.meiling@shopee.com',
    lastUpdatedAt: '2025-04-12 11:20',
    rootRuleNode: {
      type: 'group',
      id: 'root-002',
      operator: 'AND',
      children: [
        { type: 'condition', id: 'cond-002-1', parameterId: ParameterType.MATCH_VARIANCE, operator: '<=', config: { currency: 'SGD', value: 500 } },
        { type: 'condition', id: 'cond-002-2', parameterId: ParameterType.TAGGING_CHECK, operator: null, config: {} },
        { type: 'condition', id: 'cond-002-3', parameterId: ParameterType.CONTENT_VALIDATION, operator: null, config: {} },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-12 11:20', user: 'tan.meiling@shopee.com', action: 'Updated', details: 'Added content validation check' },
      { timestamp: '2025-04-05 10:00', user: 'tan.meiling@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-003',
    region: 'MY',
    entity: 'SPXMY',
    description: 'SPX Malaysia rules with compliance and anomaly detection focus.',
    status: 'Inactive',
    lastUpdatedBy: 'chen.jing@shopee.com',
    lastUpdatedAt: '2025-04-08 16:00',
    rootRuleNode: {
      type: 'group',
      id: 'root-003',
      operator: 'OR',
      children: [
        { type: 'condition', id: 'cond-003-1', parameterId: ParameterType.CROSS_BORDER, operator: null, config: {} },
        {
          type: 'group',
          id: 'grp-003-1',
          operator: 'AND',
          children: [
            { type: 'condition', id: 'cond-003-2', parameterId: ParameterType.NEAR_DUPLICATE, operator: null, config: {} },
            { type: 'condition', id: 'cond-003-3', parameterId: ParameterType.BANK_ACCT_CHANGE, operator: null, config: {} },
          ],
        },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-08 16:00', user: 'chen.jing@shopee.com', action: 'Deactivated', details: 'Pending review of cross-border rules' },
      { timestamp: '2025-04-02 14:30', user: 'chen.jing@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-004',
    region: 'MY',
    entity: 'SPEMY',
    description: 'SPE Malaysia comprehensive risk assessment with nested conditions.',
    status: 'Active',
    lastUpdatedBy: 'li.wei@shopee.com',
    lastUpdatedAt: '2025-04-18 09:45',
    rootRuleNode: {
      type: 'group',
      id: 'root-004',
      operator: 'AND',
      children: [
        {
          type: 'group',
          id: 'grp-004-1',
          operator: 'OR',
          children: [
            { type: 'condition', id: 'cond-004-1', parameterId: ParameterType.LAST_APPROVED_TXN, operator: '<', config: { value: 3 } },
          ],
        },
        { type: 'condition', id: 'cond-004-3', parameterId: ParameterType.AMOUNT_INCL_TAX, operator: '<=', config: { currency: 'MYR', value: 50000 } },
        {
          type: 'group',
          id: 'grp-004-2',
          operator: 'OR',
          children: [
            { type: 'condition', id: 'cond-004-4', parameterId: ParameterType.DUPLICATE_INV, operator: null, config: {} },
            { type: 'condition', id: 'cond-004-5', parameterId: ParameterType.NEAR_DUPLICATE, operator: null, config: {} },
          ],
        },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-18 09:45', user: 'li.wei@shopee.com', action: 'Updated', details: 'Added anomaly check group' },
      { timestamp: '2025-04-14 11:00', user: 'li.wei@shopee.com', action: 'Activated' },
      { timestamp: '2025-04-12 15:30', user: 'li.wei@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-005',
    region: 'TW',
    entity: 'SPXTW',
    description: "SPX Taiwan draft configuration for new risk parameters.",
    status: 'Draft',
    lastUpdatedBy: 'tan.meiling@shopee.com',
    lastUpdatedAt: '2025-04-20 10:00',
    rootRuleNode: {
      type: 'group',
      id: 'root-005',
      operator: 'AND',
      children: [
        { type: 'condition', id: 'cond-005-1', parameterId: ParameterType.CUMULATIVE_APPROVED, operator: '>', config: { count: 10, months: 6 } },
        { type: 'condition', id: 'cond-005-2', parameterId: ParameterType.MATCH_VARIANCE, operator: '<=', config: { currency: 'TWD', value: 5000 } },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-20 10:00', user: 'tan.meiling@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-006',
    region: 'TW',
    entity: 'SPETW',
    description: 'SPE Taiwan risk assessment with strict document and compliance checks.',
    status: 'Active',
    lastUpdatedBy: 'chen.jing@shopee.com',
    lastUpdatedAt: '2025-04-17 14:15',
    rootRuleNode: {
      type: 'group',
      id: 'root-006',
      operator: 'AND',
      children: [
        { type: 'condition', id: 'cond-006-1', parameterId: ParameterType.LAST_APPROVED_TXN, operator: '<', config: { value: 12 } },
        { type: 'condition', id: 'cond-006-2', parameterId: ParameterType.AMOUNT_INCL_TAX, operator: '<=', config: { currency: 'TWD', value: 300000 } },
        { type: 'condition', id: 'cond-006-3', parameterId: ParameterType.TAGGING_CHECK, operator: null, config: {} },
        { type: 'condition', id: 'cond-006-4', parameterId: ParameterType.CROSS_BORDER, operator: null, config: {} },
        { type: 'condition', id: 'cond-006-5', parameterId: ParameterType.BANK_ACCT_CHANGE, operator: null, config: {} },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-17 14:15', user: 'chen.jing@shopee.com', action: 'Updated', details: 'Extended last approved txn period to 12 months' },
      { timestamp: '2025-04-10 09:30', user: 'chen.jing@shopee.com', action: 'Activated' },
      { timestamp: '2025-04-06 16:00', user: 'chen.jing@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-007',
    region: 'BR',
    entity: 'SPXBR',
    description: "SPX Brazil risk configuration with comprehensive anomaly detection.",
    status: 'Draft',
    lastUpdatedBy: 'tan.meiling@shopee.com',
    lastUpdatedAt: '2025-04-19 15:00',
    rootRuleNode: {
      type: 'group',
      id: 'root-007',
      operator: 'OR',
      children: [
        {
          type: 'group',
          id: 'grp-007-1',
          operator: 'AND',
          children: [
            { type: 'condition', id: 'cond-007-1', parameterId: ParameterType.DUPLICATE_INV, operator: null, config: {} },
            { type: 'condition', id: 'cond-007-2', parameterId: ParameterType.NEAR_DUPLICATE, operator: null, config: {} },
          ],
        },
        { type: 'condition', id: 'cond-007-3', parameterId: ParameterType.BANK_ACCT_CHANGE, operator: null, config: {} },
        { type: 'condition', id: 'cond-007-4', parameterId: ParameterType.CROSS_BORDER, operator: null, config: {} },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-19 15:00', user: 'tan.meiling@shopee.com', action: 'Created' },
    ],
  },
  {
    id: 'RL-008',
    region: 'BR',
    entity: 'SPEBR',
    description: 'SPE Brazil entity rules with supplier trust and compliance focus.',
    status: 'Active',
    lastUpdatedBy: 'li.wei@shopee.com',
    lastUpdatedAt: '2025-04-16 11:30',
    rootRuleNode: {
      type: 'group',
      id: 'root-008',
      operator: 'AND',
      children: [
        {
          type: 'group',
          id: 'grp-008-1',
          operator: 'AND',
          children: [
            { type: 'condition', id: 'cond-008-1', parameterId: ParameterType.TAGGING_CHECK, operator: null, config: {} },
            { type: 'condition', id: 'cond-008-2', parameterId: ParameterType.CONTENT_VALIDATION, operator: null, config: {} },
          ],
        },
        { type: 'condition', id: 'cond-008-3', parameterId: ParameterType.CROSS_BORDER, operator: null, config: {} },
        { type: 'condition', id: 'cond-008-4', parameterId: ParameterType.AMOUNT_INCL_TAX, operator: '<=', config: { currency: 'BRL', value: 50000 } },
      ],
    },
    changeLog: [
      { timestamp: '2025-04-16 11:30', user: 'li.wei@shopee.com', action: 'Updated', details: 'Added amount threshold' },
      { timestamp: '2025-04-11 10:00', user: 'li.wei@shopee.com', action: 'Created' },
    ],
  },
]

// Helper to get parameter definition by ID
export function getParameterDefinition(id: ParameterType): ParameterDefinition | undefined {
  return PARAMETER_DEFINITIONS.find((p) => p.id === id)
}

// Helper to count active rules in a config
export function countActiveRules(node: RuleNode): number {
  if (node.type === 'condition') return 1
  return node.children.reduce((sum, child) => sum + countActiveRules(child), 0)
}

// Helper to generate logic summary string
export function generateLogicSummary(node: RuleNode, depth = 0): string {
  if (node.type === 'condition') {
    const param = getParameterDefinition(node.parameterId)
    return param?.name ?? node.parameterId
  }
  const childSummaries = node.children.map((c) => generateLogicSummary(c, depth + 1))
  const joined = childSummaries.join(` ${node.operator} `)
  return depth > 0 ? `(${joined})` : joined
}

// =====================================================
// Purchase Request (PR) Types and Data
// =====================================================

export type PRStatus =
  | 'Draft'
  | 'Pending Approval'
  | 'Approved'
  | 'Rejected'
  | 'Processing'
  | 'Completed'

export type RiskRuleCode =
  | 'LAST_APPROVED_TXN'
  | 'CUMULATIVE_APPROVED'
  | 'AMOUNT_INCL_TAX'
  | 'MATCH_VARIANCE'
  | 'CROSS_BORDER'
  | 'DUPLICATE_INV'
  | 'NEAR_DUPLICATE'
  | 'BANK_ACCT_CHANGE'

export interface RiskRule {
  code: RiskRuleCode
  name: string
  description: string
  severity: 'high' | 'medium' | 'low'
  uiName: string
  threshold: string
  actualValue: string
  riskMessage: string
  triggeredExpression: string
}

export interface PRItem {
  id: string
  itemNumber: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  deliveryDate: string
}

export interface PRAttachment {
  id: string
  fileName: string
  fileSize: string
  uploadedAt: string
  uploadedBy: string
}

// AI Review Result Types
export type AIReviewResult = 'Approve' | 'Reject' | 'Require Human Review' | 'Cannot Provide Decision'

export interface AICheckItemResult {
  key: string           // matches CHECK_ITEMS key in payment-request-detail
  status: 'pass' | 'fail' | 'warning'
  feedback: string
}

export interface AIReviewInfo {
  result: AIReviewResult
  confidence: number
  message: string
  timestamp: string
  checkItems?: AICheckItemResult[]
}

export interface PurchaseRequest {
  id: string
  prNumber: string
  title: string
  description: string
  requestor: string
  requestorEmail: string
  department: string
  region: string
  createdAt: string
  updatedAt: string
  status: PRStatus
  totalAmount: number
  currency: string
  vendor: string
  vendorCode: string
  isRisk: boolean
  riskRules: RiskRuleCode[]
  items: PRItem[]
  attachments: PRAttachment[]
  approver: string
  approverEmail: string
  urgency: 'Low' | 'Medium' | 'High' | 'Critical'
  aiReview?: AIReviewInfo
}

// Risk Rules Definition based on Risk Layer Check Parameters
export const riskRulesDefinition: Record<RiskRuleCode, RiskRule> = {
  LAST_APPROVED_TXN: {
    code: 'LAST_APPROVED_TXN',
    name: 'Last Approved Txn',
    description: 'Supplier Trust check: Last approved transaction is older than threshold.',
    severity: 'medium',
    uiName: 'Last Approved Txn',
    threshold: '< 6 months',
    actualValue: '8 months ago',
    riskMessage: 'Supplier Trust: Last approved transaction was 8 months ago, exceeds 6 month threshold',
    triggeredExpression: 'Last Approved Txn > 6 months',
  },
  CUMULATIVE_APPROVED: {
    code: 'CUMULATIVE_APPROVED',
    name: 'Cumulative Approved',
    description: 'Supplier Trust check: Too many PRs approved within a short period.',
    severity: 'medium',
    uiName: 'Cumulative Approved',
    threshold: '> 5 PRs within 3 months',
    actualValue: '8 PRs in 2 months',
    riskMessage: 'Supplier Trust: 8 PRs approved within 2 months, exceeds threshold of 5 PRs per 3 months',
    triggeredExpression: 'Cumulative Approved > 5 PRs within 3 months',
  },
  AMOUNT_INCL_TAX: {
    code: 'AMOUNT_INCL_TAX',
    name: 'Amount incl. Tax',
    description: 'Invoice Amount check: Amount including tax exceeds threshold.',
    severity: 'high',
    uiName: 'Amount incl. Tax',
    threshold: '<= USD 50,000',
    actualValue: 'USD 75,000',
    riskMessage: 'Invoice Amount: USD 75,000 exceeds threshold of USD 50,000',
    triggeredExpression: 'Amount incl. Tax > USD 50,000',
  },
  MATCH_VARIANCE: {
    code: 'MATCH_VARIANCE',
    name: 'Match Variance',
    description: 'Matching Quality check: Invoice and Receipt step difference exceeds threshold.',
    severity: 'medium',
    uiName: 'Match Variance',
    threshold: '<= USD 500',
    actualValue: 'USD 1,200 difference',
    riskMessage: 'Matching Quality: Inv & Rec step difference is USD 1,200, exceeds threshold of USD 500',
    triggeredExpression: 'Match Variance > USD 500',
  },
  CROSS_BORDER: {
    code: 'CROSS_BORDER',
    name: 'Cross Border',
    description: 'Compliance check: Supplier registered country differs from buyer legal entity country.',
    severity: 'high',
    uiName: 'Cross Border',
    threshold: 'Supplier country = Buyer country',
    actualValue: 'Supplier: MY, Buyer: SG',
    riskMessage: 'Compliance: Supplier registered in Malaysia, Buyer entity in Singapore',
    triggeredExpression: 'Supplier reg. address country ≠ Buyer legal entity country',
  },
  DUPLICATE_INV: {
    code: 'DUPLICATE_INV',
    name: 'Duplicate Inv',
    description: 'Anomaly Check: Supplier x invoice number combination is not unique within 3 working months.',
    severity: 'high',
    uiName: 'Duplicate Inv',
    threshold: 'Unique within 3WM',
    actualValue: 'Matched PR-2026-001100',
    riskMessage: 'Anomaly: Same supplier x invoice# found in PR-2026-001100 within 3 working months',
    triggeredExpression: '[supplier × invoice number] is not unique within 3WM',
  },
  NEAR_DUPLICATE: {
    code: 'NEAR_DUPLICATE',
    name: 'Near Duplicate',
    description: 'Anomaly Check (AI): High similarity detected with existing records based on Supplier/Amt/Date/Desc.',
    severity: 'medium',
    uiName: 'Near Duplicate',
    threshold: 'No high similarity',
    actualValue: '92% similarity with PR-2026-000998',
    riskMessage: 'Anomaly (AI): 92% similarity detected with PR-2026-000998 based on Supplier/Amt/Date/Desc',
    triggeredExpression: 'Supplier/Amt/Date/Desc: High similarity with existing records',
  },
  BANK_ACCT_CHANGE: {
    code: 'BANK_ACCT_CHANGE',
    name: 'Bank Acct Change',
    description: 'Anomaly Check (AI): Bank account information differs from EBS supplier master.',
    severity: 'high',
    uiName: 'Bank Acct Change',
    threshold: 'No discrepancy with EBS',
    actualValue: 'Bank account mismatch',
    riskMessage: 'Anomaly (AI): Supplier bank account differs from EBS supplier master record',
    triggeredExpression: 'Discrepancy with EBS supplier master',
  },
}

// Mock PR Data
export const INITIAL_PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: '1',
    prNumber: 'PR-2026-001234',
    title: 'Office Equipment Procurement',
    description: 'Procurement of office equipment including monitors, keyboards and mice for new hires in Q2.',
    requestor: 'John Smith',
    requestorEmail: 'john.smith@company.com',
    department: 'IT Department',
    region: 'SG',
    createdAt: '2026-04-20',
    updatedAt: '2026-04-22',
    status: 'Pending Approval',
    totalAmount: 75000,
    currency: 'USD',
    vendor: 'Tech Solutions Inc.',
    vendorCode: 'VND-001',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX', 'CROSS_BORDER'],
    items: [
      { id: '1-1', itemNumber: 'IT-001', description: '27" 4K Monitor', quantity: 50, unit: 'PCS', unitPrice: 800, totalPrice: 40000, deliveryDate: '2026-04-25' },
      { id: '1-2', itemNumber: 'IT-002', description: 'Mechanical Keyboard', quantity: 50, unit: 'PCS', unitPrice: 200, totalPrice: 10000, deliveryDate: '2026-04-25' },
      { id: '1-3', itemNumber: 'IT-003', description: 'Wireless Mouse', quantity: 50, unit: 'PCS', unitPrice: 100, totalPrice: 5000, deliveryDate: '2026-04-25' },
      { id: '1-4', itemNumber: 'IT-004', description: 'Laptop Stand', quantity: 50, unit: 'PCS', unitPrice: 150, totalPrice: 7500, deliveryDate: '2026-04-25' },
      { id: '1-5', itemNumber: 'IT-005', description: 'USB-C Hub', quantity: 50, unit: 'PCS', unitPrice: 250, totalPrice: 12500, deliveryDate: '2026-04-25' },
    ],
    attachments: [
      { id: 'a1', fileName: 'quotation.pdf', fileSize: '2.3 MB', uploadedAt: '2026-04-20', uploadedBy: 'John Smith' },
      { id: 'a2', fileName: 'vendor_profile.pdf', fileSize: '1.1 MB', uploadedAt: '2026-04-20', uploadedBy: 'John Smith' },
    ],
    approver: 'Sarah Johnson',
    approverEmail: 'sarah.johnson@company.com',
    urgency: 'High',
    aiReview: {
      result: 'Reject',
      confidence: 0.63,
      message: 'Rejected due to rule failure: Payment Request Invoice Review Biz Agent - Please check your invoice for Regulatory Compliance (ATP), Invoice number match PA entry, Supplier name match (PO), Total after tax equals submission amount, Total after tax equals net plus VAT (12%)',
      timestamp: '2026-05-20 12:03:06',
      checkItems: [
        { key: 'doc_title', status: 'pass', feedback: 'Document title matches the purchase order reference.' },
        { key: 'atp', status: 'fail', feedback: 'Invoice does not include required ATP regulatory compliance stamp. Missing BIR authority to print notation.' },
        { key: 'invoice_date', status: 'pass', feedback: 'Invoice date 2026-04-20 is within the acceptable 90-day submission window.' },
        { key: 'invoice_number', status: 'fail', feedback: 'Invoice number INV-2026-0042 does not match the PA entry INV-2026-042A recorded in the system.' },
        { key: 'billing_name', status: 'pass', feedback: 'Billing name "John Smith" matches the entity information on record.' },
        { key: 'billing_address', status: 'warning', feedback: 'Billing address contains abbreviation "SG" — could not fully verify against entity master. Manual check recommended.' },
        { key: 'billing_tin', status: 'pass', feedback: 'TIN matches entity info on record.' },
        { key: 'supplier_name', status: 'fail', feedback: 'Supplier name "Tech Solutions Inc." does not match PO record "Tech Solutions Incorporated". Possible name discrepancy.' },
        { key: 'total_tax', status: 'fail', feedback: 'Total after tax (USD 9,000) does not equal the submission amount (USD 9,180). Discrepancy of USD 180.' },
        { key: 'total_vat', status: 'fail', feedback: 'Total after tax (USD 9,000) does not equal net amount plus 12% VAT (USD 8,035.71 × 1.12 = USD 9,000.00). Calculation mismatch detected.' },
      ],
    },
  },
  {
    id: '2',
    prNumber: 'PR-2026-001235',
    title: 'Marketing Campaign Materials',
    description: 'Promotional materials for upcoming product launch event.',
    requestor: 'Emily Chen',
    requestorEmail: 'emily.chen@company.com',
    department: 'Marketing',
    region: 'ID',
    createdAt: '2026-04-19',
    updatedAt: '2026-04-21',
    status: 'Approved',
    totalAmount: 12500,
    currency: 'USD',
    vendor: 'Creative Designs Co.',
    vendorCode: 'VND-015',
    isRisk: false,
    riskRules: [],
    items: [
      { id: '2-1', itemNumber: 'MK-001', description: 'Banner Stands', quantity: 20, unit: 'PCS', unitPrice: 250, totalPrice: 5000, deliveryDate: '2026-05-01' },
      { id: '2-2', itemNumber: 'MK-002', description: 'Brochures', quantity: 5000, unit: 'PCS', unitPrice: 1.5, totalPrice: 7500, deliveryDate: '2026-05-01' },
    ],
    attachments: [
      { id: 'a3', fileName: 'design_mockup.pdf', fileSize: '5.2 MB', uploadedAt: '2026-04-19', uploadedBy: 'Emily Chen' },
    ],
    approver: 'Michael Brown',
    approverEmail: 'michael.brown@company.com',
    urgency: 'Medium',
    aiReview: {
      result: 'Approve',
      confidence: 0.98,
      message: 'All sub-agents passed. Payment Request Invoice Review Biz Agent, DO Review Agent passed.',
      timestamp: '2026-05-19 10:15:30',
      checkItems: [
        { key: 'doc_title', status: 'pass', feedback: 'Document title matches the purchase order reference.' },
        { key: 'atp', status: 'pass', feedback: 'ATP regulatory compliance stamp present and valid.' },
        { key: 'invoice_date', status: 'pass', feedback: 'Invoice date is within the acceptable submission window.' },
        { key: 'invoice_number', status: 'pass', feedback: 'Invoice number matches PA entry exactly.' },
        { key: 'billing_name', status: 'pass', feedback: 'Billing name matches entity information on record.' },
        { key: 'billing_address', status: 'pass', feedback: 'Billing address verified against entity master.' },
        { key: 'billing_tin', status: 'pass', feedback: 'TIN matches entity info on record.' },
        { key: 'supplier_name', status: 'pass', feedback: 'Supplier name matches PO record exactly.' },
        { key: 'total_tax', status: 'pass', feedback: 'Total after tax equals submission amount.' },
        { key: 'total_vat', status: 'pass', feedback: 'Total after tax equals net plus 12% VAT as expected.' },
      ],
    },
  },
  {
    id: '3',
    prNumber: 'PR-2026-001236',
    title: 'Server Infrastructure Upgrade',
    description: 'Critical server hardware upgrade for data center expansion.',
    requestor: 'David Wilson',
    requestorEmail: 'david.wilson@company.com',
    department: 'IT Infrastructure',
    region: 'TH',
    createdAt: '2026-04-18',
    updatedAt: '2026-04-20',
    status: 'Processing',
    totalAmount: 250000,
    currency: 'USD',
    vendor: 'Enterprise Systems Ltd.',
    vendorCode: 'VND-003',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX'],
    items: [
      { id: '3-1', itemNumber: 'SRV-001', description: 'Rack Server', quantity: 10, unit: 'PCS', unitPrice: 15000, totalPrice: 150000, deliveryDate: '2026-05-15' },
      { id: '3-2', itemNumber: 'SRV-002', description: 'Storage Array', quantity: 4, unit: 'PCS', unitPrice: 25000, totalPrice: 100000, deliveryDate: '2026-05-15' },
    ],
    attachments: [
      { id: 'a4', fileName: 'technical_specs.pdf', fileSize: '3.8 MB', uploadedAt: '2026-04-18', uploadedBy: 'David Wilson' },
      { id: 'a5', fileName: 'vendor_contract.pdf', fileSize: '1.5 MB', uploadedAt: '2026-04-18', uploadedBy: 'David Wilson' },
    ],
    approver: 'Lisa Anderson',
    approverEmail: 'lisa.anderson@company.com',
    urgency: 'Critical',
    aiReview: {
      result: 'Require Human Review',
      confidence: 0.55,
      message: 'Confidence level below threshold. Multiple conflicting signals detected. Manual review required for: Amount verification, Vendor validation.',
      timestamp: '2026-05-18 14:22:45',
    },
  },
  {
    id: '4',
    prNumber: 'PR-2026-001237',
    title: 'Office Supplies Restocking',
    description: 'Monthly office supplies for headquarters.',
    requestor: 'Anna Martinez',
    requestorEmail: 'anna.martinez@company.com',
    department: 'Administration',
    region: 'MY',
    createdAt: '2026-04-17',
    updatedAt: '2026-04-17',
    status: 'Completed',
    totalAmount: 3500,
    currency: 'USD',
    vendor: 'Office Depot',
    vendorCode: 'VND-008',
    isRisk: false,
    riskRules: [],
    items: [
      { id: '4-1', itemNumber: 'OFF-001', description: 'A4 Paper (Box)', quantity: 100, unit: 'BOX', unitPrice: 25, totalPrice: 2500, deliveryDate: '2026-04-20' },
      { id: '4-2', itemNumber: 'OFF-002', description: 'Pens (Pack)', quantity: 50, unit: 'PACK', unitPrice: 20, totalPrice: 1000, deliveryDate: '2026-04-20' },
    ],
    attachments: [],
    approver: 'Robert Taylor',
    approverEmail: 'robert.taylor@company.com',
    urgency: 'Low',
    aiReview: {
      result: 'Approve',
      confidence: 0.95,
      message: 'All validation checks passed successfully.',
      timestamp: '2026-05-17 09:30:00',
    },
  },
  {
    id: '5',
    prNumber: 'PR-2026-001238',
    title: 'Software Licenses Renewal',
    description: 'Annual renewal of enterprise software licenses.',
    requestor: 'James Lee',
    requestorEmail: 'james.lee@company.com',
    department: 'IT Department',
    region: 'PH',
    createdAt: '2026-04-16',
    updatedAt: '2026-04-18',
    status: 'Pending Approval',
    totalAmount: 45000,
    currency: 'USD',
    vendor: 'Software Corp',
    vendorCode: 'VND-NEW-001',
    isRisk: true,
    riskRules: ['DUPLICATE_INV', 'LAST_APPROVED_TXN'],
    items: [
      { id: '5-1', itemNumber: 'SW-001', description: 'Enterprise License (Annual)', quantity: 500, unit: 'LICENSE', unitPrice: 90, totalPrice: 45000, deliveryDate: '2026-05-01' },
    ],
    attachments: [
      { id: 'a6', fileName: 'license_agreement.pdf', fileSize: '890 KB', uploadedAt: '2026-04-16', uploadedBy: 'James Lee' },
    ],
    approver: 'Sarah Johnson',
    approverEmail: 'sarah.johnson@company.com',
    urgency: 'High',
    aiReview: {
      result: 'Cannot Provide Decision',
      confidence: 0.32,
      message: 'Unable to process: Missing critical invoice data. Document quality too low for OCR. Please re-upload with clearer image quality.',
      timestamp: '2026-05-16 16:45:12',
    },
  },
  {
    id: '6',
    prNumber: 'PR-2026-001239',
    title: 'Lab Equipment Purchase',
    description: 'Laboratory equipment for R&D department expansion.',
    requestor: 'Dr. Maria Garcia',
    requestorEmail: 'maria.garcia@company.com',
    department: 'R&D',
    region: 'VN',
    createdAt: '2026-04-15',
    updatedAt: '2026-04-17',
    status: 'Rejected',
    totalAmount: 180000,
    currency: 'USD',
    vendor: 'Scientific Instruments GmbH',
    vendorCode: 'VND-022',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX', 'NEAR_DUPLICATE'],
    items: [
      { id: '6-1', itemNumber: 'LAB-001', description: 'Spectrophotometer', quantity: 2, unit: 'PCS', unitPrice: 45000, totalPrice: 90000, deliveryDate: '2026-06-01' },
      { id: '6-2', itemNumber: 'LAB-002', description: 'Centrifuge', quantity: 3, unit: 'PCS', unitPrice: 30000, totalPrice: 90000, deliveryDate: '2026-06-01' },
    ],
    attachments: [
      { id: 'a7', fileName: 'equipment_specs.pdf', fileSize: '4.2 MB', uploadedAt: '2026-04-15', uploadedBy: 'Dr. Maria Garcia' },
    ],
    approver: 'Dr. Thomas White',
    approverEmail: 'thomas.white@company.com',
    urgency: 'Medium',
  },
  {
    id: '7',
    prNumber: 'PR-2026-001240',
    title: 'Employee Training Program',
    description: 'Professional development training sessions for engineering team.',
    requestor: 'Kevin Park',
    requestorEmail: 'kevin.park@company.com',
    department: 'HR',
    region: 'SG',
    createdAt: '2026-04-14',
    updatedAt: '2026-04-16',
    status: 'Approved',
    totalAmount: 28000,
    currency: 'USD',
    vendor: 'Learning Academy',
    vendorCode: 'VND-011',
    isRisk: false,
    riskRules: [],
    items: [
      { id: '7-1', itemNumber: 'TR-001', description: 'Leadership Workshop', quantity: 2, unit: 'SESSION', unitPrice: 8000, totalPrice: 16000, deliveryDate: '2026-05-10' },
      { id: '7-2', itemNumber: 'TR-002', description: 'Technical Certification', quantity: 20, unit: 'PERSON', unitPrice: 600, totalPrice: 12000, deliveryDate: '2026-05-15' },
    ],
    attachments: [
      { id: 'a8', fileName: 'training_proposal.pdf', fileSize: '1.8 MB', uploadedAt: '2026-04-14', uploadedBy: 'Kevin Park' },
    ],
    approver: 'Jennifer Liu',
    approverEmail: 'jennifer.liu@company.com',
    urgency: 'Low',
  },
  {
    id: '8',
    prNumber: 'PR-2026-001241',
    title: 'Warehouse Shelving Units',
    description: 'Industrial shelving for new warehouse facility.',
    requestor: 'Carlos Rodriguez',
    requestorEmail: 'carlos.rodriguez@company.com',
    department: 'Operations',
    region: 'ID',
    createdAt: '2026-04-13',
    updatedAt: '2026-04-15',
    status: 'Draft',
    totalAmount: 55000,
    currency: 'USD',
    vendor: 'Industrial Storage Solutions',
    vendorCode: 'VND-NEW-002',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX', 'CUMULATIVE_APPROVED', 'CROSS_BORDER'],
    items: [
      { id: '8-1', itemNumber: 'WH-001', description: 'Heavy Duty Rack', quantity: 50, unit: 'PCS', unitPrice: 800, totalPrice: 40000, deliveryDate: '2026-04-18' },
      { id: '8-2', itemNumber: 'WH-002', description: 'Pallet Shelving', quantity: 30, unit: 'PCS', unitPrice: 500, totalPrice: 15000, deliveryDate: '2026-04-18' },
    ],
    attachments: [],
    approver: 'Antonio Santos',
    approverEmail: 'antonio.santos@company.com',
    urgency: 'High',
  },
  {
    id: '9',
    prNumber: 'PR-2026-001242',
    title: 'Security System Upgrade',
    description: 'Access control and surveillance system upgrade.',
    requestor: 'Michelle Thompson',
    requestorEmail: 'michelle.thompson@company.com',
    department: 'Facilities',
    region: 'TH',
    createdAt: '2026-04-12',
    updatedAt: '2026-04-14',
    status: 'Pending Approval',
    totalAmount: 92000,
    currency: 'USD',
    vendor: 'SecureTech Systems',
    vendorCode: 'VND-019',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX', 'BANK_ACCT_CHANGE'],
    items: [
      { id: '9-1', itemNumber: 'SEC-001', description: 'IP Camera', quantity: 40, unit: 'PCS', unitPrice: 1200, totalPrice: 48000, deliveryDate: '2026-05-01' },
      { id: '9-2', itemNumber: 'SEC-002', description: 'Access Control Panel', quantity: 10, unit: 'PCS', unitPrice: 2500, totalPrice: 25000, deliveryDate: '2026-05-01' },
      { id: '9-3', itemNumber: 'SEC-003', description: 'Card Reader', quantity: 38, unit: 'PCS', unitPrice: 500, totalPrice: 19000, deliveryDate: '2026-05-01' },
    ],
    attachments: [
      { id: 'a9', fileName: 'security_proposal.pdf', fileSize: '3.1 MB', uploadedAt: '2026-04-12', uploadedBy: 'Michelle Thompson' },
      { id: 'a10', fileName: 'floor_plan.pdf', fileSize: '6.5 MB', uploadedAt: '2026-04-12', uploadedBy: 'Michelle Thompson' },
    ],
    approver: 'William Harris',
    approverEmail: 'william.harris@company.com',
    urgency: 'High',
  },
  {
    id: '10',
    prNumber: 'PR-2026-001243',
    title: 'Catering Services Contract',
    description: 'Annual catering services for corporate events.',
    requestor: 'Sophie Williams',
    requestorEmail: 'sophie.williams@company.com',
    department: 'Administration',
    region: 'MY',
    createdAt: '2026-04-11',
    updatedAt: '2026-04-13',
    status: 'Completed',
    totalAmount: 18000,
    currency: 'USD',
    vendor: 'Gourmet Catering Ltd.',
    vendorCode: 'VND-025',
    isRisk: false,
    riskRules: [],
    items: [
      { id: '10-1', itemNumber: 'CAT-001', description: 'Annual Catering Contract', quantity: 1, unit: 'CONTRACT', unitPrice: 18000, totalPrice: 18000, deliveryDate: '2026-04-15' },
    ],
    attachments: [
      { id: 'a11', fileName: 'catering_menu.pdf', fileSize: '2.0 MB', uploadedAt: '2026-04-11', uploadedBy: 'Sophie Williams' },
    ],
    approver: 'Robert Taylor',
    approverEmail: 'robert.taylor@company.com',
    urgency: 'Low',
  },
  {
    id: '11',
    prNumber: 'PR-2026-001244',
    title: 'Fleet Vehicle Maintenance',
    description: 'Quarterly maintenance for company vehicle fleet.',
    requestor: 'Daniel Kim',
    requestorEmail: 'daniel.kim@company.com',
    department: 'Logistics',
    region: 'PH',
    createdAt: '2026-04-10',
    updatedAt: '2026-04-12',
    status: 'Processing',
    totalAmount: 32000,
    currency: 'USD',
    vendor: 'AutoCare Services',
    vendorCode: 'VND-007',
    isRisk: false,
    riskRules: [],
    items: [
      { id: '11-1', itemNumber: 'FLT-001', description: 'Vehicle Maintenance', quantity: 20, unit: 'VEHICLE', unitPrice: 1600, totalPrice: 32000, deliveryDate: '2026-04-30' },
    ],
    attachments: [
      { id: 'a12', fileName: 'maintenance_schedule.xlsx', fileSize: '156 KB', uploadedAt: '2026-04-10', uploadedBy: 'Daniel Kim' },
    ],
    approver: 'Jennifer Liu',
    approverEmail: 'jennifer.liu@company.com',
    urgency: 'Medium',
  },
  {
    id: '12',
    prNumber: 'PR-2026-001245',
    title: 'Cloud Computing Resources',
    description: 'Additional cloud computing capacity for Q2 projects.',
    requestor: 'Alex Turner',
    requestorEmail: 'alex.turner@company.com',
    department: 'IT Infrastructure',
    region: 'VN',
    createdAt: '2026-04-09',
    updatedAt: '2026-04-11',
    status: 'Approved',
    totalAmount: 65000,
    currency: 'USD',
    vendor: 'CloudScale Inc.',
    vendorCode: 'VND-004',
    isRisk: true,
    riskRules: ['AMOUNT_INCL_TAX', 'MATCH_VARIANCE'],
    items: [
      { id: '12-1', itemNumber: 'CLD-001', description: 'Compute Instances (Monthly)', quantity: 6, unit: 'MONTH', unitPrice: 8000, totalPrice: 48000, deliveryDate: '2026-04-15' },
      { id: '12-2', itemNumber: 'CLD-002', description: 'Storage (TB/Month)', quantity: 6, unit: 'MONTH', unitPrice: 2000, totalPrice: 12000, deliveryDate: '2026-04-15' },
      { id: '12-3', itemNumber: 'CLD-003', description: 'Network Bandwidth', quantity: 6, unit: 'MONTH', unitPrice: 833, totalPrice: 5000, deliveryDate: '2026-04-15' },
    ],
    attachments: [
      { id: 'a13', fileName: 'cloud_architecture.pdf', fileSize: '2.8 MB', uploadedAt: '2026-04-09', uploadedBy: 'Alex Turner' },
    ],
    approver: 'Lisa Anderson',
    approverEmail: 'lisa.anderson@company.com',
    urgency: 'High',
  },
]

// Helper functions for PR
export function getPRByNumber(prNumber: string): PurchaseRequest | undefined {
  return INITIAL_PURCHASE_REQUESTS.find((pr) => pr.prNumber === prNumber)
}

export function formatPRCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getRiskRuleDetail(code: string): RiskRule | undefined {
  return riskRulesDefinition[code as RiskRuleCode]
}

export function getRiskRulesByPR(pr: PurchaseRequest): RiskRule[] {
  return pr.riskRules.map((code) => riskRulesDefinition[code]).filter(Boolean)
}

export function getPRRegions(): string[] {
  return [...new Set(INITIAL_PURCHASE_REQUESTS.map((pr) => pr.region))]
}

export function getPRDepartments(): string[] {
  return [...new Set(INITIAL_PURCHASE_REQUESTS.map((pr) => pr.department))]
}

export function getPRStatusCounts(): Record<PRStatus | 'All', number> {
  const counts: Record<string, number> = { All: INITIAL_PURCHASE_REQUESTS.length }
  for (const pr of INITIAL_PURCHASE_REQUESTS) {
    counts[pr.status] = (counts[pr.status] || 0) + 1
  }
  return counts as Record<PRStatus | 'All', number>
}
