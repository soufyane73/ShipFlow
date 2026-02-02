<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ville extends Model
{
    protected $table = 'villes';

    protected $fillable = ['nom', 'pays'];

    public function secteurs(): HasMany
    {
        return $this->hasMany(Secteur::class, 'ville_id');
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class, 'ville_id');
    }

    public function grilleTarifsDepart(): HasMany
    {
        return $this->hasMany(GrilleTarif::class, 'ville_depart_id');
    }

    public function grilleTarifsArrivee(): HasMany
    {
        return $this->hasMany(GrilleTarif::class, 'ville_arrivee_id');
    }
}
