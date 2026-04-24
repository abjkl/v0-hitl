"use client"

import { Select, InputNumber, Button, Typography, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { type ConditionNode } from "@/lib/mock-data"

const { Text } = Typography

interface RuleConditionProps {
  node: ConditionNode
  onUpdate: (newNode: ConditionNode) => void
  onDelete: () => void
  readOnly?: boolean
}

// Sample field options for Invoice and PO
const INVOICE_FIELDS = [
  "Invoice Amount",
  "Invoice Date",
  "Invoice Number",
  "Invoice Total",
  "Line Amount",
  "Unit Price",
  "Quantity",
  "Description",
  "Vendor ID",
  "Bank Name",
  "Invoice Hash",
  "Invoice Count",
  "Tax Code",
  "Country",
  "Bank Country",
  "Reference",
  "Vendor Status",
]

const PO_FIELDS = [
  "PO Amount",
  "PO Date",
  "PO Number",
  "PO Total",
  "Line PO Amount",
  "PO Unit Price",
  "PO Quantity",
  "PO Description",
  "PO Vendor",
  "PO Bank",
  "Previous Hash",
  "PO Count",
  "PO Tax Code",
  "PO Country",
  "PO Bank Country",
  "PO Reference",
  "Vendor Active",
  "Previous Invoice",
  "Previous Amount",
  "Previous Bank",
  "Expected Country",
  "Supplier Country",
]

const CONDITION_OPTIONS = [
  { value: "=", label: "=" },
  { value: "!=", label: "!=" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
]

export function RuleCondition({ node, onUpdate, onDelete, readOnly = false }: RuleConditionProps) {
  function handleInvoiceFieldChange(value: string) {
    onUpdate({ ...node, invoiceField: value })
  }

  function handlePoFieldChange(value: string) {
    onUpdate({ ...node, poField: value })
  }

  function handleConditionChange(value: string) {
    onUpdate({ ...node, condition: value })
  }

  function handleToleranceChange(value: number | null) {
    onUpdate({ ...node, toleranceRange: value ?? 0 })
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
        gap: 8,
        padding: "8px 12px",
        alignItems: "center",
        background: "#fafafa",
        borderRadius: 6,
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Column 1: Invoice Field */}
      <Select
        size="small"
        value={node.invoiceField}
        onChange={handleInvoiceFieldChange}
        options={INVOICE_FIELDS.map((f) => ({ value: f, label: f }))}
        placeholder="Select Invoice Field"
        disabled={readOnly}
      />

      {/* Column 2: PO Field */}
      <Select
        size="small"
        value={node.poField}
        onChange={handlePoFieldChange}
        options={PO_FIELDS.map((f) => ({ value: f, label: f }))}
        placeholder="Select PO Field"
        disabled={readOnly}
      />

      {/* Column 3: Condition */}
      <Select
        size="small"
        value={node.condition}
        onChange={handleConditionChange}
        options={CONDITION_OPTIONS}
        placeholder="Select Condition"
        disabled={readOnly}
      />

      {/* Column 4: Tolerance Range */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>±</Text>
        <InputNumber
          size="small"
          min={0}
          value={node.toleranceRange}
          onChange={handleToleranceChange}
          style={{ width: 80 }}
          disabled={readOnly}
          placeholder="0"
        />
      </div>

      {/* Delete Button */}
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
