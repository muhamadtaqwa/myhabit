import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppLayout, useHabitDrawer } from '@/Layouts/AppLayout';
import { HabitIcon } from '@/lib/icons';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import {
    Archive,
    ArchiveRestore,
    Clock,
    Moon,
    Pencil,
    Plus,
    SlidersHorizontal,
    Sun,
    SunMedium,
    Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ManageHeader({ onOpenNewHabit }) {
    return (
        <header className="px-5 pt-6 pb-4 bg-white/80 dark:bg-[#0b132b]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                        <SlidersHorizontal className="w-5 h-5 stroke-[2.4]" />
                    </div>
                    <div>
                        <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Kelola Habit
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Atur, ubah, atau arsipkan kebiasaan Anda.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />

                    <button
                        type="button"
                        onClick={onOpenNewHabit}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25 active:scale-95 transition"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Baru</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

function ManageContent({ habits = [] }) {
    const [tab, setTab] = useState('active');
    const { openNewHabit, openEditHabit } = useHabitDrawer();

    const activeHabits = habits.filter((h) => !h.is_archived);
    const archivedHabits = habits.filter((h) => h.is_archived);

    const displayedHabits = tab === 'active' ? activeHabits : archivedHabits;

    const handleArchiveToggle = (habit) => {
        router.post(
            route('habits.archive', habit.id),
            {},
            { preserveScroll: true }
        );
    };

    const handleDelete = (habit) => {
        if (confirm(`Yakin ingin menghapus permanen habit "${habit.title}"?`)) {
            router.delete(
                route('habits.destroy', habit.id),
                { preserveScroll: true }
            );
        }
    };

    const timeLabels = {
        morning: { label: 'Pagi', icon: Sun },
        afternoon: { label: 'Siang', icon: SunMedium },
        evening: { label: 'Malam', icon: Moon },
        anytime: { label: 'Kapan Saja', icon: Clock },
    };

    return (
        <div className="flex-1 flex flex-col">
            <ManageHeader onOpenNewHabit={openNewHabit} />

            <main className="flex-1 px-4 py-4 space-y-4">
                {/* Tabs: Aktif / Diarsipkan */}
                <div className="flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-[#131d36]">
                    <button
                        type="button"
                        onClick={() => setTab('active')}
                        className={cn(
                            'flex-1 py-2 text-xs font-bold rounded-xl transition',
                            tab === 'active'
                                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        )}
                    >
                        Aktif ({activeHabits.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('archived')}
                        className={cn(
                            'flex-1 py-2 text-xs font-bold rounded-xl transition',
                            tab === 'archived'
                                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        )}
                    >
                        Diarsipkan ({archivedHabits.length})
                    </button>
                </div>

                {/* Habit List */}
                {displayedHabits.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 bg-white dark:bg-[#131d36] rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
                        <p className="text-xs font-semibold">
                            {tab === 'active'
                                ? 'Belum ada habit aktif.'
                                : 'Tidak ada habit yang diarsipkan.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {displayedHabits.map((habit) => {
                            const timeInfo = timeLabels[habit.time_of_day] || timeLabels.anytime;
                            const TimeIcon = timeInfo.icon;

                            return (
                                <div
                                    key={habit.id}
                                    className="p-4 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between"
                                >
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                                        <div
                                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                                            style={{
                                                backgroundColor: `${habit.color || '#0284c7'}18`,
                                                color: habit.color || '#0284c7',
                                            }}
                                        >
                                            <HabitIcon name={habit.icon} className="w-5 h-5 stroke-[2.2]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                {habit.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                                <span className="flex items-center gap-1 font-semibold">
                                                    <TimeIcon className="w-3 h-3 text-sky-500" />
                                                    <span>{timeInfo.label}</span>
                                                </span>
                                                {habit.category && (
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ backgroundColor: habit.category.color }}
                                                        />
                                                        <span>{habit.category.name}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1">
                                        {/* Edit */}
                                        <button
                                            type="button"
                                            onClick={() => openEditHabit(habit)}
                                            title="Edit"
                                            className="p-2.5 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                                        >
                                            <Pencil className="w-4 h-4 stroke-[2.2]" />
                                        </button>

                                        {/* Archive / Restore */}
                                        <button
                                            type="button"
                                            onClick={() => handleArchiveToggle(habit)}
                                            title={habit.is_archived ? 'Aktifkan Kembali' : 'Arsipkan'}
                                            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        >
                                            {habit.is_archived ? (
                                                <ArchiveRestore className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
                                            ) : (
                                                <Archive className="w-4 h-4 stroke-[2.2]" />
                                            )}
                                        </button>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(habit)}
                                            title="Hapus Permanen"
                                            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                                        >
                                            <Trash2 className="w-4 h-4 stroke-[2.2]" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default function Index(props) {
    return (
        <AppLayout title="Kelola Kebiasaan" categories={props.categories}>
            <ManageContent {...props} />
        </AppLayout>
    );
}
