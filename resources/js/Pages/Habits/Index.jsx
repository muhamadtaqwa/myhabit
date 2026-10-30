import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { AppLayout, useHabitDrawer } from "@/Layouts/AppLayout";
import { HabitIcon } from "@/lib/icons";
import { ThemeToggle } from "@/Components/ui/ThemeToggle";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_LABELS = {
    morning: { label: "Pagi", icon: Sun },
    afternoon: { label: "Siang", icon: SunMedium },
    evening: { label: "Malam", icon: Moon },
    anytime: { label: "Kapan Saja", icon: Clock },
};

export function ManageHeader({ onOpenNewHabit }) {
    return (
        <header className="sticky top-0 z-30 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] bg-white/90 dark:bg-[#0b132b]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                        <SlidersHorizontal className="w-5 h-5 stroke-[2.4]" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                            Kelola Habit
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                            Atur, ubah, atau arsipkan kebiasaan Anda.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-sm" />

                    <button
                        type="button"
                        onClick={onOpenNewHabit}
                        aria-label="Tambah habit baru"
                        className="inline-flex items-center justify-center gap-1.5 h-11 min-w-11 px-3 sm:px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25 active:scale-95 transition touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                    >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                        <span className="hidden min-[380px]:inline">Baru</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

function ActionButton({
    icon: Icon,
    label,
    onClick,
    tone = "default",
    iconClass,
}) {
    const tones = {
        default:
            "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 active:bg-slate-200 dark:active:bg-slate-700",
        primary:
            "text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 active:bg-sky-100 dark:active:bg-sky-900/50",
        danger: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 active:bg-rose-100 dark:active:bg-rose-900/50",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={cn(
                "flex items-center justify-center gap-1.5 h-11 rounded-xl text-xs font-bold transition touch-manipulation",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                tones[tone],
            )}
        >
            <Icon className={cn("w-4 h-4 stroke-[2.2]", iconClass)} />
            <span>{label}</span>
        </button>
    );
}

function ConfirmDeleteSheet({ habit, onCancel, onConfirm }) {
    useEffect(() => {
        if (!habit) return;
        const onKey = (e) => e.key === "Escape" && onCancel();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [habit, onCancel]);

    if (!habit) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
        >
            <button
                type="button"
                aria-label="Tutup"
                onClick={onCancel}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <div className="relative w-full sm:max-w-sm bg-white dark:bg-[#131d36] rounded-t-3xl sm:rounded-3xl px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-700 sm:hidden" />
                <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                        <h2
                            id="delete-title"
                            className="text-base font-extrabold text-slate-900 dark:text-white"
                        >
                            Hapus habit ini?
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 break-words">
                            “{habit.title}” akan dihapus permanen beserta
                            riwayatnya. Jika ingin menyimpannya, arsipkan saja.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-12 rounded-2xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 active:scale-95 transition touch-manipulation"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-12 rounded-2xl text-sm font-bold bg-rose-600 text-white active:scale-95 transition touch-manipulation"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ tab, onCreate }) {
    const isActive = tab === "active";

    return (
        <div className="py-12 px-6 text-center bg-white dark:bg-[#131d36] rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                {isActive ? (
                    <Plus className="w-7 h-7" />
                ) : (
                    <Archive className="w-7 h-7" />
                )}
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {isActive ? "Belum ada habit aktif" : "Arsip masih kosong"}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {isActive
                    ? "Mulai dengan satu kebiasaan kecil hari ini."
                    : "Habit yang Anda arsipkan akan muncul di sini."}
            </p>
            {isActive && (
                <button
                    type="button"
                    onClick={onCreate}
                    className="mt-5 inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25 active:scale-95 transition touch-manipulation"
                >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    Buat habit pertama
                </button>
            )}
        </div>
    );
}

function HabitCard({ habit, onEdit, onArchive, onDelete }) {
    const timeInfo = TIME_LABELS[habit.time_of_day] || TIME_LABELS.anytime;
    const TimeIcon = timeInfo.icon;
    const color = habit.color || "#0284c7";

    return (
        <article
            className={cn(
                "p-4 rounded-2xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-sm",
                habit.is_archived && "opacity-90",
            )}
        >
            {/* Ikon & judul */}
            <div className="flex items-center gap-3.5 min-w-0">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}1f`, color }}
                >
                    <HabitIcon
                        name={habit.icon}
                        className="w-6 h-6 stroke-[2.2]"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold leading-snug text-slate-900 dark:text-white line-clamp-2 break-words">
                        {habit.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-semibold">
                            <TimeIcon className="w-3.5 h-3.5 text-sky-500" />
                            {timeInfo.label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Aksi: tombol berlabel agar jelas & mudah ditekan di layar sentuh */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
                <ActionButton
                    icon={Pencil}
                    label="Edit"
                    tone="primary"
                    onClick={onEdit}
                />
                <ActionButton
                    icon={habit.is_archived ? ArchiveRestore : Archive}
                    label={habit.is_archived ? "Aktifkan" : "Arsipkan"}
                    onClick={onArchive}
                    iconClass={
                        habit.is_archived
                            ? "text-emerald-600 dark:text-emerald-400"
                            : undefined
                    }
                />
                <ActionButton
                    icon={Trash2}
                    label="Hapus"
                    tone="danger"
                    onClick={onDelete}
                />
            </div>
        </article>
    );
}

function ManageContent({ habits = [] }) {
    const [tab, setTab] = useState("active");
    const [habitToDelete, setHabitToDelete] = useState(null);
    const { openNewHabit, openEditHabit } = useHabitDrawer();

    const activeHabits = habits.filter((h) => !h.is_archived);
    const archivedHabits = habits.filter((h) => h.is_archived);
    const displayedHabits = tab === "active" ? activeHabits : archivedHabits;

    const tabs = [
        { key: "active", label: "Aktif", count: activeHabits.length },
        { key: "archived", label: "Diarsipkan", count: archivedHabits.length },
    ];

    const handleArchiveToggle = (habit) => {
        router.post(
            route("habits.archive", habit.id),
            {},
            { preserveScroll: true },
        );
    };

    const handleConfirmDelete = () => {
        if (!habitToDelete) return;
        router.delete(route("habits.destroy", habitToDelete.id), {
            preserveScroll: true,
            onFinish: () => setHabitToDelete(null),
        });
    };

    return (
        <div className="flex-1 flex flex-col">
            <ManageHeader onOpenNewHabit={openNewHabit} />

            {/* pb besar agar konten tidak tertutup bottom navigation / home indicator */}
            <main className="flex-1 px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))] space-y-4">
                {/* Tabs */}
                <div
                    role="tablist"
                    aria-label="Filter habit"
                    className="flex p-1.5 gap-1 rounded-2xl bg-slate-200/60 dark:bg-[#131d36]"
                >
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.key}
                            onClick={() => setTab(t.key)}
                            className={cn(
                                "flex-1 h-11 text-sm font-bold rounded-xl transition touch-manipulation",
                                tab === t.key
                                    ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 active:text-slate-800 dark:active:text-slate-200",
                            )}
                        >
                            {t.label} ({t.count})
                        </button>
                    ))}
                </div>

                {/* Daftar habit */}
                {displayedHabits.length === 0 ? (
                    <EmptyState tab={tab} onCreate={openNewHabit} />
                ) : (
                    <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
                        {displayedHabits.map((habit) => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onEdit={() => openEditHabit(habit)}
                                onArchive={() => handleArchiveToggle(habit)}
                                onDelete={() => setHabitToDelete(habit)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <ConfirmDeleteSheet
                habit={habitToDelete}
                onCancel={() => setHabitToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
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
