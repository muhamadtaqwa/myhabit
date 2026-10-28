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
            <header className="px-5 pt-6 pb-4 bg-white/80 dark:bg-[#0b132b]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('today')}
                            className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        >
                            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                        </Link>
                        <div>
                            <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                Pengaturan Akun
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Kelola informasi profil dan keamanan.
                            </p>
                        </div>
                    </div>

                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />
                </div>
            </header>

            <main className="flex-1 px-4 py-5 space-y-4">
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
