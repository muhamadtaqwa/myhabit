<?php

namespace App\Services;

use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class StreakService
{
    /**
     * Calculate the current streak for a given habit.
     */
    public function calculateCurrentStreak(Habit $habit, ?string $asOfDate = null): int
    {
        $today = $asOfDate ? Carbon::parse($asOfDate)->startOfDay() : Carbon::today();
        $yesterday = $today->copy()->subDay();

        $completedDates = $habit->logs()
            ->where('status', 'completed')
            ->where('logged_date', '<=', $today->toDateString())
            ->pluck('logged_date')
            ->map(fn($date) => Carbon::parse($date)->toDateString())
            ->flip();

        $streak = 0;
        $checkDate = $today->copy();

        // If today is not completed, check if yesterday was completed to keep streak alive
        if (!$completedDates->has($checkDate->toDateString())) {
            $checkDate = $yesterday->copy();
            if (!$completedDates->has($checkDate->toDateString())) {
                return 0;
            }
        }

        // Count consecutive days backwards
        while ($completedDates->has($checkDate->toDateString())) {
            $streak++;
            $checkDate->subDay();
        }

        return $streak;
    }

    /**
     * Calculate the longest/best streak ever for a given habit.
     */
    public function calculateLongestStreak(Habit $habit): int
    {
        $dates = $habit->logs()
            ->where('status', 'completed')
            ->orderBy('logged_date', 'asc')
            ->pluck('logged_date')
            ->unique()
            ->map(fn($date) => Carbon::parse($date)->startOfDay())
            ->values();

        if ($dates->isEmpty()) {
            return 0;
        }

        $maxStreak = 1;
        $currentStreak = 1;

        for ($i = 1; $i < $dates->count(); $i++) {
            $prevDate = $dates[$i - 1];
            $currentDate = $dates[$i];

            $diffInDays = (int) round($prevDate->diffInDays($currentDate));

            if ($diffInDays === 1) {
                $currentStreak++;
                if ($currentStreak > $maxStreak) {
                    $maxStreak = $currentStreak;
                }
            } elseif ($diffInDays > 1) {
                $currentStreak = 1;
            }
        }

        // Longest streak should also never be less than the current active streak
        $activeCurrentStreak = $this->calculateCurrentStreak($habit);

        return max($maxStreak, $activeCurrentStreak);
    }

    /**
     * Get completion summary for a specific date.
     */
    public function getDailySummary(int $userId, string $date): array
    {
        $totalHabits = Habit::where('user_id', $userId)
            ->where('is_archived', false)
            ->count();

        $completedCount = HabitLog::where('user_id', $userId)
            ->where('logged_date', $date)
            ->where('status', 'completed')
            ->whereHas('habit', function ($query) {
                $query->where('is_archived', false);
            })
            ->count();

        $percentage = $totalHabits > 0 ? (int) round(($completedCount / $totalHabits) * 100) : 0;

        return [
            'date' => $date,
            'total' => $totalHabits,
            'completed' => $completedCount,
            'percentage' => $percentage,
        ];
    }

    /**
     * Get weekly matrix (last 7 days up to specified date).
     */
    public function getWeeklyMatrix(int $userId, string $referenceDate): array
    {
        $end = Carbon::parse($referenceDate)->startOfDay();
        $days = [];

        // 7 days ending at referenceDate
        for ($i = 6; $i >= 0; $i--) {
            $d = $end->copy()->subDays($i);
            $dateStr = $d->toDateString();
            $summary = $this->getDailySummary($userId, $dateStr);

            $days[] = [
                'date' => $dateStr,
                'day_name' => $d->locale('id')->isoFormat('ddd'),
                'day_number' => $d->format('d'),
                'is_today' => $d->isToday(),
                'total' => $summary['total'],
                'completed' => $summary['completed'],
                'percentage' => $summary['percentage'],
            ];
        }

        return $days;
    }
}
