<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SampleHabitSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'taqwa@myhabit.test'],
            [
                'name' => 'Taqwa',
                'password' => Hash::make('password123'),
            ]
        );

        $healthCat = Category::where('name', 'Kesehatan')->first();
        $learnCat = Category::where('name', 'Belajar')->first();
        $prodCat = Category::where('name', 'Produktivitas')->first();

        $sampleHabits = [
            [
                'title' => 'Bangun Jam 05:00',
                'description' => 'Memulai hari lebih awal secara teratur',
                'time_of_day' => 'morning',
                'icon' => 'Sun',
                'color' => '#f59e0b',
                'category_id' => $healthCat?->id,
            ],
            [
                'title' => 'Minum Air Putih 2 Liter',
                'description' => 'Menjaga hidrasi tubuh sepanjang hari',
                'time_of_day' => 'anytime',
                'icon' => 'Droplets',
                'color' => '#06b6d4',
                'category_id' => $healthCat?->id,
            ],
            [
                'title' => 'Olahraga Ringan 20 Menit',
                'description' => 'Stretching, push-up, atau jalan santai',
                'time_of_day' => 'morning',
                'icon' => 'Dumbbell',
                'color' => '#10b981',
                'category_id' => $healthCat?->id,
            ],
            [
                'title' => 'Membaca Buku 15 Menit',
                'description' => 'Membaca buku non-fiksi atau artikel mendalam',
                'time_of_day' => 'evening',
                'icon' => 'BookOpen',
                'color' => '#3b82f6',
                'category_id' => $learnCat?->id,
            ],
            [
                'title' => 'Evaluasi & Rencana Besok',
                'description' => 'Meninjau checklist hari ini dan menyusun agenda esok hari',
                'time_of_day' => 'evening',
                'icon' => 'CheckCircle2',
                'color' => '#8b5cf6',
                'category_id' => $prodCat?->id,
            ],
        ];

        $today = Carbon::today();

        foreach ($sampleHabits as $index => $hData) {
            $habit = Habit::firstOrCreate(
                ['user_id' => $user->id, 'title' => $hData['title']],
                array_merge($hData, ['user_id' => $user->id, 'sort_order' => $index + 1])
            );

            // Add simulated streak logs for the last few days
            $streakDays = [4, 5, 2, 7, 3][$index % 5];
            for ($d = 0; $d < $streakDays; $d++) {
                $logDate = $today->copy()->subDays($d)->toDateString();
                HabitLog::firstOrCreate(
                    ['habit_id' => $habit->id, 'logged_date' => $logDate],
                    [
                        'user_id' => $user->id,
                        'status' => 'completed',
                    ]
                );
            }
        }
    }
}
