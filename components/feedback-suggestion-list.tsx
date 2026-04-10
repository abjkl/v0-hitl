"use client"

import React, { useState, useMemo } from "react"
import {
  Table, Input, Select, Space, Tag, Typography, Button, Drawer, Modal,
  DatePicker, message, Tooltip, Alert,
} from "antd"
import {
  SearchOutlined, ExclamationCircleOutlined, WarningOutlined,
} from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import {
  feedbackSuggestionData, type FeedbackSuggestion, type SuggestionStatus, type SuggestionType, type ConfidenceLevel,
} from "@/lib/mock-data"

const { Text, Title } = Typography
const { RangePicker } = DatePicker

// ── Status Badge ──────────────────────────────────────────────────

function StatusBadge({ status }: { status: SuggestionStatus }) {
  const statusConfig: Record<SuggestionStatus, { color: string; text: string }> = {
    'Pending': { color: '#1890ff', text: 'Pending' },
    'Accepted': { color: '#52c41a', text: 'Accepted' },
    'Rejected': { color: '#f5222d', text: 'Rejected' },
    'Withdrawn': { color: '#8c8c8c', text: 'Withdrawn' },
  }
  const config = statusConfig[status]
  return <Tag style={{ background: config.color, color: '#fff', border: 'none' }}>{config.text}</Tag>
}

// ── Confidence Badge ────────────────────────────────────────────────

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const config: Record<ConfidenceLevel, { color: string; icon: React.ReactNode }> = {
    'High': { color: '#52c41a', icon: null },
    'Medium': { color: '#faad14', icon: null },
    'Low': { color: '#f5222d', icon: <WarningOutlined style={{ marginRight: 4 }} /> },
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {config[level].icon}
      <Tag style={{ background: config[level].color, color: '#fff', border: 'none', margin: 0 }}>
        {level}
      </Tag>
    </div>
  )
}

// ── Version Selection Modal ──────────────────────────────────────────

interface VersionModalProps {
  open: boolean
  agentName: string
  onCancel: () => void
  onConfirm: (versionType: 'new' | 'existing', version?: string) => void
  loading: boolean
}

function VersionSelectionModal({ open, agentName, onCancel, onConfirm, loading }: VersionModalProps) {
  const [selected, setSelected] = useState<'new' | 'existing'>('new')
  const [selectedVersion, setSelectedVersion] = useState<string>('')

  const testingVersions = ['v2.1.1-test', 'v2.2-beta']

  return (
    <Modal
      open={open}
      title="应用建议到 Agent Version"
      onCancel={() => {
        setSelected('new')
        setSelectedVersion('')
        onCancel()
      }}
      footer={[
        <Button key="cancel" onClick={() => {
          setSelected('new')
          setSelectedVersion('')
          onCancel()
        }}>取消</Button>,
        <Button
          key="confirm"
          type="primary"
          loading={loading}
          onClick={() => {
            onConfirm(selected, selected === 'existing' ? selectedVersion : undefined)
            setSelected('new')
            setSelectedVersion('')
          }}
          style={{ background: '#52c41a' }}
        >
          确认应用
        </Button>,
      ]}
      width={520}
    >
      <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 12 }}>
            <input
              type="radio"
              name="version"
              value="new"
              checked={selected === 'new'}
              onChange={() => setSelected('new')}
            />
            <Text>创建新 Testing Version</Text>
          </label>
          {selected === 'new' && (
            <Text type="secondary" style={{ fontSize: 12, marginLeft: 24 }}>
              基于当前 Live Version 自动创建（如 v2.1 → v2.1.1）
            </Text>
          )}
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 12 }}>
            <input
              type="radio"
              name="version"
              value="existing"
              checked={selected === 'existing'}
              onChange={() => setSelected('existing')}
            />
            <Text>更新现有 Testing Version</Text>
          </label>
          {selected === 'existing' && (
            <div style={{ marginLeft: 24 }}>
              {testingVersions.length > 0 ? (
                <Select
                  placeholder="选择 Testing Version"
                  value={selectedVersion}
                  onChange={setSelectedVersion}
                  options={testingVersions.map(v => ({ label: v, value: v }))}
                  style={{ width: '100%' }}
                />
              ) : (
                <Alert
                  message="当前无 Testing 版本，请选择创建新版本"
                  type="warning"
                  style={{ fontSize: 12 }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

// ── Suggestion Detail Drawer ────────────────────────────────────────

interface DetailDrawerProps {
  open: boolean
  item: FeedbackSuggestion | null
  onClose: () => void
  onAccept: () => void
  onReject: () => void
  onWithdraw: () => void
}

function DetailDrawer({ open, item, onClose, onAccept, onReject, onWithdraw }: DetailDrawerProps) {
  if (!item) return null

  const diffLines = item.promptDiff.split('\n').filter(l => l.trim())

  return (
    <Drawer
      title="建议详情"
      placement="right"
      onClose={onClose}
      open={open}
      width={560}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Block 1: Attribution Analysis */}
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 12 }}>归因分析 (Attribution Analysis)</Title>

          {item.confidence === 'Low' && (
            <Alert
              message="Agent B 对此建议的置信度较低，请仔细核实"
              type="warning"
              style={{ marginBottom: 12 }}
            />
          )}

          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Error Type</Text>
              <Text style={{ fontSize: 13, display: 'block' }}>{item.errorType}</Text>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Confidence</Text>
              <div style={{ marginTop: 2 }}><ConfidenceBadge level={item.confidence} /></div>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Affected Field</Text>
              <Text code style={{ fontSize: 13, display: 'block' }}>{item.affectedField}</Text>
            </div>
          </div>

          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Reasoning</Text>
            <Text style={{ fontSize: 13, lineHeight: '1.6' }}>{item.reasoning}</Text>
          </div>
        </div>

        {/* Block 2: Proposed Change */}
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Prompt 变更建议 (Proposed Change)</Title>
          <pre style={{
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 4,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 12,
            lineHeight: '1.6',
            margin: 0,
          }}>
            {diffLines.map((line, idx) => {
              const isRemove = line.startsWith('-')
              const isAdd = line.startsWith('+')
              return (
                <div
                  key={idx}
                  style={{
                    background: isRemove ? '#ffe6e6' : isAdd ? '#e6ffe6' : 'transparent',
                    color: isRemove ? '#d32f2f' : isAdd ? '#2e7d32' : '#666',
                  }}
                >
                  {line}
                </div>
              )
            })}
          </pre>
        </div>

        {/* Block 3: Related Feedbacks */}
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 12 }}>关联 Feedback</Title>
          <Table
            columns={[
              {
                title: 'PR ID',
                dataIndex: ['prId'],
                key: 'prId',
                render: (prId) => <Typography.Link onClick={() => message.info(`导航到 /feedback?prId=${prId}`)}>{prId}</Typography.Link>,
              },
              { title: 'Step', dataIndex: ['step'], key: 'step' },
              { title: 'Content 摘要', dataIndex: ['contentSummary'], key: 'contentSummary' },
            ]}
            dataSource={item.relatedFeedbacks}
            rowKey={(_, idx) => idx}
            pagination={false}
            size="small"
          />
        </div>

        {/* Actions */}
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          {item.status === 'Pending' ? (
            <Space>
              <Button type="primary" onClick={onAccept} style={{ background: '#52c41a' }}>
                Accept
              </Button>
              <Button danger onClick={onReject}>
                Reject
              </Button>
              <Button type="text" onClick={onWithdraw}>
                Withdraw
              </Button>
            </Space>
          ) : (
            <div>
              <StatusBadge status={item.status} />
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
                由 {item.processedBy} 于 {item.processedAt} 处理
              </Text>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}

// ── Main Component ───────────────────────────────────────────────────

export function FeedbackSuggestionList() {
  const [data, setData] = useState<FeedbackSuggestion[]>(feedbackSuggestionData)
  const [msgApi, contextHolder] = message.useMessage()

  // Filters
  const [statusFilter, setStatusFilter] = useState<SuggestionStatus[]>(['Pending'])
  const [agentFilter, setAgentFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<SuggestionType | 'All'>('All')
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null)

  // Detail & Modals
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<FeedbackSuggestion | null>(null)
  const [versionModalOpen, setVersionModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [loadingVersion, setLoadingVersion] = useState(false)

  // Get unique values
  const allAgents = useMemo(() => [...new Set(data.map(d => d.agentName))], [data])
  const allTypes = useMemo(() => [...new Set(data.map(d => d.suggestionType))] as SuggestionType[], [data])

  // Filter data
  const filtered = useMemo(() => {
    return data.filter(item => {
      const matchStatus = statusFilter.length === 0 || statusFilter.includes(item.status)
      const matchAgent = !agentFilter || item.agentName === agentFilter
      const matchType = typeFilter === 'All' || item.suggestionType === typeFilter

      let matchDate = true
      if (dateRange) {
        const itemDate = dayjs(item.createdAt, 'YYYY-MM-DD HH:mm')
        matchDate = itemDate.isBetween(dateRange[0], dateRange[1], null, '[]')
      }

      return matchStatus && matchAgent && matchType && matchDate
    })
  }, [data, statusFilter, agentFilter, typeFilter, dateRange])

  // Group by agent
  const grouped = useMemo(() => {
    const groups: Map<string, FeedbackSuggestion[]> = new Map()
    filtered.forEach(item => {
      if (!groups.has(item.agentName)) {
        groups.set(item.agentName, [])
      }
      groups.get(item.agentName)!.push(item)
    })
    return Array.from(groups.entries())
  }, [filtered])

  // Columns
  const columns: ColumnsType<FeedbackSuggestion> = [
    {
      title: 'Suggestion ID',
      dataIndex: 'suggestionId',
      key: 'suggestionId',
      width: 140,
      render: (text) => <Text code style={{ fontSize: 12 }}>{text}</Text>,
    },
    {
      title: 'Live Version',
      dataIndex: 'liveVersion',
      key: 'liveVersion',
      width: 100,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Suggestion Type',
      dataIndex: 'suggestionType',
      key: 'suggestionType',
      width: 120,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Error Type',
      dataIndex: 'errorType',
      key: 'errorType',
      width: 120,
      render: (text) => <Text style={{ fontSize: 13 }}>{text}</Text>,
    },
    {
      title: 'Affected Field',
      dataIndex: 'affectedField',
      key: 'affectedField',
      width: 140,
      render: (text) => <Text code style={{ fontSize: 12 }}>{text}</Text>,
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 100,
      render: (confidence) => <ConfidenceBadge level={confidence} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (text) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => record.status === 'Pending' ? (
        <Space>
          <Button size="small" type="primary" onClick={() => {
            setSelectedDetail(record)
            setVersionModalOpen(true)
          }} style={{ background: '#52c41a' }}>
            Accept
          </Button>
          <Button size="small" danger onClick={() => {
            setSelectedDetail(record)
            setRejectModalOpen(true)
          }}>
            Reject
          </Button>
        </Space>
      ) : null,
    },
  ]

  // Handle Accept
  function handleAccept(versionType: 'new' | 'existing', version?: string) {
    setLoadingVersion(true)
    setTimeout(() => {
      if (selectedDetail) {
        const updatedData = data.map(d =>
          d.key === selectedDetail.key
            ? {
                ...d,
                status: 'Accepted' as const,
                processedBy: 'Current User',
                processedAt: dayjs().format('YYYY-MM-DD HH:mm'),
              }
            : d
        )
        setData(updatedData)
        setVersionModalOpen(false)
        setLoadingVersion(false)
        msgApi.success(`建议已应用，Agent Version ${version || 'v2.1.1'} 已更新`)
        setDetailDrawerOpen(false)
      }
    }, 800)
  }

  // Handle Reject
  function handleReject() {
    if (selectedDetail) {
      const updatedData = data.map(d =>
        d.key === selectedDetail.key
          ? {
              ...d,
              status: 'Rejected' as const,
              rejectReason: rejectReason,
              processedBy: 'Current User',
              processedAt: dayjs().format('YYYY-MM-DD HH:mm'),
            }
          : d
      )
      setData(updatedData)
      setRejectModalOpen(false)
      setRejectReason('')
      msgApi.success('建议已拒绝')
      setDetailDrawerOpen(false)
    }
  }

  // Handle Withdraw
  function handleWithdraw() {
    if (selectedDetail) {
      const updatedData = data.map(d =>
        d.key === selectedDetail.key
          ? {
              ...d,
              status: 'Withdrawn' as const,
              processedBy: 'Current User',
              processedAt: dayjs().format('YYYY-MM-DD HH:mm'),
            }
          : d
      )
      setData(updatedData)
      setWithdrawModalOpen(false)
      msgApi.success('建议已撤回')
      setDetailDrawerOpen(false)
    }
  }

  const clearFilters = () => {
    setStatusFilter(['Pending'])
    setAgentFilter('')
    setTypeFilter('All')
    setDateRange(null)
  }

  const hasFilters = statusFilter.length > 0 || agentFilter || typeFilter !== 'All' || dateRange

  return (
    <div>
      {contextHolder}

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0, marginBottom: 4 }}>反馈建议</Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          查看 Agent B 的规则优化建议，应用到新版本或直接拒绝
        </Text>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', padding: 16, borderRadius: 6, marginBottom: 16, border: '1px solid #f0f0f0' }}>
        <Space wrap size={12}>
          <Select
            mode="multiple"
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Accepted', value: 'Accepted' },
              { label: 'Rejected', value: 'Rejected' },
              { label: 'Withdrawn', value: 'Withdrawn' },
            ]}
            style={{ width: 200 }}
          />

          <Select
            placeholder="Agent"
            value={agentFilter}
            onChange={setAgentFilter}
            options={[{ label: 'All', value: '' }, ...allAgents.map(a => ({ label: a, value: a }))]}
            style={{ width: 160 }}
          />

          <Select
            placeholder="Suggestion Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: 'All', value: 'All' },
              ...allTypes.map(t => ({ label: t, value: t })),
            ]}
            style={{ width: 160 }}
          />

          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates as any)}
            style={{ width: 280 }}
          />

          {hasFilters && <Button type="text" onClick={clearFilters} style={{ fontSize: 12 }}>清除筛选</Button>}
        </Space>
      </div>

      {/* Grouped Table */}
      <div style={{ background: '#fff', borderRadius: 6, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
        {grouped.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <Text type="secondary">暂无建议记录</Text>
          </div>
        ) : (
          grouped.map(([agentName, items]) => (
            <div key={agentName} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <div style={{
                padding: '12px 16px',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Space>
                  <Text strong style={{ fontSize: 14 }}>{agentName}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Pending: {items.filter(i => i.status === 'Pending').length}
                  </Text>
                </Space>
              </div>
              <Table
                columns={columns}
                dataSource={items}
                rowKey="key"
                pagination={false}
                size="small"
                scroll={{ x: 1400 }}
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedDetail(record)
                    setDetailDrawerOpen(true)
                  },
                  style: { cursor: 'pointer' },
                })}
              />
            </div>
          ))
        )}
      </div>

      {/* Drawers & Modals */}
      <DetailDrawer
        open={detailDrawerOpen}
        item={selectedDetail}
        onClose={() => setDetailDrawerOpen(false)}
        onAccept={() => {
          setDetailDrawerOpen(false)
          setVersionModalOpen(true)
        }}
        onReject={() => setRejectModalOpen(true)}
        onWithdraw={() => setWithdrawModalOpen(true)}
      />

      <VersionSelectionModal
        open={versionModalOpen}
        agentName={selectedDetail?.agentName || ''}
        onCancel={() => setVersionModalOpen(false)}
        onConfirm={handleAccept}
        loading={loadingVersion}
      />

      <Modal
        open={rejectModalOpen}
        title={<><ExclamationCircleOutlined style={{ color: '#f5222d', marginRight: 8 }} />拒绝建议</>}
        onCancel={() => {
          setRejectModalOpen(false)
          setRejectReason('')
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setRejectModalOpen(false)
            setRejectReason('')
          }}>取消</Button>,
          <Button key="confirm" type="primary" onClick={handleReject} style={{ background: '#f5222d' }}>
            确认拒绝
          </Button>,
        ]}
        width={480}
      >
        <div style={{ paddingTop: 16 }}>
          <Text style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
            拒绝原因（选填，最多 200 字）：
          </Text>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value.slice(0, 200))}
            placeholder="请输入拒绝原因"
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
            {rejectReason.length}/200
          </Text>
        </div>
      </Modal>

      <Modal
        open={withdrawModalOpen}
        title={<><ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />撤回建议</>}
        onCancel={() => setWithdrawModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setWithdrawModalOpen(false)}>取消</Button>,
          <Button key="confirm" type="primary" onClick={handleWithdraw} danger>
            确认撤回
          </Button>,
        ]}
        width={400}
      >
        <Text>撤回后不可恢复，确认撤回此建议？</Text>
      </Modal>
    </div>
  )
}
