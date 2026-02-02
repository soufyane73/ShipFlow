<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Colis extends Model
{
    use HasUuids;

    protected $table = 'colis';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'code_barre', 'expediteur_id', 'destinataire_id', 'entreprise_id',
        'ville_depart_id', 'ville_arrivee_id', 'secteur_arrivee_id',
        'adresse_livraison', 'poids', 'type_service', 'prix_total', 'statut', 'paye', 'mode_paiement',
    ];

    protected $casts = [
        'poids' => 'decimal:2',
        'prix_total' => 'decimal:2',
        'paye' => 'boolean',
    ];

    public function expediteur(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'expediteur_id');
    }

    public function destinataire(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'destinataire_id');
    }

    public function entreprise(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'entreprise_id');
    }

    public function villeDepart(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_depart_id');
    }

    public function villeArrivee(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_arrivee_id');
    }

    public function secteurArrivee(): BelongsTo
    {
        return $this->belongsTo(Secteur::class, 'secteur_arrivee_id');
    }

    public function produits(): BelongsToMany
    {
        return $this->belongsToMany(Produit::class, 'colis_produit')->withPivot('quantite')->withTimestamps();
    }

    public function reclamations(): HasMany
    {
        return $this->hasMany(Reclamation::class, 'colis_id');
    }

    public function paiements(): HasMany
    {
        return $this->hasMany(Paiement::class, 'colis_id');
    }

    public function bonLivraison(): HasOne
    {
        return $this->hasOne(BonLivraison::class, 'colis_id');
    }

    public function facture(): HasOne
    {
        return $this->hasOne(Facture::class, 'colis_id');
    }

    public function bonReception(): HasOne
    {
        return $this->hasOne(BonReception::class, 'colis_id');
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_colis')->withPivot('ordre')->withTimestamps();
    }
}
