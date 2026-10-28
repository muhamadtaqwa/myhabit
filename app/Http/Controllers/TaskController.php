<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display the task list.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $tasks = Task::where('user_id', $user->id)
            ->orderBy('is_completed', 'asc')
            ->orderByRaw("CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 ELSE 4 END")
            ->orderBy('due_date', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        $pendingCount = $tasks->where('is_completed', false)->count();
        $completedCount = $tasks->where('is_completed', true)->count();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'summary' => [
                'total' => $tasks->count(),
                'pending' => $pendingCount,
                'completed' => $completedCount,
            ],
        ]);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:500'],
            'due_date' => ['nullable', 'date'],
            'priority' => ['required', 'in:low,medium,high'],
        ]);

        $request->user()->tasks()->create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_date' => $validated['due_date'] ?? Carbon::today()->toDateString(),
            'priority' => $validated['priority'],
            'is_completed' => false,
        ]);

        return redirect()->back()->with('success', 'Tugas berhasil ditambahkan.');
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task): RedirectResponse
    {
        $this->authorizeTask($task, $request->user());

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:500'],
            'due_date' => ['nullable', 'date'],
            'priority' => ['required', 'in:low,medium,high'],
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Tugas berhasil diperbarui.');
    }

    /**
     * Toggle the completion status of a task.
     */
    public function toggle(Request $request, Task $task): RedirectResponse
    {
        $this->authorizeTask($task, $request->user());

        $newStatus = !$task->is_completed;
        $task->update([
            'is_completed' => $newStatus,
            'completed_at' => $newStatus ? now() : null,
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Request $request, Task $task): RedirectResponse
    {
        $this->authorizeTask($task, $request->user());

        $task->delete();

        return redirect()->back()->with('success', 'Tugas berhasil dihapus.');
    }

    protected function authorizeTask(Task $task, $user): void
    {
        if ($task->user_id !== $user->id) {
            abort(403);
        }
    }
}
