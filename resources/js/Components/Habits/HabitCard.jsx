import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { HabitIcon } from '@/lib/icons';
import { StreakBadge } from '@/Components/Habits/StreakBadge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/DropdownMenu';
import {
    Archive,
    Check,
    Clock,
    Info,
    MoreVertical,
    Moon,
    Pencil,
    Sun,
    SunMedium,
    Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function HabitCard({ habit, selectedDate, onEdit }) {
    const [isCompleted, setIsCompleted] = useState(habit.is_completed);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggle = () => {
        if (isUpdating) return;

        // Optimistic UI update
        const nextState = !isCompleted;
        setIsCompleted(nextState);
        setIsUpdating(true);

        if (nextState) {
            toast.success(`"${habit.title}" berhasil diselesaikan!`);
        } else {
            toast(`"${habit.title}" ditandai belum selesai.`, {
                icon: <Info className="w-4 h-4 text-sky-400 stroke-[2.5]" />,
            });
        }

        router.post(
            route('habits.toggle', habit.id),
            { logged_date: selectedDate },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    setIsCompleted(!nextState);
                    toast.error('Gagal memperbarui status kebiasaan.');
                },
                onFinish: () => {
                    setIsUpdating(false);
                },
            }
        );
    };

    const handleArchive = () => {
        router.post(
            route('habits.archive', habit.id),
            {},
            { preserveScroll: true }
        );
    };

    const handleDelete = () => {
        if (confirm(`Hapus habit "${habit.title}"? Data riwayatnya akan ikut terhapus.`)) {
            router.delete(
                route('habits.destroy', habit.id),
                { preserveScroll: true }
            );
        }
    };

    const timeIcons = {
        morning: { icon: Sun, label: 'Pagi' },
        afternoon: { icon: SunMedium, label: 'Siang' },
        evening: { icon: Moon, label: 'Malam' },
        anytime: { icon: Clock, label: 'Kapan Saja' },
    };

    const timeInfo = timeIcons[habit.time_of_day] || timeIcons.anytime;
    const TimeIconComponent = timeInfo.icon;

    return (
        <div
            className={cn(
                'group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl border transition-all duration-200',
                isCompleted
                    ? 'bg-slate-50/80 dark:bg-[#0f172a]/40 border-slate-200/60 dark:border-slate-800/40 opacity-75'
                    : 'bg-white dark:bg-[#131d36] border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-sky-200 dark:hover:border-sky-800/50'
            )}
        >
            {/* Left: Icon & Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2.5">
                {/* Habit Icon Container (Soft Tinted Squircle) */}
                <div
                    className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 shadow-xs',
                        isCompleted ? 'grayscale opacity-60' : 'group-hover:scale-105'
                    )}
                    style={{
                        backgroundColor: `${habit.color || '#0284c7'}18`,
                        color: habit.color || '#0284c7',
                    }}
                >
                    <HabitIcon name={habit.icon} className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>

                {/* Content: Strictly 2 Clean Lines */}
                <div className="flex-1 min-w-0">
                    {/* Baris 1: Judul Habit */}
                    <h3
                        className={cn(
                            'text-sm font-bold tracking-tight truncate leading-tight transition-colors',
                            isCompleted
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                        )}
                    >
                        {habit.title}
                    </h3>

                    {/* Baris 2: Waktu & Streak (Sejajar dalam 1 baris) */}
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0 text-[11px]">
                        {/* Time tag */}
                        <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800/70 px-1.5 py-0.5 rounded-md flex-shrink-0">
                            <TimeIconComponent className="w-3 h-3 text-sky-500" />
                            <span>{timeInfo.label}</span>
                        </span>

                        {/* Dot separator */}
                        <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

                        {/* Streak badge */}
                        <StreakBadge streak={habit.current_streak} />
                    </div>
                </div>
            </div>

            {/* Right: Actions & Touch-Friendly Checkbox */}
            <div className="flex items-center gap-1 flex-shrink-0">
                {/* Menu dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <MoreVertical className="w-4 h-4" />
                        <span className="sr-only">Menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800">
                        <DropdownMenuItem onClick={() => onEdit(habit)} className="rounded-xl py-2">
                            <Pencil className="w-3.5 h-3.5 mr-2 text-slate-500" />
                            Edit Habit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleArchive} className="rounded-xl py-2">
                            <Archive className="w-3.5 h-3.5 mr-2 text-slate-500" />
                            Arsipkan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="text-rose-600 dark:text-rose-400 focus:text-rose-600 rounded-xl py-2"
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-2 text-rose-500" />
                            Hapus Habit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Touch-Friendly Checkbox (Tactile Modern Button) */}
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isUpdating}
                    aria-label={`Tandai ${habit.title} ${isCompleted ? 'belum selesai' : 'selesai'}`}
                    className={cn(
                        'w-9.5 h-9.5 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90',
                        isCompleted
                            ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 ring-2 ring-sky-400/20'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-300 dark:text-slate-600 hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 border-2 border-slate-200 dark:border-slate-700'
                    )}
                >
                    <Check
                        className={cn(
                            'w-4.5 h-4.5 transition-transform duration-200 stroke-[3]',
                            isCompleted ? 'scale-100' : 'scale-75 opacity-30'
                        )}
                    />
                </button>
            </div>
        </div>
    );
}
