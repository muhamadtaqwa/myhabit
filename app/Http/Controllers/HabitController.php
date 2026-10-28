<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHabitRequest;
use App\Http\Requests\UpdateHabitRequest;
use App\Models\Category;
use App\Models\Habit;
use App\Services\StreakService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HabitController extends Controller
{
    public function __construct(
        protected StreakService $streakService
    ) {}

    /**
     * Display today's habit checklist.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $selectedDate = $request->input('date', Carbon::today()->toDateString());
        $parsedDate = Carbon::parse($selectedDate)->startOfDay();

        // 7-day strip (3 days before, selected date, 3 days after)
        $dateStrip = [];
        for ($i = -3; $i <= 3; $i++) {
            $d = $parsedDate->copy()->addDays($i);
            $dStr = $d->toDateString();
            $summary = $this->streakService->getDailySummary($user->id, $dStr);

            $dateStrip[] = [
                'date' => $dStr,
                'day_name' => $d->locale('id')->isoFormat('ddd'),
                'day_number' => $d->format('j'),
                'is_today' => $d->isToday(),
                'is_selected' => $dStr === $selectedDate,
                'completed' => $summary['completed'],
                'total' => $summary['total'],
                'percentage' => $summary['percentage'],
            ];
        }

        // Active habits with status on selectedDate
        $habits = Habit::with(['category'])
            ->where('user_id', $user->id)
            ->where('is_archived', false)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function (Habit $habit) use ($selectedDate) {
                $isCompleted = $habit->logs()
                    ->where('logged_date', $selectedDate)
                    ->where('status', 'completed')
                    ->exists();

                return [
                    'id' => $habit->id,
                    'title' => $habit->title,
                    'description' => $habit->description,
                    'icon' => $habit->icon,
                    'color' => $habit->color,
                    'time_of_day' => $habit->time_of_day,
                    'category' => $habit->category ? [
                        'id' => $habit->category->id,
                        'name' => $habit->category->name,
                        'color' => $habit->category->color,
                        'icon' => $habit->category->icon,
                    ] : null,
                    'is_completed' => $isCompleted,
                    'current_streak' => $this->streakService->calculateCurrentStreak($habit, $selectedDate),
                ];
            });

        $categories = Category::where(function ($q) use ($user) {
            $q->whereNull('user_id')->orWhere('user_id', $user->id);
        })->get();

        $dailySummary = $this->streakService->getDailySummary($user->id, $selectedDate);

        return Inertia::render('Today', [
            'habits' => $habits,
            'selectedDate' => $selectedDate,
            'dateStrip' => $dateStrip,
            'categories' => $categories,
            'dailySummary' => $dailySummary,
        ]);
    }

    /**
     * Store a newly created habit.
     */
    public function store(StoreHabitRequest $request): RedirectResponse
    {
        $user = $request->user();

        $maxSort = Habit::where('user_id', $user->id)->max('sort_order') ?? 0;

        $user->habits()->create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'icon' => $request->icon ?? 'Check',
            'color' => $request->color ?? '#3b82f6',
            'time_of_day' => $request->time_of_day,
            'sort_order' => $maxSort + 1,
        ]);

        return redirect()->back()->with('success', 'Habit berhasil ditambahkan.');
    }

    /**
     * Update the specified habit.
     */
    public function update(UpdateHabitRequest $request, Habit $habit): RedirectResponse
    {
        $this->authorizeHabit($habit, $request->user());

        $habit->update($request->validated());

        return redirect()->back()->with('success', 'Habit berhasil diperbarui.');
    }

    /**
     * Remove the specified habit.
     */
    public function destroy(Request $request, Habit $habit): RedirectResponse
    {
        $this->authorizeHabit($habit, $request->user());

        $habit->delete();

        return redirect()->back()->with('success', 'Habit berhasil dihapus.');
    }

    /**
     * Toggle archive status of the habit.
     */
    public function archive(Request $request, Habit $habit): RedirectResponse
    {
        $this->authorizeHabit($habit, $request->user());

        $habit->update(['is_archived' => !$habit->is_archived]);

        $message = $habit->is_archived ? 'Habit diarsipkan.' : 'Habit diaktifkan kembali.';

        return redirect()->back()->with('success', $message);
    }

    /**
     * Manage all habits screen (active & archived).
     */
    public function manage(Request $request): Response
    {
        $user = $request->user();

        $habits = Habit::with('category')
            ->where('user_id', $user->id)
            ->orderBy('is_archived', 'asc')
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::where(function ($q) use ($user) {
            $q->whereNull('user_id')->orWhere('user_id', $user->id);
        })->get();

        return Inertia::render('Habits/Index', [
            'habits' => $habits,
            'categories' => $categories,
        ]);
    }

    protected function authorizeHabit(Habit $habit, $user): void
    {
        if ($habit->user_id !== $user->id) {
            abort(403);
        }
    }
}
