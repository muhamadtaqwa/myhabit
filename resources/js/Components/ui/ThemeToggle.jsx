import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);

        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            title={isDark ? 'Tema Terang' : 'Tema Gelap'}
            className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90',
                'border border-zinc-200 dark:border-zinc-800',
                'bg-zinc-100 hover:bg-zinc-200 text-zinc-700',
                'dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300',
                className
            )}
        >
            {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
            ) : (
                <Moon className="w-4 h-4 text-zinc-600 stroke-[2.2]" />
            )}
        </button>
    );
}
