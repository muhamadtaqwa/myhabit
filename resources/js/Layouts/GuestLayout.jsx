import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { AppToaster } from '@/Components/ui/Toaster';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-[#070d1e] flex justify-center text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
            <div className="w-full max-w-md min-h-screen bg-white dark:bg-[#0b132b] border-x border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col justify-center px-6 py-12 relative overflow-hidden">
                {/* Ambient Top Glow (Ala Reference Image) */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-sky-200/50 via-sky-100/20 to-transparent dark:from-sky-950/40 dark:via-transparent pointer-events-none" />

                {/* Theme Toggle in top-right */}
                <div className="absolute top-6 right-6 z-20">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xs border-slate-200/80 dark:border-slate-700/80" />
                </div>

                <div className="relative z-10 flex flex-col items-center mb-8">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 mb-3">
                        <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        MyHabit
                    </h1>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        Kelola kebiasaan harian Anda dengan konsisten
                    </p>
                </div>

                <div className="relative z-10 w-full">
                    {children}
                </div>

                <AppToaster />
            </div>
        </div>
    );
}
