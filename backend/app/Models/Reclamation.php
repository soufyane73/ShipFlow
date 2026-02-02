<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reclamation extends Model
{
    use HasUuids;

    protected $table = 'reclamations';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['colis_id', 'client_id', 'type', 'description', 'photos'];

    protected $casts = [
        'photos' => 'array',
    ];

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'colis_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
