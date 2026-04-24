"use client"

import { Button, Radio, Typography, Space } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  type GroupNode,
  type RuleNode,
  type ConditionNode,
  ParameterType,
  generateRuleNodeId,
  getParameterDefinition,
} from "@/lib/mock-data"
import { RuleCondition } from "@/components/rule-condition"

const { Text } = Typography

const MAX_DEPTH = 3

interface RuleGroupProps {
  node: GroupNode
  path: number[]
  onUpdate: (path: number[], newNode: RuleNode) => void
  onDelete?: () => void
  depth: number
  readOnly?: boolean
}

export function RuleGroup({
  node,
  path,
  onUpdate,
  onDelete,
  depth,
  readOnly = false,
}: RuleGroupProps) {
  const isRoot = depth === 0
  const canAddGroup = depth < MAX_DEPTH - 1
  const borderColor = node.operator === "AND" ? "#1890ff" : "#fa8c16"

  function handleOperatorChange(operator: "AND" | "OR") {
    onUpdate(path, { ...node, operator })
  }

  function handleChildUpdate(childIndex: number, newChild: RuleNode) {
    const newChildren = [...node.children]
    newChildren[childIndex] = newChild
    onUpdate(path, { ...node, children: newChildren })
  }

  function handleChildDelete(childIndex: number) {
    const newChildren = node.children.filter((_, i) => i !== childIndex)
    onUpdate(path, { ...node, children: newChildren })
  }

  function handleAddCondition() {
    const defaultParam = ParameterType.LAST_APPROVED_TXN
    const paramDef = getParameterDefinition(defaultParam)
    const newCondition: ConditionNode = {
      type: "condition",
      id: generateRuleNodeId(),
      parameterId: defaultParam,
      operator: paramDef?.defaultOperator ?? null,
      config: paramDef?.defaultConfig ?? {},
    }
    onUpdate(path, { ...node, children: [...node.children, newCondition] })
  }

  function handleAddGroup() {
    const newGroup: GroupNode = {
      type: "group",
      id: generateRuleNodeId(),
      operator: node.operator === "AND" ? "OR" : "AND",
      children: [],
    }
    onUpdate(path, { ...node, children: [...node.children, newGroup] })
  }

  return (
    <div
      style={{
        borderLeft: `3px solid ${borderColor}`,
        paddingLeft: 16,
        marginLeft: isRoot ? 0 : 8,
        marginTop: isRoot ? 0 : 12,
        marginBottom: isRoot ? 0 : 12,
      }}
    >
      {/* Group Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          padding: "6px 12px",
          background: node.operator === "AND" ? "#e6f4ff" : "#fff7e6",
          borderRadius: 6,
        }}
      >
        <Space size={12}>
          <Text strong style={{ fontSize: 13, color: borderColor }}>
            {isRoot ? "Root Group" : "Sub Group"}
          </Text>
          {!readOnly ? (
            <Radio.Group
              size="small"
              value={node.operator}
              onChange={(e) => handleOperatorChange(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="AND">AND</Radio.Button>
              <Radio.Button value="OR">OR</Radio.Button>
            </Radio.Group>
          ) : (
            <Text
              style={{
                fontSize: 12,
                padding: "2px 8px",
                background: borderColor,
                color: "#fff",
                borderRadius: 4,
              }}
            >
              {node.operator}
            </Text>
          )}
        </Space>

        {!isRoot && !readOnly && (
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={onDelete}
            style={{ color: "#ff4d4f" }}
          >
            Remove
          </Button>
        )}
      </div>

      {/* Children */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {node.children.map((child, index) =>
          child.type === "condition" ? (
            <RuleCondition
              key={child.id}
              node={child}
              onUpdate={(newNode) => handleChildUpdate(index, newNode)}
              onDelete={() => handleChildDelete(index)}
              readOnly={readOnly}
            />
          ) : (
            <RuleGroup
              key={child.id}
              node={child}
              path={[...path, index]}
              onUpdate={onUpdate}
              onDelete={() => handleChildDelete(index)}
              depth={depth + 1}
              readOnly={readOnly}
            />
          )
        )}
      </div>

      {/* Add Buttons */}
      {!readOnly && (
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Button
            type="dashed"
            size="small"
            icon={<PlusOutlined />}
            onClick={handleAddCondition}
          >
            Add Condition
          </Button>
          {canAddGroup && (
            <Button
              type="dashed"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddGroup}
            >
              Add Group
            </Button>
          )}
        </div>
      )}

      {/* Empty State */}
      {node.children.length === 0 && (
        <div
          style={{
            padding: "16px 0",
            textAlign: "center",
            color: "#999",
            fontSize: 13,
          }}
        >
          No conditions added yet. Click &quot;Add Condition&quot; to start.
        </div>
      )}
    </div>
  )
}
