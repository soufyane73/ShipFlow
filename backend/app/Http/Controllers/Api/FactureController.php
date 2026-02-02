<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Facture::with(['client', 'colis']);

        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }
        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }
        if ($request->filled('search')) {
            $query->whereHas('client', fn ($q) => $q->where('nom', 'ilike', '%' . $request->search . '%'));
        }

        $perPage = $request->integer('per_page', 15);
        $factures = $query->orderByDesc('created_at')->paginate($perPage);

        return response()->json($factures);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|uuid|exists:clients,id',
            'colis_id' => 'required|uuid|exists:colis,id',
            'montant_total' => 'required|numeric|min:0',
            'statut' => 'nullable|string|in:en_attente,payee,en_retard',
        ]);

        $validated['statut'] = $validated['statut'] ?? 'en_attente';
        $facture = Facture::create($validated);
        $facture->load(['client', 'colis']);

        return response()->json($facture, 201);
    }

    public function show(Facture $facture): JsonResponse
    {
        $facture->load(['client', 'colis']);
        return response()->json($facture);
    }

    public function update(Request $request, Facture $facture): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'sometimes|uuid|exists:clients,id',
            'colis_id' => 'sometimes|uuid|exists:colis,id',
            'montant_total' => 'sometimes|numeric|min:0',
            'statut' => 'nullable|string|in:en_attente,payee,en_retard',
        ]);

        $facture->update($validated);
        $facture->load(['client', 'colis']);

        return response()->json($facture);
    }

    public function destroy(Facture $facture): JsonResponse
    {
        $facture->delete();
        return response()->json(['message' => 'Facture supprimée'], 204);
    }
}
