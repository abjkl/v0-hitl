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
} from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import {
  type PurchaseRequest,
  type PRItem,
  type PRStatus,
  formatPRCurrency,
  getRiskRulesByPR,
  riskRulesDefinition,
} from "@/lib/mock-data"

const { Text, Title } = Typography

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
      title: "Item",
      key: "item",
      render: (_: unknown, record: PRItem) => (
        <div>
          <Text style={{ fontWeight: 500 }}>{record.description}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.itemNumber}</Text>
        </div>
      ),
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 80,
    },
    {
      title: "Unit Price",
      key: "unitPrice",
      align: "right",
      width: 120,
      render: (_: unknown, record: PRItem) => formatPRCurrency(record.unitPrice, pr.currency),
    },
    {
      title: "Subtotal",
      key: "totalPrice",
      align: "right",
      width: 120,
      render: (_: unknown, record: PRItem) => (
        <Text strong>{formatPRCurrency(record.totalPrice, pr.currency)}</Text>
      ),
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header Card */}
      <Card size="small" style={{ borderRadius: 8 }}>
        {/* Top row: Back button and Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          <Space>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} />
            <Text type="secondary">Purchase Request</Text>
          </Space>
          <Space>
            <Button>Attachments</Button>
            <Button>Processing Progress</Button>
            <Button type="text" icon={<FileTextOutlined />} />
          </Space>
        </div>

        {/* Title and Status row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <Space size={8} align="center">
              <Title level={4} style={{ margin: 0 }}>{pr.prNumber}</Title>
              <Text type="secondary">·</Text>
              <Text style={{ fontSize: 18 }}>{pr.title}</Text>
            </Space>
            <div style={{ marginTop: 8 }}>
              <Space size={12}>
                <Tag color={STATUS_TAG_COLORS[pr.status]}>{pr.status}</Tag>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Submitted by {pr.requestor} on {pr.createdAt}
                </Text>
              </Space>
            </div>
          </div>

          <Space size={12}>
            {/* Risk Layer Tag */}
            {pr.isRisk && pr.riskRules.length > 0 && (
              <Tooltip
                title={
                  <div style={{ maxWidth: 280 }}>
                    {riskRules.map((rule) => (
                      <div key={rule.code} style={{ marginBottom: 4 }}>
                        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ff4d4f", marginRight: 8 }} />
                        <span style={{ fontSize: 12 }}>{rule.triggeredExpression}</span>
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
            <Button icon={<CheckCircleOutlined />}>Approve</Button>
            <Button danger icon={<CloseCircleOutlined />}>Reject</Button>
          </Space>
        </div>

        {/* Steps */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
          <Steps
            current={0}
            size="small"
            items={[
              { title: "Review Invoice & PO" },
              { title: "Match Invoice & Receipt" },
              { title: "Create IR voucher" },
            ]}
          />
        </div>
      </Card>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Basic Information */}
          <Card title="Basic Information" size="small" style={{ borderRadius: 8 }}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="Supplier">
                <Text strong>{pr.vendor}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Region">
                <Text strong>{pr.region}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Entity">
                <Text strong>{pr.department}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <Text strong>{formatPRCurrency(pr.totalAmount, pr.currency)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                <Text strong>{pr.currency}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Submitted By">
                <Text strong>{pr.requestor}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Submitted At">
                <Text strong>{pr.createdAt}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                <Text strong>{pr.department}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Line Items */}
          <Card
            title="Line Items"
            size="small"
            style={{ borderRadius: 8 }}
            styles={{ body: { padding: 0 } }}
          >
            <Table
              columns={itemColumns}
              dataSource={pr.items}
              rowKey="id"
              size="small"
              pagination={false}
            />
          </Card>

          {/* Risk Layer Detail */}
          {pr.isRisk && pr.riskRules.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Title level={5} style={{ margin: 0 }}>Risk Layer Detail</Title>
              {pr.riskRules.map((ruleCode) => {
                const rule = riskRulesDefinition[ruleCode]
                if (!rule) return null
                return (
                  <Card key={ruleCode} size="small" style={{ borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <Text strong style={{ fontSize: 15 }}>{rule.uiName}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>{rule.code}</Text>
                      </div>
                      <Tag color="red">High Risk</Tag>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Control Block:</Text>
                        <br />
                        <Text style={{ fontSize: 13 }}>{rule.description}</Text>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>Configured Threshold:</Text>
                          <br />
                          <Text style={{ fontSize: 13 }}>{rule.threshold}</Text>
                        </div>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>Actual Value:</Text>
                          <br />
                          <Text style={{ fontSize: 13 }}>{rule.actualValue}</Text>
                        </div>
                      </div>

                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Risk Message:</Text>
                        <div style={{ marginTop: 6, padding: 12, background: "#fff2f0", border: "1px solid #ffccc7", borderRadius: 6 }}>
                          <Text style={{ fontSize: 13, color: "#cf1322" }}>{rule.riskMessage}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* No Risk Message */}
          {(!pr.isRisk || pr.riskRules.length === 0) && (
            <Card
              size="small"
              style={{
                borderRadius: 8,
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 18 }} />
                <Text strong style={{ color: "#389e0d" }}>Risk Layer Assessment Complete</Text>
              </div>
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <Text style={{ color: "#52c41a", fontSize: 13 }}>
                  This PR passed the Risk Layer. It will enter AI Invoice Review.
                </Text>
              </div>
            </Card>
          )}

          {/* Attachments */}
          <Card title="Attachments" size="small" style={{ borderRadius: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {pr.attachments.length === 0 ? (
                <Text type="secondary">No attachments</Text>
              ) : (
                pr.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 12,
                      background: "#fafafa",
                      borderRadius: 8,
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Space>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FileTextOutlined style={{ fontSize: 18, color: "#8c8c8c" }} />
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 13 }}>{attachment.fileName}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>{attachment.fileSize}</Text>
                      </div>
                    </Space>
                    <Button type="text" icon={<DownloadOutlined />} />
                  </div>
                ))
              )}
              {/* Mock attachments if empty */}
              {pr.attachments.length === 0 && (
                <>
                  {["Invoice.pdf", "Contract.pdf", "Delivery Order.pdf"].map((fileName, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 12,
                        background: "#fafafa",
                        borderRadius: 8,
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      <Space>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileTextOutlined style={{ fontSize: 18, color: "#8c8c8c" }} />
                        </div>
                        <div>
                          <Text strong style={{ fontSize: 13 }}>{fileName}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>2.5 MB</Text>
                        </div>
                      </Space>
                      <Button type="text" icon={<DownloadOutlined />} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div>
          <Card title="Summary" size="small" style={{ borderRadius: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>Total Amount</Text>
                <Title level={4} style={{ margin: "4px 0 0" }}>
                  {formatPRCurrency(pr.totalAmount, pr.currency)}
                </Title>
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>Items</Text>
                <Title level={4} style={{ margin: "4px 0 0" }}>
                  {pr.items.length}
                </Title>
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>Urgency</Text>
                <div style={{ marginTop: 4 }}>
                  <Tag
                    color={
                      pr.urgency === "Critical"
                        ? "red"
                        : pr.urgency === "High"
                          ? "orange"
                          : pr.urgency === "Medium"
                            ? "blue"
                            : "default"
                    }
                  >
                    {pr.urgency}
                  </Tag>
                </div>
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>Approver</Text>
                <div style={{ marginTop: 4 }}>
                  <Text strong>{pr.approver}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{pr.approverEmail}</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
