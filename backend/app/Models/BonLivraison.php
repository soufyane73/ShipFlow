<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BonLivraison extends Model
{
    use HasUuids;

    protected $table = 'bon_livraison';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['colis_id', 'photo_preuve', 'signature_client', 'nom_client', 'date_livraison'];

    protected $casts = [
        'photo_preuve' => 'array',
        'date_livraison' => 'datetime',
    ];

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'colis_id');
    }
}
