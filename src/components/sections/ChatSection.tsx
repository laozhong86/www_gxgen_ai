import { getTranslations } from 'next-intl/server';
import { MessageBubble } from './chat/MessageBubble';
import { PainPointCards } from './chat/PainPointCards';
import { SolutionCards } from './chat/SolutionCards';
import { CapabilityCards } from './chat/CapabilityCards';
import { AudienceCards } from './chat/AudienceCards';
import { CTASteps } from './chat/CTASteps';
import { AnimatedEntry } from '@/components/ui/AnimatedEntry';
import { DemoSection } from './chat/DemoSection';
import { SocialProofSection } from './chat/SocialProofSection';

export async function ChatSection() {
  const t = await getTranslations();

  // DemoSection 需要的翻译（客户端组件）
  const demoTranslations = {
    placeholder: t('demo.placeholder'),
    generating: t('demo.generating'),
    outputLabel: t('demo.outputLabel'),
    video: t('demo.video'),
    image: t('demo.image'),
    copy: t('demo.copy'),
    supportedLinks: t('demo.supportedLinks'),
    tryExample: t('demo.tryExample'),
    exampleEcommerce: t('demo.exampleEcommerce'),
    exampleCrossBorder: t('demo.exampleCrossBorder'),
    exampleBrand: t('demo.exampleBrand'),
  };

  return (
    <main className="chat-container min-h-screen rounded-t-[60px] md:rounded-t-[80px] pt-20 pb-40 shadow-[0_-40px_100px_rgba(0,0,0,0.3)] bg-gradient-to-b from-gray-50 via-white to-gray-50 relative z-20">
      <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
        {/* 痛点介绍 */}
        <MessageBubble delay={0}>
          <p className="text-gray-800 leading-relaxed font-medium">
            {t('painPoints.greeting')}
          </p>
        </MessageBubble>
        <AnimatedEntry delay={0.2}>
          <PainPointCards />
        </AnimatedEntry>

        {/* 功能演示（新增） */}
        <MessageBubble delay={1.2}>
          <p className="text-gray-800 leading-relaxed">{t('demo.intro')}</p>
        </MessageBubble>
        <AnimatedEntry delay={1.4}>
          <DemoSection translations={demoTranslations} />
        </AnimatedEntry>

        {/* 解决方案 */}
        <MessageBubble delay={2.4}>
          <p className="text-gray-800 leading-relaxed">
            {t('solution.intro')} <strong className="font-bold text-black">{t('solution.highlight')}</strong> {t('solution.suffix')}
          </p>
        </MessageBubble>
        <AnimatedEntry delay={2.6}>
          <SolutionCards />
        </AnimatedEntry>

        {/* 核心能力 */}
        <MessageBubble delay={3.4}>
          <p className="text-gray-800 leading-relaxed">{t('capabilities.intro')}</p>
        </MessageBubble>
        <AnimatedEntry delay={3.6}>
          <CapabilityCards />
        </AnimatedEntry>

        {/* 数据证明（新增） */}
        <MessageBubble delay={4.6}>
          <p className="text-gray-800 leading-relaxed">{t('socialProof.intro')}</p>
        </MessageBubble>
        <AnimatedEntry delay={4.8}>
          <SocialProofSection />
        </AnimatedEntry>

        {/* 目标受众 */}
        <MessageBubble delay={5.6}>
          <p className="text-gray-800">{t('targetAudience.intro')}</p>
        </MessageBubble>
        <AnimatedEntry delay={5.8}>
          <AudienceCards />
        </AnimatedEntry>

        {/* CTA */}
        <MessageBubble delay={6.6}>
          <p className="text-gray-800 font-medium">{t('cta.ready')}</p>
        </MessageBubble>
        <AnimatedEntry delay={6.8}>
          <CTASteps />
        </AnimatedEntry>

        {/* 输入中状态 */}
        <MessageBubble delay={7.8} showTyping />
      </div>
    </main>
  );
}
