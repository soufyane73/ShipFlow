<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MouvementStock extends Model
{
    protected $table = 'mouvement_stock';

    protected $fillable = ['produit_id', 'quantite', 'type', 'motif', 'colis_id'];

    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'colis_id');
    }
}
