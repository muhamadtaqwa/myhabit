import React from 'react';
import {
    Activity,
    Apple,
    Bike,
    BookOpen,
    Brain,
    Briefcase,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Code,
    Coffee,
    Compass,
    Droplets,
    Dumbbell,
    Flame,
    Folder,
    Footprints,
    Heart,
    HeartPulse,
    Laptop,
    Moon,
    Pencil,
    Smile,
    Sparkles,
    Sun,
    SunMedium,
    Target,
    Utensils,
    Wallet,
    Zap,
} from 'lucide-react';

export const HABIT_ICONS = [
    { name: 'Check', label: 'Centang', icon: Check },
    { name: 'Dumbbell', label: 'Olahraga', icon: Dumbbell },
    { name: 'Footprints', label: 'Jalan Kaki', icon: Footprints },
    { name: 'Bike', label: 'Bersepeda', icon: Bike },
    { name: 'Droplets', label: 'Minum Air', icon: Droplets },
    { name: 'BookOpen', label: 'Membaca', icon: BookOpen },
    { name: 'Pencil', label: 'Menulis', icon: Pencil },
    { name: 'Code', label: 'Coding', icon: Code },
    { name: 'Laptop', label: 'Belajar/Kerja', icon: Laptop },
    { name: 'Brain', label: 'Fokus/Meditasi', icon: Brain },
    { name: 'Heart', label: 'Kesehatan', icon: Heart },
    { name: 'HeartPulse', label: 'Kebugaran', icon: HeartPulse },
    { name: 'Apple', label: 'Nutrisi Sehat', icon: Apple },
    { name: 'Utensils', label: 'Makan Teratur', icon: Utensils },
    { name: 'Coffee', label: 'Istirahat', icon: Coffee },
    { name: 'Moon', label: 'Tidur Cepat', icon: Moon },
    { name: 'Sun', label: 'Bangun Pagi', icon: Sun },
    { name: 'Wallet', label: 'Hemat/Finansial', icon: Wallet },
    { name: 'Target', label: 'Target Target', icon: Target },
    { name: 'Zap', label: 'Energi', icon: Zap },
    { name: 'Sparkles', label: 'Kebersihan', icon: Sparkles },
    { name: 'Compass', label: 'Spiritual', icon: Compass },
];

export const ICON_MAP = HABIT_ICONS.reduce((acc, curr) => {
    acc[curr.name] = curr.icon;
    return acc;
}, {
    CheckCircle2,
    Calendar,
    Clock,
    SunMedium,
    Folder,
    Flame,
    Activity,
    Briefcase,
    Smile,
});

export function HabitIcon({ name, className = 'w-5 h-5' }) {
    const Component = ICON_MAP[name] || Check;
    return <Component className={className} />;
}
