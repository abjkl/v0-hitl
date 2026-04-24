"use client"

import { Button, Select, Typography, Space } from "antd"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  type GroupNode,
  type RuleNode,
  type ConditionNode,
  ParameterType,
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
    const newCondition: ConditionNode = {
      type: "condition",
      id: generateRuleNodeId(),
      parameterId: ParameterType.LAST_APPROVED_TXN,
      config: { value: 6 },
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
        display: "flex",
        gap: isRoot ? 0 : 16,
        marginBottom: isRoot ? 24 : 12,
      }}
    >
      {/* Left Sidebar with Operator and Vertical Line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isRoot ? 0 : 64,
          paddingTop: isRoot ? 0 : 4,
        }}
      >
        {!isRoot && (
          <>
            {/* Vertical Line */}
            <div
              style={{
                width: 2,
                height: 32,
                background: borderColor,
                marginBottom: 8,
              }}
            />
            {/* Operator Badge */}
            <div
              style={{
                padding: "4px 8px",
                background: node.operator === "AND" ? "#e6f4ff" : "#fff7e6",
                border: `1px solid ${borderColor}`,
                borderRadius: 4,
                minWidth: 48,
                textAlign: "center",
                fontSize: 12,
                fontWeight: 600,
                color: borderColor,
              }}
            >
              {node.operator}
            </div>
            {/* Bottom Vertical Line */}
            {node.children.length > 0 && (
              <div
                style={{
                  width: 2,
                  flex: 1,
                  background: borderColor,
                  marginTop: 8,
                  minHeight: Math.max(40 * node.children.length - 20, 20),
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        {/* Root Operator Control */}
        {isRoot && node.children.length > 0 && (
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              Logic:
            </Text>
            {!readOnly ? (
              <Select
                value={node.operator}
                onChange={handleOperatorChange}
                style={{ width: 80 }}
                size="small"
                options={[
                  { value: "AND", label: "AND" },
                  { value: "OR", label: "OR" },
                ]}
              />
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  background: borderColor,
                  color: "#fff",
                  borderRadius: 4,
                }}
              >
                {node.operator}
              </Text>
            )}
          </div>
        )}

        {/* Children Container */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {node.children.map((child, index) =>
            child.type === "condition" ? (
              <div
                key={child.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <RuleCondition
                  node={child}
                  onUpdate={(newNode) => handleChildUpdate(index, newNode)}
                  onDelete={() => handleChildDelete(index)}
                  readOnly={readOnly}
                  isNested={!isRoot}
                />
              </div>
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
          <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
            <Button
              type="text"
              size="small"
              style={{ color: "#1890ff", padding: 0 }}
              onClick={handleAddCondition}
            >
              + Add Rule
            </Button>
            {canAddGroup && (
              <Button
                type="text"
                size="small"
                style={{ color: "#1890ff", padding: 0 }}
                onClick={handleAddGroup}
              >
                + Add Group
              </Button>
            )}
          </div>
        )}

        {/* Empty State for Root */}
        {isRoot && node.children.length === 0 && !readOnly && (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              background: "#fafafa",
              borderRadius: 6,
              border: "1px dashed #d9d9d9",
            }}
          >
            <Text type="secondary" style={{ fontSize: 13 }}>
              No rules defined. Click &quot;Add Rule&quot; to start building your logic.
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
