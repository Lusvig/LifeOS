import { Home, Zap, DollarSign, MoreVertical } from 'lucide-react';

interface TitleBarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function TitleBar({
  currentPage,
  setCurrentPage,
}: TitleBarProps): JSX.Element {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'zen', label: 'Zen', icon: Zap },
    { id: 'finance', label: 'Finance', icon: DollarSign },
  ];

  return (
    <div
      className="glass-panel h-16 border-b border-white/10 rounded-none flex items-center px-6 drag"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div className="flex items-center gap-8 h-full">
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LifeOS
        </div>

        <div className="flex gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentPage(id)}
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
