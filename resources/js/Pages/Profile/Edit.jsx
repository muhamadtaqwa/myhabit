import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { ArrowLeft, UserCircle } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout title="Profil Pengguna">
            <header className="sticky md:static top-0 z-30 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 md:px-0 md:pt-2 md:pb-4 bg-white/80 dark:bg-[#0b132b]/80 md:bg-transparent md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-slate-200/80 dark:border-slate-800/80 md:border-b-0">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <Link
                            href={route('today')}
                            className="w-10 h-10 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        >
                            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                        </Link>
                        <div className="min-w-0">
                            <h1 className="text-base md:text-xl font-extrabold md:font-black tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                                Pengaturan Akun
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <div className="md:hidden">
                            <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 px-4 md:px-0 py-5 space-y-4 md:max-w-2xl">
                <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                    <UpdatePasswordForm />
                </div>

                <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#131d36] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                    <DeleteUserForm />
                </div>
            </main>
        </AppLayout>
    );
}
