<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grille_tarifs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ville_depart_id')->constrained('villes')->cascadeOnDelete();
            $table->foreignId('ville_arrivee_id')->constrained('villes')->cascadeOnDelete();
            $table->decimal('poids_max_kg', 10, 2);
            $table->decimal('prix_kg', 10, 2);
            $table->decimal('prix_fixe', 10, 2);
            $table->integer('delai_jours');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grille_tarifs');
    }
};
