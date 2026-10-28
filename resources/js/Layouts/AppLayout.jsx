import React, { createContext, useContext, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { BottomNav } from '@/Components/Navigation/BottomNav';
import { HabitFormDrawer } from '@/Components/Habits/HabitFormDrawer';
import { AppToaster } from '@/Components/ui/Toaster';

const HabitDrawerContext = createContext({
    openNewHabit: () => {},
    openEditHabit: () => {},
});

export const useHabitDrawer = () => useContext(HabitDrawerContext);

export function AppLayout({ title, children, categories = [] }) {
    const pageCategories = usePage().props.categories || [];
    const availableCategories = categories && categories.length > 0 ? categories : pageCategories;

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
            <div className="min-h-screen bg-slate-100 dark:bg-[#070d1e] flex justify-center text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
                <Head title={title ? `${title} - MyHabit` : 'MyHabit'} />

                {/* Mobile-First Center Container with Top Soft Sky Glow */}
                <div className="w-full max-w-md min-h-screen bg-slate-50 dark:bg-[#0b132b] border-x border-slate-200/60 dark:border-slate-800/60 shadow-2xl relative flex flex-col pb-28">
                    {/* Ambient Top Glow (Sky Gradient ala Pinterest reference) */}
                    <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-sky-200/40 via-sky-100/20 to-transparent dark:from-sky-950/40 dark:via-sky-900/10 pointer-events-none" />

                    {/* Page Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                        {children}
                    </div>

                    {/* Modern Floating Bottom Navigation */}
                    <BottomNav onOpenNewHabit={openNewHabit} />

                    {/* Habit Form Drawer */}
                    <HabitFormDrawer
                        open={drawerOpen}
                        onOpenChange={setDrawerOpen}
                        habit={editingHabit}
                        categories={availableCategories}
                    />

                    {/* Toast Notification Container */}
                    <AppToaster />
                </div>
            </div>
        </HabitDrawerContext.Provider>
    );
}
