<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Produit::with('categorie');

        if ($request->filled('categorie_id')) {
            $query->where('categorie_id', $request->categorie_id);
        }
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nom', 'ilike', '%' . $request->search . '%')
                    ->orWhere('reference', 'ilike', '%' . $request->search . '%');
            });
        }

        $perPage = $request->integer('per_page', 15);
        $produits = $query->orderBy('nom')->paginate($perPage);

        return response()->json($produits);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'categorie_id' => 'nullable|uuid|exists:categories,id',
            'reference' => 'nullable|string|max:100',
            'poids_moyen' => 'nullable|numeric|min:0',
        ]);

        $produit = Produit::create($validated);
        $produit->load('categorie');

        return response()->json($produit, 201);
    }

    public function show(Produit $produit): JsonResponse
    {
        $produit->load('categorie');
        return response()->json($produit);
    }

    public function update(Request $request, Produit $produit): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'categorie_id' => 'nullable|uuid|exists:categories,id',
            'reference' => 'nullable|string|max:100',
            'poids_moyen' => 'nullable|numeric|min:0',
        ]);

        $produit->update($validated);
        $produit->load('categorie');

        return response()->json($produit);
    }

    public function destroy(Produit $produit): JsonResponse
    {
        $produit->delete();
        return response()->json(['message' => 'Produit supprimé'], 204);
    }
}
