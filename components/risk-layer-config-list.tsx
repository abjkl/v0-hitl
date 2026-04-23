"use client"

import { useState, useMemo } from "react"
import {
  Card,
  Table,
  Button,
  Input,
  Select,
  Tag,
  Typography,
  Space,
  Tooltip,
  Dropdown,
  message,
} from "antd"
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import {
  type RiskLayerConfig,
  type RiskLayerStatus,
  generateLogicSummary,
  generateRuleNodeId,
  ParameterType,
} from "@/lib/mock-data"
import { useRegion, REGIONS, REGION_ENTITIES } from "@/lib/region-context"

const { Title, Text, Paragraph } = Typography

interface RiskLayerConfigListProps {
  configs: RiskLayerConfig[]
  setConfigs: React.Dispatch<React.SetStateAction<RiskLayerConfig[]>>
  onView: (id: string) => void
  onEdit: (id: string) => void
}

const STATUS_TAG_COLORS: Record<RiskLayerStatus, string> = {
  Active: "green",
  Inactive: "default",
  Draft: "blue",
}

const REGION_OPTIONS = REGIONS.map((r) => ({ value: r.code, label: r.code }))

const ALL_ENTITIES = Array.from(
  new Set(Object.values(REGION_ENTITIES).flat())
).sort()
const ENTITY_OPTIONS = ALL_ENTITIES.map((e) => ({ value: e, label: e }))

const STATUS_OPTIONS: { value: RiskLayerStatus; label: string }[] = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Draft", label: "Draft" },
]

export function RiskLayerConfigList({
  configs,
  setConfigs,
  onView,
  onEdit,
}: RiskLayerConfigListProps) {
  const { region: currentRegion } = useRegion()
  const [searchText, setSearchText] = useState("")
  const [filterRegions, setFilterRegions] = useState<string[]>([])
  const [filterEntities, setFilterEntities] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<RiskLayerStatus | null>(null)

  const filteredConfigs = useMemo(() => {
    return configs.filter((c) => {
      const matchSearch =
        !searchText ||
        c.description.toLowerCase().includes(searchText.toLowerCase()) ||
        c.region.toLowerCase().includes(searchText.toLowerCase()) ||
        c.entity.toLowerCase().includes(searchText.toLowerCase())

      const matchRegion = filterRegions.length === 0 || filterRegions.includes(c.region)
      const matchEntity = filterEntities.length === 0 || filterEntities.includes(c.entity)
      const matchStatus = !filterStatus || c.status === filterStatus

      return matchSearch && matchRegion && matchEntity && matchStatus
    })
  }, [configs, searchText, filterRegions, filterEntities, filterStatus])

  function handleDuplicate(record: RiskLayerConfig) {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    const newConfig: RiskLayerConfig = {
      ...JSON.parse(JSON.stringify(record)),
      id: `RL-${String(configs.length + 1).padStart(3, "0")}`,
      status: "Draft",
      lastUpdatedBy: "Current User",
      lastUpdatedAt: timestamp,
      changeLog: [
        {
          timestamp,
          user: "Current User",
          action: "Created",
          details: `Duplicated from ${record.id}`,
        },
      ],
    }
    setConfigs((prev) => [...prev, newConfig])
    message.success("Configuration duplicated")
  }

  function handleActivate(id: string) {
    setConfigs((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Active" as RiskLayerStatus,
              changeLog: [
                {
                  timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
                  user: "Current User",
                  action: "Activated" as const,
                },
                ...c.changeLog,
              ],
            }
          : c
      )
    )
    message.success("Configuration activated")
  }

  function handleDeactivate(id: string) {
    setConfigs((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Inactive" as RiskLayerStatus,
              changeLog: [
                {
                  timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
                  user: "Current User",
                  action: "Deactivated" as const,
                },
                ...c.changeLog,
              ],
            }
          : c
      )
    )
    message.success("Configuration deactivated")
  }

  function handleNewConfiguration() {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const newId = `RL-${String(configs.length + 1).padStart(3, "0")}`

    const newConfig: RiskLayerConfig = {
      id: newId,
      region: currentRegion,
      entity: REGION_ENTITIES[currentRegion as keyof typeof REGION_ENTITIES]?.[0] ?? "",
      description: "New risk layer configuration",
      status: "Draft",
      lastUpdatedBy: "Current User",
      lastUpdatedAt: timestamp,
      rootRuleNode: {
        type: "group",
        id: generateRuleNodeId(),
        operator: "AND",
        children: [
          {
            type: "condition",
            id: generateRuleNodeId(),
            parameterId: ParameterType.LAST_APPROVED_TXN,
            config: { value: 6 },
          },
        ],
      },
      changeLog: [
        {
          timestamp,
          user: "Current User",
          action: "Created",
        },
      ],
    }
    setConfigs((prev) => [...prev, newConfig])
    onEdit(newId)
  }

  const columns: ColumnsType<RiskLayerConfig> = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 80,
      render: (region: string) => (
        <Text strong style={{ fontSize: 13 }}>
          {region}
        </Text>
      ),
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      width: 80,
      render: (entity: string) => (
        <Tag style={{ margin: 0 }}>{entity}</Tag>
      ),
    },
    {
      title: "Logic Summary",
      key: "logicSummary",
      render: (_, record) => {
        const summary = generateLogicSummary(record.rootRuleNode)
        return (
          <Tooltip title={summary}>
            <Paragraph
              ellipsis={{ rows: 1 }}
              style={{
                margin: 0,
                fontSize: 12,
                fontFamily: "monospace",
                color: "#666",
                maxWidth: 300,
              }}
            >
              {summary}
            </Paragraph>
          </Tooltip>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: RiskLayerStatus) => (
        <Tag color={STATUS_TAG_COLORS[status]}>{status}</Tag>
      ),
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      width: 160,
      render: (_, record) => (
        <div style={{ fontSize: 12 }}>
          <div>{record.lastUpdatedBy}</div>
          <Text type="secondary">{record.lastUpdatedAt}</Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="View">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => onView(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record.id)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "duplicate",
                  icon: <CopyOutlined />,
                  label: "Duplicate",
                  onClick: () => handleDuplicate(record),
                },
                { type: "divider" },
                record.status === "Active"
                  ? {
                      key: "deactivate",
                      icon: <StopOutlined />,
                      label: "Deactivate",
                      danger: true,
                      onClick: () => handleDeactivate(record.id),
                    }
                  : {
                      key: "activate",
                      icon: <CheckCircleOutlined />,
                      label: "Activate",
                      onClick: () => handleActivate(record.id),
                    },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" size="small" icon={<MoreOutlined />} />
          </Dropdown>
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
        styles={{ body: { padding: "16px 20px" } }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Risk Layer Configuration
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Manage pre-gate rule engine configurations for invoice audit processing
            </Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleNewConfiguration}>
            New Configuration
          </Button>
        </div>
      </Card>

      {/* Filters */}
      <Card
        size="small"
        style={{ borderRadius: 8 }}
        styles={{ body: { padding: "12px 16px" } }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input
            placeholder="Search by description, region, or entity..."
            prefix={<SearchOutlined style={{ color: "#999" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select
            mode="multiple"
            placeholder="Region"
            value={filterRegions}
            onChange={setFilterRegions}
            style={{ width: 140 }}
            options={REGION_OPTIONS}
            allowClear
            maxTagCount={1}
          />
          <Select
            mode="multiple"
            placeholder="Entity"
            value={filterEntities}
            onChange={setFilterEntities}
            style={{ width: 140 }}
            options={ENTITY_OPTIONS}
            allowClear
            maxTagCount={1}
          />
          <Select
            placeholder="Status"
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 120 }}
            options={STATUS_OPTIONS}
            allowClear
          />
        </div>
      </Card>

      {/* Table */}
      <Card
        size="small"
        style={{ borderRadius: 8 }}
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={filteredConfigs}
          rowKey="id"
          size="small"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => `${total} configuration(s)`,
          }}
          onRow={(record) => ({
            onClick: () => onView(record.id),
            style: { cursor: "pointer" },
          })}
          style={{ fontSize: 13 }}
        />
      </Card>
    </div>
  )
}
