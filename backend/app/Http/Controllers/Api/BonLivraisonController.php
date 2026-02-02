<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BonLivraison;
use App\Models\Colis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BonLivraisonController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = BonLivraison::with(['colis.expediteur', 'colis.destinataire']);

        if ($request->filled('statut')) {
            $query->whereHas('colis', fn ($q) => $q->where('statut', $request->statut));
        }
        if ($request->filled('search')) {
            $query->where('nom_client', 'ilike', '%' . $request->search . '%');
        }

        $perPage = $request->integer('per_page', 15);
        $bons = $query->orderByDesc('date_livraison')->paginate($perPage);

        return response()->json($bons);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'colis_id' => 'required|uuid|exists:colis,id',
            'photo_preuve' => 'nullable|array',
            'photo_preuve.*' => 'string',
            'signature_client' => 'nullable|string',
            'nom_client' => 'nullable|string|max:255',
            'date_livraison' => 'nullable|date',
        ]);

        $bon = BonLivraison::create($validated);
        $bon->load(['colis.expediteur', 'colis.destinataire']);

        return response()->json($bon, 201);
    }

    public function show(BonLivraison $bonLivraison): JsonResponse
    {
        $bonLivraison->load(['colis.expediteur', 'colis.destinataire', 'colis.villeArrivee']);
        return response()->json($bonLivraison);
    }

    public function update(Request $request, BonLivraison $bonLivraison): JsonResponse
    {
        $validated = $request->validate([
            'photo_preuve' => 'nullable|array',
            'photo_preuve.*' => 'string',
            'signature_client' => 'nullable|string',
            'nom_client' => 'nullable|string|max:255',
            'date_livraison' => 'nullable|date',
        ]);

        $bonLivraison->update($validated);
        $bonLivraison->load(['colis.expediteur', 'colis.destinataire']);

        return response()->json($bonLivraison);
    }

    public function destroy(BonLivraison $bonLivraison): JsonResponse
    {
        $bonLivraison->delete();
        return response()->json(['message' => 'Bon de livraison supprimé'], 204);
    }
}
