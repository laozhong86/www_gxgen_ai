'use client';

import type { ReactNode } from 'react';

interface AnimatedEntryProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * 轻量级动画入场容器
 * 仅负责 CSS 动画，内容可以是 RSC
 */
export function AnimatedEntry({ children, delay = 0, className = '' }: AnimatedEntryProps) {
  return (
    <div
      className={`opacity-0 animate-[slideUp_0.6s_ease-out_forwards] ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
