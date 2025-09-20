<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

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
            'token'   => $token,
            'user'    => $user,
        ], 201);
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
            'token'   => $token,
            'user'    => auth()->user(),
        ]);
    }

    /**
    * Display the authenticated user’s profile.
    */
    public function profile(Request $request)
    {
        return response()->json($request->user(), 200);
    }
}
