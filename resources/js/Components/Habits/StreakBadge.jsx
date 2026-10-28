import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StreakBadge({ streak = 0, className }) {
    if (streak <= 0) {
        return null;
    }

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold',
                'bg-amber-50 text-amber-600 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60 shadow-xs',
                className
            )}
            title={`${streak} hari berturut-turut konsisten`}
        >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>{streak} hari</span>
        </span>
    );
}
