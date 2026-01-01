import React from 'react';

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </section>
  );
}
