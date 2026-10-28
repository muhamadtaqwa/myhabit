import React from 'react';
import { PieChart, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CategoryDonutChart({ categories = [], totalHabits = 0 }) {
    if (!categories || categories.length === 0 || totalHabits === 0) {
        return null;
    }

    const size = 120;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercentage = 0;

    return (
        <div className="p-4 rounded-3xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
                        <PieChart className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Distribusi Kategori
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                            Komposisi kebiasaan harian Anda
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{categories.length} Kategori</span>
                </div>
            </div>

            {/* Donut and Legend Layout */}
            <div className="flex items-center gap-5 pt-2">
                {/* SVG Donut Chart */}
                <div className="relative flex-shrink-0 flex items-center justify-center">
                    <svg width={size} height={size} className="transform -rotate-90">
                        {/* Background Ring */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            className="text-slate-100 dark:text-slate-800"
                        />

                        {/* Category Segments */}
                        {categories.map((cat, idx) => {
                            const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
                            accumulatedPercentage += cat.percentage;

                            return (
                                <circle
                                    key={idx}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="transparent"
                                    stroke={cat.color || '#0284c7'}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-700 ease-out"
                                />
                            );
                        })}
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                            {totalHabits}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                            Habit
                        </span>
                    </div>
                </div>

                {/* Legend List */}
                <div className="flex-1 space-y-2">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: cat.color || '#0284c7' }}
                                />
                                <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                                    {cat.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0 text-slate-500 font-medium">
                                <span className="font-bold text-slate-900 dark:text-white">{cat.count}</span>
                                <span className="text-[10px] text-slate-400">({cat.percentage}%)</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
