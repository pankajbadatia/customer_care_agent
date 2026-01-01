'use client';
import { UserShell } from "../user-shell";

import ChatWindow from './components/ChatWindow';

export default function ChatbotPage() {
  return (
    <UserShell>
      <div
        style={{
          height: '100%',
          minHeight: 'calc(100vh - 64px)', // accounts for header in UserShell
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <ChatWindow />
    </div>
    </UserShell>
  );
}
