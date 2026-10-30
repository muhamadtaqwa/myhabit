import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AppLogo } from '@/Components/ui/AppLogo';
import { ThemeToggle } from '@/Components/ui/ThemeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/DropdownMenu';
import {
    BarChart3,
    CalendarCheck,
    CheckSquare,
    ChevronUp,
    LogOut,
    Plus,
    Settings,
    SlidersHorizontal,
    User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DesktopSidebar({ onOpenNewHabit }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const navItems = [
        {
            name: 'Hari Ini',
            route: 'today',
            icon: CalendarCheck,
            isActive: route().current('today'),
        },
        {
            name: 'Tugas',
            route: 'tasks.index',
            icon: CheckSquare,
            isActive: route().current('tasks.*'),
        },
        {
            name: 'Statistik',
            route: 'stats.index',
            icon: BarChart3,
            isActive: route().current('stats.index'),
        },
        {
            name: 'Kelola Habit',
            route: 'habits.manage',
            icon: SlidersHorizontal,
            isActive: route().current('habits.manage'),
        },
    ];

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0b132b] border-r border-slate-200/80 dark:border-slate-800/80 z-30 transition-colors">
            {/* Top Brand Area */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
                <Link href={route('today')} className="flex items-center gap-3 group">
                    <AppLogo size="md" showText={false} />
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-sky-500 transition">
                                MyHabit
                            </span>
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400">
                                Pro
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium leading-none">
                            Daily Habit & Tasks
                        </p>
                    </div>
                </Link>
            </div>

            {/* Quick Action: Tambah Habit Baru */}
            <div className="px-4 pt-4 pb-2">
                <button
                    type="button"
                    onClick={onOpenNewHabit}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-md shadow-sky-500/25 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Tambah Habit Baru</span>
                </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Menu Utama
                </p>

                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.route}
                            href={route(item.route)}
                            className={cn(
                                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all',
                                item.isActive
                                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                            )}
                        >
                            <IconComponent
                                className={cn(
                                    'w-4.5 h-4.5 shrink-0',
                                    item.isActive ? 'text-white stroke-[2.4]' : 'text-slate-400 dark:text-slate-500'
                                )}
                            />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section: Theme Toggle & User Profile */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                {/* Theme Toggle row */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Tema Tampilan
                    </span>
                    <ThemeToggle className="bg-white dark:bg-slate-700 shadow-xs border-slate-200/80 dark:border-slate-600" />
                </div>

                {/* User Card / Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition text-left">
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
                                {userInitial}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                    {user?.name || 'Pengguna'}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="top" className="w-56 rounded-2xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800 mb-1">
                        <div className="px-3 py-2 text-xs">
                            <p className="font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                            <p className="text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                        <DropdownMenuItem asChild>
                            <Link href={route('profile.edit')} className="flex items-center gap-2 rounded-xl py-2 cursor-pointer">
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
                                className="w-full flex items-center gap-2 text-rose-600 dark:text-rose-400 focus:text-rose-600 rounded-xl py-2 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 text-rose-500" />
                                <span>Keluar</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}
