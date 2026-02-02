<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrilleTarif extends Model
{
    protected $table = 'grille_tarifs';

    protected $fillable = [
        'ville_depart_id', 'ville_arrivee_id', 'poids_max_kg', 'prix_kg', 'prix_fixe', 'delai_jours',
    ];

    protected $casts = [
        'poids_max_kg' => 'decimal:2',
        'prix_kg' => 'decimal:2',
        'prix_fixe' => 'decimal:2',
    ];

    public function villeDepart(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_depart_id');
    }

    public function villeArrivee(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_arrivee_id');
    }
}
