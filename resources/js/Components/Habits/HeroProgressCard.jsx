import React from 'react';
import { Calendar, CheckCircle2, Flame, TrendingUp } from 'lucide-react';
import { formatIndonesianDate } from '@/lib/utils';

export function HeroProgressCard({ selectedDate, dailySummary = { total: 0, completed: 0, percentage: 0 } }) {
    const formattedDate = formatIndonesianDate(selectedDate);
    const { total = 0, completed = 0, percentage = 0 } = dailySummary;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-sky-600 to-sky-500 text-white p-5 shadow-xl shadow-sky-500/25 transition-all">
            {/* Ambient Background Glow Circles (depth ala modern Pinterest UI) */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute right-4 -top-8 w-28 h-28 rounded-full bg-sky-300/20 blur-xl pointer-events-none" />

            {/* Top row: Date with calendar icon */}
            <div className="relative z-10 flex items-center justify-between mb-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md font-medium text-white/95">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-100 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Progres Harian</span>
                </span>
            </div>

            {/* Middle row: Big headline and percentage */}
            <div className="relative z-10 flex items-end justify-between my-2">
                <div>
                    <h2 className="text-2xl font-black tracking-tight leading-none">
                        {total > 0 ? `${completed} dari ${total} Selesai` : 'Belum Ada Habit'}
                    </h2>
                    <p className="text-xs text-sky-100/90 font-medium mt-1.5">
                        {total === 0
                            ? 'Mulai buat habit pertama untuk melacak konsistensi.'
                            : percentage === 100
                            ? 'Luar biasa! Semua habit hari ini telah tuntas.'
                            : 'Terus pertahankan ritme kebiasaan positif Anda.'}
                    </p>
                </div>

                <div className="text-right">
                    <span className="text-3xl font-black tracking-tighter">
                        {percentage}%
                    </span>
                </div>
            </div>

            {/* Modern Clean Progress Bar */}
            <div className="relative z-10 mt-3 pt-1">
                <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-sm"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
