<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitLog;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HabitLogController extends Controller
{
    /**
     * Toggle habit completion for a specific date.
     */
    public function toggle(Request $request, Habit $habit): RedirectResponse
    {
        $user = $request->user();

        if ($habit->user_id !== $user->id) {
            abort(403);
        }

        $date = $request->input('logged_date', Carbon::today()->toDateString());

        // Validate date format
        $parsedDate = Carbon::parse($date)->toDateString();

        $log = HabitLog::where('habit_id', $habit->id)
            ->where('logged_date', $parsedDate)
            ->first();

        if ($log) {
            $log->delete();
        } else {
            HabitLog::create([
                'habit_id' => $habit->id,
                'user_id' => $user->id,
                'logged_date' => $parsedDate,
                'status' => 'completed',
            ]);
        }

        return redirect()->back();
    }
}
