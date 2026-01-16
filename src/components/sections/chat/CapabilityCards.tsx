import { getTranslations } from 'next-intl/server';
import { Cpu, Network, LineChart } from 'lucide-react';

export async function CapabilityCards() {
  const t = await getTranslations('capabilities');

  const capabilities = [
    { icon: Cpu, key: 'aiEngine', gradient: 'from-violet-500/10 to-violet-500/5' },
    { icon: Network, key: 'matrixWorkflow', gradient: 'from-blue-500/10 to-blue-500/5' },
    { icon: LineChart, key: 'dataOptimization', gradient: 'from-emerald-500/10 to-emerald-500/5' },
  ] as const;

  return (
    <div className="space-y-4 pl-14">
      {capabilities.map(({ icon: Icon, key, gradient }) => (
        <div
          key={key}
          className={`frosted-card p-6 rounded-[32px] flex items-center gap-6 group glass glass-hover bg-gradient-to-br ${gradient}`}
        >
          <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
            <Icon className="w-8 h-8 text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-lg font-bold text-gray-900">{t(`${key}.title`)}</h4>
              <span className="text-xs px-2 py-0.5 bg-black/5 rounded-full text-gray-600">{t(`${key}.subtitle`)}</span>
            </div>
            <p className="text-sm text-gray-500">{t(`${key}.description`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
