<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Services\StreakService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatsController extends Controller
{
    public function __construct(
        protected StreakService $streakService
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $today = Carbon::today();
        $thirtyDaysAgo = $today->copy()->subDays(30);

        // Weekly matrix (last 7 days)
        $weeklyMatrix = $this->streakService->getWeeklyMatrix($user->id, $today->toDateString());

        // Habits with streak statistics
        $habits = Habit::where('user_id', $user->id)
            ->where('is_archived', false)
            ->get()
            ->map(function (Habit $habit) use ($today, $thirtyDaysAgo) {
                $completedLast30 = $habit->logs()
                    ->where('status', 'completed')
                    ->whereBetween('logged_date', [$thirtyDaysAgo->toDateString(), $today->toDateString()])
                    ->count();

                $totalCompletions = $habit->logs()
                    ->where('status', 'completed')
                    ->count();

                return [
                    'id' => $habit->id,
                    'title' => $habit->title,
                    'icon' => $habit->icon,
                    'color' => $habit->color,
                    'time_of_day' => $habit->time_of_day,
                    'current_streak' => $this->streakService->calculateCurrentStreak($habit),
                    'longest_streak' => $this->streakService->calculateLongestStreak($habit),
                    'completed_last_30' => $completedLast30,
                    'total_completions' => $totalCompletions,
                    'success_rate_30' => (int) round(($completedLast30 / 30) * 100),
                ];
            });

        // Overall summary statistics
        $totalActiveHabits = $habits->count();
        $bestCurrentStreak = $habits->max('current_streak') ?? 0;
        $bestAllTimeStreak = $habits->max('longest_streak') ?? 0;

        $totalLogsLast30 = HabitLog::where('user_id', $user->id)
            ->where('status', 'completed')
            ->whereBetween('logged_date', [$thirtyDaysAgo->toDateString(), $today->toDateString()])
            ->count();

        $potentialTotalLogs = $totalActiveHabits * 30;
        $overallRate30 = $potentialTotalLogs > 0 ? (int) round(($totalLogsLast30 / $potentialTotalLogs) * 100) : 0;

        // Weekly average percentage
        $weeklyAverage = count($weeklyMatrix) > 0
            ? (int) round(collect($weeklyMatrix)->avg('percentage'))
            : 0;

        // Time of day distribution
        $timeLabels = [
            'morning' => ['name' => 'Pagi', 'color' => '#f59e0b'],
            'afternoon' => ['name' => 'Siang', 'color' => '#0284c7'],
            'evening' => ['name' => 'Malam', 'color' => '#6366f1'],
            'anytime' => ['name' => 'Kapan Saja', 'color' => '#10b981'],
        ];

        $timeDistribution = $habits
            ->groupBy(fn($h) => $h['time_of_day'] ?: 'anytime')
            ->map(function ($items, $timeKey) use ($totalActiveHabits, $timeLabels) {
                $meta = $timeLabels[$timeKey] ?? $timeLabels['anytime'];
                $count = $items->count();
                return [
                    'name' => $meta['name'],
                    'color' => $meta['color'],
                    'count' => $count,
                    'percentage' => $totalActiveHabits > 0 ? (int) round(($count / $totalActiveHabits) * 100) : 0,
                ];
            })
            ->values();

        // Tasks summary
        $totalTasks = $user->tasks()->count();
        $completedTasks = $user->tasks()->where('is_completed', true)->count();
        $taskRate = $totalTasks > 0 ? (int) round(($completedTasks / $totalTasks) * 100) : 0;

        return Inertia::render('Stats', [
            'weeklyMatrix' => $weeklyMatrix,
            'habits' => $habits,
            'timeDistribution' => $timeDistribution,
            'metrics' => [
                'total_habits' => $totalActiveHabits,
                'best_current_streak' => $bestCurrentStreak,
                'best_all_time_streak' => $bestAllTimeStreak,
                'overall_rate_30' => $overallRate30,
                'total_completions_30' => $totalLogsLast30,
                'weekly_average' => $weeklyAverage,
                'tasks_total' => $totalTasks,
                'tasks_completed' => $completedTasks,
                'tasks_rate' => $taskRate,
            ],
        ]);
    }
}
