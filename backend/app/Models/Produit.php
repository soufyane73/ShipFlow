<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produit extends Model
{
    use HasUuids, HasFactory;

    protected $table = 'produits';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['nom', 'categorie_id', 'reference', 'poids_moyen'];

    protected $casts = [
        'poids_moyen' => 'decimal:2',
    ];

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function colis(): BelongsToMany
    {
        return $this->belongsToMany(Colis::class, 'colis_produit')->withPivot('quantite')->withTimestamps();
    }

    public function mouvementsStock(): HasMany
    {
        return $this->hasMany(MouvementStock::class, 'produit_id');
    }
}
