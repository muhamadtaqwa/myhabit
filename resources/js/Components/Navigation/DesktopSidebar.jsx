import React, { useEffect, useState } from 'react';
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
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    Settings,
    SlidersHorizontal,
    User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DesktopSidebar({ onOpenNewHabit }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('myhabit_sidebar_collapsed') === 'true';
        }
        return false;
    });

    const toggleCollapse = () => {
        setIsCollapsed((prev) => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                localStorage.setItem('myhabit_sidebar_collapsed', String(next));
            }
            return next;
        });
    };

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
        <aside
            className={cn(
                'hidden md:flex flex-col shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0b132b] border-r border-slate-200/80 dark:border-slate-800/80 z-30 transition-[width] duration-300 ease-in-out',
                isCollapsed ? 'w-20' : 'w-64'
            )}
        >
            {/* Top Brand Area & Collapse Toggle */}
            <div
                className={cn(
                    'border-b border-slate-100 dark:border-slate-800/80 transition-all',
                    isCollapsed ? 'p-3 flex flex-col items-center gap-2' : 'p-4 flex items-center justify-between'
                )}
            >
                <Link
                    href={route('today')}
                    title="MyHabit"
                    className={cn('flex items-center group', isCollapsed ? 'justify-center' : 'gap-3 min-w-0')}
                >
                    <AppLogo size="sm" showText={false} />
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="font-black text-base text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-sky-500 transition">
                                    MyHabit
                                </span>
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400">
                                    Pro
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium leading-none truncate">
                                Daily Habit & Tasks
                            </p>
                        </div>
                    )}
                </Link>

                {/* Collapse / Expand Toggle Button */}
                <button
                    type="button"
                    onClick={toggleCollapse}
                    title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
                    aria-label={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all active:scale-95"
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                        <PanelLeftClose className="w-4 h-4 stroke-[2.2]" />
                    )}
                </button>
            </div>

            {/* Quick Action: Tambah Habit Baru */}
            <div className={cn('pt-3 pb-1', isCollapsed ? 'px-2 flex justify-center' : 'px-3')}>
                {isCollapsed ? (
                    <button
                        type="button"
                        onClick={onOpenNewHabit}
                        title="Tambah Habit Baru"
                        aria-label="Tambah Habit Baru"
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-md shadow-sky-500/25 active:scale-90 transition-all"
                    >
                        <Plus className="w-5 h-5 stroke-[2.6]" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onOpenNewHabit}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-md shadow-sky-500/25 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Tambah Habit Baru</span>
                    </button>
                )}
            </div>

            {/* Main Navigation Links */}
            <nav className={cn('flex-1 py-2 space-y-1 overflow-y-auto no-scrollbar', isCollapsed ? 'px-2' : 'px-3')}>
                {!isCollapsed && (
                    <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Menu Utama
                    </p>
                )}

                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.route}
                            href={route(item.route)}
                            title={isCollapsed ? item.name : undefined}
                            className={cn(
                                'flex items-center rounded-xl text-xs font-bold transition-all',
                                isCollapsed
                                    ? 'w-11 h-11 mx-auto justify-center'
                                    : 'gap-3 px-3 py-2.5',
                                item.isActive
                                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                            )}
                        >
                            <IconComponent
                                className={cn(
                                    'shrink-0',
                                    isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5',
                                    item.isActive ? 'text-white stroke-[2.4]' : 'text-slate-400 dark:text-slate-500'
                                )}
                            />
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section: Theme Toggle & User Profile */}
            <div className={cn('p-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2', isCollapsed && 'flex flex-col items-center')}>
                {/* Theme Toggle */}
                {isCollapsed ? (
                    <div className="flex justify-center py-1" title="Ganti Tema">
                        <ThemeToggle className="bg-slate-100 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-xs" />
                    </div>
                ) : (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            Tema Tampilan
                        </span>
                        <ThemeToggle className="bg-white dark:bg-slate-700 shadow-xs border-slate-200/80 dark:border-slate-600" />
                    </div>
                )}

                {/* User Card / Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={cn(
                            'rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition text-left focus:outline-none',
                            isCollapsed
                                ? 'w-11 h-11 flex items-center justify-center p-0'
                                : 'w-full flex items-center justify-between p-2'
                        )}
                        title={isCollapsed ? user?.name || 'Pengguna' : undefined}
                    >
                        {isCollapsed ? (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs">
                                {userInitial}
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align={isCollapsed ? 'start' : 'end'}
                        side={isCollapsed ? 'right' : 'top'}
                        className="w-56 rounded-2xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800 ml-2 mb-1"
                    >
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
