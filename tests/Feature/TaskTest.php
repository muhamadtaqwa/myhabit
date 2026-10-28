<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_tasks_index(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/tasks');

        $response->assertStatus(200);
    }

    public function test_user_can_create_task(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/tasks', [
            'title' => 'Selesaikan laporan kerja',
            'description' => 'Bagian keuangan dan ringkasan bulan ini',
            'due_date' => Carbon::today()->toDateString(),
            'priority' => 'high',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', [
            'user_id' => $user->id,
            'title' => 'Selesaikan laporan kerja',
            'priority' => 'high',
            'is_completed' => false,
        ]);
    }

    public function test_user_can_toggle_task_completion(): void
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Beli air galon',
            'priority' => 'medium',
            'is_completed' => false,
        ]);

        $response = $this->actingAs($user)->post("/tasks/{$task->id}/toggle");

        $response->assertRedirect();
        $this->assertTrue($task->fresh()->is_completed);

        // Toggle back
        $response = $this->actingAs($user)->post("/tasks/{$task->id}/toggle");
        $response->assertRedirect();
        $this->assertFalse($task->fresh()->is_completed);
    }

    public function test_user_can_update_task(): void
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Tugas awal',
            'priority' => 'low',
            'is_completed' => false,
        ]);

        $response = $this->actingAs($user)->put("/tasks/{$task->id}", [
            'title' => 'Tugas baru direvisi',
            'priority' => 'high',
            'due_date' => Carbon::tomorrow()->toDateString(),
        ]);

        $response->assertRedirect();
        $this->assertEquals('Tugas baru direvisi', $task->fresh()->title);
        $this->assertEquals('high', $task->fresh()->priority);
    }

    public function test_user_can_delete_task(): void
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Tugas yang akan dihapus',
            'priority' => 'low',
            'is_completed' => false,
        ]);

        $response = $this->actingAs($user)->delete("/tasks/{$task->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_cannot_access_other_users_task(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $task = Task::create([
            'user_id' => $userA->id,
            'title' => 'Tugas rahasia User A',
            'priority' => 'high',
            'is_completed' => false,
        ]);

        $response = $this->actingAs($userB)->post("/tasks/{$task->id}/toggle");
        $response->assertStatus(403);
    }
}
