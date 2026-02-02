<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:profiles,email',
            'password' => 'required|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:50',
            'role' => 'required|in:admin,entreprise,livreur',
            'entreprise_id' => 'nullable|uuid|exists:clients,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $profile = Profile::create($validated);
        $token = auth('api')->login($profile);

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $profile->only(['id', 'nom', 'email', 'telephone', 'role']),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required_without:telephone|email',
            'telephone' => 'required_without:email|string',
            'password' => 'required|string',
        ]);

        $field = isset($credentials['email']) ? 'email' : 'telephone';
        $value = $credentials[$field] ?? null;

        if (! $value || ! ($profile = Profile::where($field, $value)->first())) {
            throw ValidationException::withMessages([$field => [__('auth.failed')]]);
        }

        if (! Hash::check($credentials['password'], $profile->password)) {
            throw ValidationException::withMessages(['password' => [__('auth.password')]]);
        }

        $token = auth('api')->login($profile);

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $profile->only(['id', 'nom', 'email', 'telephone', 'role']),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }

    public function me(): JsonResponse
    {
        $user = auth('api')->user();
        return response()->json([
            'user' => $user->only(['id', 'nom', 'email', 'telephone', 'role', 'entreprise_id']),
        ]);
    }

    public function logout(): JsonResponse
    {
        auth('api')->logout();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function refresh(): JsonResponse
    {
        $token = auth('api')->refresh();
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }
}
