import { getTranslations } from 'next-intl/server';
import { TrendingDown, Gauge, BarChart3 } from 'lucide-react';

export async function PainPointCards() {
  const t = await getTranslations('painPoints');

  const painPoints = [
    { icon: TrendingDown, key: 'highCost' },
    { icon: Gauge, key: 'bottleneck' },
    { icon: BarChart3, key: 'slowIteration' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-14">
      {painPoints.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className="frosted-card p-5 rounded-3xl glass glass-hover cursor-default"
        >
          <Icon className="w-5 h-5 text-black mb-3" />
          <h4 className="font-bold text-sm mb-1 text-gray-900">{t(`${key}.title`)}</h4>
          <p className="text-xs text-gray-500">{t(`${key}.description`)}</p>
        </div>
      ))}
    </div>
  );
}
