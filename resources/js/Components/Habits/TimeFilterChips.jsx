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
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {filters.map((f) => {
                const IconComponent = f.icon;
                const isActive = activeFilter === f.id;
                return (
                    <button
                        key={f.id}
                        type="button"
                        onClick={() => onSelectFilter(f.id)}
                        className={cn(
                            'flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95',
                            isActive
                                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                                : 'bg-white dark:bg-[#131d36] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-sky-300'
                        )}
                    >
                        <IconComponent className={cn('w-3.5 h-3.5', isActive ? 'text-white' : 'text-slate-400')} />
                        <span>{f.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
