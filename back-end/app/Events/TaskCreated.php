<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class TaskCreated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function broadcastOn()
    {
        return new Channel('tasks');
    }

    public function broadcastWith()
    {
        return [
            'message' => 'Une nouvelle tâche a été créée: ' . $this->task->title,
            'task_id' => $this->task->id,
            'created_at' => now()->toIso8601String()
        ];
    }
}