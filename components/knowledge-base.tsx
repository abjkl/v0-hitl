"use client"

import { useState } from "react"
import { Table, Tabs, Input, Badge, Typography, Space, Tooltip, Collapse, Tag } from "antd"
import { SearchOutlined, ApiOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import {
  buyerInfoData, supplierTermDateData, supplierBankAccountData,
  type BuyerInfo, type SupplierTermDate, type SupplierBankAccount,
} from "@/lib/mock-data"

const { Text } = Typography

const LAST_SYNCED = "2025-03-19 08:00 UTC+8"

function SyncLabel() {
  return (
    <Text type="secondary" style={{ fontSize: 12 }}>
      Last synced: {LAST_SYNCED}
    </Text>
  )
}

// ── API Reference Panel ──────────────────────────────────────────
const ENDPOINT = "GET /api/v1/knowledge/supplier-bank-account"

const REQUEST_PARAMS = [
  { param: "supplier_id", type: "string",  required: "No", desc: "Filter by supplier ID" },
  { param: "country",     type: "string",  required: "No", desc: "Filter by country code (e.g. SG, TH)" },
  { param: "page",        type: "integer", required: "No", desc: "Page number, default 1" },
  { param: "page_size",   type: "integer", required: "No", desc: "Records per page, max 100" },
]

const RESPONSE_FIELDS = [
  { field: "supplier_id", type: "string", desc: "Unique supplier identifier" },
  { field: "bank_name",   type: "string", desc: "Full bank name" },
  { field: "account_no",  type: "string", desc: "Masked account number" },
  { field: "currency",    type: "string", desc: "ISO 4217 currency code" },
  { field: "country",     type: "string", desc: "Country name" },
]

const EXAMPLE_JSON = `{
  "supplier_id": "SUP-SG-001",
  "bank_name": "DBS Bank Ltd",
  "account_no": "****5678",
  "currency": "SGD",
  "country": "Singapore"
}`

const monoStyle: React.CSSProperties = { fontFamily: "monospace", fontSize: 12 }
const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#8c8c8c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" }
const miniThStyle: React.CSSProperties = { padding: "5px 8px", textAlign: "left" as const, fontWeight: 600, fontSize: 11, color: "#8c8c8c", borderBottom: "1px solid #e8e8e8", background: "#fafafa" }
const miniTdStyle: React.CSSProperties = { padding: "5px 8px", fontSize: 12, borderBottom: "1px solid #f5f5f5", verticalAlign: "top" as const }

function ApiReferencePanel() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(ENDPOINT).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        background: "#f0f5ff",
        border: "1px solid #adc6ff",
        borderRadius: 6,
        padding: 16,
        fontSize: 13,
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <ApiOutlined style={{ color: "#1890ff", fontSize: 15 }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1d1d1d" }}>API Reference</span>
      </div>

      {/* Endpoint */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Endpoint</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid #d6e4ff",
            borderRadius: 4,
            padding: "7px 10px",
          }}
        >
          <Text style={{ ...monoStyle, flex: 1, color: "#0050b3", fontSize: 12 }}>{ENDPOINT}</Text>
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <span
              onClick={handleCopy}
              style={{ cursor: "pointer", color: copied ? "#52c41a" : "#8c8c8c", flexShrink: 0 }}
            >
              {copied ? <CheckOutlined /> : <CopyOutlined />}
            </span>
          </Tooltip>
        </div>
      </div>

      {/* Auth */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Authentication</span>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexDirection: "column" }}>
          <Tag style={{ background: "#fff", borderColor: "#adc6ff", color: "#2f54eb", fontWeight: 500, ...monoStyle }}>
            Bearer Token
          </Tag>
          <Text type="secondary" style={{ fontSize: 11 }}>Use your AI_OPS service token</Text>
        </div>
      </div>

      {/* Request Params */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Request Parameters</span>
        <div style={{ border: "1px solid #d6e4ff", borderRadius: 4, overflow: "hidden", background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={miniThStyle}>Param</th>
                <th style={miniThStyle}>Type</th>
                <th style={miniThStyle}>Req.</th>
                <th style={miniThStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {REQUEST_PARAMS.map((p) => (
                <tr key={p.param}>
                  <td style={miniTdStyle}><Text code style={{ fontSize: 11 }}>{p.param}</Text></td>
                  <td style={{ ...miniTdStyle, color: "#722ed1", ...monoStyle }}>{p.type}</td>
                  <td style={{ ...miniTdStyle, color: "#8c8c8c" }}>{p.required}</td>
                  <td style={{ ...miniTdStyle, color: "#595959" }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Schema */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Response Schema</span>
        <div style={{ border: "1px solid #d6e4ff", borderRadius: 4, overflow: "hidden", background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={miniThStyle}>Field</th>
                <th style={miniThStyle}>Type</th>
                <th style={miniThStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {RESPONSE_FIELDS.map((f) => (
                <tr key={f.field}>
                  <td style={miniTdStyle}><Text code style={{ fontSize: 11 }}>{f.field}</Text></td>
                  <td style={{ ...miniTdStyle, color: "#722ed1", ...monoStyle }}>{f.type}</td>
                  <td style={{ ...miniTdStyle, color: "#595959" }}>{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Example Response (collapsible) */}
      <Collapse
        ghost
        style={{ background: "transparent", border: "none" }}
        items={[{
          key: "example",
          label: <span style={{ fontSize: 12, fontWeight: 600, color: "#595959" }}>Example Response</span>,
          style: { padding: 0 },
          children: (
            <pre
              style={{
                background: "#1e1e2e",
                color: "#cdd6f4",
                borderRadius: 4,
                padding: "10px 12px",
                fontSize: 11,
                lineHeight: 1.7,
                margin: 0,
                overflowX: "auto",
                ...monoStyle,
              }}
            >
              {EXAMPLE_JSON}
            </pre>
          ),
        }]}
      />
    </div>
  )
}

// ── Buyer Info ───────────────────────────────────────────────────
function BuyerInfoTab() {
  const [search, setSearch] = useState("")
  const filtered = buyerInfoData.filter(
    (r) =>
      r.buyerId.toLowerCase().includes(search.toLowerCase()) ||
      r.buyerName.toLowerCase().includes(search.toLowerCase()),
  )

  const columns: ColumnsType<BuyerInfo> = [
    { title: "Buyer ID", dataIndex: "buyerId", key: "buyerId", width: 120 },
    { title: "Buyer Name", dataIndex: "buyerName", key: "buyerName", ellipsis: true },
    { title: "Region", dataIndex: "region", key: "region", width: 90 },
    { title: "Entity", dataIndex: "entity", key: "entity", width: 80 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status: BuyerInfo["status"]) =>
        status === "Active" ? (
          <Badge status="success" text={<span style={{ fontSize: 13 }}>Active</span>} />
        ) : (
          <Badge status="default" text={<span style={{ color: "#8c8c8c", fontSize: 13 }}>Inactive</span>} />
        ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Search by ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260 }}
          allowClear
        />
        <SyncLabel />
      </div>
      <Table
        columns={columns}
        dataSource={filtered}
        size="small"
        pagination={{ pageSize: 20, showTotal: (total) => `Total ${total} records`, showSizeChanger: false }}
        bordered={false}
        rowKey="key"
      />
    </div>
  )
}

// ── Supplier Term Date ───────────────────────────────────────────
function SupplierTermDateTab() {
  const [search, setSearch] = useState("")
  const filtered = supplierTermDateData.filter(
    (r) =>
      r.supplierId.toLowerCase().includes(search.toLowerCase()) ||
      r.supplierName.toLowerCase().includes(search.toLowerCase()),
  )

  const columns: ColumnsType<SupplierTermDate> = [
    { title: "Supplier ID", dataIndex: "supplierId", key: "supplierId", width: 120 },
    { title: "Supplier Name", dataIndex: "supplierName", key: "supplierName", ellipsis: true },
    { title: "Payment Term", dataIndex: "paymentTerm", key: "paymentTerm", width: 130 },
    { title: "Due Date Rule", dataIndex: "dueDateRule", key: "dueDateRule" },
    { title: "Region", dataIndex: "region", key: "region", width: 90 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Search by ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260 }}
          allowClear
        />
        <SyncLabel />
      </div>
      <Table
        columns={columns}
        dataSource={filtered}
        size="small"
        pagination={{ pageSize: 20, showTotal: (total) => `Total ${total} records`, showSizeChanger: false }}
        bordered={false}
        rowKey="key"
      />
    </div>
  )
}

// ── Supplier Bank Account (two-column layout) ────────────────────
function SupplierBankAccountTab() {
  const [search, setSearch] = useState("")
  const filtered = supplierBankAccountData.filter(
    (r) =>
      r.supplierId.toLowerCase().includes(search.toLowerCase()) ||
      r.bankName.toLowerCase().includes(search.toLowerCase()),
  )

  const columns: ColumnsType<SupplierBankAccount> = [
    { title: "Supplier ID", dataIndex: "supplierId", key: "supplierId", width: 120 },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName", ellipsis: true },
    {
      title: "Account No.",
      dataIndex: "accountNo",
      key: "accountNo",
      width: 150,
      render: (v: string) => (
        <Tag style={{ fontFamily: "monospace", letterSpacing: 1, background: "#f5f5f5", border: "none", color: "#434343", fontSize: 12 }}>
          {v}
        </Tag>
      ),
    },
    { title: "Currency", dataIndex: "currency", key: "currency", width: 95 },
    { title: "Country", dataIndex: "country", key: "country" },
  ]

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* Left: 65% — data table */}
      <div style={{ flex: "0 0 65%", minWidth: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <Input
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Search by ID or Bank"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 260 }}
            allowClear
          />
          <SyncLabel />
        </div>
        <Table
          columns={columns}
          dataSource={filtered}
          size="small"
          pagination={{ pageSize: 8, showTotal: (total) => `Total ${total} records`, showSizeChanger: false }}
          bordered={false}
          rowKey="key"
        />
      </div>

      {/* Right: 35% — sticky API Reference */}
      <div style={{ flex: "0 0 35%", minWidth: 0 }}>
        <ApiReferencePanel />
      </div>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────────────
export function KnowledgeBase() {
  const tabs = [
    { key: "buyer", label: "Buyer Info",             children: <BuyerInfoTab /> },
    { key: "term",  label: "Supplier Term Date",      children: <SupplierTermDateTab /> },
    { key: "bank",  label: "Supplier Bank Account",   children: <SupplierBankAccountTab /> },
  ]

  return (
    <div style={{ background: "#fff", borderRadius: 4, border: "1px solid #f0f0f0", padding: "16px 20px" }}>
      <Tabs items={tabs} defaultActiveKey="bank" style={{ marginTop: -4 }} />
    </div>
  )
}
