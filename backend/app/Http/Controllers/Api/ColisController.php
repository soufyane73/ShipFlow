<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ColisController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Colis::with([
            'expediteur', 'destinataire', 'villeDepart', 'villeArrivee', 'bonLivraison',
        ]);

        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }
        if ($request->filled('ville_arrivee_id')) {
            $query->where('ville_arrivee_id', $request->ville_arrivee_id);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('code_barre', 'ilike', "%{$search}%")
                    ->orWhereHas('destinataire', fn ($q) => $q->where('nom', 'ilike', "%{$search}%"))
                    ->orWhereHas('expediteur', fn ($q) => $q->where('nom', 'ilike', "%{$search}%"));
            });
        }

        $perPage = $request->integer('per_page', 15);
        $colis = $query->orderByDesc('created_at')->paginate($perPage);

        return response()->json($colis);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code_barre' => 'nullable|string|max:100',
            'expediteur_id' => 'nullable|uuid|exists:clients,id',
            'destinataire_id' => 'nullable|uuid|exists:clients,id',
            'entreprise_id' => 'nullable|uuid|exists:clients,id',
            'ville_depart_id' => 'nullable|exists:villes,id',
            'ville_arrivee_id' => 'nullable|exists:villes,id',
            'secteur_arrivee_id' => 'nullable|exists:secteurs,id',
            'adresse_livraison' => 'nullable|string',
            'poids' => 'nullable|numeric|min:0',
            'type_service' => 'nullable|string|max:100',
            'prix_total' => 'nullable|numeric|min:0',
            'statut' => 'nullable|string|in:En préparation,En transit,En livraison,Livré,Retourné',
            'paye' => 'nullable|boolean',
            'mode_paiement' => 'nullable|string|max:50',
            'produits' => 'nullable|array',
            'produits.*.produit_id' => 'uuid|exists:produits,id',
            'produits.*.quantite' => 'integer|min:1',
        ]);

        $produits = $validated['produits'] ?? null;
        unset($validated['produits']);

        $colis = Colis::create($validated);

        if ($produits) {
            foreach ($produits as $p) {
                $colis->produits()->attach($p['produit_id'], ['quantite' => $p['quantite']]);
            }
        }

        $colis->load(['expediteur', 'destinataire', 'villeDepart', 'villeArrivee', 'produits']);

        return response()->json($colis, 201);
    }

    public function show(Colis $colis): JsonResponse
    {
        $colis->load([
            'expediteur', 'destinataire', 'entreprise', 'villeDepart', 'villeArrivee', 'secteurArrivee',
            'produits', 'reclamations', 'paiements', 'bonLivraison', 'facture', 'bonReception', 'courses',
        ]);
        return response()->json($colis);
    }

    public function update(Request $request, Colis $colis): JsonResponse
    {
        $validated = $request->validate([
            'code_barre' => 'nullable|string|max:100',
            'expediteur_id' => 'nullable|uuid|exists:clients,id',
            'destinataire_id' => 'nullable|uuid|exists:clients,id',
            'entreprise_id' => 'nullable|uuid|exists:clients,id',
            'ville_depart_id' => 'nullable|exists:villes,id',
            'ville_arrivee_id' => 'nullable|exists:villes,id',
            'secteur_arrivee_id' => 'nullable|exists:secteurs,id',
            'adresse_livraison' => 'nullable|string',
            'poids' => 'nullable|numeric|min:0',
            'type_service' => 'nullable|string|max:100',
            'prix_total' => 'nullable|numeric|min:0',
            'statut' => 'nullable|string|in:En préparation,En transit,En livraison,Livré,Retourné',
            'paye' => 'nullable|boolean',
            'mode_paiement' => 'nullable|string|max:50',
        ]);

        $colis->update($validated);
        $colis->load(['expediteur', 'destinataire', 'villeDepart', 'villeArrivee', 'produits']);

        return response()->json($colis);
    }

    public function destroy(Colis $colis): JsonResponse
    {
        $colis->delete();
        return response()->json(['message' => 'Colis supprimé'], 204);
    }
}
