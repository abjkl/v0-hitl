"use client"

import { useState, useMemo } from "react"
import {
  Table, Input, Select, Space, Tag, Typography, Empty,
} from "antd"
import { SearchOutlined, FilterOutlined, InboxOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { type CaseGolden } from "@/lib/mock-data"
import { type ArchivedCase } from "@/lib/archive-utils"
import { useRegion } from "@/lib/region-context"

const { Text } = Typography

function AmountCell({ amount, currency }: { amount: number; currency: string }) {
  return (
    <Text style={{ fontSize: 13, fontFamily: "monospace" }}>
      {currency} {amount.toLocaleString()}
    </Text>
  )
}

function uniqueOptions(values: string[]) {
  return [...new Set(values)].sort().map((v) => ({ label: v, value: v }))
}

interface Props {
  archivedCases: ArchivedCase[]
}

export function ArchivedCases({ archivedCases }: Props) {
  const { region } = useRegion()
  const [search, setSearch] = useState("")
  const [goldenFilter, setGoldenFilter] = useState<CaseGolden | null>(null)
  const [gtFilter, setGtFilter] = useState<string | null>(null)

  const regionPool = useMemo(
    () => archivedCases.filter((c) => c.entity === region),
    [archivedCases, region],
  )

  const entityOptions = useMemo(
    () => uniqueOptions(regionPool.map((c) => c.entity)),
    [regionPool],
  )

  const filtered = useMemo(() => {
    return regionPool.filter((c) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        c.caseId.toLowerCase().includes(q) ||
        c.invoiceNo.toLowerCase().includes(q) ||
        c.supplierName.toLowerCase().includes(q)
      const matchGolden = !goldenFilter || c.isGolden === goldenFilter
      const matchGt = !gtFilter || c.groundTruth === gtFilter
      return matchSearch && matchGolden && matchGt
    })
  }, [regionPool, search, goldenFilter, gtFilter])

  const columns: ColumnsType<ArchivedCase> = [
    {
      title: "Case ID",
      dataIndex: "caseId",
      key: "caseId",
      width: 120,
      render: (v: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{v}</Text>,
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      width: 155,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Supplier",
      dataIndex: "supplierName",
      key: "supplierName",
      ellipsis: true,
      render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      width: 70,
      render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 160,
      sorter: (a, b) => a.amount - b.amount,
      render: (v: number, r: ArchivedCase) => <AmountCell amount={v} currency={r.currency} />,
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 115,
      sorter: (a, b) => a.invoiceDate.localeCompare(b.invoiceDate),
      render: (v: string) => <Text style={{ fontSize: 13, color: "#595959" }}>{v}</Text>,
    },
    {
      title: "Review Date",
      dataIndex: "reviewDate",
      key: "reviewDate",
      width: 115,
      sorter: (a, b) => a.reviewDate.localeCompare(b.reviewDate),
      render: (v: string) => <Text style={{ fontSize: 13, color: "#595959" }}>{v}</Text>,
    },
    {
      title: "Golden",
      dataIndex: "isGolden",
      key: "isGolden",
      width: 90,
      render: (v: CaseGolden) =>
        v === "Golden" ? (
          <Tag style={{ fontSize: 11, color: "#d48806", background: "#fffbe6", borderColor: "#ffe58f" }}>Golden</Tag>
        ) : (
          <Text type="secondary" style={{ fontSize: 12 }}>—</Text>
        ),
    },
    {
      title: "Ground Truth",
      dataIndex: "groundTruth",
      key: "groundTruth",
      width: 110,
      render: (v: string) => {
        const color = v === "Pass" ? "#389e0d" : v === "Fail" ? "#cf1322" : "#8c8c8c"
        const bg = v === "Pass" ? "#f6ffed" : v === "Fail" ? "#fff1f0" : "#f5f5f5"
        const border = v === "Pass" ? "#b7eb8f" : v === "Fail" ? "#ffa39e" : "#d9d9d9"
        return <Tag style={{ fontSize: 11, color, background: bg, borderColor: border }}>{v}</Tag>
      },
    },
    {
      title: "Archived At",
      dataIndex: "archivedAt",
      key: "archivedAt",
      width: 165,
      sorter: (a, b) => a.archivedAt.localeCompare(b.archivedAt),
      render: (v: string) => (
        <Text style={{ fontSize: 12, color: "#8c8c8c", fontFamily: "monospace" }}>
          {new Date(v).toLocaleString("en-SG", { timeZone: "Asia/Singapore", hour12: false })}
        </Text>
      ),
    },
  ]

  return (
    <div style={{ background: "#fff", borderRadius: 4, border: "1px solid #f0f0f0", padding: "16px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <InboxOutlined style={{ color: "#8c8c8c", fontSize: 15 }} />
        <Text strong style={{ fontSize: 14 }}>Archived Cases</Text>
        <Tag style={{ marginLeft: 4, background: "#f5f5f5", borderColor: "#d9d9d9", color: "#595959", fontSize: 11 }}>
          Read-only
        </Tag>
      </div>

      {/* Info banner */}
      <div style={{
        background: "#f5f5f5",
        borderRadius: 4,
        padding: "8px 14px",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <Text style={{ fontSize: 12, color: "#595959" }}>
          Cases archived after 365 days of inactivity. Golden Set cases are always retained in the active list.
        </Text>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Search Case ID / Invoice / Supplier"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280 }}
          allowClear
        />
        <Select
          placeholder={<Space size={4}><FilterOutlined style={{ fontSize: 12 }} />Golden</Space>}
          value={goldenFilter}
          onChange={setGoldenFilter}
          options={[
            { label: "Golden", value: "Golden" },
            { label: "Non-Golden", value: "Non-Golden" },
          ]}
          style={{ width: 130 }}
          allowClear
        />
        <Select
          placeholder={<Space size={4}><FilterOutlined style={{ fontSize: 12 }} />Ground Truth</Space>}
          value={gtFilter}
          onChange={setGtFilter}
          options={[
            { label: "Pass", value: "Pass" },
            { label: "Fail", value: "Fail" },
            { label: "Pending", value: "Pending" },
          ]}
          style={{ width: 140 }}
          allowClear
        />
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <Tag style={{ background: "#e6f4ff", borderColor: "#91caff", color: "#0958d9", fontSize: 11, fontWeight: 500, margin: 0 }}>
            Showing: {region}
          </Tag>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {filtered.length} / {regionPool.length} archived
          </Text>
        </span>
      </div>

      {regionPool.length === 0 ? (
        <Empty description="No archived cases for this region" style={{ padding: "48px 0" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="key"
          size="small"
          scroll={{ x: 1300 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} archived records`,
            showSizeChanger: false,
          }}
          bordered={false}
        />
      )}
    </div>
  )
}
