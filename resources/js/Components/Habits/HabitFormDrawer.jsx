import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/Dialog';
import { HABIT_ICONS, HabitIcon } from '@/lib/icons';
import { Clock, Moon, Sun, SunMedium } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLOR_PALETTE = [
    { name: 'Sky', value: '#0284c7' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Slate', value: '#64748b' },
];

export function HabitFormDrawer({ open, onOpenChange, habit = null }) {
    const isEditing = Boolean(habit);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        time_of_day: 'anytime',
        icon: 'Check',
        color: '#0284c7',
    });

    useEffect(() => {
        if (habit) {
            setData({
                title: habit.title || '',
                description: habit.description || '',
                time_of_day: habit.time_of_day || 'anytime',
                icon: habit.icon || 'Check',
                color: habit.color || '#0284c7',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [habit, open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('habits.update', habit.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post(route('habits.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    const timeOptions = [
        { id: 'anytime', label: 'Kapan Saja', icon: Clock },
        { id: 'morning', label: 'Pagi', icon: Sun },
        { id: 'afternoon', label: 'Siang', icon: SunMedium },
        { id: 'evening', label: 'Malam', icon: Moon },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-[28px] border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111a33]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {isEditing ? 'Ubah Kebiasaan' : 'Buat Kebiasaan Baru'}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                        {isEditing
                            ? 'Sesuaikan nama dan jadwal pelaksanaan habit Anda.'
                            : 'Tambahkan kebiasaan harian baru untuk mulai melacak konsistensi.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Nama Kebiasaan <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Minum air putih 2L, Lari pagi, dll"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.title}</p>
                        )}
                    </div>

                    {/* Time of Day */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Waktu Pelaksanaan
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {timeOptions.map((opt) => {
                                const IconComp = opt.icon;
                                const isSelected = data.time_of_day === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setData('time_of_day', opt.id)}
                                        className={cn(
                                            'flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition active:scale-95 text-left',
                                            isSelected
                                                ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/25'
                                                : 'bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-sky-300'
                                        )}
                                    >
                                        <IconComp className={cn('w-4 h-4 flex-shrink-0', isSelected ? 'text-white' : 'text-sky-500')} />
                                        <span>{opt.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Icon Selection */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Pilih Ikon Vektor
                        </label>
                        <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40">
                            {HABIT_ICONS.map((item) => {
                                const isSelected = data.icon === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        title={item.label}
                                        onClick={() => setData('icon', item.name)}
                                        className={cn(
                                            'p-2.5 rounded-xl flex items-center justify-center transition active:scale-95',
                                            isSelected
                                                ? 'bg-sky-500 text-white shadow-sm'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                        )}
                                    >
                                        <HabitIcon name={item.name} className="w-4 h-4 stroke-[2.2]" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Color Palette */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Warna Aksen
                        </label>
                        <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                            {COLOR_PALETTE.map((c) => {
                                const isSelected = data.color === c.value;
                                return (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setData('color', c.value)}
                                        aria-label={c.name}
                                        className={cn(
                                            'w-7 h-7 rounded-full flex-shrink-0 transition-transform flex items-center justify-center',
                                            isSelected ? 'scale-115 ring-2 ring-offset-2 ring-sky-500' : 'hover:scale-105'
                                        )}
                                        style={{ backgroundColor: c.value }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit Button (Vibrant Sky Blue Gradient) */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 hover:opacity-95 active:scale-98 transition disabled:opacity-50"
                        >
                            {processing
                                ? 'Menyimpan...'
                                : isEditing
                                ? 'Simpan Perubahan'
                                : 'Buat Kebiasaan Sekarang'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
