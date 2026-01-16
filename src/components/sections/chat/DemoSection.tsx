'use client';

import { useState, useEffect } from 'react';
import { Link2, Video, ImageIcon, FileText, Sparkles } from 'lucide-react';

const outputItems = [
  { icon: Video, label: 'video', count: 12 },
  { icon: ImageIcon, label: 'image', count: 36 },
  { icon: FileText, label: 'copy', count: 48 },
];

// 示例链接配置
const exampleLinks = [
  { key: 'exampleEcommerce', url: 'https://www.amazon.com/dp/B09V3KXJPB' },
  { key: 'exampleCrossBorder', url: 'https://detail.tmall.com/item.htm?id=123456' },
  { key: 'exampleBrand', url: 'https://www.shopify.com/store/product-demo' },
];

type DemoSectionProps = {
  translations: {
    placeholder: string;
    generating: string;
    outputLabel: string;
    video: string;
    image: string;
    copy: string;
    supportedLinks: string;
    tryExample: string;
    exampleEcommerce: string;
    exampleCrossBorder: string;
    exampleBrand: string;
  };
};

export function DemoSection({ translations }: DemoSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleGenerate = () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setShowOutput(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowOutput(true);
    }, 2000);
  };

  // 点击示例链接
  const handleExampleClick = (url: string) => {
    setInputValue(url);
    setShowOutput(false);
  };

  // 自动演示
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValue('https://example.com/product');
      setTimeout(() => {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setShowOutput(true);
        }, 2000);
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pl-14">
      <div className="frosted-card p-6 rounded-[32px] glass overflow-hidden">
        {/* 输入区 */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1 relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={translations.placeholder}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/80 border border-black/10 focus:border-black/30 focus:outline-none transition-colors text-sm"
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
            disabled={isGenerating}
            className="px-6 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? translations.generating : 'Generate'}
          </button>
        </div>

        {/* 示例链接按钮 - Wayfinders */}
        {!showOutput && !isGenerating && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-gray-500">{translations.tryExample}</span>
            {exampleLinks.map(({ key, url }) => (
              <button
                key={key}
                onClick={() => handleExampleClick(url)}
                className="px-3 py-1.5 text-xs bg-black/5 hover:bg-black/10 rounded-full transition-colors text-gray-700 hover:text-black"
              >
                {translations[key as keyof typeof translations]}
              </button>
            ))}
          </div>
        )}

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
        {showOutput && (
          <div className="animate-fade-in">
            <p className="text-xs text-gray-500 mb-3">{translations.outputLabel}</p>
            <div className="grid grid-cols-3 gap-3">
              {outputItems.map(({ icon: Icon, label, count }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl border border-black/5 text-center group hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-black/10 transition-colors">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-black">{count}+</div>
                  <div className="text-xs text-gray-500">{translations[label as keyof typeof translations]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
