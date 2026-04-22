'use client';

import { businessCategories } from '@/data/businesses';

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryChips({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2">
      <Chip label="All" icon="✨" active={active === 'all'} onClick={() => onChange('all')} />
      {businessCategories.map((cat) => (
        <Chip
          key={cat.id}
          label={cat.label.split(' ')[0]}
          icon={cat.icon}
          active={active === cat.id}
          onClick={() => onChange(cat.id)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-[13px] font-semibold transition-all active:scale-95 ${
        active
          ? 'text-white shadow-lg'
          : 'glass-surface text-white/80 hover:text-white'
      }`}
      style={active ? { background: 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%)' } : undefined}
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
