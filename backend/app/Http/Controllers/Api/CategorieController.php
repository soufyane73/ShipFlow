<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Categorie::withCount('produits');
        if ($request->filled('search')) {
            $query->where('nom', 'ilike', '%' . $request->search . '%');
        }
        $categories = $query->orderBy('nom')->get();
        return response()->json($categories);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate(['nom' => 'required|string|max:255']);
        $categorie = Categorie::create($validated);
        return response()->json($categorie, 201);
    }

    public function show(Categorie $categorie): JsonResponse
    {
        $categorie->load('produits');
        return response()->json($categorie);
    }

    public function update(Request $request, Categorie $categorie): JsonResponse
    {
        $validated = $request->validate(['nom' => 'sometimes|string|max:255']);
        $categorie->update($validated);
        return response()->json($categorie);
    }

    public function destroy(Categorie $categorie): JsonResponse
    {
        $categorie->delete();
        return response()->json(['message' => 'Catégorie supprimée'], 204);
    }
}
