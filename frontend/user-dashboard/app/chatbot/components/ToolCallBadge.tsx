'use client';

interface ToolCallBadgeProps {
  toolName: string;
}

export default function ToolCallBadge({ toolName }: ToolCallBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        marginTop: '0.25rem',
        padding: '0.15rem 0.4rem',
        fontSize: 11,
        borderRadius: 4,
        backgroundColor: '#e0f2fe',
        color: '#0369a1',
        border: '1px solid #bae6fd',
        fontWeight: 500,
      }}
      title={`Tool used: ${toolName}`}
    >
      🔧 {toolName}
    </span>
  );
}
