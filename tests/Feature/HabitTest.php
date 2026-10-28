<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HabitTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_today_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/today');

        $response->assertStatus(200);
    }

    public function test_user_can_create_habit(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/habits', [
            'title' => 'Bangun Jam 05:00',
            'time_of_day' => 'morning',
            'icon' => 'Sun',
            'color' => '#f59e0b',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('habits', [
            'user_id' => $user->id,
            'title' => 'Bangun Jam 05:00',
            'time_of_day' => 'morning',
        ]);
    }

    public function test_user_can_toggle_habit_completion(): void
    {
        $user = User::factory()->create();
        $habit = Habit::create([
            'user_id' => $user->id,
            'title' => 'Minum Air 2L',
            'time_of_day' => 'anytime',
            'icon' => 'Droplets',
            'color' => '#06b6d4',
        ]);

        $today = Carbon::today()->toDateString();

        // 1. Toggle ON -> creates log
        $response1 = $this->actingAs($user)->post("/habits/{$habit->id}/toggle", [
            'logged_date' => $today,
        ]);
        $response1->assertRedirect();

        $this->assertDatabaseHas('habit_logs', [
            'habit_id' => $habit->id,
            'user_id' => $user->id,
            'logged_date' => $today,
        ]);

        // 2. Toggle OFF -> removes log
        $response2 = $this->actingAs($user)->post("/habits/{$habit->id}/toggle", [
            'logged_date' => $today,
        ]);
        $response2->assertRedirect();

        $this->assertDatabaseMissing('habit_logs', [
            'habit_id' => $habit->id,
            'logged_date' => $today,
        ]);
    }

    public function test_user_can_archive_habit(): void
    {
        $user = User::factory()->create();
        $habit = Habit::create([
            'user_id' => $user->id,
            'title' => 'Olahraga',
            'time_of_day' => 'morning',
            'is_archived' => false,
        ]);

        $response = $this->actingAs($user)->post("/habits/{$habit->id}/archive");
        $response->assertRedirect();

        $this->assertDatabaseHas('habits', [
            'id' => $habit->id,
            'is_archived' => true,
        ]);
    }

    public function test_user_cannot_modify_other_user_habit(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $habit = Habit::create([
            'user_id' => $user1->id,
            'title' => 'Private Habit',
            'time_of_day' => 'morning',
        ]);

        $response = $this->actingAs($user2)->put("/habits/{$habit->id}", [
            'title' => 'Hacked',
            'time_of_day' => 'morning',
        ]);

        $response->assertStatus(403);
    }

    public function test_user_can_view_stats_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/stats');

        $response->assertStatus(200);
    }

    public function test_user_can_view_manage_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/habits/manage');

        $response->assertStatus(200);
    }
}
