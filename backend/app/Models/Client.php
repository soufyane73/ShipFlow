<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasUuids;

    protected $table = 'clients';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'nom', 'telephone', 'adresse', 'ville_id', 'secteur_id', 'type_client',
    ];

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }

    public function secteur(): BelongsTo
    {
        return $this->belongsTo(Secteur::class, 'secteur_id');
    }

    public function reclamations(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'client_id');
    }

    public function factures(): HasMany
    {
        return $this->hasMany(Facture::class, 'client_id');
    }

    public function livreurs(): HasMany
    {
        return $this->hasMany(Profile::class, 'entreprise_id');
    }
}
