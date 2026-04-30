"use client"

import { useState, useMemo } from "react"
import {
  Card,
  Table,
  Input,
  Select,
  Tag,
  Typography,
  Space,
  Button,
  Checkbox,
  Tabs,
  Tooltip,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  SettingOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons"
import {
  type PurchaseRequest,
  type PRStatus,
  type RiskRuleCode,
  formatPRCurrency,
  getPRRegions,
  getPRDepartments,
  getPRStatusCounts,
  riskRulesDefinition,
} from "@/lib/mock-data"

const { Text } = Typography

const STATUS_TAG_COLORS: Record<PRStatus, string> = {
  Draft: "default",
  "Pending Approval": "orange",
  Approved: "green",
  Rejected: "red",
  Processing: "blue",
  Completed: "cyan",
}

const URGENCY_COLORS: Record<string, string> = {
  Low: "default",
  Medium: "blue",
  High: "orange",
  Critical: "red",
}

interface PurchaseRequestListProps {
  purchaseRequests: PurchaseRequest[]
  onViewDetail: (pr: PurchaseRequest) => void
}

export function PurchaseRequestList({
  purchaseRequests,
  onViewDetail,
}: PurchaseRequestListProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<PRStatus | "All">("All")
  const [regionFilter, setRegionFilter] = useState<string>("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("")
  const [riskOnly, setRiskOnly] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const regions = getPRRegions()
  const departments = getPRDepartments()
  const statusCounts = getPRStatusCounts()

  // Filter data
  const filteredData = useMemo(() => {
    return purchaseRequests.filter((pr) => {
      // Search filter
      if (search) {
        const s = search.toLowerCase()
        const matchesSearch =
          pr.prNumber.toLowerCase().includes(s) ||
          pr.title.toLowerCase().includes(s) ||
          pr.vendor.toLowerCase().includes(s) ||
          pr.requestor.toLowerCase().includes(s)
        if (!matchesSearch) return false
      }

      // Status filter
      if (statusFilter !== "All" && pr.status !== statusFilter) {
        return false
      }

      // Region filter
      if (regionFilter && pr.region !== regionFilter) {
        return false
      }

      // Department filter
      if (departmentFilter && pr.department !== departmentFilter) {
        return false
      }

      // Risk only filter
      if (riskOnly && !pr.isRisk) {
        return false
      }

      return true
    })
  }, [purchaseRequests, search, statusFilter, regionFilter, departmentFilter, riskOnly])

  const handleReset = () => {
    setSearch("")
    setStatusFilter("All")
    setRegionFilter("")
    setDepartmentFilter("")
    setRiskOnly(false)
  }

  const statusTabs = [
    { key: "All", label: "All" },
    { key: "Draft", label: "Draft" },
    { key: "Pending Approval", label: "Pending Approval" },
    { key: "Approved", label: "Approved" },
    { key: "Processing", label: "Processing" },
    { key: "Completed", label: "Completed" },
    { key: "Rejected", label: "Rejected" },
  ]

  const columns: ColumnsType<PurchaseRequest> = [
    {
      title: "PR Number",
      dataIndex: "prNumber",
      key: "prNumber",
      width: 150,
      sorter: (a, b) => a.prNumber.localeCompare(b.prNumber),
      render: (prNumber: string, record: PurchaseRequest) => (
        <Button
          type="link"
          size="small"
          style={{ padding: 0, height: "auto", fontWeight: 500 }}
          onClick={() => onViewDetail(record)}
        >
          {prNumber}
        </Button>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: { showTitle: true },
      render: (title: string) => (
        <Text style={{ fontSize: 13 }} ellipsis title={title}>
          {title}
        </Text>
      ),
    },
    {
      title: "Requestor",
      dataIndex: "requestor",
      key: "requestor",
      width: 130,
      render: (requestor: string) => <Text style={{ fontSize: 13 }}>{requestor}</Text>,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      width: 160,
      ellipsis: { showTitle: true },
      render: (vendor: string) => (
        <Text style={{ fontSize: 13 }} ellipsis title={vendor}>
          {vendor}
        </Text>
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 80,
      render: (region: string) => <Text style={{ fontSize: 13 }}>{region}</Text>,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => <Text style={{ fontSize: 13 }}>{date}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      align: "right",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount: number, record: PurchaseRequest) => (
        <Text style={{ fontSize: 13, fontWeight: 500 }}>
          {formatPRCurrency(amount, record.currency)}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: PRStatus) => (
        <Tag color={STATUS_TAG_COLORS[status]} style={{ margin: 0 }}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Risk Layer",
      key: "riskLayer",
      width: 120,
      render: (_: unknown, record: PurchaseRequest) => {
        if (!record.isRisk) {
          return <Text style={{ fontSize: 13, color: "#52c41a" }}>No</Text>
        }

        const rules = record.riskRules.map((code) => riskRulesDefinition[code])
        const tooltipContent = (
          <div style={{ maxWidth: 280 }}>
            {rules.map((rule) => (
              <div key={rule.code} style={{ marginBottom: 4 }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ff4d4f", marginRight: 8 }} />
                <span style={{ fontSize: 12 }}>{rule.triggeredExpression}</span>
              </div>
            ))}
          </div>
        )

        return (
          <Tooltip title={tooltipContent} placement="left">
            <Space size={4} style={{ cursor: "pointer" }}>
              <WarningOutlined style={{ color: "#fa8c16", fontSize: 14 }} />
              <Text style={{ fontSize: 13, color: "#fa8c16", fontWeight: 500 }}>Yes</Text>
            </Space>
          </Tooltip>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_: unknown, record: PurchaseRequest) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record)}
          style={{ padding: 0 }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filter Card */}
      <Card size="small" style={{ borderRadius: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text strong style={{ fontSize: 14 }}>Filter</Text>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {/* Search */}
            <div>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
                Search
              </Text>
              <Input
                placeholder="PR Number, Title, Vendor..."
                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
              />
            </div>

            {/* Region */}
            <div>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
                Region
              </Text>
              <Select
                value={regionFilter || "all"}
                onChange={(v) => setRegionFilter(v === "all" ? "" : v)}
                style={{ width: "100%" }}
                options={[
                  { value: "all", label: "All Regions" },
                  ...regions.map((r) => ({ value: r, label: r })),
                ]}
              />
            </div>

            {/* Department */}
            <div>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
                Department
              </Text>
              <Select
                value={departmentFilter || "all"}
                onChange={(v) => setDepartmentFilter(v === "all" ? "" : v)}
                style={{ width: "100%" }}
                options={[
                  { value: "all", label: "All Departments" },
                  ...departments.map((d) => ({ value: d, label: d })),
                ]}
              />
            </div>

            {/* Risk Only */}
            <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
              <Checkbox checked={riskOnly} onChange={(e) => setRiskOnly(e.target.checked)}>
                Show Risk PRs Only
              </Checkbox>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
            <Button type="primary" icon={<SearchOutlined />} style={{ background: "#faad14" }}>
              Search
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Status Tabs */}
      <Tabs
        activeKey={statusFilter}
        onChange={(key) => setStatusFilter(key as PRStatus | "All")}
        items={statusTabs.map((tab) => ({
          key: tab.key,
          label: (
            <Space size={8}>
              <span>{tab.label}</span>
              <Tag
                style={{
                  margin: 0,
                  borderRadius: 10,
                  fontSize: 11,
                  padding: "0 8px",
                  background: statusFilter === tab.key ? "#fff7e6" : "#f5f5f5",
                  color: statusFilter === tab.key ? "#fa8c16" : "#8c8c8c",
                  border: "none",
                }}
              >
                {statusCounts[tab.key as PRStatus | "All"] || 0}
              </Tag>
            </Space>
          ),
        }))}
        style={{ marginBottom: -16 }}
      />

      {/* Table */}
      <Card size="small" style={{ borderRadius: 8 }} styles={{ body: { padding: 0 } }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Total: <Text strong style={{ color: "#1d1d1d" }}>{filteredData.length}</Text> Purchase Request/s
          </Text>
          <Space>
            <Button size="small" icon={<SettingOutlined />}>
              Custom Fields
            </Button>
            <Button size="small" icon={<DownloadOutlined />}>
              Export
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          size="small"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Total ${total} items` }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          scroll={{ x: "max-content" }}
          style={{ fontSize: 13 }}
        />
      </Card>
    </div>
  )
}
