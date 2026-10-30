import React from 'react';
import { Link } from '@inertiajs/react';
import { BarChart3, CalendarCheck, CheckSquare, Plus, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav({ onOpenNewHabit }) {
    const isToday = route().current('today');
    const isTasks = route().current('tasks.*');
    const isStats = route().current('stats.index');
    const isManage = route().current('habits.manage');

    return (
        <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-[#0b132b]/95 backdrop-blur-xl border-t border-slate-200/70 dark:border-slate-800/80 px-3 py-2 shadow-2xl pb-safe md:hidden">
            <div className="flex items-center justify-between">
                {/* 1. Hari Ini */}
                <Link
                    href={route('today')}
                    className={cn(
                        'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95 flex-1',
                        isToday
                            ? 'text-sky-600 dark:text-sky-400 font-bold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    )}
                >
                    <CalendarCheck className={cn('w-5 h-5', isToday && 'stroke-[2.6]')} />
                    <span className="text-[10px] tracking-tight">Hari Ini</span>
                </Link>

                {/* 2. Tugas (Task) */}
                <Link
                    href={route('tasks.index')}
                    className={cn(
                        'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95 flex-1',
                        isTasks
                            ? 'text-sky-600 dark:text-sky-400 font-bold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    )}
                >
                    <CheckSquare className={cn('w-5 h-5', isTasks && 'stroke-[2.6]')} />
                    <span className="text-[10px] tracking-tight">Tugas</span>
                </Link>

                {/* 3. Central Elevated FAB */}
                <div className="flex items-center justify-center px-1 flex-1">
                    <button
                        type="button"
                        onClick={onOpenNewHabit}
                        aria-label="Tambah Kebiasaan Baru"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-400 text-white shadow-xl shadow-sky-500/35 hover:shadow-sky-500/50 active:scale-90 transition-all -mt-6 ring-4 ring-slate-50 dark:ring-[#0b132b]"
                    >
                        <Plus className="w-6 h-6 stroke-[2.8]" />
                    </button>
                </div>

                {/* 4. Statistik */}
                <Link
                    href={route('stats.index')}
                    className={cn(
                        'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95 flex-1',
                        isStats
                            ? 'text-sky-600 dark:text-sky-400 font-bold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    )}
                >
                    <BarChart3 className={cn('w-5 h-5', isStats && 'stroke-[2.6]')} />
                    <span className="text-[10px] tracking-tight">Statistik</span>
                </Link>

                {/* 5. Kelola */}
                <Link
                    href={route('habits.manage')}
                    className={cn(
                        'flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition active:scale-95 flex-1',
                        isManage
                            ? 'text-sky-600 dark:text-sky-400 font-bold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    )}
                >
                    <SlidersHorizontal className={cn('w-5 h-5', isManage && 'stroke-[2.6]')} />
                    <span className="text-[10px] tracking-tight">Kelola</span>
                </Link>
            </div>
        </nav>
    );
}
