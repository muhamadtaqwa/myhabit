import React, { useState } from 'react';
import { AppLayout, useHabitDrawer } from '@/Layouts/AppLayout';
import { MobileHeader } from '@/Components/Navigation/MobileHeader';
import { HeroProgressCard } from '@/Components/Habits/HeroProgressCard';
import { DateStrip } from '@/Components/Habits/DateStrip';
import { TimeFilterChips } from '@/Components/Habits/TimeFilterChips';
import { HabitCard } from '@/Components/Habits/HabitCard';
import { CheckCircle2, Clock, ListFilter, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

function TodayContent({ habits = [], selectedDate, dateStrip = [], dailySummary }) {
    const [timeFilter, setTimeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'completed'
    const { openNewHabit, openEditHabit } = useHabitDrawer();

    const filteredByTime = habits.filter((h) => {
        if (timeFilter === 'all') return true;
        return h.time_of_day === timeFilter;
    });

    const pendingHabits = filteredByTime.filter((h) => !h.is_completed);
    const completedHabits = filteredByTime.filter((h) => h.is_completed);

    const totalPending = habits.filter((h) => !h.is_completed).length;
    const totalCompleted = habits.filter((h) => h.is_completed).length;

    return (
        <div className="flex-1 flex flex-col">
            {/* Top Greeting Header */}
            <MobileHeader />

            {/* Content Area */}
            <main className="flex-1 px-4 pt-1 pb-4 space-y-4">
                {/* Featured Hero Progress Card */}
                <HeroProgressCard selectedDate={selectedDate} dailySummary={dailySummary} />

                {/* 7-Day Date Strip */}
                <DateStrip dateStrip={dateStrip} selectedDate={selectedDate} />

                {/* Quick Glance: Harus Dikerjakan vs Sudah Selesai */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {/* Harus Dikerjakan Button */}
                    <button
                        type="button"
                        onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
                        className={cn(
                            'p-3.5 rounded-2xl border text-left transition-all active:scale-95 shadow-xs flex items-center justify-between',
                            statusFilter === 'pending'
                                ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/25 ring-2 ring-sky-300/30'
                                : 'bg-white dark:bg-[#131d36] text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:border-sky-300'
                        )}
                    >
                        <div>
                            <span className={cn('text-[10px] font-bold uppercase tracking-wider', statusFilter === 'pending' ? 'text-sky-100' : 'text-slate-400')}>
                                Harus Dikerjakan
                            </span>
                            <p className="text-xl font-black mt-0.5">
                                {totalPending} <span className="text-xs font-semibold font-normal opacity-80">habit</span>
                            </p>
                        </div>
                        <div className={cn(
                            'w-8 h-8 rounded-xl flex items-center justify-center',
                            statusFilter === 'pending' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        )}>
                            <Clock className="w-4 h-4 stroke-[2.4]" />
                        </div>
                    </button>

                    {/* Sudah Selesai Button */}
                    <button
                        type="button"
                        onClick={() => setStatusFilter(statusFilter === 'completed' ? 'all' : 'completed')}
                        className={cn(
                            'p-3.5 rounded-2xl border text-left transition-all active:scale-95 shadow-xs flex items-center justify-between',
                            statusFilter === 'completed'
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-300/30'
                                : 'bg-white dark:bg-[#131d36] text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800 hover:border-emerald-300'
                        )}
                    >
                        <div>
                            <span className={cn('text-[10px] font-bold uppercase tracking-wider', statusFilter === 'completed' ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400')}>
                                Sudah Selesai
                            </span>
                            <p className="text-xl font-black mt-0.5">
                                {totalCompleted} <span className="text-xs font-semibold font-normal opacity-80">habit</span>
                            </p>
                        </div>
                        <div className={cn(
                            'w-8 h-8 rounded-xl flex items-center justify-center',
                            statusFilter === 'completed' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500'
                        )}>
                            <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
                        </div>
                    </button>
                </div>

                {/* Time Filter Chips */}
                <TimeFilterChips activeFilter={timeFilter} onSelectFilter={setTimeFilter} />

                {/* Habits List */}
                {habits.length === 0 ? (
                    /* Completely Empty State */
                    <div className="py-14 px-6 text-center flex flex-col items-center justify-center bg-white dark:bg-[#131d36] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs mt-2">
                        <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center mb-4 shadow-xs">
                            <Sparkles className="w-8 h-8 stroke-[2]" />
                        </div>
                        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                            Belum Ada Kebiasaan
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
                            Mulai langkah kecil hari ini. Bangun konsistensi dengan menambahkan habit harian pertama Anda.
                        </p>
                        <button
                            type="button"
                            onClick={openNewHabit}
                            className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 active:scale-95 transition"
                        >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Tambah Kebiasaan Pertama</span>
                        </button>
                    </div>
                ) : (statusFilter === 'pending' && pendingHabits.length === 0) ? (
                    <div className="py-10 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-[#131d36] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 stroke-[2]" />
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Semua habit sudah tuntas dikerjakan!</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Tidak ada kebiasaan yang menunggu saat ini.</p>
                    </div>
                ) : (statusFilter === 'completed' && completedHabits.length === 0) ? (
                    <div className="py-10 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-[#131d36] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6">
                        <Clock className="w-8 h-8 text-sky-500 mx-auto mb-2 stroke-[2]" />
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Belum ada habit yang selesai dicentang hari ini.</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Ketuk kotak centang pada kebiasaan yang sudah Anda lakukan.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pt-1">
                        {/* 1. SECTION: HARUS DIKERJAKAN */}
                        {(statusFilter === 'all' || statusFilter === 'pending') && pendingHabits.length > 0 && (
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between px-1">
                                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-sky-500 stroke-[2.5]" />
                                        <span>Harus Dikerjakan ({pendingHabits.length})</span>
                                    </p>
                                </div>
                                <div className="space-y-2.5">
                                    {pendingHabits.map((habit) => (
                                        <HabitCard
                                            key={habit.id}
                                            habit={habit}
                                            selectedDate={selectedDate}
                                            onEdit={openEditHabit}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. SECTION: SUDAH SELESAI */}
                        {(statusFilter === 'all' || statusFilter === 'completed') && completedHabits.length > 0 && (
                            <div className="space-y-2.5 pt-2">
                                <div className="flex items-center justify-between px-1">
                                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>Sudah Selesai ({completedHabits.length})</span>
                                    </p>
                                </div>
                                <div className="space-y-2.5">
                                    {completedHabits.map((habit) => (
                                        <HabitCard
                                            key={habit.id}
                                            habit={habit}
                                            selectedDate={selectedDate}
                                            onEdit={openEditHabit}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default function Today(props) {
    return (
        <AppLayout title="Hari Ini" categories={props.categories}>
            <TodayContent {...props} />
        </AppLayout>
    );
}
