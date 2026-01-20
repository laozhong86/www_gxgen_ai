'use client';

import { useState, useRef } from 'react';
import { Link2, Video, ImageIcon, Sparkles, ArrowRight, RotateCcw, Users } from 'lucide-react';
import { TikTokLogo, InstagramLogo, YouTubeLogo, FacebookLogo, TwitterLogo } from '@/components/icons/SocialLogos';

const outputItems = [
  { icon: Users, label: 'account', count: 100 },
  { icon: Video, label: 'video', count: 3000 },
  { icon: ImageIcon, label: 'image', count: 5000 },
];

// 示例链接配置
const exampleLinks = [
  { key: 'exampleEcommerce', url: 'https://www.amazon.com/dp/B09V3KXJPB' },
  { key: 'exampleSaas', url: 'https://linear.app/features' },
  { key: 'exampleBrand', url: 'https://www.tesla.com/cybertruck' },
];

type DemoSectionProps = {
  translations: {
    placeholder: string;
    generating: string;
    outputLabel: string;
    video: string;
    image: string;
    account: string;
    supportedLinks: string;
    tryExample: string;
    exampleEcommerce: string;
    exampleSaas: string;
    exampleBrand: string;
    startGenerating?: string;
    tryAnother?: string;
  };
};

export function DemoSection({ translations }: DemoSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setShowOutput(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowOutput(true);
    }, 2000);
  };

  // 点击示例链接：填充并自动生成
  const handleExampleClick = (url: string) => {
    setInputValue(url);
    setShowOutput(false);
    // 自动触发生成
    setTimeout(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowOutput(true);
      }, 1500);
    }, 300);
  };

  // 重置演示
  const handleReset = () => {
    setInputValue('');
    setShowOutput(false);
    setIsGenerating(false);
    inputRef.current?.focus();
  };


  return (
    <div className="pl-14">
      <div className="frosted-card p-6 rounded-[32px] glass overflow-hidden">
        {/* 输入区 */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (showOutput && !isGenerating) {
                  setShowOutput(false);
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder={translations.placeholder}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 border border-black/10 focus:border-black/30 focus:outline-none transition-colors text-sm text-gray-500 placeholder:text-gray-400"
            />
            {/* 支持的链接类型提示 */}
            {isFocused && !inputValue && (
              <div className="absolute left-0 right-0 top-full mt-2 px-4 py-2 bg-black/80 text-white text-xs rounded-xl animate-fade-in z-10">
                {translations.supportedLinks}
              </div>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputValue.trim()}
            className="px-6 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? translations.generating : 'Generate'}
          </button>
        </div>

        {/* 示例链接按钮 - Wayfinders（始终可见） */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-gray-500">{translations.tryExample}</span>
          {exampleLinks.map(({ key, url }) => (
            <button
              key={key}
              onClick={() => handleExampleClick(url)}
              disabled={isGenerating}
              className="px-3 py-1.5 text-xs bg-black/5 hover:bg-black/10 rounded-full transition-colors text-gray-700 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translations[key as keyof typeof translations]}
            </button>
          ))}
          {/* 重置按钮（在有内容时显示） */}
          {(inputValue || showOutput) && !isGenerating && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs bg-transparent hover:bg-black/5 rounded-full transition-colors text-gray-400 hover:text-gray-600 flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              {translations.tryAnother || '换一个'}
            </button>
          )}
        </div>

        {/* 生成动画 */}
        {isGenerating && (
          <div className="flex items-center justify-center py-8">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-black rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 输出展示 */}
        {showOutput && !isGenerating && (
          <div className="animate-fade-in">
            <p className="text-xs text-gray-500 mb-3">{translations.outputLabel}</p>
            
            {/* 社交媒体平台 Logo 展示 */}
            <div className="mb-6 flex items-center justify-center gap-8">
              <TikTokLogo className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-black" />
              <InstagramLogo className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-[#E4405F]" />
              <YouTubeLogo className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-[#FF0000]" />
              <FacebookLogo className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-[#1877F2]" />
              <TwitterLogo className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-[#1DA1F2]" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {outputItems.map(({ icon: Icon, label, count }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border border-black/5 text-center group hover:shadow-lg hover:border-black/10 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-black/10 transition-colors">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-black">{count}+</div>
                  <div className="text-xs text-gray-500">{translations[label as keyof typeof translations]}</div>
                </div>
              ))}
            </div>
            
            {/* CTA 按钮 - 引导用户下一步 */}
            <a
              href="https://app.gxgen.ai/register"
              className="mt-4 w-full py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-black transition-all flex items-center justify-center gap-2 group"
            >
              <span>{translations.startGenerating || '开始生成完整内容'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
