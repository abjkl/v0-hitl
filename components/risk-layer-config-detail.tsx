"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Button,
  Select,
  Input,
  Tag,
  Typography,
  Space,
  Divider,
  Timeline,
  message,
  Popconfirm,
} from "antd"
import {
  ArrowLeftOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  StopOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import {
  type RiskLayerConfig,
  type GroupNode,
  type RuleNode,
} from "@/lib/mock-data"
import { RuleGroup } from "@/components/rule-group"
import { RiskLayerTrialRun } from "@/components/risk-layer-trial-run"
import { REGIONS, REGION_ENTITIES } from "@/lib/region-context"

const { Title, Text } = Typography

interface RiskLayerConfigDetailProps {
  config: RiskLayerConfig
  isEditMode: boolean
  isNew?: boolean
  currentUser: string
  onBack: () => void
  onSave: (updatedConfig: RiskLayerConfig) => void
  onActivate: (id: string) => void
  onDeactivate: (id: string) => void
  onDelete?: (id: string) => void
}

const STATUS_TAG_COLORS: Record<string, string> = {
  Active: "green",
  Inactive: "default",
  Draft: "blue",
}

export function RiskLayerConfigDetail({
  config,
  isEditMode: initialEditMode,
  isNew = false,
  currentUser,
  onBack,
  onSave,
  onActivate,
  onDeactivate,
  onDelete,
}: RiskLayerConfigDetailProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [editedConfig, setEditedConfig] = useState<RiskLayerConfig>(config)

  useEffect(() => {
    setEditedConfig(config)
    setIsEditing(initialEditMode)
  }, [config, initialEditMode])

  const availableEntities =
    REGION_ENTITIES[editedConfig.region as keyof typeof REGION_ENTITIES] ?? []

  function handleFieldChange<K extends keyof RiskLayerConfig>(
    field: K,
    value: RiskLayerConfig[K]
  ) {
    setEditedConfig((prev) => ({ ...prev, [field]: value }))
  }

  function handleRegionChange(newRegion: string) {
    const newEntities =
      REGION_ENTITIES[newRegion as keyof typeof REGION_ENTITIES] ?? []
    setEditedConfig((prev) => ({
      ...prev,
      region: newRegion,
      entity: newEntities[0] ?? "",
    }))
  }

  function handleRuleUpdate(_path: number[], newNode: RuleNode) {
    if (newNode.type === "group") {
      setEditedConfig((prev) => ({
        ...prev,
        rootRuleNode: newNode,
      }))
    }
  }

  function getTimestamp() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  }

  function handleSave() {
    const timestamp = getTimestamp()
    const updated: RiskLayerConfig = {
      ...editedConfig,
      lastUpdatedAt: timestamp,
      lastUpdatedBy: currentUser,
      changeLog: [
        {
          timestamp,
          user: currentUser,
          action: "Updated",
          details: "Configuration updated",
        },
        ...editedConfig.changeLog,
      ],
    }
    onSave(updated)
    setIsEditing(false)
    message.success("Configuration saved successfully")
  }

  function handleSaveAndActivate() {
    const timestamp = getTimestamp()
    const updated: RiskLayerConfig = {
      ...editedConfig,
      status: "Active",
      lastUpdatedAt: timestamp,
      lastUpdatedBy: currentUser,
      changeLog: [
        {
          timestamp,
          user: currentUser,
          action: "Activated",
        },
        {
          timestamp,
          user: currentUser,
          action: isNew ? "Created" : "Updated",
        },
        ...(isNew ? [] : editedConfig.changeLog),
      ],
    }
    onSave(updated)
    setIsEditing(false)
    message.success("Configuration saved and activated")
    onBack()
  }

  function handleCancel() {
    setEditedConfig(config)
    setIsEditing(false)
  }

  function handleActivate() {
    onActivate(config.id)
    message.success("Configuration activated")
  }

  function handleDeactivate() {
    onDeactivate(config.id)
    message.success("Configuration deactivated")
  }

  function handleDelete() {
    onDelete?.(config.id)
    message.success("Configuration deleted")
    onBack()
  }

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
          <Space size={16}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              style={{ padding: "4px 8px" }}
            />
            <div>
              <Space size={8} align="center">
                <Title level={5} style={{ margin: 0 }}>
                  {config.region} - {config.entity}
                </Title>
                <Tag color={STATUS_TAG_COLORS[config.status]}>{config.status}</Tag>
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Last updated by {config.lastUpdatedBy} at {config.lastUpdatedAt}
              </Text>
            </div>
          </Space>

          <Space>
            {isNew ? (
              // New config mode: Save and Activate
              <>
                <Button onClick={onBack}>Cancel</Button>
                <Button type="primary" icon={<CheckCircleOutlined />} onClick={handleSaveAndActivate}>
                  Save and Activate
                </Button>
              </>
            ) : isEditing ? (
              // Edit mode
              <>
                <Button icon={<CloseOutlined />} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              // View mode
              <>
                <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                {config.status === "Draft" ? (
                  <Popconfirm
                    title="Delete this draft configuration?"
                    description="This action cannot be undone."
                    onConfirm={handleDelete}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                  >
                    <Button icon={<DeleteOutlined />} danger>
                      Delete
                    </Button>
                  </Popconfirm>
                ) : config.status === "Active" ? (
                  <Popconfirm
                    title="Deactivate this configuration?"
                    description="This will stop the rule from being applied."
                    onConfirm={handleDeactivate}
                  >
                    <Button icon={<StopOutlined />} danger>
                      Deactivate
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleActivate}
                  >
                    Activate
                  </Button>
                )}
              </>
            )}
          </Space>
        </div>
      </Card>

      {/* Basic Info */}
      <Card
        title="Basic Information"
        size="small"
        style={{ borderRadius: 8 }}
        styles={{ body: { padding: 20 } }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                Region
              </Text>
              {isEditing ? (
                <Select
                  value={editedConfig.region}
                  onChange={handleRegionChange}
                  style={{ width: "100%" }}
                  options={REGIONS.map((r) => ({
                    value: r.code,
                    label: `${r.code} - ${r.name}`,
                  }))}
                />
              ) : (
                <Text strong>{editedConfig.region}</Text>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                Entity
              </Text>
              {isEditing ? (
                <Select
                  value={editedConfig.entity}
                  onChange={(v) => handleFieldChange("entity", v)}
                  style={{ width: "100%" }}
                  options={availableEntities.map((e) => ({ value: e, label: e }))}
                />
              ) : (
                <Text strong>{editedConfig.entity}</Text>
              )}
            </div>
          </div>

        </div>
      </Card>

      {/* Rule Composition */}
      <Card
        title="Rule Composition"
        size="small"
        style={{ borderRadius: 8 }}
        styles={{ body: { padding: 20 } }}
        extra={
          <Text type="secondary" style={{ fontSize: 12 }}>
            Max 3 levels of nesting
          </Text>
        }
      >
        <RuleGroup
          node={editedConfig.rootRuleNode as GroupNode}
          path={[]}
          onUpdate={handleRuleUpdate}
          depth={0}
          readOnly={!isEditing}
        />
      </Card>

      {/* PR Trial Run */}
      {!isNew && (
        <RiskLayerTrialRun config={config} />
      )}

      {/* Change Log (View mode only) */}
      {!isEditing && (
        <Card
          title="Change Log"
          size="small"
          style={{ borderRadius: 8 }}
          styles={{ body: { padding: 20 } }}
        >
          <Timeline
            items={config.changeLog.slice(0, 5).map((entry) => ({
              color:
                entry.action === "Activated"
                  ? "green"
                  : entry.action === "Deactivated"
                    ? "red"
                    : entry.action === "Created"
                      ? "blue"
                      : "gray",
              children: (
                <div>
                  <Space size={8}>
                    <Text strong style={{ fontSize: 13 }}>
                      {entry.action}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      by {entry.user}
                    </Text>
                  </Space>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {entry.timestamp}
                    </Text>
                    {entry.details && (
                      <Text style={{ fontSize: 12, display: "block", marginTop: 2 }}>
                        {entry.details}
                      </Text>
                    )}
                  </div>
                </div>
              ),
            }))}
          />
          {config.changeLog.length > 5 && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              Showing 5 of {config.changeLog.length} entries
            </Text>
          )}
        </Card>
      )}
    </div>
  )
}
