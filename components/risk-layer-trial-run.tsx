"use client"

import { useState } from "react"
import { Card, Button, Input, Table, Tag, Typography, Space, Spin, Popover, List } from "antd"
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import {
  type RiskLayerConfig,
  type RuleNode,
  type ConditionNode,
  getParameterDefinition,
} from "@/lib/mock-data"

const { Text } = Typography

// Mock PR data pool – keyed by PR id
const PR_DATA_POOL: Record<string, PRRecord> = {
  "PR-001": { prId: "PR-001", paymentGroup: "PG-001", invoiceNumber: "INV-2025-0001", invoiceDate: "2025-01-05", whtReview: "Pass", ebsApVoucherNo: "AP-88001", status: "Approved" },
  "PR-002": { prId: "PR-002", paymentGroup: "PG-001", invoiceNumber: "INV-2025-0002", invoiceDate: "2025-01-08", whtReview: "N/A",  ebsApVoucherNo: "AP-88002", status: "Rejected" },
  "PR-003": { prId: "PR-003", paymentGroup: "PG-002", invoiceNumber: "INV-2025-0003", invoiceDate: "2025-01-12", whtReview: "Pass", ebsApVoucherNo: "AP-88003", status: "Approved" },
  "PR-004": { prId: "PR-004", paymentGroup: "PG-002", invoiceNumber: "INV-2025-0004", invoiceDate: "2025-01-15", whtReview: "Pass", ebsApVoucherNo: "AP-88004", status: "Approved" },
  "PR-005": { prId: "PR-005", paymentGroup: "PG-003", invoiceNumber: "INV-2025-0005", invoiceDate: "2025-01-20", whtReview: "N/A",  ebsApVoucherNo: "AP-88005", status: "Approved" },
  "PR-006": { prId: "PR-006", paymentGroup: "PG-004", invoiceNumber: "INV-2025-0006", invoiceDate: "2025-02-01", whtReview: "Pass", ebsApVoucherNo: "AP-88006", status: "Approved" },
  "PR-007": { prId: "PR-007", paymentGroup: "PG-004", invoiceNumber: "INV-2025-0007", invoiceDate: "2025-02-05", whtReview: "Fail", ebsApVoucherNo: "",         status: "Rejected" },
  "PR-008": { prId: "PR-008", paymentGroup: "PG-005", invoiceNumber: "INV-2025-0008", invoiceDate: "2025-02-10", whtReview: "Pass", ebsApVoucherNo: "AP-88008", status: "Approved" },
  "PR-009": { prId: "PR-009", paymentGroup: "PG-006", invoiceNumber: "INV-2025-0009", invoiceDate: "2025-02-14", whtReview: "N/A",  ebsApVoucherNo: "AP-88009", status: "Approved" },
  "PR-010": { prId: "PR-010", paymentGroup: "PG-007", invoiceNumber: "INV-2025-0010", invoiceDate: "2025-02-20", whtReview: "Fail", ebsApVoucherNo: "",         status: "Rejected" },
  "PR-011": { prId: "PR-011", paymentGroup: "PG-008", invoiceNumber: "INV-2025-0011", invoiceDate: "2025-03-01", whtReview: "Pass", ebsApVoucherNo: "AP-88011", status: "Approved" },
  "PR-012": { prId: "PR-012", paymentGroup: "PG-009", invoiceNumber: "INV-2025-0012", invoiceDate: "2025-03-05", whtReview: "Pass", ebsApVoucherNo: "AP-88012", status: "Approved" },
}

// Collect all leaf ConditionNodes from a rule tree
function collectConditions(node: RuleNode): ConditionNode[] {
  if (node.type === "condition") return [node]
  return node.children.flatMap(collectConditions)
}

// Deterministically decide which conditions are "hit" for a given PR + config
function evaluateRiskLayer(
  prId: string,
  config: RiskLayerConfig,
): { result: "Yes" | "No"; hitConditions: string[] } {
  const allConditions = collectConditions(config.rootRuleNode)
  const prHash = prId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const configHash = config.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)

  // Deterministically pick a subset of conditions as "hit"
  const hitConditions: string[] = allConditions
    .filter((_, idx) => (prHash + configHash + idx) % 3 === 0)
    .map((c) => {
      const param = getParameterDefinition(c.parameterId)
      return param?.name ?? c.parameterId
    })

  const triggered = hitConditions.length > 0
  return { result: triggered ? "Yes" : "No", hitConditions }
}

interface PRRecord {
  prId: string
  paymentGroup: string
  invoiceNumber: string
  invoiceDate: string
  whtReview: string
  ebsApVoucherNo: string
  status: string
}

interface TrialRunRow extends PRRecord {
  riskResult: "Yes" | "No" | "Not Found"
  hitConditions: string[]
}

interface RiskLayerTrialRunProps {
  config: RiskLayerConfig
}

export function RiskLayerTrialRun({ config }: RiskLayerTrialRunProps) {
  const [inputValue, setInputValue] = useState("")
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<TrialRunRow[] | null>(null)

  function handleRun() {
    const ids = inputValue
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean)

    if (ids.length === 0) return

    setRunning(true)
    setResults(null)

    setTimeout(() => {
      const rows: TrialRunRow[] = ids.map((id) => {
        const pr = PR_DATA_POOL[id]
        if (!pr) {
          return {
            prId: id,
            paymentGroup: "—",
            invoiceNumber: "—",
            invoiceDate: "—",
            whtReview: "—",
            ebsApVoucherNo: "—",
            status: "Not Found",
            riskResult: "Not Found",
            hitConditions: [],
          }
        }
        const { result, hitConditions } = evaluateRiskLayer(id, config)
        return { ...pr, riskResult: result, hitConditions }
      })
      setResults(rows)
      setRunning(false)
    }, 800)
  }

  const columns: ColumnsType<TrialRunRow> = [
    {
      title: "Payment Group",
      dataIndex: "paymentGroup",
      key: "paymentGroup",
      width: 130,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Payment Request",
      dataIndex: "prId",
      key: "prId",
      width: 140,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 150,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 120,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "WHT Review",
      dataIndex: "whtReview",
      key: "whtReview",
      width: 110,
      render: (v: string) => {
        if (v === "—") return <Text type="secondary">—</Text>
        const color = v === "Pass" ? "green" : v === "Fail" ? "red" : "default"
        return <Tag color={color} style={{ margin: 0 }}>{v}</Tag>
      },
    },
    {
      title: "EBS AP Voucher No.",
      dataIndex: "ebsApVoucherNo",
      key: "ebsApVoucherNo",
      width: 160,
      render: (v: string) => (
        <Text style={{ fontSize: 13 }}>{v || "—"}</Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (v: string) => {
        if (v === "Not Found") return <Tag color="default">Not Found</Tag>
        const color = v === "Approved" ? "green" : "red"
        return <Tag color={color} style={{ margin: 0 }}>{v}</Tag>
      },
    },
    {
      title: "Risk Layer",
      key: "riskLayer",
      width: 140,
      render: (_: unknown, row: TrialRunRow) => {
        if (row.riskResult === "Not Found") return <Text type="secondary">—</Text>

        if (row.riskResult === "No") {
          return <Tag color="green" style={{ margin: 0, fontWeight: 500 }}>Passed</Tag>
        }

        // Yes – show tag + popover with hit conditions
        const popoverContent = (
          <div style={{ maxWidth: 280 }}>
            <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
              Conditions triggered:
            </Text>
            <List
              size="small"
              dataSource={row.hitConditions}
              renderItem={(item) => (
                <List.Item style={{ padding: "4px 0", borderBottom: "none" }}>
                  <Space size={6}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fa8c16", display: "inline-block", flexShrink: 0 }} />
                    <Text style={{ fontSize: 13 }}>{item}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )

        return (
          <Popover
            content={popoverContent}
            title={null}
            trigger="hover"
            placement="left"
          >
            <Space size={4} style={{ cursor: "pointer" }}>
              <Tag color="orange" style={{ margin: 0, fontWeight: 500 }}>Yes</Tag>
              <InfoCircleOutlined style={{ color: "#fa8c16", fontSize: 13 }} />
            </Space>
          </Popover>
        )
      },
    },
  ]

  return (
    <Card
      title="PR Trial Run"
      size="small"
      style={{ borderRadius: 8 }}
      styles={{ body: { padding: 20 } }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Input row */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
              Enter Payment Request IDs separated by commas
            </Text>
            <Input
              placeholder="e.g. PR-001, PR-002, PR-005"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleRun}
              allowClear
            />
          </div>
          <div style={{ paddingTop: 22 }}>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleRun}
              loading={running}
              disabled={!inputValue.trim()}
            >
              Run
            </Button>
          </div>
        </div>

        {/* Loading */}
        {running && (
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
            <Space>
              <Spin />
              <Text type="secondary">Evaluating rules...</Text>
            </Space>
          </div>
        )}

        {/* Results table */}
        {results && !running && (
          <div>
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {results.length} PR(s) evaluated
              </Text>
              <Space size={16}>
                <Text style={{ fontSize: 12 }}>
                  <Tag color="orange" style={{ margin: 0 }}>Yes</Tag>
                  {" "}{results.filter((r) => r.riskResult === "Yes").length}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  <Tag color="green" style={{ margin: 0 }}>Passed</Tag>
                  {" "}{results.filter((r) => r.riskResult === "No").length}
                </Text>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={results}
              rowKey="prId"
              size="small"
              pagination={false}
              scroll={{ x: "max-content" }}
              style={{ fontSize: 13 }}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
