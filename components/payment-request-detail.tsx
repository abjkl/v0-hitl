"use client"

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
} from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import {
  type PurchaseRequest,
  type PRItem,
  type PRStatus,
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

export function PaymentRequestDetail({ pr, onBack }: PaymentRequestDetailProps) {
  const riskRules = getRiskRulesByPR(pr)

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
            <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
              <LeftOutlined style={{ fontSize: 12, color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: 13 }}>
                {pr.prNumber}
              </Text>
              <RightOutlined style={{ fontSize: 12, color: "#8c8c8c" }} />
              <Tag color="blue">{pr.status}</Tag>
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
        <Col span={8}>
          {/* Risk Layer Assessment Panel */}
          <Card
            title="AI Review"
            size="small"
            style={{ borderRadius: 8 }}
            extra={<Button type="text">Parsing Invoice Retry</Button>}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Risk Status */}
              {pr.isRisk && pr.riskRules.length > 0 ? (
                <div style={{ padding: 16, background: "#fff2f0", borderRadius: 8, border: "1px solid #ffccc7" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CloseCircleOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />
                    <Title level={4} style={{ margin: 0, color: "#cf1322" }}>
                      Reject
                    </Title>
                    <Text style={{ fontSize: 12, color: "#666" }}>0.63 / 1</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
                    Rejected due to rule failure: Payment Request Invoice Review Biz Agent - Please check your invoice for Regulatory Compliance (ATP), Invoice number match PA entry, Supplier name match (PO), Total after tax equals submission amount, Total after tax equals net plus VAT (12%)
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11, display: "block" }}>
                    {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                  </Text>
                </div>
              ) : (
                <div style={{ padding: 16, background: "#f6ffed", borderRadius: 8, border: "1px solid #b7eb8f" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />
                    <Title level={4} style={{ margin: 0, color: "#389e0d" }}>
                      Pass
                    </Title>
                    <Text style={{ fontSize: 12, color: "#666" }}>0.98 / 1</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                    All sub-agents passed. Payment Request Invoice Review Biz Agent, DO Review Agent passed
                  </Text>
                </div>
              )}

              <Divider style={{ margin: 0 }} />

              {/* Confidence Section */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Confidence</Text>
                  <Text style={{ fontSize: 12, fontWeight: 600 }}>0.48 / 1</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>v0.30 update amounts rule (JS)</Text>
              </div>

              <Divider style={{ margin: 0 }} />

              {/* Document Validity Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Document Validity</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 14 }} />
                  <Text style={{ fontSize: 12 }}>Document title</Text>
                </div>
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

              {/* DO Review Agent */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>DO Review Agent</Text>
                <Tag color="green">Pass</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
