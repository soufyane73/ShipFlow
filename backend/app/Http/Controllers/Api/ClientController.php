<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Client::with(['ville', 'secteur']);

        if ($request->filled('ville_id')) {
            $query->where('ville_id', $request->ville_id);
        }
        if ($request->filled('type_client')) {
            $query->where('type_client', $request->type_client);
        }
        if ($request->filled('search')) {
            $query->where('nom', 'ilike', '%' . $request->search . '%')
                ->orWhere('telephone', 'ilike', '%' . $request->search . '%');
        }

        $perPage = $request->integer('per_page', 15);
        $clients = $query->orderBy('nom')->paginate($perPage);

        return response()->json($clients);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'telephone' => 'nullable|string|max:50',
            'adresse' => 'nullable|string',
            'ville_id' => 'nullable|exists:villes,id',
            'secteur_id' => 'nullable|exists:secteurs,id',
            'type_client' => 'nullable|string|in:particulier,entreprise',
        ]);

        $validated['type_client'] = $validated['type_client'] ?? 'particulier';
        $client = Client::create($validated);
        $client->load(['ville', 'secteur']);

        return response()->json($client, 201);
    }

    public function show(Client $client): JsonResponse
    {
        $client->load(['ville', 'secteur']);
        return response()->json($client);
    }

    public function update(Request $request, Client $client): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'telephone' => 'nullable|string|max:50',
            'adresse' => 'nullable|string',
            'ville_id' => 'nullable|exists:villes,id',
            'secteur_id' => 'nullable|exists:secteurs,id',
            'type_client' => 'nullable|string|in:particulier,entreprise',
        ]);

        $client->update($validated);
        $client->load(['ville', 'secteur']);

        return response()->json($client);
    }

    public function destroy(Client $client): JsonResponse
    {
        $client->delete();
        return response()->json(['message' => 'Client supprimé'], 204);
    }
}
