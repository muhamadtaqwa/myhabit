import React, { createContext, useContext, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { BottomNav } from '@/Components/Navigation/BottomNav';
import { DesktopSidebar } from '@/Components/Navigation/DesktopSidebar';
import { HabitFormDrawer } from '@/Components/Habits/HabitFormDrawer';
import { AppToaster } from '@/Components/ui/Toaster';

const HabitDrawerContext = createContext({
    openNewHabit: () => {},
    openEditHabit: () => {},
});

export const useHabitDrawer = () => useContext(HabitDrawerContext);

export function AppLayout({ title, children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);

    const openNewHabit = () => {
        setEditingHabit(null);
        setDrawerOpen(true);
    };

    const openEditHabit = (habit) => {
        setEditingHabit(habit);
        setDrawerOpen(true);
    };

    return (
        <HabitDrawerContext.Provider value={{ openNewHabit, openEditHabit }}>
            <div className="min-h-screen bg-slate-100 dark:bg-[#070d1e] flex justify-center md:justify-start text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
                <Head title={title ? `${title} - MyHabit` : 'MyHabit'} />

                {/* Desktop Sidebar (hidden on mobile, visible on md+) */}
                <DesktopSidebar onOpenNewHabit={openNewHabit} />

                {/* Main Content Wrapper */}
                <div className="w-full max-w-md md:max-w-none md:flex-1 min-h-screen bg-slate-50 dark:bg-[#0b132b] border-x md:border-x-0 border-slate-200/60 dark:border-slate-800/60 shadow-2xl md:shadow-none relative flex flex-col pb-28 md:pb-8">
                    {/* Ambient Top Glow (Sky Gradient ala Pinterest reference) */}
                    <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-sky-200/40 via-sky-100/20 to-transparent dark:from-sky-950/40 dark:via-sky-900/10 pointer-events-none" />

                    {/* Page Content Container */}
                    <div className="relative z-10 flex-1 flex flex-col w-full md:max-w-5xl md:mx-auto md:px-6 md:pt-2">
                        {children}
                    </div>

                    {/* Modern Floating Bottom Navigation (Mobile Only) */}
                    <BottomNav onOpenNewHabit={openNewHabit} />

                    {/* Habit Form Drawer */}
                    <HabitFormDrawer
                        open={drawerOpen}
                        onOpenChange={setDrawerOpen}
                        habit={editingHabit}
                    />

                    {/* Toast Notification Container */}
                    <AppToaster />
                </div>
            </div>
        </HabitDrawerContext.Provider>
    );
}
