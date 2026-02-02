<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Secteur extends Model
{
    protected $table = 'secteurs';

    protected $fillable = ['ville_id', 'nom', 'code'];

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class, 'secteur_id');
    }
}
