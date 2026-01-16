import { getTranslations } from 'next-intl/server';
import { Rocket, Store, Users, Building2 } from 'lucide-react';

export async function AudienceCards() {
  const t = await getTranslations('targetAudience');

  const audiences = [
    { icon: Rocket, key: 'overseas' },
    { icon: Store, key: 'ecommerce' },
    { icon: Users, key: 'mcn' },
    { icon: Building2, key: 'brand' },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4 pl-14">
      {audiences.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className="frosted-card p-5 rounded-3xl flex items-center gap-4 glass glass-hover"
        >
          <Icon className="w-5 h-5 text-black" />
          <span className="font-bold text-sm text-gray-900">{t(key)}</span>
        </div>
      ))}
    </div>
  );
}
