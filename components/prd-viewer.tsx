"use client"

import React from "react"
import { Card, Tabs, Typography, Table, Tag, Button } from "antd"
import { FileTextOutlined, LinkOutlined, DatabaseOutlined, ApiOutlined, RobotOutlined, SafetyCertificateOutlined, GlobalOutlined, BranchesOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

export function PrdViewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
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
          {/* Link to full System Architecture page */}
          <Card style={{ background: "#e6f4ff", border: "1px solid #91caff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Title level={5} style={{ marginTop: 0, marginBottom: 4 }}>完整系统架构图</Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  查看交互式架构图、数据流图、模块详情和 Agent 状态机
                </Text>
              </div>
              {onNavigate && (
                <Button
                  type="primary"
                  icon={<LinkOutlined />}
                  onClick={() => onNavigate("system-architecture")}
                  style={{ background: "#1890ff" }}
                >
                  打开 System Architecture
                </Button>
              )}
            </div>
          </Card>

          {/* Tech Stack */}
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>技术栈</Title>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { name: "Next.js", version: "16", color: "#000" },
                { name: "React", version: "19", color: "#61dafb" },
                { name: "TypeScript", version: "5.x", color: "#3178c6" },
                { name: "Ant Design", version: "5.x", color: "#1890ff" },
                { name: "Tailwind CSS", version: "4.x", color: "#06b6d4" },
              ].map((t) => (
                <div key={t.name} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: `${t.color}10`,
                  border: `1px solid ${t.color}30`,
                  borderRadius: 6,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color }} />
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>{t.name}</Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>{t.version}</Text>
                </div>
              ))}
            </div>
          </Card>

          {/* Layered Architecture */}
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>分层架构</Title>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { layer: "Frontend Layer", icon: <GlobalOutlined />, color: "#1890ff", modules: ["React UI Layer", "State Management (Context)", "Role-Based Access"] },
                { layer: "Core Modules", icon: <RobotOutlined />, color: "#52c41a", modules: ["Knowledge Base", "Case Management", "Agent Management", "Regression Test"] },
                { layer: "Data Layer", icon: <DatabaseOutlined />, color: "#722ed1", modules: ["Mock Data Store", "Archive Utils", "Golden Cases State"] },
                { layer: "Cross-Cutting", icon: <SafetyCertificateOutlined />, color: "#fa8c16", modules: ["Region Context", "Role Context", "Type Definitions"] },
              ].map((l) => (
                <div key={l.layer} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 12,
                  background: `${l.color}08`,
                  border: `1px solid ${l.color}20`,
                  borderRadius: 6,
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    background: `${l.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: l.color,
                    fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {l.icon}
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13, display: "block", marginBottom: 4 }}>{l.layer}</Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {l.modules.map((m) => (
                        <Tag key={m} style={{ fontSize: 11, margin: 0 }}>{m}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Core Modules */}
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>核心模块</Title>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {[
                { name: "Knowledge Base", icon: <DatabaseOutlined />, desc: "Buyer、Supplier、Bank 知识库管理", color: "#1890ff" },
                { name: "Case Management", icon: <ApiOutlined />, desc: "发票 Case 管理，365 天活跃窗口，自动归档", color: "#52c41a" },
                { name: "Agent Management", icon: <RobotOutlined />, desc: "AI Agent 生命周期管理，版本控制", color: "#722ed1" },
                { name: "Regression Test", icon: <BranchesOutlined />, desc: "三集合回归测试 (Golden/Benchmark/Full)", color: "#fa8c16" },
              ].map((m) => (
                <div key={m.name} style={{
                  padding: 12,
                  border: "1px solid #f0f0f0",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: `${m.color}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: m.color,
                    fontSize: 14,
                    flexShrink: 0,
                  }}>
                    {m.icon}
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13, display: "block" }}>{m.name}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{m.desc}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "features",
      label: "功能特性",
      children: (
        <div style={{ display: "grid", gap: 24 }}>
          {/* Knowledge Base */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#1890ff15", display: "flex", alignItems: "center", justifyContent: "center", color: "#1890ff" }}>
                <DatabaseOutlined />
              </div>
              <Title level={4} style={{ margin: 0 }}>Knowledge Base</Title>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 13, color: "#1890ff", display: "block", marginBottom: 8 }}>核心实体</Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { name: "Buyer", desc: "采购方信息，包含公司名称、地址、联系方式" },
                  { name: "Supplier", desc: "供应商信息，包含供应商代码、银行账户" },
                  { name: "Bank", desc: "银行信息，用于付款和对账" },
                ].map((e) => (
                  <div key={e.name} style={{ padding: 10, background: "#fafafa", borderRadius: 4 }}>
                    <Text strong style={{ fontSize: 12, display: "block" }}>{e.name}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{e.desc}</Text>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, color: "#1890ff", display: "block", marginBottom: 8 }}>交互细节</Text>
              <ul style={{ fontSize: 13, margin: 0, paddingLeft: 20 }}>
                <li><Text strong>Knowledge Detail</Text> - 查看实体详情，展示字段结构和示例数据</li>
                <li><Text strong>Endpoint 配置</Text> - 配置外部数据源连接，支持 API Endpoint、认证方式</li>
                <li><Text strong>数据同步</Text> - 手动触发或定时同步外部数据源</li>
              </ul>
            </div>
          </Card>

          {/* Case Management */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#52c41a15", display: "flex", alignItems: "center", justifyContent: "center", color: "#52c41a" }}>
                <ApiOutlined />
              </div>
              <Title level={4} style={{ margin: 0 }}>Case Management</Title>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 13, color: "#52c41a", display: "block", marginBottom: 8 }}>核心实体</Text>
              <div style={{ background: "#fafafa", padding: 12, borderRadius: 4 }}>
                <Text strong style={{ fontSize: 12, display: "block", marginBottom: 8 }}>AuditCase (发票 Case)</Text>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, fontSize: 11 }}>
                  <div><Text code>caseId</Text> - Case 唯一标识</div>
                  <div><Text code>invoiceNo</Text> - 发票编号</div>
                  <div><Text code>supplierName</Text> - 供应商名称</div>
                  <div><Text code>entity</Text> - 所属实体 (SG/TH/VN...)</div>
                  <div><Text code>amount</Text> / <Text code>currency</Text> - 金额与币种</div>
                  <div><Text code>reviewDate</Text> - 审核日期 (用于 365 天窗口)</div>
                  <div><Text code>isGolden</Text> - Golden / Non-Golden 标记</div>
                  <div><Text code>groundTruth</Text> - Pass / Fail / Pending</div>
                </div>
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, color: "#52c41a", display: "block", marginBottom: 8 }}>交互细节</Text>
              <ul style={{ fontSize: 13, margin: 0, paddingLeft: 20 }}>
                <li><Text strong>Case List</Text> - 主列表，支持搜索、筛选、分页；显示最近 365 天的 Case</li>
                <li><Text strong>Case Detail</Text> - 点击 Case 查看完整详情，包括发票图片、提取结果、Ground Truth</li>
                <li><Text strong>Golden Case Management</Text> - 管理黄金测试集，按 Step 分组展示，支持添加/移除 Golden 标记</li>
                <li><Text strong>Pattern Library</Text> - 管理 Case 的 Pattern 标签，用于分类和测试覆盖分析</li>
                <li><Text strong>Archived Cases</Text> - 查看已归档 Case，只读模式，支持搜索</li>
              </ul>
              <div style={{ marginTop: 12, padding: 10, background: "#fff7e6", borderRadius: 4, border: "1px solid #ffd591" }}>
                <Text strong style={{ fontSize: 11, color: "#fa8c16" }}>归档规则</Text>
                <ul style={{ fontSize: 11, margin: "4px 0 0", paddingLeft: 16 }}>
                  <li>reviewDate 超过 365 天自动归档</li>
                  <li>Golden Set 中的 Case 永久保留，不归档</li>
                  <li>AI_OPS 可手动触发 "Run Archive Now"</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Agent Management */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#722ed115", display: "flex", alignItems: "center", justifyContent: "center", color: "#722ed1" }}>
                <RobotOutlined />
              </div>
              <Title level={4} style={{ margin: 0 }}>Agent Management</Title>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 13, color: "#722ed1", display: "block", marginBottom: 8 }}>核心实体</Text>
              <div style={{ background: "#fafafa", padding: 12, borderRadius: 4, marginBottom: 12 }}>
                <Text strong style={{ fontSize: 12, display: "block", marginBottom: 8 }}>Agent</Text>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, fontSize: 11 }}>
                  <div><Text code>id</Text> - Agent 唯一标识 (AGT-XXX)</div>
                  <div><Text code>agentName</Text> - Agent 名称</div>
                  <div><Text code>flowId</Text> - 所属 Flow (Invoice Processing)</div>
                  <div><Text code>step</Text> - INVOICE_REVIEW / MATCH / AP_VOUCHER</div>
                  <div><Text code>currentVersion</Text> - 当前版本 (v1.3.0)</div>
                  <div><Text code>status</Text> - TESTING / ACTIVE / DEPRECATED</div>
                  <div><Text code>regions</Text> - 适用区域，空数组表示全区域</div>
                  <div><Text code>description</Text> - Agent 描述</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag color="orange">TESTING</Tag><Text style={{ fontSize: 11 }}>开发测试阶段</Text>
                <Tag color="green">ACTIVE</Tag><Text style={{ fontSize: 11 }}>生产运行中</Text>
                <Tag color="default">DEPRECATED</Tag><Text style={{ fontSize: 11 }}>已被新版本替代</Text>
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, color: "#722ed1", display: "block", marginBottom: 8 }}>交互细节</Text>
              <ul style={{ fontSize: 13, margin: 0, paddingLeft: 20 }}>
                <li><Text strong>Agent List</Text> - 列表展示所有 Agent，支持按 Region 筛选、搜索、状态过滤</li>
                <li><Text strong>Agent Detail (只读)</Text> - 左侧展示当前选中版本的配置 (Model、Temperature、Prompt 等)，全部只读</li>
                <li><Text strong>Version Management</Text> - 右侧展示版本列表 (Current/Testing/Deprecated)，点击切换左侧配置</li>
                <li><Text strong>Create New Version</Text> - 选择 Copy From 版本，输入新版本号，创建 TESTING 版本</li>
                <li><Text strong>Publish</Text> - 回归测试通过后，AI_OPS 可将 TESTING 版本发布为 ACTIVE</li>
              </ul>
              <div style={{ marginTop: 12, padding: 10, background: "#f6ffed", borderRadius: 4, border: "1px solid #b7eb8f" }}>
                <Text strong style={{ fontSize: 11, color: "#52c41a" }}>发布条件</Text>
                <ul style={{ fontSize: 11, margin: "4px 0 0", paddingLeft: 16 }}>
                  <li>Golden Set Pass Rate &ge; 85%</li>
                  <li>Benchmark Set Pass Rate &ge; 85%</li>
                  <li>Full Set Pass Rate &ge; 85%</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Regression Test */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#fa8c1615", display: "flex", alignItems: "center", justifyContent: "center", color: "#fa8c16" }}>
                <BranchesOutlined />
              </div>
              <Title level={4} style={{ margin: 0 }}>Regression Test</Title>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 13, color: "#fa8c16", display: "block", marginBottom: 8 }}>核心实体</Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { name: "Golden Set", desc: "黄金测试集，由 Golden Case Management 维护，高质量标注" },
                  { name: "Benchmark Set", desc: "基准测试集，用于性能基准比较" },
                  { name: "Full Set", desc: "全量测试集，完整覆盖所有 Pattern" },
                ].map((e) => (
                  <div key={e.name} style={{ padding: 10, background: "#fafafa", borderRadius: 4 }}>
                    <Text strong style={{ fontSize: 12, display: "block" }}>{e.name}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{e.desc}</Text>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Text strong style={{ fontSize: 13, color: "#fa8c16", display: "block", marginBottom: 8 }}>交互细节</Text>
              <ul style={{ fontSize: 13, margin: 0, paddingLeft: 20 }}>
                <li><Text strong>Agent 选择</Text> - 选择要测试的 TESTING 状态 Agent</li>
                <li><Text strong>Trigger Regression Test</Text> - 点击按钮启动测试，依次执行 Golden → Benchmark → Full</li>
                <li><Text strong>Progress Bar</Text> - 实时显示测试进度和当前执行的 Set</li>
                <li><Text strong>Verdict Banner</Text> - 所有 Set 通过 (&ge;85%) 显示 PASS (绿色)，否则 FAIL (红色)</li>
                <li><Text strong>Set Tabs</Text> - 切换查看每个 Set 的详细 Case-level 结果</li>
                <li><Text strong>从 Agent Detail 跳转</Text> - 点击 "Run Regression Test" 链接直接跳转</li>
              </ul>
              <div style={{ marginTop: 12, padding: 10, background: "#f0f5ff", borderRadius: 4, border: "1px solid #adc6ff" }}>
                <Text strong style={{ fontSize: 11, color: "#2f54eb" }}>测试流程</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <Tag color="gold">Golden Set</Tag>
                  <span style={{ color: "#bfbfbf" }}>→</span>
                  <Tag color="blue">Benchmark Set</Tag>
                  <span style={{ color: "#bfbfbf" }}>→</span>
                  <Tag color="purple">Full Set</Tag>
                  <span style={{ color: "#bfbfbf" }}>→</span>
                  <Tag color="green">PASS / Publish</Tag>
                </div>
              </div>
            </div>
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
