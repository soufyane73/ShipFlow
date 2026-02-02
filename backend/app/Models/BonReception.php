<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BonReception extends Model
{
    protected $table = 'bon_reception';

    protected $primaryKey = 'colis_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['colis_id', 'photo_colis', 'signe_par'];

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class, 'colis_id');
    }
}
