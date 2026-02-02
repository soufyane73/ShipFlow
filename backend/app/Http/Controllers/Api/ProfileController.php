<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Profile::with('entreprise');

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }
        if ($request->filled('search')) {
            $query->where('nom', 'ilike', '%' . $request->search . '%')
                ->orWhere('telephone', 'ilike', '%' . $request->search . '%')
                ->orWhere('email', 'ilike', '%' . $request->search . '%');
        }

        $perPage = $request->integer('per_page', 15);
        $profiles = $query->orderBy('nom')->paginate($perPage);

        return response()->json($profiles);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'nullable|email|unique:profiles,email',
            'password' => 'required|string|min:8',
            'telephone' => 'nullable|string|max:50',
            'role' => 'required|in:admin,entreprise,livreur',
            'entreprise_id' => 'nullable|uuid|exists:clients,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $profile = Profile::create($validated);
        $profile->load('entreprise');

        return response()->json($profile->makeHidden('password'), 201);
    }

    public function show(Profile $profile): JsonResponse
    {
        $profile->load(['entreprise', 'courses']);
        return response()->json($profile->makeHidden('password'));
    }

    public function update(Request $request, Profile $profile): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'nullable|email|unique:profiles,email,' . $profile->id,
            'password' => 'nullable|string|min:8',
            'telephone' => 'nullable|string|max:50',
            'role' => 'sometimes|in:admin,entreprise,livreur',
            'entreprise_id' => 'nullable|uuid|exists:clients,id',
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $profile->update($validated);
        $profile->load('entreprise');

        return response()->json($profile->makeHidden('password'));
    }

    public function destroy(Profile $profile): JsonResponse
    {
        $profile->delete();
        return response()->json(['message' => 'Profil supprimé'], 204);
    }
}
