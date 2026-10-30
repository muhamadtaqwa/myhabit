import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { AppLayout } from '@/Layouts/AppLayout';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { TaskFormDrawer } from '@/Components/Tasks/TaskFormDrawer';
import {
    Calendar,
    Check,
    CheckCircle2,
    CheckSquare,
    Clock,
    Flag,
    MoreVertical,
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/DropdownMenu';
import { cn, formatShortDate } from '@/lib/utils';

export function TasksHeader({ onOpenNewTask }) {
    return (
        <header className="px-5 pt-6 pb-4 bg-white/80 dark:bg-[#0b132b]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                        <CheckSquare className="w-5 h-5 stroke-[2.4]" />
                    </div>
                    <div>
                        <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Tugas Harian
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Kelola to-do dan pekerjaan Anda hari ini.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />

                    <button
                        type="button"
                        onClick={onOpenNewTask}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25 active:scale-95 transition"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Tugas</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default function TasksIndex({ tasks = [], summary = { total: 0, pending: 0, completed: 0 } }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const pendingTasks = tasks.filter((t) => !t.is_completed);
    const completedTasks = tasks.filter((t) => t.is_completed);

    const handleOpenNewTask = () => {
        setEditingTask(null);
        setDrawerOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setDrawerOpen(true);
    };

    const handleToggle = (task) => {
        const nextState = !task.is_completed;
        if (nextState) {
            toast.success(`Tugas "${task.title}" selesai!`);
        } else {
            toast(`Tugas "${task.title}" dibuka kembali.`);
        }

        router.post(
            route('tasks.toggle', task.id),
            {},
            { preserveScroll: true }
        );
    };

    const handleDelete = (task) => {
        if (confirm(`Hapus tugas "${task.title}"?`)) {
            router.delete(route('tasks.destroy', task.id), { preserveScroll: true });
        }
    };

    const priorityBadges = {
        high: { label: 'Tinggi', class: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-800' },
        medium: { label: 'Sedang', class: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-800' },
        low: { label: 'Rendah', class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700' },
    };

    return (
        <AppLayout title="Daftar Tugas">
            <div className="flex-1 flex flex-col">
                <TasksHeader onOpenNewTask={handleOpenNewTask} />

                <main className="flex-1 px-4 py-4 space-y-4">
                    {/* Summary Quick Glance Cards (Harus Dikerjakan vs Sudah Selesai) */}
                    <div className="grid grid-cols-2 gap-2.5">
                        {/* Harus Dikerjakan */}
                        <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                                    Harus Dikerjakan
                                </span>
                                <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                                    {summary.pending}
                                </p>
                            </div>
                            <div className="w-8.5 h-8.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                                <Clock className="w-4.5 h-4.5 stroke-[2.2]" />
                            </div>
                        </div>

                        {/* Sudah Selesai */}
                        <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                                    Sudah Selesai
                                </span>
                                <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                                    {summary.completed}
                                </p>
                            </div>
                            <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
                                <CheckCircle2 className="w-4.5 h-4.5 stroke-[2.2]" />
                            </div>
                        </div>
                    </div>

                    {/* Task Lists */}
                    {tasks.length === 0 ? (
                        <div className="py-14 px-6 text-center flex flex-col items-center justify-center bg-white dark:bg-[#131d36] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex items-center justify-center mb-4">
                                <CheckSquare className="w-8 h-8 stroke-[2]" />
                            </div>
                            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                                Belum Ada Tugas
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
                                Catat pekerjaan atau to-do list yang perlu diselesaikan hari ini.
                            </p>
                            <button
                                type="button"
                                onClick={handleOpenNewTask}
                                className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 active:scale-95 transition"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Tambah Tugas Pertama</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Pending Tasks */}
                            {pendingTasks.length > 0 && (
                                <div className="space-y-2.5">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                                        Perlu Dikerjakan ({pendingTasks.length})
                                    </p>
                                    <div className="space-y-2">
                                        {pendingTasks.map((task) => {
                                            const priority = priorityBadges[task.priority] || priorityBadges.medium;
                                            return (
                                                <div
                                                    key={task.id}
                                                    className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between transition hover:shadow-md"
                                                >
                                                    <div className="flex-1 min-w-0 pr-3">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                                {task.title}
                                                            </h3>
                                                        </div>

                                                        {task.description && (
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                                                {task.description}
                                                            </p>
                                                        )}

                                                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                            <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-md border', priority.class)}>
                                                                {priority.label}
                                                            </span>

                                                            {task.due_date && (
                                                                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3 text-sky-500" />
                                                                    <span>{formatShortDate(task.due_date)}</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="rounded-2xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800">
                                                                <DropdownMenuItem onClick={() => handleEditTask(task)} className="rounded-xl py-2">
                                                                    <Pencil className="w-3.5 h-3.5 mr-2 text-slate-500" />
                                                                    Edit Tugas
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                                                                <DropdownMenuItem onClick={() => handleDelete(task)} className="text-rose-600 dark:text-rose-400 rounded-xl py-2">
                                                                    <Trash2 className="w-3.5 h-3.5 mr-2 text-rose-500" />
                                                                    Hapus Tugas
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>

                                                        {/* Checkbox */}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggle(task)}
                                                            aria-label="Tandai selesai"
                                                            className="w-9.5 h-9.5 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-300 dark:text-slate-600 active:scale-90 transition"
                                                        >
                                                            <Check className="w-4.5 h-4.5 opacity-30 stroke-[3]" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Completed Tasks */}
                            {completedTasks.length > 0 && (
                                <div className="space-y-2 pt-1">
                                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>Sudah Selesai ({completedTasks.length})</span>
                                    </p>
                                    <div className="space-y-2">
                                        {completedTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="px-3.5 py-2.5 rounded-2xl bg-slate-50/70 dark:bg-[#0f172a]/40 border border-slate-200/60 dark:border-slate-800/40 opacity-75 flex items-center justify-between"
                                            >
                                                <div className="flex-1 min-w-0 pr-3">
                                                    <h3 className="text-sm font-bold line-through text-slate-400 dark:text-slate-500 truncate">
                                                        {task.title}
                                                    </h3>
                                                    {task.due_date && (
                                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                                            Selesai
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(task)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition"
                                                    >
                                                        <Trash2 className="w-4 h-4 stroke-[2]" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggle(task)}
                                                        className="w-9.5 h-9.5 rounded-xl flex items-center justify-center bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 active:scale-90 transition"
                                                    >
                                                        <Check className="w-4.5 h-4.5 stroke-[3]" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>

                {/* Task Form Drawer */}
                <TaskFormDrawer
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    task={editingTask}
                />
            </div>
        </AppLayout>
    );
}
