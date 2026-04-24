"use client"

import { Select, InputNumber, Button, Typography, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import {
  type ConditionNode,
  type ConditionOperator,
  type ParameterType,
  PARAMETER_DEFINITIONS,
  OPERATORS_FOR_TYPE,
  getParameterDefinition,
} from "@/lib/mock-data"

const { Text } = Typography

interface RuleConditionProps {
  node: ConditionNode
  onUpdate: (newNode: ConditionNode) => void
  onDelete: () => void
  readOnly?: boolean
}

// Group parameters by control block for the Select options
const parameterOptions = PARAMETER_DEFINITIONS.reduce(
  (acc, param) => {
    if (!acc[param.controlBlock]) acc[param.controlBlock] = []
    acc[param.controlBlock].push({ value: param.id, label: param.name })
    return acc
  },
  {} as Record<string, { value: string; label: string }[]>
)

const selectOptions = Object.entries(parameterOptions).map(([block, options]) => ({
  label: block,
  options,
}))

const OPERATOR_DISPLAY: Record<string, string> = {
  ">": ">",
  "<": "<",
  "=": "=",
  ">=": "≥",
  "<=": "≤",
  "!=": "≠",
}

export function RuleCondition({ node, onUpdate, onDelete, readOnly = false }: RuleConditionProps) {
  const paramDef = getParameterDefinition(node.parameterId)
  const operatorType = paramDef?.operatorType ?? "boolean"
  const availableOperators = OPERATORS_FOR_TYPE[operatorType]
  const isBoolean = operatorType === "boolean"

  function handleParameterChange(value: ParameterType) {
    const newParamDef = getParameterDefinition(value)
    onUpdate({
      ...node,
      parameterId: value,
      operator: newParamDef?.defaultOperator ?? null,
      config: newParamDef?.defaultConfig ?? {},
    })
  }

  function handleOperatorChange(value: ConditionOperator) {
    onUpdate({ ...node, operator: value })
  }

  function handleConfigChange(key: string, value: unknown) {
    onUpdate({ ...node, config: { ...node.config, [key]: value } })
  }

  function renderValueInputs() {
    if (!paramDef || isBoolean) return null

    switch (paramDef.inputType) {
      case "month":
        return (
          <Space size={4}>
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.value as number}
              onChange={(v) => handleConfigChange("value", v)}
              style={{ width: 64 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>month(s)</Text>
          </Space>
        )

      case "count_month":
        return (
          <Space size={4}>
            <InputNumber
              size="small"
              min={1}
              max={1000}
              value={node.config.count as number}
              onChange={(v) => handleConfigChange("count", v)}
              style={{ width: 64 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>PRs in</Text>
            <InputNumber
              size="small"
              min={1}
              max={120}
              value={node.config.months as number}
              onChange={(v) => handleConfigChange("months", v)}
              style={{ width: 64 }}
              disabled={readOnly}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>month(s)</Text>
          </Space>
        )

      case "currency":
        return (
          <Space size={4}>
            <Select
              size="small"
              value={node.config.currency as string}
              onChange={(v) => handleConfigChange("currency", v)}
              style={{ width: 72 }}
              disabled={readOnly}
              options={[
                { value: "SGD", label: "SGD" },
                { value: "MYR", label: "MYR" },
                { value: "TWD", label: "TWD" },
                { value: "BRL", label: "BRL" },
                { value: "THB", label: "THB" },
                { value: "IDR", label: "IDR" },
                { value: "PHP", label: "PHP" },
                { value: "VND", label: "VND" },
              ]}
            />
            <InputNumber
              size="small"
              min={0}
              value={node.config.value as number}
              onChange={(v) => handleConfigChange("value", v)}
              style={{ width: 120 }}
              disabled={readOnly}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => Number(v?.replace(/,/g, "") ?? 0)}
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
        gap: 8,
        padding: "7px 12px",
        background: "#fafafa",
        borderRadius: 6,
        border: "1px solid #f0f0f0",
        flexWrap: "wrap",
      }}
    >
      {/* Parameter selector */}
      <Select
        size="small"
        value={node.parameterId}
        onChange={handleParameterChange}
        style={{ width: 190 }}
        options={selectOptions}
        disabled={readOnly}
        placeholder="Select parameter"
      />

      {/* Operator dropdown — hidden for boolean fields */}
      {!isBoolean && (
        readOnly ? (
          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              width: 28,
              textAlign: "center",
              color: "#595959",
            }}
          >
            {OPERATOR_DISPLAY[node.operator ?? "="] ?? node.operator}
          </Text>
        ) : (
          <Select
            size="small"
            value={node.operator ?? availableOperators[0]}
            onChange={handleOperatorChange}
            style={{ width: 60 }}
            disabled={readOnly}
            options={availableOperators.map((op) => ({
              value: op,
              label: OPERATOR_DISPLAY[op] ?? op,
            }))}
            popupMatchSelectWidth={false}
          />
        )
      )}

      {/* Value inputs */}
      {renderValueInputs()}

      {/* Boolean: just show the italic description inline */}
      {isBoolean && (
        <Text type="secondary" style={{ fontSize: 12, fontStyle: "italic" }}>
          {paramDef?.description}
        </Text>
      )}

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
