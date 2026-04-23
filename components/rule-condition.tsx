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

export function RuleCondition({ node, onUpdate, onDelete, readOnly = false }: RuleConditionProps) {
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
          <Space size={4} style={{ marginLeft: 8 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>{"<"}</Text>
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.value as number}
              onChange={(v) => handleConfigChange("value", v)}
              style={{ width: 60 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 13 }}>month</Text>
          </Space>
        )

      case "count_month":
        return (
          <Space size={4} style={{ marginLeft: 8 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>{">"}</Text>
            <InputNumber
              size="small"
              min={1}
              max={1000}
              value={node.config.count as number}
              onChange={(v) => handleConfigChange("count", v)}
              style={{ width: 60 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 13 }}>PRs within</Text>
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.months as number}
              onChange={(v) => handleConfigChange("months", v)}
              style={{ width: 60 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 13 }}>month</Text>
          </Space>
        )

      case "currency":
        return (
          <Space size={4} style={{ marginLeft: 8 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>{"<="}</Text>
            <Select
              size="small"
              value={node.config.currency as string}
              onChange={(v) => handleConfigChange("currency", v)}
              style={{ width: 70 }}
              disabled={readOnly}
              options={[
                { value: "SGD", label: "SGD" },
                { value: "THB", label: "THB" },
                { value: "VND", label: "VND" },
                { value: "IDR", label: "IDR" },
                { value: "MYR", label: "MYR" },
                { value: "PHP", label: "PHP" },
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
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => Number(value?.replace(/,/g, "") ?? 0)}
            />
          </Space>
        )

      case "none":
      default:
        return (
          <Text type="secondary" style={{ fontSize: 12, marginLeft: 8, fontStyle: "italic" }}>
            {paramDef.description}
          </Text>
        )
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        background: "#fafafa",
        borderRadius: 6,
        border: "1px solid #f0f0f0",
      }}
    >
      <Select
        size="small"
        value={node.parameterId}
        onChange={handleParameterChange}
        style={{ width: 180 }}
        options={selectOptions}
        disabled={readOnly}
        placeholder="Select parameter"
      />

      {renderConfigInputs()}

      <div style={{ flex: 1 }} />

      {!readOnly && (
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={onDelete}
          style={{ color: "#ff4d4f" }}
        />
      )}
    </div>
  )
}
