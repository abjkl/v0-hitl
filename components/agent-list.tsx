"use client"

import { useState } from "react"
import { Table, Input, Button, Tag, Typography, Space } from "antd"
import { SearchOutlined, PlusOutlined, ExperimentOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { agentListData, type Agent, type AgentStatus, type AgentStep } from "@/lib/mock-data"

const { Text, Link } = Typography

const STATUS_CONFIG: Record<AgentStatus, { color: string; bg: string; label: string }> = {
  ACTIVE:     { color: "#389e0d", bg: "#f6ffed", label: "ACTIVE" },
  TESTING:    { color: "#d46b08", bg: "#fff7e6", label: "TESTING" },
  DEPRECATED: { color: "#8c8c8c", bg: "#f5f5f5", label: "DEPRECATED" },
}

const STEP_LABELS: Record<AgentStep, string> = {
  INVOICE_REVIEW: "INVOICE_REVIEW",
  MATCH:          "MATCH",
  AP_VOUCHER:     "AP_VOUCHER",
}

function StatusTag({ status }: { status: AgentStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <Tag
      style={{
        color: cfg.color,
        background: cfg.bg,
        borderColor: cfg.color + "66",
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: 0.3,
      }}
    >
      {cfg.label}
    </Tag>
  )
}

export function AgentList({ onView, onTriggerTest }: { onView: (id: string) => void; onTriggerTest?: (id: string) => void }) {
  const [search, setSearch] = useState("")

  const filtered = agentListData.filter(
    (r) =>
      r.agentName.toLowerCase().includes(search.toLowerCase()) ||
      r.step.toLowerCase().includes(search.toLowerCase()),
  )

  const columns: ColumnsType<Agent> = [
    {
      title: "Agent Name",
      dataIndex: "agentName",
      key: "agentName",
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Step",
      dataIndex: "step",
      key: "step",
      width: 180,
      render: (step: AgentStep) => (
        <Tag style={{ fontFamily: "monospace", fontSize: 11, background: "#f0f0f0", border: "none", color: "#595959" }}>
          {STEP_LABELS[step]}
        </Tag>
      ),
    },
    {
      title: "Current Version",
      dataIndex: "currentVersion",
      key: "currentVersion",
      width: 160,
      render: (v: string) => <Text code>{v}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status: AgentStatus) => <StatusTag status={status} />,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      width: 170,
      render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_: unknown, record: Agent) => (
        <Space size={12}>
          <Link onClick={() => onView(record.id)} style={{ fontSize: 13 }}>
            View
          </Link>
          {record.status === "TESTING" && onTriggerTest && (
            <Link onClick={() => onTriggerTest(record.id)} style={{ fontSize: 13, color: "#d46b08" }}>
              <ExperimentOutlined style={{ marginRight: 4 }} />
              Run Test
            </Link>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div style={{ background: "#fff", borderRadius: 4, border: "1px solid #f0f0f0", padding: "16px 20px" }}>
      <div className="flex items-center justify-between mb-4">
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Search by Agent Name or Step"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} style={{ background: "#1890ff" }}>
          New Agent
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filtered}
        size="small"
        rowKey="key"
        pagination={{ pageSize: 20, showTotal: (total) => `Total ${total} agents`, showSizeChanger: false }}
        bordered={false}
      />
    </div>
  )
}
