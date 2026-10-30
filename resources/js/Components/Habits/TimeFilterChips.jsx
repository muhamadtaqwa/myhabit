import React from 'react';
import { Clock, Moon, Sun, SunMedium } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TimeFilterChips({ activeFilter, onSelectFilter }) {
    const filters = [
        { id: 'all', label: 'Semua', icon: Clock },
        { id: 'morning', label: 'Pagi', icon: Sun },
        { id: 'afternoon', label: 'Siang', icon: SunMedium },
        { id: 'evening', label: 'Malam', icon: Moon },
    ];

    return (
        <div className="grid grid-cols-4 gap-1.5 w-full py-0.5">
            {filters.map((f) => {
                const IconComponent = f.icon;
                const isActive = activeFilter === f.id;
                return (
                    <button
                        key={f.id}
                        type="button"
                        onClick={() => onSelectFilter(f.id)}
                        className={cn(
                            'flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 active:scale-95 text-center',
                            isActive
                                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25 font-bold'
                                : 'bg-white dark:bg-[#131d36] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-sky-300'
                        )}
                    >
                        <IconComponent className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                        <span className="truncate">{f.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
