<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class DefaultCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kesehatan',
                'color' => '#10b981', // emerald-500
                'icon' => 'HeartPulse',
            ],
            [
                'name' => 'Belajar',
                'color' => '#3b82f6', // blue-500
                'icon' => 'BookOpen',
            ],
            [
                'name' => 'Produktivitas',
                'color' => '#8b5cf6', // purple-500
                'icon' => 'CheckCircle2',
            ],
            [
                'name' => 'Spiritual & Mental',
                'color' => '#f59e0b', // amber-500
                'icon' => 'Compass',
            ],
            [
                'name' => 'Gaya Hidup',
                'color' => '#ec4899', // pink-500
                'icon' => 'Sparkles',
            ],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['name' => $cat['name'], 'user_id' => null],
                $cat
            );
        }
    }
}
