"use client"

import React from "react"
import { Card, Tabs, Typography, Table, Tag } from "antd"
import { FileTextOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

export function PrdViewer() {
  const tabItems = [
    {
      key: "overview",
      label: "产品概述",
      children: (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>产品定位</Title>
            <Paragraph>
              AP Invoice Audit 是一个面向财务团队的 AI Agent 管理系统，用于自动化发票审核流程。系统支持多区域运营（SEA、EA、LATAM），通过 AI Agent 实现发票提取、PO 匹配、AP 凭证生成等核心业务流程的自动化。
            </Paragraph>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>目标用户</Title>
            <Table
              columns={[
                { title: "角色", dataIndex: "role", render: (v) => <Text code>{v}</Text> },
                { title: "描述", dataIndex: "desc" },
              ]}
              dataSource={[
                { key: "1", role: "AP_MANAGER", desc: "应付账款经理，查看 Case、审核发票、查看报告" },
                { key: "2", role: "AI_OPS", desc: "AI 运维人员，管理 Agent、配置 Golden Set、运行回归测试" },
              ]}
              pagination={false}
              bordered={false}
              size="small"
            />
          </Card>
        </div>
      ),
    },
    {
      key: "arch",
      label: "系统架构",
      children: (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>技术栈</Title>
            <ul style={{ fontSize: 13 }}>
              <li><Text strong>框架</Text>: Next.js 16 (App Router)</li>
              <li><Text strong>UI 库</Text>: Ant Design 5.x + Tailwind CSS 4.x</li>
              <li><Text strong>状态管理</Text>: React Context + useState/useMemo</li>
              <li><Text strong>类型系统</Text>: TypeScript 5.x</li>
            </ul>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>核心模块</Title>
            <ul style={{ fontSize: 13 }}>
              <li><Text strong>Knowledge Base</Text> - 知识库管理 (Buyer、Supplier、Bank)</li>
              <li><Text strong>Case Management</Text> - 发票 Case 管理，365 天活跃窗口，自动归档</li>
              <li><Text strong>Agent Management</Text> - AI Agent 生命周期管理，版本控制</li>
              <li><Text strong>Regression Test</Text> - 三集合回归测试 (Golden/Benchmark/Full)</li>
              <li><Text strong>Golden Case Management</Text> - 黄金测试集配置</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      key: "features",
      label: "功能特性",
      children: (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>活跃窗口 & 归档机制</Title>
            <Paragraph>
              <Text strong>规则</Text>
              <ul style={{ fontSize: 13 }}>
                <li>默认显示 reviewDate 在最近 365 天内的 Case</li>
                <li>Golden Set 中的 Case 永久保留</li>
                <li>超过 365 天且非 Golden 的 Case 自动归档</li>
                <li>AI_OPS 可手动触发 "Run Archive Now" 按钮</li>
              </ul>
            </Paragraph>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>Agent 生命周期</Title>
            <Paragraph>
              <ul style={{ fontSize: 13 }}>
                <li><Tag color="orange">TESTING</Tag> - 开发测试阶段，支持运行回归测试</li>
                <li><Tag color="green">ACTIVE</Tag> - 生产运行阶段，当前版本</li>
                <li><Tag color="default">DEPRECATED</Tag> - 被新版本替代，只读</li>
              </ul>
            </Paragraph>
            <Paragraph>
              <Text strong>发布条件</Text>
              <ul style={{ fontSize: 13 }}>
                <li>Golden Set Pass Rate ≥ 85%</li>
                <li>Benchmark Set Pass Rate ≥ 85%</li>
                <li>Full Set Pass Rate ≥ 85%</li>
              </ul>
            </Paragraph>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>版本管理</Title>
            <Paragraph>
              <ul style={{ fontSize: 13 }}>
                <li>每个 Agent 维护当前版本、测试版本、历史版本</li>
                <li>发布时新建版本，支持从任意历史版本 Copy 配置</li>
                <li>版本采用 semver 格式 (e.g., v1.2.0、v1.2.0-beta)</li>
                <li>所有版本配置变化都记录历史</li>
              </ul>
            </Paragraph>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>Regression Test</Title>
            <Paragraph>
              <Text strong>三个测试集</Text>
              <ul style={{ fontSize: 13 }}>
                <li><Text code>Golden Set</Text> - 黄金测试集，由 Golden Case Management 配置</li>
                <li><Text code>Benchmark Set</Text> - 基准测试集，性能基准参考</li>
                <li><Text code>Full Set</Text> - 全量测试集，完整覆盖</li>
              </ul>
            </Paragraph>
            <Paragraph>
              <Text strong>流程</Text>
              <ul style={{ fontSize: 13 }}>
                <li>选择 Agent 并点击 "Trigger Regression Test"</li>
                <li>依次执行三个测试集，显示进度条</li>
                <li>所有测试通过 (≥85%) 后显示 PASS，可发布</li>
              </ul>
            </Paragraph>
          </Card>
        </div>
      ),
    },
    {
      key: "data",
      label: "数据模型",
      children: (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>AuditCase (发票 Case)</Title>
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 4, fontFamily: "monospace", fontSize: 11, overflow: "auto" }}>
              <pre>{`caseId: string              // e.g. "CASE-001"
invoiceNo: string           // e.g. "INV-2025-0001"
supplierName: string
entity: string              // 2-letter code: "SG", "TH", ...
amount: number
currency: string
invoiceDate: string         // "YYYY-MM-DD"
reviewDate: string          // 用于 365 天活跃窗口
isGolden: "Golden" | "Non-Golden"
groundTruth: "Pass" | "Fail" | "Pending"
tags: string[]              // e.g. ["three-way-match"]`}</pre>
            </div>
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>Agent</Title>
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 4, fontFamily: "monospace", fontSize: 11, overflow: "auto" }}>
              <pre>{`id: string                  // e.g. "AGT-001"
agentName: string
flowId: string
step: string                // "INVOICE_REVIEW" | "MATCH" | "AP_VOUCHER"
currentVersion: string      // e.g. "v1.3.0"
status: "ACTIVE" | "TESTING" | "DEPRECATED"
description: string
regions: string[]           // 空数组 = 所有区域`}</pre>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "reference",
      label: "参考",
      children: (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>支持区域</Title>
            <Table
              columns={[
                { title: "代码", dataIndex: "code", render: (v) => <Text code>{v}</Text>, width: 80 },
                { title: "区域", dataIndex: "name", flex: 1 },
                { title: "大区", dataIndex: "region", width: 80, render: (v) => <Tag>{v}</Tag> },
              ]}
              dataSource={[
                { key: "1", code: "SG", name: "Singapore", region: "SEA" },
                { key: "2", code: "TH", name: "Thailand", region: "SEA" },
                { key: "3", code: "VN", name: "Vietnam", region: "SEA" },
                { key: "4", code: "TW", name: "Taiwan", region: "EA" },
                { key: "5", code: "BR", name: "Brazil", region: "LATAM" },
              ]}
              pagination={false}
              bordered={false}
              size="small"
            />
          </Card>

          <Card>
            <Title level={4} style={{ marginTop: 0 }}>文档信息</Title>
            <ul style={{ fontSize: 13 }}>
              <li><Text strong>版本</Text>: 1.0</li>
              <li><Text strong>更新日期</Text>: 2025-03-19</li>
              <li><Text strong>完整文档</Text>: 保存于 <Text code>/docs/PRD.md</Text></li>
              <li><Text strong>包含内容</Text>: 产品定位、系统架构、功能模块、数据模型、全局功能、状态管理、组件通信、未来规划</li>
            </ul>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px 0" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <FileTextOutlined style={{ fontSize: 28, color: "#1890ff" }} />
          <div>
            <Title level={3} style={{ margin: 0 }}>产品需求文档 (PRD)</Title>
            <Text type="secondary" style={{ fontSize: 12 }}>AP Invoice Audit - Agent Management System | v1.0</Text>
          </div>
        </div>
      </div>

      <Tabs items={tabItems} defaultActiveKey="overview" />

      <div style={{ marginTop: 24, padding: "16px", background: "#f6f8fa", borderRadius: 4, textAlign: "center" }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          完整 PRD 文档包括产品定位、系统架构、数据模型、功能设计、状态管理等完整设计文档，可在 <Text code>/docs/PRD.md</Text> 查看。
        </Text>
      </div>
    </div>
  )
}
