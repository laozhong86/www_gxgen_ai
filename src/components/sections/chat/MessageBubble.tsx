'use client';

import { AgentLogo } from '@/components/icons/AgentLogo';

interface MessageBubbleProps {
  children?: React.ReactNode;
  delay?: number;
  showTyping?: boolean;
}

export function MessageBubble({ children, delay = 0, showTyping }: MessageBubbleProps) {
  return (
    <div
      className="flex gap-4 message-entry opacity-0 animate-[slideUp_0.6s_ease-out_forwards]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="ai-avatar w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <AgentLogo className="w-9 h-9" />
      </div>
      {showTyping ? (
        <div className="frosted-card px-4 py-3 rounded-2xl rounded-tl-none flex items-center glass">
          <div className="typing-indicator flex items-center h-4 gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }} />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }} />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      ) : (
        <div className="frosted-card p-6 rounded-2xl rounded-tl-none inline-block max-w-lg glass text-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}
