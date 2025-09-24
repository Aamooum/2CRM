<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserNotification;

class NotificationController extends Controller
{
    /**
     * Get a list of notifications for the authenticated user.
     */
    public function index(Request $request)
    {
        $notifications = UserNotification::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($notifications);
    }

    /**
     * Store a new notification.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $notification = UserNotification::create([
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
        ]);

        return response()->json($notification, 201);
    }
}