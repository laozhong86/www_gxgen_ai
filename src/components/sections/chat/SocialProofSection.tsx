import { getTranslations } from 'next-intl/server';
import { TrendingUp, Zap, DollarSign } from 'lucide-react';

export async function SocialProofSection() {
  const t = await getTranslations('socialProof');

  const stats = [
    { icon: TrendingUp, key: 'views', value: '312%', color: 'from-green-500/20 to-green-500/5' },
    { icon: Zap, key: 'efficiency', value: '20x', color: 'from-blue-500/20 to-blue-500/5' },
    { icon: DollarSign, key: 'cost', value: '-65%', color: 'from-purple-500/20 to-purple-500/5' },
  ] as const;

  return (
    <div className="pl-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, key, value, color }) => (
          <div
            key={key}
            className={`frosted-card p-6 rounded-3xl glass glass-hover bg-gradient-to-br ${color}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5 text-black" />
              </div>
              <span className="text-3xl font-black text-black">{value}</span>
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">{t(`${key}.title`)}</h4>
            <p className="text-xs text-gray-500">{t(`${key}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
