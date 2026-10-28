import React from 'react';
import { Check, Sparkles } from 'lucide-react';
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
            checkIcon: 'w-4 h-4 stroke-[3]',
            sparkleIcon: 'w-2 h-2',
            sparklePos: '-top-0.5 -right-0.5',
            text: 'text-sm',
            gap: 'gap-2',
        },
        md: {
            box: 'w-9 h-9 rounded-2xl',
            checkIcon: 'w-5 h-5 stroke-[3]',
            sparkleIcon: 'w-3 h-3',
            sparklePos: '-top-1 -right-1',
            text: 'text-base',
            gap: 'gap-2.5',
        },
        lg: {
            box: 'w-14 h-14 rounded-3xl',
            checkIcon: 'w-8 h-8 stroke-[3.2]',
            sparkleIcon: 'w-4 h-4',
            sparklePos: '-top-1.5 -right-1.5',
            text: 'text-2xl',
            gap: 'gap-3',
        },
    };

    const s = sizeMap[size] || sizeMap.md;

    return (
        <div className={cn('flex items-center', s.gap, className)}>
            {/* Logo Mark: Squircle + Lucide Check + Lucide Sparkle */}
            <div className="relative flex-shrink-0">
                <div
                    className={cn(
                        'bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-500/25 ring-1 ring-white/20 select-none',
                        s.box
                    )}
                >
                    <Check className={s.checkIcon} />
                </div>

                {/* Top-Right Sparkle Accent */}
                <div
                    className={cn(
                        'absolute flex items-center justify-center text-amber-300 pointer-events-none drop-shadow-xs',
                        s.sparklePos
                    )}
                >
                    <Sparkles className={cn(s.sparkleIcon, 'fill-amber-300 stroke-[2]')} />
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
