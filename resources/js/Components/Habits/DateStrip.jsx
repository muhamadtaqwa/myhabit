import React from 'react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function DateStrip({ dateStrip = [], selectedDate }) {
    const handleSelectDate = (date) => {
        if (date === selectedDate) return;
        router.get(
            route('today'),
            { date },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
            {dateStrip.map((item) => {
                const isSelected = item.date === selectedDate;
                const isCompletedAll = item.total > 0 && item.completed === item.total;
                const hasPartial = item.completed > 0 && !isCompletedAll;

                return (
                    <button
                        key={item.date}
                        type="button"
                        onClick={() => handleSelectDate(item.date)}
                        className={cn(
                            'flex flex-col items-center justify-center flex-1 min-w-[48px] py-2.5 rounded-2xl transition-all duration-200 active:scale-95 text-center',
                            isSelected
                                ? 'bg-gradient-to-b from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/20 scale-[1.03]'
                                : 'bg-white dark:bg-[#131d36] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-sky-300'
                        )}
                    >
                        {/* Day name */}
                        <span
                            className={cn(
                                'text-[10px] uppercase font-bold tracking-wider',
                                isSelected
                                    ? 'text-sky-100'
                                    : 'text-slate-400 dark:text-slate-500'
                            )}
                        >
                            {item.day_name}
                        </span>

                        {/* Day number */}
                        <span
                            className={cn(
                                'text-sm font-extrabold my-1',
                                isSelected
                                    ? 'text-white'
                                    : item.is_today
                                    ? 'text-sky-600 dark:text-sky-400'
                                    : 'text-slate-800 dark:text-slate-200'
                            )}
                        >
                            {item.day_number}
                        </span>

                        {/* Status indicator dot */}
                        <div className="h-1.5 flex items-center justify-center">
                            {isCompletedAll ? (
                                <span
                                    className={cn(
                                        'w-1.5 h-1.5 rounded-full bg-emerald-400',
                                        isSelected && 'ring-2 ring-white/60'
                                    )}
                                />
                            ) : hasPartial ? (
                                <span
                                    className={cn(
                                        'w-1.5 h-1.5 rounded-full bg-amber-400',
                                        isSelected && 'ring-2 ring-white/60'
                                    )}
                                />
                            ) : (
                                <span
                                    className={cn(
                                        'w-1 h-1 rounded-full',
                                        isSelected ? 'bg-white/40' : 'bg-slate-200 dark:bg-slate-700'
                                    )}
                                />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
