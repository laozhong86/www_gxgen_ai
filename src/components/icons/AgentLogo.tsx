'use client';

interface AgentLogoProps {
  className?: string;
}

export function AgentLogo({ className = 'w-5 h-5' }: AgentLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="geometricPrecision"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* 白色圆形 */}
      <circle 
        cx="50" 
        cy="50" 
        r="49" 
        fill="white" 
        stroke="white" 
        strokeWidth="1"
      />
      {/* 黑色细长椭圆（眼睛） */}
      <ellipse 
        cx="50" 
        cy="52" 
        rx="35" 
        ry="6" 
        fill="black"
      />
    </svg>
  );
}
