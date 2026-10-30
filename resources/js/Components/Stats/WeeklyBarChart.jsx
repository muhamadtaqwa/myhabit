import React, { useState } from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeeklyBarChart({ data = [], average = 0 }) {
    const todayIndex = data.findIndex((d) => d.is_today);
    const [selectedIndex, setSelectedIndex] = useState(todayIndex >= 0 ? todayIndex : data.length - 1);

    const activeItem = data[selectedIndex] || data[data.length - 1] || null;

    return (
        <div className="px-3.5 py-3 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Grafik Konsistensi 7 Hari
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                            Persentase penyelesaian kebiasaan harian
                        </p>
                    </div>
                </div>

                {/* Average Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                    <span>Avg {average}%</span>
                </div>
            </div>

            {/* Active Selected Day Pill / Tooltip */}
            {activeItem && (
                <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between transition-all">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {activeItem.day_name}, {activeItem.day_number}
                        </span>
                        {activeItem.is_today && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                Hari Ini
                            </span>
                        )}
                    </div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <span className="font-extrabold text-sky-600 dark:text-sky-400">{activeItem.completed}</span> dari {activeItem.total} selesai ({activeItem.percentage}%)
                    </div>
                </div>
            )}

            {/* Visual Bar Chart */}
            <div className="relative pt-4 pb-1">
                {/* Horizontal reference lines */}
                <div className="absolute inset-x-0 top-4 bottom-7 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 flex justify-end">
                        <span className="text-[9px] font-medium text-slate-400 -mt-2 pr-1">100%</span>
                    </div>
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 flex justify-end">
                        <span className="text-[9px] font-medium text-slate-400 -mt-2 pr-1">50%</span>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-700 flex justify-end">
                        <span className="text-[9px] font-medium text-slate-400 -mt-2 pr-1">0%</span>
                    </div>
                </div>

                {/* 7 Vertical Bar Columns */}
                <div className="grid grid-cols-7 gap-2 h-36 items-end relative z-10 pr-6 pl-1">
                    {data.map((item, index) => {
                        const isSelected = selectedIndex === index;
                        const isToday = item.is_today;
                        const heightPercent = Math.max(item.percentage, item.percentage > 0 ? 8 : 4);

                        return (
                            <div
                                key={item.date}
                                onClick={() => setSelectedIndex(index)}
                                className="h-full flex flex-col items-center justify-end cursor-pointer group"
                            >
                                {/* Percentage label on top of bar when hovered or selected */}
                                <div className={cn(
                                    'text-[10px] font-bold mb-1 transition-opacity text-center',
                                    isSelected
                                        ? 'text-sky-600 dark:text-sky-400 opacity-100 scale-105'
                                        : 'text-slate-400 opacity-60 group-hover:opacity-100'
                                )}>
                                    {item.percentage}%
                                </div>

                                {/* Bar track and fill */}
                                <div className={cn(
                                    'w-full max-w-[28px] h-24 rounded-2xl p-1 flex flex-col justify-end transition-all relative overflow-hidden',
                                    isSelected
                                        ? 'bg-sky-100/70 dark:bg-sky-950/50 ring-2 ring-sky-500/50'
                                        : 'bg-slate-100 dark:bg-slate-800/70 group-hover:bg-slate-200/80 dark:group-hover:bg-slate-800'
                                )}>
                                    <div
                                        className={cn(
                                            'w-full rounded-xl transition-all duration-500 ease-out',
                                            isToday
                                                ? 'bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 shadow-sm shadow-sky-500/30'
                                                : item.percentage === 100
                                                    ? 'bg-emerald-500 dark:bg-emerald-400'
                                                    : 'bg-sky-500/85 dark:bg-sky-500'
                                        )}
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                </div>

                                {/* Day Label */}
                                <div className="mt-2 flex flex-col items-center">
                                    <span className={cn(
                                        'text-[10px] font-bold uppercase transition',
                                        isSelected
                                            ? 'text-sky-600 dark:text-sky-400'
                                            : isToday
                                                ? 'text-slate-900 dark:text-white font-extrabold'
                                                : 'text-slate-400 dark:text-slate-500'
                                    )}>
                                        {item.day_name}
                                    </span>
                                    {isToday && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-0.5" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
                <Info className="w-3 h-3" />
                <span>Ketuk pada salah satu batang hari untuk melihat detail.</span>
            </p>
        </div>
    );
}
