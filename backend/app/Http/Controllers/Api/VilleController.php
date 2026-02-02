<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ville;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Ville::withCount(['secteurs', 'clients']);

        if ($request->filled('search')) {
            $query->where('nom', 'ilike', '%' . $request->search . '%')
                ->orWhere('pays', 'ilike', '%' . $request->search . '%');
        }

        $perPage = $request->integer('per_page', 15);
        $villes = $query->orderBy('nom')->paginate($perPage);

        return response()->json($villes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'pays' => 'required|string|max:100',
        ]);

        $ville = Ville::create($validated);
        return response()->json($ville, 201);
    }

    public function show(Ville $ville): JsonResponse
    {
        $ville->load(['secteurs']);
        return response()->json($ville);
    }

    public function update(Request $request, Ville $ville): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'pays' => 'sometimes|string|max:100',
        ]);

        $ville->update($validated);
        return response()->json($ville);
    }

    public function destroy(Ville $ville): JsonResponse
    {
        $ville->delete();
        return response()->json(['message' => 'Ville supprimée'], 204);
    }
}
