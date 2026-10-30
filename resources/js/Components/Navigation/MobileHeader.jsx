import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import { AppLogo } from '@/Components/ui/AppLogo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/DropdownMenu';
import { LogOut, Settings, User } from 'lucide-react';

export function MobileHeader() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const firstName = user?.name ? user.name.split(' ')[0] : 'Pengguna';

    return (
        <header className="px-5 pt-6 pb-2 md:pt-4 md:px-0 relative z-20">
            {/* Desktop View Header */}
            <div className="hidden md:flex items-center justify-between pb-4 mb-2 border-b border-slate-200/70 dark:border-slate-800/80">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Halo, {user?.name || 'Pengguna'}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Pantau konsistensi dan selesaikan kebiasaan harian Anda hari ini.
                    </p>
                </div>
            </div>

            {/* Mobile View Header */}
            <div className="flex md:hidden items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <AppLogo size="sm" showText={false} />
                    <div>
                        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block -mb-0.5">
                            MyHabit
                        </span>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            Halo, {firstName}
                        </h1>
                    </div>
                </div>

                {/* Right controls: Theme Toggle + Profile menu */}
                <div className="flex items-center gap-2">
                    <ThemeToggle className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xs border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-sky-300" />

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-sky-300 transition">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs">
                                <User className="w-4 h-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800">
                            <div className="px-3 py-2 text-xs">
                                <p className="font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                                <p className="text-slate-500 truncate">{user?.email}</p>
                            </div>
                            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                            <DropdownMenuItem asChild>
                                <Link href={route('profile.edit')} className="flex items-center gap-2 rounded-xl py-2">
                                    <Settings className="w-4 h-4 text-slate-500" />
                                    <span>Pengaturan Profil</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-2 text-rose-600 dark:text-rose-400 focus:text-rose-600 rounded-xl py-2"
                                >
                                    <LogOut className="w-4 h-4 text-rose-500" />
                                    <span>Keluar</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
