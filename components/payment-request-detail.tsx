"use client"

import { useState } from "react"
import {
  Card,
  Button,
  Tag,
  Typography,
  Space,
  Table,
  Descriptions,
  Steps,
  Tooltip,
  Divider,
  Row,
  Col,
  Input,
  Segmented,
  Modal,
  Checkbox,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  LikeFilled,
  DislikeFilled,
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons"
import {
  type PurchaseRequest,
  type PRItem,
  type PRStatus,
  type AIReviewResult,
  type AICheckItemResult,
  formatPRCurrency,
  getRiskRulesByPR,
  riskRulesDefinition,
} from "@/lib/mock-data"

const { Text, Title, Paragraph } = Typography

const STATUS_TAG_COLORS: Record<PRStatus, string> = {
  Draft: "default",
  "Pending Approval": "orange",
  Approved: "green",
  Rejected: "red",
  Processing: "blue",
  Completed: "cyan",
}

interface PaymentRequestDetailProps {
  pr: PurchaseRequest
  onBack: () => void
}

type UserAction = 'Accept' | 'Not Accept' | null

const CHECK_ITEMS = [
  { key: "doc_title", label: "Document title" },
  { key: "atp", label: "Invoice Regulatory Compliance (ATP)" },
  { key: "invoice_date", label: "Invoice date match and range" },
  { key: "invoice_number", label: "Invoice number match PA entry" },
  { key: "billing_name", label: "Billing name match (Entity Info)" },
  { key: "billing_address", label: "Billing address match (Entity Info)" },
  { key: "billing_tin", label: "Billing TIN match (Entity Info)" },
  { key: "supplier_name", label: "Supplier name match (PO)" },
  { key: "total_tax", label: "Total after tax equals submission amount" },
  { key: "total_vat", label: "Total after tax equals net plus VAT (12%)" },
]

const AI_STATUS_CONFIG = {
  pass:    { color: "#52c41a", bg: "#f6ffed", border: "#b7eb8f", icon: "✓" },
  fail:    { color: "#ff4d4f", bg: "#fff2f0", border: "#ffccc7", icon: "✗" },
  warning: { color: "#fa8c16", bg: "#fff7e6", border: "#ffd591", icon: "!" },
}

interface ChecklistSectionProps {
  checkedItems: string[]
  othersChecked: boolean
  othersText: string
  aiCheckItems?: AICheckItemResult[]
  onToggleItem: (key: string, checked: boolean) => void
  onToggleOthers: (checked: boolean) => void
  onOthersTextChange: (value: string) => void
  label?: string
}

function ChecklistSection({
  checkedItems,
  othersChecked,
  othersText,
  aiCheckItems,
  onToggleItem,
  onToggleOthers,
  onOthersTextChange,
  label = "SELECT CHECK ITEMS WITH ISSUES",
}: ChecklistSectionProps) {
  const aiMap = Object.fromEntries((aiCheckItems ?? []).map(i => [i.key, i]))
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid #f0f0f0", paddingTop: 4 }}>
      <Text type="secondary" style={{ fontSize: 11, fontWeight: 500, padding: "6px 0", letterSpacing: "0.02em" }}>
        {label}
      </Text>
      {CHECK_ITEMS.map((item, idx) => {
        const isChecked = checkedItems.includes(item.key)
        const ai = aiMap[item.key]
        const cfg = ai ? AI_STATUS_CONFIG[ai.status] : null
        return (
          <div
            key={item.key}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              borderBottom: idx < CHECK_ITEMS.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <Checkbox
              checked={isChecked}
              onChange={(e) => onToggleItem(item.key, e.target.checked)}
            >
              <Text style={{ fontSize: 13 }}>{item.label}</Text>
            </Checkbox>

            {/* AI feedback badge */}
            {ai && (
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginTop: 5,
                marginLeft: 24,
                padding: "5px 8px",
                background: cfg!.bg,
                border: `1px solid ${cfg!.border}`,
                borderRadius: 6,
              }}>
                <Text style={{ fontSize: 11, color: cfg!.color, fontWeight: 700, flexShrink: 0, lineHeight: "16px" }}>
                  AI {ai.status.toUpperCase()}
                </Text>
                <Text style={{ fontSize: 11, color: "#595959", lineHeight: "16px" }}>
                  {ai.feedback}
                </Text>
              </div>
            )}
          </div>
        )
      })}

      {/* Others */}
      <div style={{ padding: "10px 0", borderTop: "1px solid #f0f0f0" }}>
        <Checkbox
          checked={othersChecked}
          onChange={(e) => onToggleOthers(e.target.checked)}
        >
          <Text style={{ fontSize: 13 }}>Others</Text>
        </Checkbox>
        {othersChecked && (
          <Input.TextArea
            placeholder="Please describe the issue..."
            rows={2}
            value={othersText}
            onChange={(e) => onOthersTextChange(e.target.value)}
            style={{ fontSize: 12, borderRadius: 6, marginTop: 8 }}
          />
        )}
      </div>
    </div>
  )
}

export function PaymentRequestDetail({ pr, onBack }: PaymentRequestDetailProps) {
  const riskRules = getRiskRulesByPR(pr)
  const [selectedAction, setSelectedAction] = useState<UserAction>(null)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<UserAction>(null)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [overallNote, setOverallNote] = useState("")
  const [othersChecked, setOthersChecked] = useState(false)
  const [othersText, setOthersText] = useState("")
  const [acceptInvoiceChoice, setAcceptInvoiceChoice] = useState<'yes' | 'yes-feedback' | null>(null)
  // When AI = Approve: 'reject-with-items' | 'approve-exception'
  // When AI = Reject:  'approve-no-issue' | 'approve-exception' | 'still-reject'
  // When AI = Require Human Review: 'hr-approve-wrong-issues' | 'hr-reject-wrong-issues'
  const [notAcceptChoice, setNotAcceptChoice] = useState<'reject-with-items' | 'approve-no-issue' | 'approve-exception' | 'still-reject' | 'hr-approve-wrong-issues' | 'hr-reject-wrong-issues' | null>(null)
  const [mockResult, setMockResult] = useState<AIReviewResult>(
    pr.aiReview?.result || (pr.isRisk ? 'Reject' : 'Approve')
  )

  // Human Review state
  const [hrModalOpen, setHrModalOpen] = useState(false)
  const [hrModalType, setHrModalType] = useState<'approve' | 'reject' | null>(null)
  const [hrCheckedItems, setHrCheckedItems] = useState<string[]>([])
  const [hrItemNotes, setHrItemNotes] = useState<Record<string, string>>({})
  const [hrOthersChecked, setHrOthersChecked] = useState(false)
  const [hrOthersText, setHrOthersText] = useState("")
  const [hrSubmitted, setHrSubmitted] = useState(false)

  const openHrModal = (type: 'approve' | 'reject') => {
    setHrModalType(type)
    setHrCheckedItems(type === 'approve' ? CHECK_ITEMS.map(i => i.key) : [])
    setHrItemNotes({})
    setHrOthersChecked(false)
    setHrOthersText("")
    setHrModalOpen(true)
  }

  const handleHrConfirm = () => {
    setHrSubmitted(true)
    setHrModalOpen(false)
  }

  const isHrConfirmDisabled =
    hrModalType === 'reject' &&
    (
      (hrCheckedItems.length === 0 && !hrOthersChecked) ||
      (hrOthersChecked && !hrOthersText.trim())
    )

  const mockConfig: Record<AIReviewResult, { confidence: number; message: string; timestamp: string }> = {
    'Approve': {
      confidence: 0.98,
      message: 'All sub-agents passed. Payment Request Invoice Review Biz Agent, DO Review Agent passed.',
      timestamp: '2026-05-20 10:15:30',
    },
    'Reject': {
      confidence: 0.63,
      message: 'Rejected due to rule failure: Payment Request Invoice Review Biz Agent - Please check your invoice for Regulatory Compliance (ATP), Invoice number match PA entry, Supplier name match (PO), Total after tax equals submission amount, Total after tax equals net plus VAT (12%).',
      timestamp: '2026-05-20 12:03:06',
    },
    'Require Human Review': {
      confidence: 0.55,
      message: 'Confidence level below threshold. Multiple conflicting signals detected. Manual review required for: Amount verification, Vendor validation.',
      timestamp: '2026-05-20 11:22:45',
    },
    'Cannot Provide Decision': {
      confidence: 0.32,
      message: 'Unable to process: Missing critical invoice data. Document quality too low for OCR. Please re-upload with clearer image quality.',
      timestamp: '2026-05-20 09:45:12',
    },
    'High Risk Item': {
      confidence: 0.91,
      message: 'Not Covered. This invoice contains high-risk patterns that fall outside automated processing scope. Mandatory manual review required.',
      timestamp: '2026-05-20 08:30:00',
      uncovered_reasons: [
        'Tax Amount > 100,000',
        'Invoice Line Item Count > 50',
        'Supplier Country IN (High-Risk Jurisdiction List)',
        'Invoice Amount Variance > 40% vs. 3-Month Avg',
        'PO Mismatch Count > 2 within 30 Days',
      ],
    },
  }

  const canProvideDecision = mockResult !== 'Cannot Provide Decision'
  const showFeedbackInput = false

  const handleMockResultChange = (val: AIReviewResult) => {
    setMockResult(val)
    setSelectedAction(null)
    setFeedback("")
    setSubmitted(false)
    setModalOpen(false)
    setPendingAction(null)
    setCheckedItems([])
    setOverallNote("")
    setOthersChecked(false)
    setOthersText("")
    setAcceptInvoiceChoice(null)
    setNotAcceptChoice(null)
  }

  const handleActionClick = (action: UserAction) => {
    if (action === 'Accept' || action === 'Not Accept') {
      setPendingAction(action)
      setCheckedItems([])
      setOverallNote("")
      setOthersChecked(false)
      setOthersText("")
      setAcceptInvoiceChoice(null)
      setNotAcceptChoice(null)
      setModalOpen(true)
    } else {
      setSelectedAction(action)
    }
  }

  const handleModalConfirm = () => {
    setSelectedAction(pendingAction)
    setModalOpen(false)
  }

  const handleModalCancel = () => {
    setModalOpen(false)
    setPendingAction(null)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const checklistInvalid =
    (checkedItems.length === 0 && !othersChecked) ||
    (othersChecked && !othersText.trim())

  const isModalConfirmDisabled = (() => {
    if (pendingAction === 'Accept') {
      if (!acceptInvoiceChoice) return true
      if (acceptInvoiceChoice === 'yes-feedback') return checklistInvalid
      return false
    }
    if (pendingAction === 'Not Accept') {
      // Directly check if at least one item or Others is selected
      return checklistInvalid
    }
    return false
  })()

  const itemColumns: ColumnsType<PRItem> = [
    {
      title: "Item Id",
      key: "item",
      width: 80,
      render: (_: unknown, record: PRItem) => (
        <Text style={{ fontWeight: 500 }}>{record.itemNumber}</Text>
      ),
    },
    {
      title: "Invoice Number",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>{description}</Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description_full",
      render: (description: string) => (
        <Text>{description}</Text>
      ),
    },
    {
      title: "Location",
      key: "location",
      width: 100,
      render: (_: unknown, record: PRItem) => (
        <Text>{record.location || "-"}</Text>
      ),
    },
    {
      title: "Currency",
      key: "currency",
      width: 80,
      render: (_: unknown) => (
        <Text>{pr.currency}</Text>
      ),
    },
    {
      title: "Unit",
      key: "unit",
      width: 60,
      render: (_: unknown, record: PRItem) => (
        <Text>-</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: () => (
        <Space size={8}>
          <Button type="link" size="small" style={{ padding: 0 }}>
            📋
          </Button>
          <Button type="link" size="small" style={{ padding: 0 }}>
            🔗
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <Card
        size="small"
        style={{ borderRadius: 8 }}
        styles={{
          body: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
          },
        }}
      >
        <Space size={16} align="center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{ fontSize: 16 }}
          />
          <div>
            <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
              Payment Request
            </Title>
            <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
              <LeftOutlined style={{ fontSize: 12, color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: 13 }}>
                {pr.prNumber}
              </Text>
              <RightOutlined style={{ fontSize: 12, color: "#8c8c8c" }} />
              <Tag color="blue">{pr.status}</Tag>
              {/* Risk Layer Tag */}
              {pr.isRisk && pr.riskRules.length > 0 && (
                <Tooltip
                  title={
                    <div style={{ maxWidth: 280 }}>
                      {riskRules.map((rule) => (
                        <div key={rule.code} style={{ marginBottom: 4 }}>
                          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ff4d4f", marginRight: 8 }} />
                          <span style={{ fontSize: 12 }}>{rule.uiName}</span>
                        </div>
                      ))}
                    </div>
                  }
                  placement="bottom"
                >
                  <Tag
                    color="red"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      cursor: "help",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff4d4f" }} />
                    Risk Layer: Yes
                  </Tag>
                </Tooltip>
              )}
              <RightOutlined style={{ fontSize: 12, color: "#8c8c8c" }} />
            </div>
          </div>
        </Space>

        <Space size={12}>
          <Button type="primary">Batch View</Button>
          <Button type="text" icon={<InfoCircleOutlined />} />
          <Button type="text" icon={<InfoCircleOutlined />} />
          <Button type="text" icon={<FileTextOutlined />} />
        </Space>
      </Card>

      {/* Steps */}
      <Card size="small" style={{ borderRadius: 8 }}>
        <Steps
          current={1}
          size="small"
          items={[
            { title: "Validate Receipt", icon: <span style={{ marginRight: 8 }}>1</span> },
            { title: "Review Invoice & PO", icon: <span style={{ marginRight: 8 }}>2</span> },
            { title: "Match Invoice & Receipt", icon: <span style={{ marginRight: 8 }}>3</span> },
            { title: "Create AP voucher", icon: <span style={{ marginRight: 8 }}>4</span> },
          ]}
        />
      </Card>

      {/* Three Column Layout */}
      <Row gutter={16} style={{ display: "flex" }}>
        {/* Left Column - PR Details */}
        <Col span={8} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* PR Number and Details */}
          <Card title={pr.prNumber.slice(0, 4)} size="small" style={{ borderRadius: 8 }}>
            <Descriptions column={1} size="small" bordered={false}>
              <Descriptions.Item label="PO Number">
                <Button type="link" size="small" style={{ padding: 0, fontSize: 13 }}>
                  {pr.prNumber}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Payment No">
                <Text style={{ fontSize: 13 }}>{pr.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Billing Name">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {pr.requestor}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Billing Address">
                <Tag icon={<span>⚠</span>} style={{ marginRight: 0 }}>
                  {pr.department} {pr.region}%
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Billing TIN">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {pr.id.substring(0, 10)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Supplier Name">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {pr.vendor}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Invoice Date">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {pr.createdAt}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {pr.currency}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tax Amount">
                <Tag icon={<span>✓</span>} style={{ marginRight: 0 }}>
                  {Math.round(pr.totalAmount * 0.12)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                <Tag icon={<span>⚠</span>} color="gold" style={{ marginRight: 0 }}>
                  0%
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Holder Name">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Name">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Account Number">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Local / Overseas">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Requestor's Remark">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Middle Column - Invoice Line Items */}
        <Col span={8} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Navigation arrows and PO selector */}
          <Card
            size="small"
            style={{ borderRadius: 8 }}
            styles={{ body: { display: "flex", justifyContent: "space-between", alignItems: "center" } }}
          >
            <Space>
              <Button type="text" icon={<LeftOutlined />} />
              <Text style={{ fontWeight: 600 }}>{pr.prNumber.replace("PR", "PO")}</Text>
              <Button type="text" icon={<RightOutlined />} />
            </Space>
            <Button type="text">Parsing Invoice Retry</Button>
          </Card>

          {/* PO Details */}
          <Card size="small" style={{ borderRadius: 8 }}>
            <Descriptions column={2} size="small" bordered={false}>
              <Descriptions.Item label="PO Number">
                <Button type="link" size="small" style={{ padding: 0 }}>
                  {pr.prNumber.replace("PR", "PO")}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="PR Number">
                <Button type="link" size="small" style={{ padding: 0 }}>
                  {pr.prNumber}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Company">
                <Text style={{ fontSize: 13 }}>{pr.requestor}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Project Code">
                <Text style={{ fontSize: 13 }}>{pr.department}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Supplier Name">
                <Text style={{ fontSize: 13 }}>{pr.vendor}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="PO Submitter">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <Text style={{ fontSize: 13 }}>{pr.title}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="PO Submitter Email">
                <Text type="secondary" style={{ fontSize: 13 }}>-</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                <Text style={{ fontSize: 13 }}>{pr.currency}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Region">
                <Text style={{ fontSize: 13 }}>{pr.region}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                <Text style={{ fontSize: 13 }}>{pr.department}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Term">
                <Text style={{ fontSize: 13 }}>30 NET</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Invoice Line Items Table */}
          <Card title="Invoice Line" size="small" style={{ borderRadius: 8 }} styles={{ body: { padding: 0 } }}>
            <Table
              columns={itemColumns}
              dataSource={pr.items}
              rowKey="id"
              size="small"
              pagination={false}
              scroll={{ x: "max-content" }}
              style={{ fontSize: 12 }}
            />
          </Card>
        </Col>

        {/* Right Column - Risk Layer / AI Review */}
        <Col span={8} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Risk Layer Assessment Panel */}
          <Card
            title="AI Review"
            size="small"
            style={{ borderRadius: 8 }}
            extra={<Button type="text">Parsing Invoice Retry</Button>}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Mock switcher - dev only */}
              <div style={{
                padding: "8px 12px",
                background: "#f5f5f5",
                borderRadius: 8,
                border: "1px dashed #d9d9d9",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
                <Text style={{ fontSize: 11, color: "#8c8c8c", fontWeight: 500, letterSpacing: "0.02em" }}>
                  MOCK — Preview AI result
                </Text>
                <Segmented
                  size="small"
                  value={mockResult}
                  onChange={(val) => handleMockResultChange(val as AIReviewResult)}
                  options={[
                    { label: "Approve", value: "Approve" },
          { label: "Reject", value: "Reject" },
          { label: "AI Warning", value: "Require Human Review" },
          { label: "No Decision", value: "Cannot Provide Decision" },
          { label: "High Risk", value: "High Risk Item" },
                  ]}
                  style={{ width: "100%" }}
                />
              </div>

              {/* AI Review Result Status */}
              {(() => {
                const resultConfig: Record<AIReviewResult, {
                  icon: React.ReactNode
                  bg: string
                  border: string
                  titleColor: string
                  label: string
                }> = {
                  'Approve': {
                    icon: <CheckCircleOutlined style={{ fontSize: 20, color: "#8c8c8c" }} />,
                    bg: "#fafafa",
                    border: "1px solid #d9d9d9",
                    titleColor: "#595959",
                    label: "No Alert Raised",
                  },
                  'Reject': {
                    icon: <ExclamationCircleOutlined style={{ fontSize: 20, color: "#fa8c16" }} />,
                    bg: "#fff7e6",
                    border: "1px solid #ffd591",
                    titleColor: "#d46b08",
                    label: "Issues Alert",
                  },
                  'Require Human Review': {
                    icon: <ExclamationCircleOutlined style={{ fontSize: 20, color: "#fa8c16" }} />,
                    bg: "#fff7e6",
                    border: "1px solid #ffd591",
                    titleColor: "#d46b08",
                    label: "Issues Alert",
                  },
                  'Cannot Provide Decision': {
                    icon: <ExclamationCircleOutlined style={{ fontSize: 20, color: "#fa8c16" }} />,
                    bg: "#fff7e6",
                    border: "1px solid #ffd591",
                    titleColor: "#d46b08",
                    label: "Issues Alert",
                  },
                  'High Risk Item': {
                    icon: <CloseCircleOutlined style={{ fontSize: 20, color: "#1677ff" }} />,
                    bg: "#f0f5ff",
                    border: "1px solid #adc6ff",
                    titleColor: "#0050b3",
                    label: "Not Covered",
                  },
                }

                const config = resultConfig[mockResult]
                const { confidence, message, timestamp } = mockConfig[mockResult]

                return (
                  <div style={{ padding: 16, background: config.bg, borderRadius: 8, border: config.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      {config.icon}
                      <Title level={4} style={{ margin: 0, color: config.titleColor }}>
                        {config.label}
                      </Title>
                      <Text style={{ fontSize: 12, color: "#666" }}>{confidence.toFixed(2)} / 1</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
                      {message}
                    </Text>
                    {mockResult === 'High Risk Item' && mockConfig['High Risk Item']?.uncovered_reasons && (
                      <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                        <Text style={{ fontSize: 11, fontWeight: 500, color: "#0050b3" }}>Triggered Rules:</Text>
                        {mockConfig['High Risk Item'].uncovered_reasons.map((reason, idx) => (
                          <div key={idx} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                            <div style={{ color: "#1677ff", marginTop: 2, fontSize: 12, fontWeight: 600 }}>•</div>
                            <Text style={{ fontSize: 11, color: "#262626" }}>{reason}</Text>
                          </div>
                        ))}
                      </div>
                    )}
                    <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
                      {timestamp}
                    </Text>
                  </div>
                )
              })()}

              {mockResult !== 'High Risk Item' && (
                <>
                  <Divider style={{ margin: 0 }} />

                  {/* User Action Area - Decision buttons */}
                  {submitted ? (
                <div style={{
                  padding: "12px 16px",
                  background: "#f6ffed",
                  border: "1px solid #b7eb8f",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 16 }} />
                  <Text style={{ fontSize: 13, color: "#389e0d" }}>
                    Response submitted
                    {selectedAction && `: ${selectedAction}`}
                  </Text>
                </div>
              ) : (
                /* Your decision — thumbs up (赞=Accept) / thumbs down (踩=Not Accept) */
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    {/* 赞 = Accept */}
                    <button
                      onClick={() => handleActionClick("Accept")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `2px solid ${selectedAction === "Accept" ? "#52c41a" : "#e8e8e8"}`,
                        background: selectedAction === "Accept" ? "#f6ffed" : "#fafafa",
                        cursor: "pointer",
                        transition: "all 0.18s",
                        flex: 1,
                      }}
                    >
                      <LikeFilled style={{
                        fontSize: 16,
                        color: selectedAction === "Accept" ? "#52c41a" : "#bfbfbf",
                        transition: "color 0.18s",
                      }} />
                    </button>

                    {/* 踩 = Not Accept → opens modal asking "有什么问题？" */}
                    <button
                      onClick={() => handleActionClick("Not Accept")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: `2px solid ${selectedAction === "Not Accept" ? "#ff4d4f" : "#e8e8e8"}`,
                        background: selectedAction === "Not Accept" ? "#fff2f0" : "#fafafa",
                        cursor: "pointer",
                        transition: "all 0.18s",
                        flex: 1,
                      }}
                    >
                      <DislikeFilled style={{
                        fontSize: 16,
                        color: selectedAction === "Not Accept" ? "#ff4d4f" : "#bfbfbf",
                        transition: "color 0.18s",
                      }} />
                    </button>
                  </div>

                  {/* After accept/not-accept, show submit button */}
                  {selectedAction && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {/* Summary chips */}
                      {(checkedItems.length > 0 || othersChecked) && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {checkedItems.map((key) => {
                            const item = CHECK_ITEMS.find((c) => c.key === key)
                            return item ? (
                              <Tag key={key} color="orange" style={{ fontSize: 11, margin: 0 }}>
                                {item.label}
                              </Tag>
                            ) : null
                          })}
                          {othersChecked && othersText && (
                            <Tag color="orange" style={{ fontSize: 11, margin: 0 }}>Others: {othersText}</Tag>
                          )}
                        </div>
                      )}
                      <Button
                        type="primary"
                        size="small"
                        onClick={handleSubmit}
                        style={{ borderRadius: 6 }}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                  </div>
                  )}
                </>
              )}

              {mockResult !== 'High Risk Item' && (
                <>
                  <Divider style={{ margin: 0 }} />

                  {/* Confidence Section */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>Confidence</Text>
                      <Text style={{ fontSize: 12, fontWeight: 600 }}>{mockConfig[mockResult].confidence.toFixed(2)} / 1</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 11 }}>v0.30 update amounts rule (JS)</Text>
                  </div>

                  <Divider style={{ margin: 0 }} />
                </>
              )}

              {mockResult !== 'High Risk Item' && (() => {
                const isIssuesAlert = ['Reject', 'Require Human Review', 'Cannot Provide Decision'].includes(mockResult)
                return (
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Document Validity Section */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Document Validity</Text>
                    {!isIssuesAlert && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                        <Text style={{ fontSize: 12 }}>Document title</Text>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 14 }} />
                      <Text style={{ fontSize: 12 }}>Invoice Regulatory Compliance (ATP)</Text>
                    </div>
                    <div style={{ padding: 12, background: "#fff1f0", borderRadius: 6, marginTop: 8 }}>
                      <Text style={{ fontSize: 11, color: "#cf1322" }}>
                        Authority to Print (ATP) is missing/empty and is required for a "SERVICE INVOICE"
                      </Text>
                    </div>
                  </div>

                  <Divider style={{ margin: 0 }} />

                  {!isIssuesAlert && (
                    <>
                      {/* Invoice Key Info */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Invoice Key Info</Text>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Invoice date match and range</Text>
                        </div>
                      </div>

                      <Divider style={{ margin: 0 }} />

                      {/* Buyer Identity */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Buyer Identity</Text>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Billing name match (Entity Info)</Text>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Billing address match (Entity Info)</Text>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Billing TIN match (Entity Info)</Text>
                        </div>
                      </div>

                      <Divider style={{ margin: 0 }} />

                      {/* Supplier Identity */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Supplier Identity</Text>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Supplier name match (PO)</Text>
                        </div>
                      </div>

                      <Divider style={{ margin: 0 }} />

                      {/* Financial Accuracy */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Financial Accuracy</Text>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Total after tax equals submission amount</Text>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                          <Text style={{ fontSize: 12 }}>Total after tax equals net plus VAT (12%)</Text>
                        </div>
                      </div>

                      <Divider style={{ margin: 0 }} />
                    </>
                  )}
                </div>
                )
              })()}
            </div>
          </Card>



          {/* Feedback Modal — select which check items AI got wrong */}
          <Modal
            open={modalOpen}
            onCancel={handleModalCancel}
            onOk={handleModalConfirm}
            okText="Confirm"
            cancelText="Cancel"
            okButtonProps={{ disabled: isModalConfirmDisabled }}
            title={
              <div>
                <Text strong style={{ fontSize: 15 }}>
                  {pendingAction === 'Accept' ? '赞' : 'Please identify the items wrongly judged'}
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
                  {pendingAction === 'Accept'
                    ? 'Review the AI conclusion on this invoice'
                    : 'Select check items that were incorrectly judged by AI'}
                </Text>
              </div>
            }
            width={480}
          >
            {pendingAction === 'Not Accept' ? (
              /* ── Not Accept Modal — directly show checklist ── */
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                <ChecklistSection
                  checkedItems={checkedItems}
                  othersChecked={othersChecked}
                  othersText={othersText}
                  aiCheckItems={pr.aiReview?.checkItems}
                  onToggleItem={(key, checked) => {
                    const next = checked ? [...checkedItems, key] : checkedItems.filter(k => k !== key)
                    setCheckedItems(next)
                  }}
                  onToggleOthers={(checked) => { setOthersChecked(checked); if (!checked) setOthersText("") }}
                  onOthersTextChange={setOthersText}
                />

                {/* Overall note — shown when at least one item or Others is selected */}
                {(checkedItems.length > 0 || othersChecked) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Text style={{ fontSize: 12, color: "#595959", fontWeight: 500 }}>Additional Notes (Optional)</Text>
                    <Input.TextArea
                      placeholder="Add any additional notes or comments..."
                      rows={3}
                      value={overallNote}
                      onChange={(e) => setOverallNote(e.target.value)}
                      style={{ fontSize: 12, borderRadius: 6 }}
                    />
                  </div>
                )}
              </div>
            ) : pendingAction === 'Accept' ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                {/* Yes / Yes with feedback choice */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(['yes', 'yes-feedback'] as const).map((choice) => {
                    const isSelected = acceptInvoiceChoice === choice
                    return (
                      <div
                        key={choice}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click() }}
                        onClick={() => {
                          setAcceptInvoiceChoice(choice)
                          if (choice === 'yes') {
                            setCheckedItems([])
                            setOthersChecked(false)
                            setOthersText("")
                          }
                        }}
                        style={{
                          padding: "10px 14px",
                          border: `1.5px solid ${isSelected ? "#1677ff" : "#d9d9d9"}`,
                          borderRadius: 8,
                          background: isSelected ? "#e6f4ff" : "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: `2px solid ${isSelected ? "#1677ff" : "#d9d9d9"}`,
                          background: isSelected ? "#1677ff" : "#fff",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                        </div>
                        <div>
                          <Text style={{ fontSize: 13, fontWeight: isSelected ? 600 : 400 }}>
                            {choice === 'yes' ? 'All Issues Identified Correctly' : 'Good Alert but with Feedback'}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {choice === 'yes'
                              ? 'I agree with the AI conclusion'
                              : 'I agree, but want to flag specific check items'}
                          </Text>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Checklist — only shown when "yes with feedback" selected */}
                {acceptInvoiceChoice === 'yes-feedback' && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <ChecklistSection
                      checkedItems={checkedItems}
                      othersChecked={othersChecked}
                      othersText={othersText}
                      aiCheckItems={pr.aiReview?.checkItems}
                      onToggleItem={(key, checked) => {
                        const next = checked ? [...checkedItems, key] : checkedItems.filter(k => k !== key)
                        setCheckedItems(next)
                      }}
                      onToggleOthers={(checked) => { setOthersChecked(checked); if (!checked) setOthersText("") }}
                      onOthersTextChange={setOthersText}
                      label="WHAT ISSUES DID AI IDENTIFY INCORRECTLY?"
                    />

                    {/* Overall note — shown when at least one item or Others is selected */}
                    {(checkedItems.length > 0 || othersChecked) && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text style={{ fontSize: 12, color: "#595959", fontWeight: 500 }}>Additional Notes (Optional)</Text>
                        <Input.TextArea
                          placeholder="Add any additional notes or comments..."
                          rows={3}
                          value={overallNote}
                          onChange={(e) => setOverallNote(e.target.value)}
                          style={{ fontSize: 12, borderRadius: 6 }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* fallback — original checklist */
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ChecklistSection
                  checkedItems={checkedItems}
                  othersChecked={othersChecked}
                  othersText={othersText}
                  aiCheckItems={pr.aiReview?.checkItems}
                  onToggleItem={(key, checked) => {
                    const next = checked ? [...checkedItems, key] : checkedItems.filter(k => k !== key)
                    setCheckedItems(next)
                  }}
                  onToggleOthers={(checked) => { setOthersChecked(checked); if (!checked) setOthersText("") }}
                  onOthersTextChange={setOthersText}
                />

                {/* Overall note — shown when at least one item or Others is selected */}
                {(checkedItems.length > 0 || othersChecked) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Text style={{ fontSize: 12, color: "#595959", fontWeight: 500 }}>Additional Notes (Optional)</Text>
                    <Input.TextArea
                      placeholder="Add any additional notes or comments..."
                      rows={3}
                      value={overallNote}
                      onChange={(e) => setOverallNote(e.target.value)}
                      style={{ fontSize: 12, borderRadius: 6 }}
                    />
                  </div>
                )}
              </div>
            )}
          </Modal>
        </Col>
      </Row>
    </div>
  )
}
