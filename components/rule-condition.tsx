"use client"

import { Select, InputNumber, Button, Typography, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import {
  type ConditionNode,
  type ParameterType,
  PARAMETER_DEFINITIONS,
  getParameterDefinition,
} from "@/lib/mock-data"

const { Text } = Typography

interface RuleConditionProps {
  node: ConditionNode
  onUpdate: (newNode: ConditionNode) => void
  onDelete: () => void
  readOnly?: boolean
  isNested?: boolean
}

// Group parameters by control block for the dropdown
const parameterOptions = PARAMETER_DEFINITIONS.reduce(
  (acc, param) => {
    if (!acc[param.controlBlock]) {
      acc[param.controlBlock] = []
    }
    acc[param.controlBlock].push({
      value: param.id,
      label: param.name,
    })
    return acc
  },
  {} as Record<string, { value: string; label: string }[]>
)

const selectOptions = Object.entries(parameterOptions).map(([block, options]) => ({
  label: block,
  options,
}))

export function RuleCondition({
  node,
  onUpdate,
  onDelete,
  readOnly = false,
  isNested = false,
}: RuleConditionProps) {
  const paramDef = getParameterDefinition(node.parameterId)

  function handleParameterChange(value: ParameterType) {
    const newParamDef = getParameterDefinition(value)
    onUpdate({
      ...node,
      parameterId: value,
      config: newParamDef?.defaultConfig ?? {},
    })
  }

  function handleConfigChange(key: string, value: unknown) {
    onUpdate({
      ...node,
      config: { ...node.config, [key]: value },
    })
  }

  function renderConfigInputs() {
    if (!paramDef) return null

    switch (paramDef.inputType) {
      case "month":
        return (
          <Space size="small" style={{ display: "flex" }}>
            <Select
              size="small"
              value="less_than"
              disabled
              style={{ width: 100 }}
              options={[{ value: "less_than", label: "within" }]}
            />
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.value as number}
              onChange={(v) => handleConfigChange("value", v)}
              style={{ width: 80 }}
              disabled={readOnly}
              placeholder="0"
            />
            <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
              months
            </Text>
          </Space>
        )

      case "count_month":
        return (
          <Space size="small" style={{ display: "flex" }}>
            <Select
              size="small"
              value="greater_than"
              disabled
              style={{ width: 100 }}
              options={[{ value: "greater_than", label: "at least" }]}
            />
            <InputNumber
              size="small"
              min={1}
              max={1000}
              value={node.config.count as number}
              onChange={(v) => handleConfigChange("count", v)}
              style={{ width: 80 }}
              disabled={readOnly}
              placeholder="0"
            />
            <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
              in
            </Text>
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.months as number}
              onChange={(v) => handleConfigChange("months", v)}
              style={{ width: 80 }}
              disabled={readOnly}
              placeholder="0"
            />
            <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
              months
            </Text>
          </Space>
        )

      case "currency":
        return (
          <Space size="small" style={{ display: "flex" }}>
            <Select
              size="small"
              value={node.config.currency as string}
              onChange={(v) => handleConfigChange("currency", v)}
              style={{ width: 100 }}
              disabled={readOnly}
              options={[
                { value: "SGD", label: "SGD" },
                { value: "MYR", label: "MYR" },
                { value: "TWD", label: "TWD" },
                { value: "BRL", label: "BRL" },
              ]}
            />
            <InputNumber
              size="small"
              min={0}
              value={node.config.value as number}
              onChange={(v) => handleConfigChange("value", v)}
              style={{ width: 120 }}
              disabled={readOnly}
              placeholder="0"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => Number(value?.replace(/,/g, "") ?? 0)}
            />
          </Space>
        )

      case "none":
      default:
        return null
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        background: "#fff",
        border: "1px solid #d9d9d9",
        borderRadius: 6,
        flex: 1,
      }}
    >
      {/* Parameter Select */}
      <Select
        size="small"
        value={node.parameterId}
        onChange={handleParameterChange}
        style={{ minWidth: 200, maxWidth: 240 }}
        options={selectOptions}
        disabled={readOnly}
        placeholder="Select parameter"
      />

      {/* Config Inputs */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {renderConfigInputs()}
      </div>

      <div style={{ flex: 1 }} />

      {/* Delete Button */}
      {!readOnly && (
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={onDelete}
          style={{ color: "#ff4d4f", padding: "4px 8px" }}
        />
      )}
    </div>
  )
}
