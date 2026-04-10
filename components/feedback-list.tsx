"use client"

import React, { useState, useMemo } from "react"
import {
  Table, Input, Select, Space, Tag, Typography, Button, Checkbox, Modal, Drawer,
  DatePicker, message, Tooltip, Alert, Spin, Table as AntTable,
} from "antd"
import {
  SearchOutlined, ExclamationCircleOutlined, EyeOutlined, CopyOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import {
  feedbackData, type FeedbackItem, type FeedbackStatus, type FeedbackStep, type FeedbackType,
} from "@/lib/mock-data"

const { Text, Title } = Typography
const { RangePicker } = DatePicker

// ── Status Badge ──────────────────────────────────────────────────

function StatusBadge({ status }: { status: FeedbackStatus }) {
  const statusConfig: Record<FeedbackStatus, { color: string; text: string }> = {
    'Pending': { color: '#1890ff', text: 'Pending' },
    'Processing': { color: '#faad14', text: 'Processing' },
    'Processed': { color: '#52c41a', text: 'Processed' },
    'Rejected': { color: '#f5222d', text: 'Rejected' },
  }
  const config = statusConfig[status]
  return <Tag style={{ background: config.color, color: '#fff', border: 'none' }}>{config.text}</Tag>
}

// ── Accept Confirmation Modal ────────────────────────────────────────

interface AcceptModalProps {
  open: boolean
  selectedItems: FeedbackItem[]
  onCancel: () => void
  onConfirm: () => void
  loading: boolean
}

function AcceptModal({ open, selectedItems, onCancel, onConfirm, loading }: AcceptModalProps) {
  const agents = useMemo(() => {
    const agentMap = new Map<string, number>()
    selectedItems.forEach(item => {
      const count = agentMap.get(item.relatedAgent) || 0
      agentMap.set(item.relatedAgent, count + 1)
    })
    return Array.from(agentMap.entries()).map(([name, count]) => ({ name, count }))
  }, [selectedItems])

  return (
    <Modal
      open={open}
      title={<><ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />确认 Accept</>}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button key="confirm" type="primary" loading={loading} onClick={onConfirm} style={{ background: '#1890ff' }}>
          确认 Accept
        </Button>,
      ]}
      width={520}
    >
      <div style={{ paddingTop: 16 }}>
        <Text style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
          将对 <Text strong>{selectedItems.length}</Text> 条反馈触发 Agent B 处理
        </Text>

        <div style={{ background: '#fafafa', borderRadius: 4, padding: 12, marginBottom: 16 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>涉及的 Agent 列表：</Text>
          {agents.map(({ name, count }) => (
            <div key={name} style={{ fontSize: 13, padding: '4px 0' }}>
              <Text>{name} ({count}条)</Text>
            </div>
          ))}
        </div>

        <Alert
          message="Agent B 处理完成后，建议会出现在 Feedback Suggestion List 中"
          type="info"
          style={{ fontSize: 12 }}
        />
      </div>
    </Modal>
  )
}

// ── Reject Confirmation Modal ────────────────────────────────────────

interface RejectModalProps {
  open: boolean
  selectedCount: number
  onCancel: () => void
  onConfirm: (reason: string) => void
  loading: boolean
}

function RejectModal({ open, selectedCount, onCancel, onConfirm, loading }: RejectModalProps) {
  const [reason, setReason] = useState("")

  return (
    <Modal
      open={open}
      title={<><ExclamationCircleOutlined style={{ color: '#f5222d', marginRight: 8 }} />确认 Reject</>}
      onCancel={() => {
        setReason("")
        onCancel()
      }}
      footer={[
        <Button key="cancel" onClick={() => {
          setReason("")
          onCancel()
        }}>取消</Button>,
        <Button key="confirm" type="primary" loading={loading} onClick={() => onConfirm(reason)} style={{ background: '#f5222d' }}>
          确认 Reject
        </Button>,
      ]}
      width={520}
    >
      <div style={{ paddingTop: 16 }}>
        <Text style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>
          将拒绝处理 <Text strong>{selectedCount}</Text> 条反馈
        </Text>

        <div style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>驳回原因（选填，最多 200 字）：</Text>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, 200))}
            placeholder="请输入驳回原因"
            style={{
              width: '100%',
              padding: 8,
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              fontFamily: 'inherit',
              fontSize: 13,
              minHeight: 80,
            }}
          />
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
            {reason.length}/200
          </Text>
        </div>
      </div>
    </Modal>
  )
}

// ── Feedback Detail Drawer ───────────────────────────────────────────

interface DetailDrawerProps {
  open: boolean
  item: FeedbackItem | null
  onClose: () => void
}

function DetailDrawer({ open, item, onClose }: DetailDrawerProps) {
  if (!item) return null

  return (
    <Drawer
      title="反馈详情"
      placement="right"
      onClose={onClose}
      open={open}
      width={480}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Feedback ID</Text>
          <Text code style={{ fontSize: 13 }}>{item.feedbackId}</Text>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>PR ID</Text>
            <Typography.Link style={{ fontSize: 13 }} onClick={() => {
              message.info(`导航到 /cases/${item.prId}`)
            }}>{item.prId}</Typography.Link>
          </div>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Step</Text>
            <Text style={{ fontSize: 13 }}>{item.step}</Text>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Feedback Type</Text>
            <Text style={{ fontSize: 13 }}>{item.feedbackType}</Text>
          </div>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Status</Text>
            <StatusBadge status={item.status} />
          </div>
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Content</Text>
          <Text style={{ fontSize: 13, lineHeight: '1.6' }}>{item.content}</Text>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Related Agent</Text>
            <Text style={{ fontSize: 13 }}>{item.relatedAgent}</Text>
          </div>
          <div style={{ flex: 1 }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Submitted By</Text>
            <Text style={{ fontSize: 13 }}>{item.submittedBy}</Text>
          </div>
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Submitted At</Text>
          <Text type="secondary" style={{ fontSize: 13 }}>{item.submittedAt}</Text>
        </div>

        {item.status === 'Rejected' && item.rejectReason && (
          <div style={{ padding: 12, background: '#fff1f0', borderRadius: 4, borderLeft: '3px solid #f5222d' }}>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Reject Reason</Text>
            <Text style={{ fontSize: 13, color: '#f5222d' }}>{item.rejectReason}</Text>
          </div>
        )}

        {item.status === 'Processing' && (
          <Alert
            message="Agent B 处理中..."
            description="请稍后查看 Suggestion List 了解处理结果"
            type="info"
            showIcon
          />
        )}

        {item.status === 'Processed' && (
          <Alert
            message="已处理"
            description="关联 Suggestion ID 将在 Suggestion List 中显示"
            type="success"
            showIcon
          />
        )}
      </div>
    </Drawer>
  )
}

// ── Main Component ───────────────────────────────────────────────────

export function FeedbackList() {
  const [data, setData] = useState<FeedbackItem[]>(feedbackData)
  const [msgApi, contextHolder] = message.useMessage()

  // Filters
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus[]>(['Pending'])
  const [stepFilter, setStepFilter] = useState<FeedbackStep[]>([])
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState<FeedbackType | 'All'>('All')
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null)

  // Multi-select
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<FeedbackItem | null>(null)

  // Modals
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [loadingAccept, setLoadingAccept] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)

  // Get unique values for filters
  const allSteps = useMemo(() => [...new Set(data.map(d => d.step))] as FeedbackStep[], [data])
  const allFeedbackTypes = useMemo(() => [...new Set(data.map(d => d.feedbackType))] as FeedbackType[], [data])

  // Filter data
  const filtered = useMemo(() => {
    return data.filter(item => {
      const matchSearch = !searchText || 
        item.prId.toLowerCase().includes(searchText.toLowerCase()) ||
        item.caseId.toLowerCase().includes(searchText.toLowerCase())
      
      const matchStatus = statusFilter.length === 0 || statusFilter.includes(item.status)
      const matchStep = stepFilter.length === 0 || stepFilter.includes(item.step)
      const matchType = feedbackTypeFilter === 'All' || item.feedbackType === feedbackTypeFilter

      let matchDate = true
      if (dateRange) {
        const itemDate = dayjs(item.submittedAt, 'YYYY-MM-DD HH:mm')
        matchDate = itemDate.isBetween(dateRange[0], dateRange[1], null, '[]')
      }

      return matchSearch && matchStatus && matchStep && matchType && matchDate
    })
  }, [data, searchText, statusFilter, stepFilter, feedbackTypeFilter, dateRange])

  // Get selected items
  const selectedItems = useMemo(() => {
    return data.filter(item => selectedRowKeys.includes(item.key))
  }, [data, selectedRowKeys])

  // Columns
  const columns: ColumnsType<FeedbackItem> = [
    {
      title: 'Feedback ID',
      dataIndex: 'feedbackId',
      key: 'feedbackId',
      width: 140,
      render: (text) => <Text code style={{ fontSize: 12 }}>{text}</Text>,
    },
    {
      title: 'PR ID',
      dataIndex: 'prId',
      key: 'prId',
      width: 120,
      render: (text) => <Typography.Link style={{ fontSize: 13 }} onClick={() => message.info(`导航到 /cases/${text}`)}>{text}</Typography.Link>,
    },
    {
      title: 'Step',
      dataIndex: 'step',
      key: 'step',
      width: 120,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Feedback Type',
      dataIndex: 'feedbackType',
      key: 'feedbackType',
      width: 120,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      flex: 1,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis style={{ fontSize: 13, maxWidth: 300 }}>
            {text.length > 80 ? text.slice(0, 80) + '...' : text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Related Agent',
      dataIndex: 'relatedAgent',
      key: 'relatedAgent',
      width: 140,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
      width: 120,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Submitted At',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      width: 160,
      render: (text) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => <StatusBadge status={status} />,
    },
  ]

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      // Only allow Pending items
      const pendingKeys = keys.filter(key => {
        const item = data.find(d => d.key === key)
        return item?.status === 'Pending'
      })
      setSelectedRowKeys(pendingKeys)
    },
    getCheckboxProps: (record: FeedbackItem) => ({
      disabled: record.status !== 'Pending',
      title: record.status !== 'Pending' ? '仅 Pending 状态可选' : undefined,
    }),
  }

  // Handle Accept
  function handleAccept() {
    setAcceptModalOpen(true)
  }

  function confirmAccept() {
    setLoadingAccept(true)
    setTimeout(() => {
      // Update status to Processing
      const updatedData = data.map(item =>
        selectedRowKeys.includes(item.key) ? { ...item, status: 'Processing' as const } : item
      )
      setData(updatedData)
      setSelectedRowKeys([])
      setAcceptModalOpen(false)
      setLoadingAccept(false)

      // Check number of unique agents
      const agents = new Set(selectedItems.map(i => i.relatedAgent))
      if (agents.size > 1) {
        msgApi.info('多个 Agent 场景 - 显示 Run Overview Modal（可选实现）')
      } else {
        msgApi.success('Agent B 处理中，请稍后查看 Suggestion List')
      }
    }, 800)
  }

  // Handle Reject
  function handleReject() {
    setRejectModalOpen(true)
  }

  function confirmReject(reason: string) {
    setLoadingReject(true)
    setTimeout(() => {
      // Update status to Rejected
      const updatedData = data.map(item =>
        selectedRowKeys.includes(item.key) ? { ...item, status: 'Rejected' as const, rejectReason: reason } : item
      )
      setData(updatedData)
      setSelectedRowKeys([])
      setRejectModalOpen(false)
      setLoadingReject(false)
      msgApi.success(`已拒绝 ${selectedItems.length} 条反馈`)
    }, 800)
  }

  // Clear filters
  function clearFilters() {
    setSearchText("")
    setStatusFilter(['Pending'])
    setStepFilter([])
    setFeedbackTypeFilter('All')
    setDateRange(null)
  }

  const hasFilters = searchText || statusFilter.length > 0 || stepFilter.length > 0 || feedbackTypeFilter !== 'All' || dateRange

  return (
    <div>
      {contextHolder}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0, marginBottom: 4 }}>反馈管理</Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          查看和处理反馈，触发 Agent B 进行规则优化建议
        </Text>
      </div>

      {/* Action Bar - Sticky when selected */}
      {selectedRowKeys.length > 0 && (
        <div style={{
          background: '#fffbe6',
          border: '1px solid #ffe58f',
          borderRadius: 4,
          padding: '12px 16px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text style={{ fontSize: 13 }}>已选 <Text strong>{selectedRowKeys.length}</Text> 条</Text>
          <Space>
            <Button onClick={handleAccept} type="primary" style={{ background: '#1890ff' }}>
              Accept
            </Button>
            <Button onClick={handleReject} danger>
              Reject
            </Button>
          </Space>
        </div>
      )}

      {/* Filters */}
      <div style={{ background: '#fff', padding: 16, borderRadius: 6, marginBottom: 16, border: '1px solid #f0f0f0' }}>
        <Space wrap size={12} style={{ marginBottom: 12 }}>
          <Input
            placeholder="搜索 PR ID 或 Case ID"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />

          <Select
            mode="multiple"
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Processing', value: 'Processing' },
              { label: 'Processed', value: 'Processed' },
              { label: 'Rejected', value: 'Rejected' },
            ]}
            style={{ width: 200 }}
          />

          <Select
            mode="multiple"
            placeholder="Step"
            value={stepFilter}
            onChange={setStepFilter}
            options={allSteps.map(s => ({ label: s, value: s }))}
            style={{ width: 200 }}
          />

          <Select
            placeholder="Feedback Type"
            value={feedbackTypeFilter}
            onChange={setFeedbackTypeFilter}
            options={[
              { label: 'All', value: 'All' },
              ...allFeedbackTypes.map(t => ({ label: t, value: t })),
            ]}
            style={{ width: 160 }}
          />

          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates as any)}
            style={{ width: 280 }}
          />
        </Space>

        {hasFilters && (
          <Button type="text" onClick={clearFilters} style={{ fontSize: 12 }}>
            清除筛选
          </Button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 6, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <Text type="secondary">暂无反馈记录</Text>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey="key"
            rowSelection={rowSelection}
            pagination={{ pageSize: 20, showSizeChanger: true }}
            scroll={{ x: 1600 }}
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                setSelectedDetail(record)
                setDetailDrawerOpen(true)
              },
              style: { cursor: 'pointer' },
            })}
          />
        )}
      </div>

      {/* Modals & Drawers */}
      <AcceptModal
        open={acceptModalOpen}
        selectedItems={selectedItems}
        onCancel={() => setAcceptModalOpen(false)}
        onConfirm={confirmAccept}
        loading={loadingAccept}
      />

      <RejectModal
        open={rejectModalOpen}
        selectedCount={selectedItems.length}
        onCancel={() => setRejectModalOpen(false)}
        onConfirm={confirmReject}
        loading={loadingReject}
      />

      <DetailDrawer
        open={detailDrawerOpen}
        item={selectedDetail}
        onClose={() => setDetailDrawerOpen(false)}
      />
    </div>
  )
}
