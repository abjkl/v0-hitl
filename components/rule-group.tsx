"use client"

import { Button, Radio, Typography, Space, Tooltip } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  type GroupNode,
  type RuleNode,
  type ConditionNode,
  generateRuleNodeId,
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

// Color scheme for nesting levels
const LEVEL_COLORS = {
  0: { border: "#1890ff", bg: "#e6f4ff", label: "blue" },  // Level 1 (Root) - Blue
  1: { border: "#fa8c16", bg: "#fff7e6", label: "orange" }, // Level 2 (Sub) - Orange
  2: { border: "#52c41a", bg: "#f6ffed", label: "green" },  // Level 3 (Sub) - Green
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
  const colors = LEVEL_COLORS[Math.min(depth, 2) as 0 | 1 | 2]

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
    const newCondition: ConditionNode = {
      type: "condition",
      id: generateRuleNodeId(),
      invoiceField: "Invoice Amount",
      poField: "PO Amount",
      condition: "<=",
      toleranceRange: 0,
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
        borderLeft: `3px solid ${colors.border}`,
        paddingLeft: 16,
        marginLeft: isRoot ? 0 : 24,
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
          background: colors.bg,
          borderRadius: 6,
        }}
      >
        <Space size={12}>
          <Text strong style={{ fontSize: 13, color: colors.border }}>
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
                background: colors.border,
                color: "#fff",
                borderRadius: 4,
              }}
            >
              {node.operator}
            </Text>
          )}
        </Space>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isRoot && depth === 0 && (
            <Text type="secondary" style={{ fontSize: 11, color: "#999" }}>
              Max 3 levels of nesting
            </Text>
          )}
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
          {canAddGroup ? (
            <Button
              type="dashed"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddGroup}
            >
              Add Group
            </Button>
          ) : (
            <Tooltip title="Maximum nesting depth reached">
              <Button
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                disabled
              >
                Add Group
              </Button>
            </Tooltip>
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
