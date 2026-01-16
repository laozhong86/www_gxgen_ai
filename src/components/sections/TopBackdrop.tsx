"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export function TopBackdrop({ children }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);

  // 使用 RAF 节流的鼠标移动处理，直接操作 DOM，避免 React 重渲染
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || !maskRef.current || !isHoveringRef.current) return;
    
    // 取消上一个 RAF，避免累积
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 使用 RAF 更新 CSS 变量
    rafRef.current = requestAnimationFrame(() => {
      if (maskRef.current) {
        maskRef.current.style.setProperty('--mask-x', `${x}px`);
        maskRef.current.style.setProperty('--mask-y', `${y}px`);
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (maskRef.current) {
      maskRef.current.dataset.hovering = 'true';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (maskRef.current) {
      maskRef.current.dataset.hovering = 'false';
    }
  }, []);

  // 清理 RAF
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-screen"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 底层背景图 */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      {/* 黑色遮罩层 + 鼠标跟随圆形透明区域 - 使用 CSS 变量实现 */}
      <div
        ref={maskRef}
        data-hovering="false"
        className="absolute inset-0 bg-black/60 backdrop-blur-xl will-change-[mask-image] 
          [--mask-x:0px] [--mask-y:0px]
          data-[hovering=true]:[mask-image:radial-gradient(circle_240px_at_var(--mask-x)_var(--mask-y),transparent_0%,black_100%)]
          data-[hovering=true]:[-webkit-mask-image:radial-gradient(circle_240px_at_var(--mask-x)_var(--mask-y),transparent_0%,black_100%)]"
        aria-hidden
      />

      {/* 内容置于最上层 */}
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </section>
  );
}
