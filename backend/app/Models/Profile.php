<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Profile extends Authenticatable implements JWTSubject
{
    use HasFactory, HasUuids, Notifiable;

    protected $table = 'profiles';

    protected $fillable = [
        'nom',
        'telephone',
        'email',
        'password',
        'entreprise_id',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [
            'role' => $this->role,
            'nom' => $this->nom,
        ];
    }

    public function entreprise(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'entreprise_id');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'livreur_id');
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isLivreur(): bool
    {
        return $this->role === 'livreur';
    }

    public function isEntreprise(): bool
    {
        return $this->role === 'entreprise';
    }
}
