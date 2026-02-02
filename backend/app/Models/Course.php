<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{
    use HasUuids;

    protected $table = 'courses';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['livreur_id', 'date_course', 'statut'];

    protected $casts = [
        'date_course' => 'date',
    ];

    public function livreur(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'livreur_id');
    }

    public function colis(): BelongsToMany
    {
        return $this->belongsToMany(Colis::class, 'course_colis')->withPivot('ordre')->withTimestamps();
    }
}
