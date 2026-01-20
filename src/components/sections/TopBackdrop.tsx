type Props = {
  children: React.ReactNode;
};

// 内联脚本：在 HTML 解析时立即执行，不依赖 React hydration
const inlineScript = `
(function() {
  var container = document.getElementById('hero-backdrop');
  var mask = document.getElementById('hero-mask');
  if (!container || !mask) return;
  
  var isHovering = false;
  var rafId = 0;
  
  container.addEventListener('mouseenter', function() {
    isHovering = true;
    mask.dataset.hovering = 'true';
  });
  
  container.addEventListener('mouseleave', function() {
    isHovering = false;
    mask.dataset.hovering = 'false';
  });
  
  container.addEventListener('mousemove', function(e) {
    if (!isHovering) return;
    if (rafId) cancelAnimationFrame(rafId);
    
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    rafId = requestAnimationFrame(function() {
      mask.style.setProperty('--mask-x', x + 'px');
      mask.style.setProperty('--mask-y', y + 'px');
    });
  });
})();
`;

export function TopBackdrop({ children }: Props) {
  return (
    <section
      id="hero-backdrop"
      className="relative overflow-hidden min-h-screen"
    >
      {/* 底层背景：CSS 即时显示 + 图片异步加载 */}
      <div 
        className="absolute inset-0 bg-[#0a1015] bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-bg.webp)' }}
        aria-hidden="true"
      />
      
      {/* 黑色遮罩层 + 鼠标跟随圆形透明区域 */}
      <div
        id="hero-mask"
        data-hovering="false"
        className="absolute inset-0 bg-black/60 backdrop-blur-xl will-change-[mask-image] 
          [--mask-x:0px] [--mask-y:0px]
          data-[hovering=true]:[mask-image:radial-gradient(circle_240px_at_var(--mask-x)_var(--mask-y),transparent_0%,black_100%)]
          data-[hovering=true]:[-webkit-mask-image:radial-gradient(circle_240px_at_var(--mask-x)_var(--mask-y),transparent_0%,black_100%)]"
        aria-hidden
        suppressHydrationWarning
      />

      {/* 内容置于最上层 */}
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
      
      {/* 内联脚本：HTML 解析后立即执行 */}
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
    </section>
  );
}
