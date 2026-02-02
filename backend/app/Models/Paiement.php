<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Paiement extends Model
{
    use HasUuids;

    protected $table = 'paiements';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['colis_id', 'montant', 'mode', 'reference', 'statut'];

    protected $casts = [
        'montant' => 'decimal:2',
    ];

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'colis_id');
    }
}
