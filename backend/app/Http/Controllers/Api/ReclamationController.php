<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reclamation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReclamationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Reclamation::with(['colis', 'client']);

        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }
        if ($request->filled('colis_id')) {
            $query->where('colis_id', $request->colis_id);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('search')) {
            $query->where('description', 'ilike', '%' . $request->search . '%')
                ->orWhere('type', 'ilike', '%' . $request->search . '%');
        }

        $perPage = $request->integer('per_page', 15);
        $reclamations = $query->orderByDesc('created_at')->paginate($perPage);

        return response()->json($reclamations);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'colis_id' => 'required|uuid|exists:colis,id',
            'client_id' => 'required|uuid|exists:clients,id',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'string',
        ]);

        $reclamation = Reclamation::create($validated);
        $reclamation->load(['colis', 'client']);

        return response()->json($reclamation, 201);
    }

    public function show(Reclamation $reclamation): JsonResponse
    {
        $reclamation->load(['colis', 'client']);
        return response()->json($reclamation);
    }

    public function update(Request $request, Reclamation $reclamation): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'string',
        ]);

        $reclamation->update($validated);
        $reclamation->load(['colis', 'client']);

        return response()->json($reclamation);
    }

    public function destroy(Reclamation $reclamation): JsonResponse
    {
        $reclamation->delete();
        return response()->json(['message' => 'Réclamation supprimée'], 204);
    }
}
