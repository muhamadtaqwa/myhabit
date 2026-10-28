<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Task;
use App\Models\User;
use App\Services\StreakService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ComprehensiveLogicTest extends TestCase
{
    use RefreshDatabase;

    private StreakService $streakService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->streakService = app(StreakService::class);
    }

    /**
     * 1. Test empty state: user with 0 habits and 0 tasks
     */
    public function test_empty_state_user_views_all_pages_without_errors(): void
    {
        $user = User::factory()->create();

        // Today page
        $resToday = $this->actingAs($user)->get('/today');
        $resToday->assertStatus(200);

        // Tasks page
        $resTasks = $this->actingAs($user)->get('/tasks');
        $resTasks->assertStatus(200);

        // Stats page (verifies zero division protection)
        $resStats = $this->actingAs($user)->get('/stats');
        $resStats->assertStatus(200);

        // Manage page
        $resManage = $this->actingAs($user)->get('/habits/manage');
        $resManage->assertStatus(200);
    }

    /**
     * 2. Test habit creation with valid and invalid values
     */
    public function test_habit_validation_rules(): void
    {
        $user = User::factory()->create();

        // Valid creation
        $resValid = $this->actingAs($user)->post('/habits', [
            'title' => 'Membaca Buku 15 Menit',
            'time_of_day' => 'evening',
            'icon' => 'BookOpen',
            'color' => '#6366f1',
        ]);
        $resValid->assertRedirect();
        $this->assertDatabaseHas('habits', [
            'user_id' => $user->id,
            'title' => 'Membaca Buku 15 Menit',
            'time_of_day' => 'evening',
        ]);

        // Invalid: missing title
        $resNoTitle = $this->actingAs($user)->post('/habits', [
            'title' => '',
            'time_of_day' => 'morning',
        ]);
        $resNoTitle->assertSessionHasErrors(['title']);

        // Invalid: invalid time_of_day
        $resBadTime = $this->actingAs($user)->post('/habits', [
            'title' => 'Habit Aneh',
            'time_of_day' => 'midnight_party',
        ]);
        $resBadTime->assertSessionHasErrors(['time_of_day']);
    }

    /**
     * 3. Test comprehensive streak calculation logic
     */
    public function test_streak_calculation_accurately_tracks_consecutive_days(): void
    {
        $user = User::factory()->create();
        $habit = Habit::create([
            'user_id' => $user->id,
            'title' => 'Lari Pagi',
            'time_of_day' => 'morning',
        ]);

        $today = Carbon::today();

        // Case A: 0 logs -> streak 0, longest 0
        $this->assertEquals(0, $this->streakService->calculateCurrentStreak($habit));
        $this->assertEquals(0, $this->streakService->calculateLongestStreak($habit));

        // Case B: Completed today -> streak 1, longest 1
        HabitLog::create([
            'habit_id' => $habit->id,
            'user_id' => $user->id,
            'logged_date' => $today->toDateString(),
            'status' => 'completed',
        ]);
        $this->assertEquals(1, $this->streakService->calculateCurrentStreak($habit));
        $this->assertEquals(1, $this->streakService->calculateLongestStreak($habit));

        // Case C: 3 consecutive days (today, yesterday, 2 days ago)
        HabitLog::create([
            'habit_id' => $habit->id,
            'user_id' => $user->id,
            'logged_date' => $today->copy()->subDays(1)->toDateString(),
            'status' => 'completed',
        ]);
        HabitLog::create([
            'habit_id' => $habit->id,
            'user_id' => $user->id,
            'logged_date' => $today->copy()->subDays(2)->toDateString(),
            'status' => 'completed',
        ]);
        $this->assertEquals(3, $this->streakService->calculateCurrentStreak($habit));
        $this->assertEquals(3, $this->streakService->calculateLongestStreak($habit));

        // Case D: Historical longer streak
        // Gap at subDays(3). Past streak from subDays(4) to subDays(8) (5 consecutive days)
        for ($i = 4; $i <= 8; $i++) {
            HabitLog::create([
                'habit_id' => $habit->id,
                'user_id' => $user->id,
                'logged_date' => $today->copy()->subDays($i)->toDateString(),
                'status' => 'completed',
            ]);
        }
        // Current streak should be 3, but longest streak should be 5!
        $this->assertEquals(3, $this->streakService->calculateCurrentStreak($habit));
        $this->assertEquals(5, $this->streakService->calculateLongestStreak($habit));
    }

    /**
     * 4. Test habit toggle mechanism (toggle on & toggle off)
     */
    public function test_habit_log_toggle_on_and_off(): void
    {
        $user = User::factory()->create();
        $habit = Habit::create([
            'user_id' => $user->id,
            'title' => 'Minum Air Putih',
            'time_of_day' => 'anytime',
        ]);

        $today = Carbon::today()->toDateString();

        // 1st toggle: complete
        $res1 = $this->actingAs($user)->post("/habits/{$habit->id}/toggle", [
            'date' => $today,
        ]);
        $res1->assertRedirect();
        $this->assertDatabaseHas('habit_logs', [
            'habit_id' => $habit->id,
            'logged_date' => $today,
            'status' => 'completed',
        ]);

        // 2nd toggle: uncomplete (revert)
        $res2 = $this->actingAs($user)->post("/habits/{$habit->id}/toggle", [
            'date' => $today,
        ]);
        $res2->assertRedirect();
        $this->assertDatabaseMissing('habit_logs', [
            'habit_id' => $habit->id,
            'logged_date' => $today,
        ]);
    }

    /**
     * 5. Test habit archiving & unarchiving
     */
    public function test_habit_archive_and_unarchive(): void
    {
        $user = User::factory()->create();
        $habit = Habit::create([
            'user_id' => $user->id,
            'title' => 'Habit Sementara',
            'is_archived' => false,
        ]);

        // Archive
        $resArchive = $this->actingAs($user)->post("/habits/{$habit->id}/archive");
        $resArchive->assertRedirect();
        $this->assertTrue($habit->fresh()->is_archived);

        // Unarchive
        $resUnarchive = $this->actingAs($user)->post("/habits/{$habit->id}/archive");
        $resUnarchive->assertRedirect();
        $this->assertFalse($habit->fresh()->is_archived);
    }

    /**
     * 6. Test task creation, toggle, update, delete
     */
    public function test_task_full_lifecycle(): void
    {
        $user = User::factory()->create();

        // Create
        $resCreate = $this->actingAs($user)->post('/tasks', [
            'title' => 'Bayar Tagihan Listrik',
            'priority' => 'high',
            'due_date' => Carbon::today()->toDateString(),
        ]);
        $resCreate->assertRedirect();
        $task = Task::where('user_id', $user->id)->first();
        $this->assertNotNull($task);
        $this->assertFalse($task->is_completed);

        // Toggle to completed
        $resToggle = $this->actingAs($user)->post("/tasks/{$task->id}/toggle");
        $resToggle->assertRedirect();
        $task->refresh();
        $this->assertTrue($task->is_completed);
        $this->assertNotNull($task->completed_at);

        // Toggle back to pending
        $resToggleBack = $this->actingAs($user)->post("/tasks/{$task->id}/toggle");
        $resToggleBack->assertRedirect();
        $task->refresh();
        $this->assertFalse($task->is_completed);
        $this->assertNull($task->completed_at);

        // Update
        $resUpdate = $this->actingAs($user)->put("/tasks/{$task->id}", [
            'title' => 'Bayar Tagihan Listrik & Internet',
            'priority' => 'medium',
            'due_date' => Carbon::tomorrow()->toDateString(),
        ]);
        $resUpdate->assertRedirect();
        $task->refresh();
        $this->assertEquals('Bayar Tagihan Listrik & Internet', $task->title);
        $this->assertEquals('medium', $task->priority);

        // Delete
        $resDelete = $this->actingAs($user)->delete("/tasks/{$task->id}");
        $resDelete->assertRedirect();
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /**
     * 7. Test cross-user security (User B cannot tamper with User A's data)
     */
    public function test_cross_user_isolation_security(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $habitA = Habit::create([
            'user_id' => $userA->id,
            'title' => 'Habit User A',
            'is_archived' => false,
        ]);

        $taskA = Task::create([
            'user_id' => $userA->id,
            'title' => 'Task User A',
            'priority' => 'high',
            'is_completed' => false,
        ]);

        // User B tries to toggle habit A -> 403
        $this->actingAs($userB)->post("/habits/{$habitA->id}/toggle")->assertStatus(403);

        // User B tries to update habit A -> 403
        $this->actingAs($userB)->put("/habits/{$habitA->id}", [
            'title' => 'Hacked',
        ])->assertStatus(403);

        // User B tries to archive habit A -> 403
        $this->actingAs($userB)->post("/habits/{$habitA->id}/archive")->assertStatus(403);

        // User B tries to delete habit A -> 403
        $this->actingAs($userB)->delete("/habits/{$habitA->id}")->assertStatus(403);

        // User B tries to toggle task A -> 403
        $this->actingAs($userB)->post("/tasks/{$taskA->id}/toggle")->assertStatus(403);

        // User B tries to update task A -> 403
        $this->actingAs($userB)->put("/tasks/{$taskA->id}", [
            'title' => 'Hacked',
            'priority' => 'low',
        ])->assertStatus(403);

        // User B tries to delete task A -> 403
        $this->actingAs($userB)->delete("/tasks/{$taskA->id}")->assertStatus(403);
    }

    /**
     * 8. Test Weekly Matrix & Stats Calculations
     */
    public function test_weekly_matrix_and_stats_calculations(): void
    {
        $user = User::factory()->create();
        $cat = Category::create([
            'name' => 'Kebugaran',
            'color' => '#10b981',
            'icon' => 'Activity',
        ]);

        $habit1 = Habit::create([
            'user_id' => $user->id,
            'category_id' => $cat->id,
            'title' => 'Push Up 30x',
            'time_of_day' => 'morning',
        ]);

        $habit2 = Habit::create([
            'user_id' => $user->id,
            'category_id' => $cat->id,
            'title' => 'Plank 2 Menit',
            'time_of_day' => 'evening',
        ]);

        $today = Carbon::today()->toDateString();

        // Complete 1 out of 2 habits today
        HabitLog::create([
            'habit_id' => $habit1->id,
            'user_id' => $user->id,
            'logged_date' => $today,
            'status' => 'completed',
        ]);

        // Weekly matrix should have 7 days
        $weeklyMatrix = $this->streakService->getWeeklyMatrix($user->id, $today);
        $this->assertCount(7, $weeklyMatrix);

        // Today's percentage should be 50%
        $todayEntry = collect($weeklyMatrix)->firstWhere('is_today', true);
        $this->assertNotNull($todayEntry);
        $this->assertEquals(2, $todayEntry['total']);
        $this->assertEquals(1, $todayEntry['completed']);
        $this->assertEquals(50, $todayEntry['percentage']);

        // Stats page renders properly with calculated distribution
        $resStats = $this->actingAs($user)->get('/stats');
        $resStats->assertStatus(200);
    }
}
