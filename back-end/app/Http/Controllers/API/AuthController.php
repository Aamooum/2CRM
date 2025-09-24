<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register a new user and return a JWT token.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name'    => 'required|string|max:255',
            'email'        => 'required|string|email|max:255|unique:users',
            'phone_number' => 'nullable|string|max:20',
            'address'      => 'nullable|string|max:500',
            'image'        => 'nullable|url',
            'password'     => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'full_name'    => $request->full_name,
            'email'        => $request->email,
            'phone_number' => $request->phone_number,
            'address'      => $request->address,
            'image'        => $request->image,
            'password'     => $request->password,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user,
        ], 201)
        ->cookie('token', $token, 60, null, null, false, true);
    }

    /**
     * Authenticate a user and return a JWT token.
     */
     public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user'    => auth()->user(),
        ])
        ->cookie('token', $token, 60, null, null, false, true);
    }

    /**
     * Log the user out (invalidate the cookie).
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out'])
            ->cookie('token', '', -1, null, null, false, true); 
    }

    /**
    * Display the authenticated user’s profile.
    */
    public function profile(Request $request)
    {
        return response()->json($request->user(), 200);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $user->update($request->only([
            'full_name',
            'phone_number',
            'address'
        ]));

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user
        ]);
    }
    
}
