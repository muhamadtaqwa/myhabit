import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLogo } from '@/Components/ui/AppLogo';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { AppToaster } from '@/Components/ui/Toaster';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-[#070d1e] flex items-center justify-center p-0 md:p-6 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
            <div className="w-full max-w-md min-h-screen md:min-h-0 md:rounded-3xl bg-white dark:bg-[#0b132b] border-x md:border border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col justify-center px-6 py-12 md:py-10 relative overflow-hidden">
                {/* Ambient Top Glow (Ala Reference Image) */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-sky-200/50 via-sky-100/20 to-transparent dark:from-sky-950/40 dark:via-transparent pointer-events-none" />

                {/* Theme Toggle in top-right */}
                <div className="absolute top-6 right-6 z-20">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xs border-slate-200/80 dark:border-slate-700/80" />
                </div>

                <div className="relative z-10 flex flex-col items-center mb-8">
                    <AppLogo
                        size="lg"
                        showText={true}
                        tagline="Kelola kebiasaan & tugas harian Anda secara konsisten"
                        className="flex-col text-center"
                    />
                </div>

                <div className="relative z-10 w-full">
                    {children}
                </div>

                <AppToaster />
            </div>
        </div>
    );
}
