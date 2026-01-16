import { getTranslations } from 'next-intl/server';

export async function SolutionCards() {
  const t = await getTranslations('solution');

  const solutions = [
    { key: 'understandProduct' },
    { key: 'selfIterate' },
    { key: 'scalable' },
    { key: 'visible' },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-14">
      {solutions.map(({ key }) => (
        <div
          key={key}
          className="frosted-card p-4 rounded-2xl text-center border-black/10 glass glass-hover"
        >
          <div className="text-black font-bold mb-1 text-sm">{t(`${key}.title`)}</div>
          <div className="text-[10px] text-gray-500 leading-tight">{t(`${key}.description`)}</div>
        </div>
      ))}
    </div>
  );
}
