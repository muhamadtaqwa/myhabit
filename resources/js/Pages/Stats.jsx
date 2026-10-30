import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { HabitIcon } from '@/lib/icons';
import { StreakBadge } from '@/Components/Habits/StreakBadge';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { WeeklyBarChart } from '@/Components/Stats/WeeklyBarChart';
import { TimeDistributionChart } from '@/Components/Stats/TimeDistributionChart';
import { Award, BarChart3, CheckCircle, CheckSquare, Clock, Flame, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatsHeader() {
    return (
        <header className="px-5 pt-6 pb-4 md:px-0 md:pt-2 md:pb-4 bg-white/80 dark:bg-[#0b132b]/80 md:bg-transparent md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-slate-200/80 dark:border-slate-800/80 md:border-b-0 sticky md:static top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                        <BarChart3 className="w-5 h-5 stroke-[2.4]" />
                    </div>
                    <div>
                        <h1 className="text-base md:text-xl font-extrabold md:font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                            Statistik & Progres
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Pantau konsistensi dan grafik kebiasaan Anda.
                        </p>
                    </div>
                </div>

                <div className="md:hidden">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />
                </div>
            </div>
        </header>
    );
}

export default function Stats({
    weeklyMatrix = [],
    habits = [],
    timeDistribution = [],
    metrics = {},
}) {
    return (
        <AppLayout title="Statistik">
            <StatsHeader />

            <main className="flex-1 px-4 py-4 md:px-0 space-y-4">
                {/* 4 Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3.5">
                    {/* Active Habits */}
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Habit Aktif
                            </span>
                            <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center">
                                <Target className="w-4 h-4 stroke-[2.2]" />
                            </div>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">
                            {metrics.total_habits || 0}
                        </p>
                    </div>

                    {/* Best Current Streak */}
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Streak Tertinggi
                            </span>
                            <div className="w-7 h-7 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                                <Flame className="w-4 h-4 stroke-[2.2]" />
                            </div>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                            <span>{metrics.best_current_streak || 0}</span>
                            <span className="text-xs font-semibold text-slate-400">hari</span>
                        </p>
                    </div>

                    {/* Longest All Time */}
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Rekor Terpanjang
                            </span>
                            <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center">
                                <Award className="w-4 h-4 stroke-[2.2]" />
                            </div>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                            <span>{metrics.best_all_time_streak || 0}</span>
                            <span className="text-xs font-semibold text-slate-400">hari</span>
                        </p>
                    </div>

                    {/* Consistency 30 Days */}
                    <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                30 Hari Terakhir
                            </span>
                            <div className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 stroke-[2.2]" />
                            </div>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">
                            {metrics.overall_rate_30 || 0}%
                        </p>
                    </div>
                </div>

                {/* CHARTS ROW (Side-by-side on Desktop) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 md:gap-4">
                    {/* 1. VISUAL INTERACTIVE BAR CHART */}
                    <WeeklyBarChart data={weeklyMatrix} average={metrics.weekly_average || 0} />

                    {/* 2. TIME DISTRIBUTION CHART */}
                    <TimeDistributionChart
                        distribution={timeDistribution}
                        totalHabits={metrics.total_habits || 0}
                    />
                </div>

                {/* 3. TASK COMPLETION SNAPSHOT */}
                {metrics.tasks_total > 0 && (
                    <div className="px-3.5 py-3 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-500 flex items-center justify-center">
                                    <CheckSquare className="w-4 h-4 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                        Progres Tugas (To-Do)
                                    </h2>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                        Status penyelesaian daftar tugas Anda
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-black text-violet-600 dark:text-violet-400">
                                {metrics.tasks_rate}%
                            </span>
                        </div>

                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${metrics.tasks_rate}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                            <span>Selesai: <strong className="text-slate-800 dark:text-slate-200">{metrics.tasks_completed}</strong> tugas</span>
                            <span>Tertunda: <strong className="text-slate-800 dark:text-slate-200">{metrics.tasks_total - metrics.tasks_completed}</strong> tugas</span>
                        </div>
                    </div>
                )}

                {/* 4. DETAIL TIAP KEBIASAAN */}
                <div className="space-y-2.5 pt-0.5">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider px-1">
                        Detail Tiap Kebiasaan ({habits.length})
                    </h2>

                    {habits.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-6">
                            Belum ada habit aktif untuk ditampilkan.
                        </p>
                    ) : (
                        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                            {habits.map((habit) => (
                                <div
                                    key={habit.id}
                                    className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div
                                                className="w-9.5 h-9.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
                                                style={{
                                                    backgroundColor: `${habit.color || '#0284c7'}18`,
                                                    color: habit.color || '#0284c7',
                                                }}
                                            >
                                                <HabitIcon name={habit.icon} className="w-4.5 h-4.5 stroke-[2.2]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                    {habit.title}
                                                </p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 capitalize">
                                                    {habit.time_of_day === 'morning' ? 'Pagi' : habit.time_of_day === 'afternoon' ? 'Siang' : habit.time_of_day === 'evening' ? 'Malam' : 'Kapan Saja'}
                                                </p>
                                            </div>
                                        </div>

                                        <StreakBadge streak={habit.current_streak} />
                                    </div>

                                    {/* Progress info */}
                                    <div className="space-y-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/60">
                                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                                            <span>Konsistensi 30 Hari</span>
                                            <span className="text-slate-800 dark:text-slate-200">
                                                {habit.completed_last_30}/30 hari ({habit.success_rate_30}%)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full transition-all duration-500"
                                                style={{ width: `${habit.success_rate_30}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-0.5">
                                            <span>Rekor: {habit.longest_streak} hari berturut-turut</span>
                                            <span>Total Selesai: {habit.total_completions}x</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
