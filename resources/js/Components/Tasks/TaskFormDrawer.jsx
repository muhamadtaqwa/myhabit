import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/Dialog';
import { Calendar, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskFormDrawer({ open, onOpenChange, task = null }) {
    const isEditing = Boolean(task);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        due_date: new Date().toISOString().split('T')[0],
        priority: 'medium',
    });

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || '',
                description: task.description || '',
                due_date: task.due_date ? task.due_date.split('T')[0] : new Date().toISOString().split('T')[0],
                priority: task.priority || 'medium',
            });
        } else {
            reset();
            setData('due_date', new Date().toISOString().split('T')[0]);
        }
        clearErrors();
    }, [task, open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('tasks.update', task.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post(route('tasks.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    const priorities = [
        { id: 'low', label: 'Rendah', color: 'border-slate-200 dark:border-slate-700 text-slate-600', active: 'bg-slate-700 text-white' },
        { id: 'medium', label: 'Sedang', color: 'border-sky-300 dark:border-sky-800 text-sky-600', active: 'bg-sky-500 text-white shadow-md shadow-sky-500/25' },
        { id: 'high', label: 'Tinggi', color: 'border-rose-300 dark:border-rose-800 text-rose-600', active: 'bg-rose-500 text-white shadow-md shadow-rose-500/25' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-[28px] border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111a33]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {isEditing ? 'Ubah Tugas' : 'Tambah Tugas Baru'}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                        {isEditing
                            ? 'Perbarui detail tugas harian Anda.'
                            : 'Catat tugas atau pekerjaan yang perlu diselesaikan hari ini.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Judul Tugas <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Kirim laporan bulanan, Beli vitamin, dll"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.title}</p>
                        )}
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>Tenggat Waktu</span>
                        </label>
                        <input
                            type="date"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <Flag className="w-3.5 h-3.5 text-sky-500" />
                            <span>Tingkat Prioritas</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {priorities.map((p) => {
                                const isSelected = data.priority === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setData('priority', p.id)}
                                        className={cn(
                                            'py-2.5 px-3 rounded-2xl text-xs font-bold border transition text-center active:scale-95',
                                            isSelected
                                                ? p.active
                                                : `${p.color} bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100`
                                        )}
                                    >
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Catatan Tambahan (Opsional)
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Detail atau catatan pendukung tugas..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium resize-none"
                        />
                    </div>

                    {/* Submit Button */}
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
                                : 'Simpan Tugas Baru'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
