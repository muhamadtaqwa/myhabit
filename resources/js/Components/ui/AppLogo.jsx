import React from 'react';
import { SwatchBook } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLogo({
    size = 'md',
    showText = true,
    tagline = null,
    className = '',
}) {
    // Size variants
    const sizeMap = {
        sm: {
            box: 'w-7 h-7 rounded-xl',
            icon: 'w-4 h-4 stroke-[2.3]',
            text: 'text-sm',
            gap: 'gap-2',
        },
        md: {
            box: 'w-9 h-9 rounded-2xl',
            icon: 'w-5 h-5 stroke-[2.3]',
            text: 'text-base',
            gap: 'gap-2.5',
        },
        lg: {
            box: 'w-14 h-14 rounded-3xl',
            icon: 'w-8 h-8 stroke-[2.3]',
            text: 'text-2xl',
            gap: 'gap-3',
        },
    };

    const s = sizeMap[size] || sizeMap.md;

    return (
        <div className={cn('flex items-center', s.gap, className)}>
            {/* Logo Mark: Squircle + Lucide SwatchBook */}
            <div className="relative flex-shrink-0">
                <div
                    className={cn(
                        'bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-500/25 ring-1 ring-white/20 select-none',
                        s.box
                    )}
                >
                    <SwatchBook className={s.icon} />
                </div>
            </div>

            {/* Logo Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={cn('font-black tracking-tight leading-tight', s.text)}>
                        <span className="text-slate-900 dark:text-white">My</span>
                        <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                            Habit
                        </span>
                    </span>
                    {tagline && (
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                            {tagline}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default AppLogo;
