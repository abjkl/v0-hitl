"use client"

import React, { useState, useEffect, useMemo } from "react"
import {
  Card, Button, Typography, Progress, Space, Tag, Spin, Empty,
  Badge, Tooltip,
} from "antd"
import {
  ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined,
  LoadingOutlined, ArrowRightOutlined,
} from "@ant-design/icons"
import {
  agentBRunOverviewData,
  type AgentBRunOverview, type AgentRunCardStatus, type AgentRunCard,
} from "@/lib/mock-data"

const { Text, Title, Paragraph } = Typography

interface AgentBRunOverviewProps {
  runId: string
  onBack: () => void
  onViewSuggestions: (runDetailId: string) => void
}

// ── Status Badge ───────────────────────────────────────────────

function StatusBadge({ status }: { status: AgentRunCardStatus }) {
  if (status === "Analyzing") {
    return (
      <Badge
        status="processing"
        text={<span style={{ fontSize: 13 }}>Analyzing…</span>}
      />
    )
  }
  if (status === "Completed") {
    return (
      <Badge
        status="success"
        text={<span style={{ fontSize: 13 }}>Completed</span>}
      />
    )
  }
  if (status === "Failed") {
    return (
      <Badge
        status="error"
        text={<span style={{ fontSize: 13 }}>Failed</span>}
      />
    )
  }
  return <Badge status="default" text={<span style={{ fontSize: 13 }}>{status}</span>} />
}

// ── Agent Run Card ────────────────────────────────────────────

function AgentProgressCard({
  card,
  onViewSuggestions,
}: {
  card: AgentRunCard
  onViewSuggestions: (runDetailId: string) => void
}) {
  const isAnalyzing = card.status === "Analyzing"
  const isCompleted = card.status === "Completed"
  const isFailed = card.status === "Failed"

  return (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
      }}
      styles={{ body: { padding: 16 } }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Left: Agent name + Step */}
        <div style={{ flex: 1 }}>
          <Text strong style={{ fontSize: 14, display: "block", marginBottom: 6 }}>
            {card.agentName}
          </Text>
          <Tag style={{ fontSize: 11 }}>{card.step}</Tag>
        </div>

        {/* Middle: Progress status */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ marginBottom: 6 }}>
            <StatusBadge status={card.status} />
          </div>
          <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
            {card.feedbackCount} feedback {card.feedbackCount === 1 ? "item" : "items"}
          </Text>
          {isCompleted && card.suggestionCount !== undefined && (
            <Text style={{ fontSize: 12, color: "#52c41a", fontWeight: 500 }}>
              {card.suggestionCount} suggestion{card.suggestionCount === 1 ? "" : "s"} generated
            </Text>
          )}
        </div>

        {/* Right: Action button */}
        <div style={{ flex: 0 }}>
          {isAnalyzing && (
            <Button disabled style={{ color: "#bfbfbf" }}>
              View Progress
            </Button>
          )}
          {isCompleted && (
            <Button
              type="primary"
              style={{ background: "#1677ff" }}
              onClick={() => onViewSuggestions(card.runDetailId)}
              icon={<ArrowRightOutlined />}
            >
              View Suggestions
            </Button>
          )}
          {isFailed && (
            <Button danger onClick={() => {}}>
              Retry
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

// ── Main Component ────────────────────────────────────────────

export function AgentBRunOverview({
  runId,
  onBack,
  onViewSuggestions,
}: AgentBRunOverviewProps) {
  const runData = agentBRunOverviewData[runId]
  const [agentCards, setAgentCards] = useState<AgentRunCard[]>(runData?.agentCards ?? [])
  const [overallStatus, setOverallStatus] = useState<"In Progress" | "Completed" | "Failed">(
    runData?.overallStatus ?? "In Progress"
  )

  // Auto-simulate Card 2 completion after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAgentCards((prev) =>
        prev.map((card, idx) =>
          idx === 1 && card.status === "Analyzing"
            ? { ...card, status: "Completed" as AgentRunCardStatus, suggestionCount: 1 }
            : card
        )
      )
      setOverallStatus("Completed")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!runData) {
    return (
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginBottom: 16 }}>
          Back to Feedback List
        </Button>
        <Empty description="Run not found" />
      </div>
    )
  }

  // Calculate completion percentage
  const completedCount = agentCards.filter((c) => c.status === "Completed").length
  const progressPercent = (completedCount / agentCards.length) * 100

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
          Back
        </Button>
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0 }}>
            Agent B Run #{runData.runId}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Triggered by {runData.triggeredBy} · {runData.triggeredAt} · {runData.feedbackCount}{" "}
            feedback items across {runData.agentCount} agents
          </Text>
        </div>
        <div>
          <Badge
            status={overallStatus === "Completed" ? "success" : "processing"}
            text={
              <span style={{ fontSize: 13, fontWeight: 500 }}>
                {overallStatus === "In Progress" ? "In Progress" : "Completed"}
              </span>
            }
          />
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card
        size="small"
        style={{ marginBottom: 20, border: "1px solid #f0f0f0", borderRadius: 8 }}
        styles={{ body: { padding: 16 } }}
      >
        <div style={{ marginBottom: 8 }}>
          <Text type="secondary" style={{ fontSize: 12, fontWeight: 500 }}>
            Overall Progress
          </Text>
        </div>
        <Progress
          percent={progressPercent}
          format={() => `${completedCount} / ${agentCards.length} agents completed`}
        />
      </Card>

      {/* Agent Progress Cards */}
      <div style={{ marginBottom: 16 }}>
        <Title level={5} style={{ marginBottom: 12 }}>
          Agent Status
        </Title>
        {agentCards.map((card, idx) => (
          <AgentProgressCard
            key={idx}
            card={card}
            onViewSuggestions={onViewSuggestions}
          />
        ))}
      </div>
    </div>
  )
}
