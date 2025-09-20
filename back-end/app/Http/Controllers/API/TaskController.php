<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Events\TaskCreated;

class TaskController extends Controller
{
    /**
     * Display a listing of the authenticated user’s tasks.
     */
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->get();
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created task for the authenticated user.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'nullable|in:In Progress,Completed,Canceled',
            'due_date'    => 'nullable|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = $request->user()->tasks()->create($validator->validated());

        event(new TaskCreated($task));
        return response()->json($task, 201);
    }

    /**
     * Display the specified task, ensuring it belongs to the user.
     */
    public function show(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($task, 200);
    }

    /**
     * Update the specified task for the authenticated user.
     */
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status'      => 'sometimes|required|in:In Progress,Completed,Canceled',
            'due_date'    => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task->update($validator->validated());

        return response()->json($task, 200);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(null, 204);
    }
}