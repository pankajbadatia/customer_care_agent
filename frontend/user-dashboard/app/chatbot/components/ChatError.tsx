'use client';

interface ChatErrorProps {
  message: string;
}

export default function ChatError({ message }: ChatErrorProps) {
  return (
    <div
      style={{
        marginTop: '0.75rem',
        padding: '0.5rem 0.75rem',
        borderRadius: 6,
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#b91c1c',
        fontSize: 13,
      }}
    >
      {message}
    </div>
  );
}
