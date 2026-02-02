<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use App\Models\Ville;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $totalColis = Colis::count();
        $enTransit = Colis::where('statut', 'En transit')->count();
        $livresAujourdhui = Colis::where('statut', 'Livré')
            ->whereDate('updated_at', today())
            ->count();
        $enAttente = Colis::whereIn('statut', ['En préparation'])->count();
        $villesCouvertes = Ville::count();

        return response()->json([
            'total_colis' => $totalColis,
            'en_transit' => $enTransit,
            'livres_aujourdhui' => $livresAujourdhui,
            'en_attente' => $enAttente,
            'villes_couvertes' => $villesCouvertes,
        ]);
    }

    public function recentActivity(): JsonResponse
    {
        $colis = Colis::with(['destinataire', 'villeArrivee'])
            ->orderByDesc('updated_at')
            ->limit(10)
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'code_barre' => $c->code_barre,
                'client' => $c->expediteur?->nom ?? $c->entreprise?->nom,
                'destinataire' => $c->destinataire?->nom,
                'ville' => $c->villeArrivee?->nom,
                'statut' => $c->statut,
                'updated_at' => $c->updated_at?->toIso8601String(),
            ]);

        return response()->json(['data' => $colis]);
    }
}
