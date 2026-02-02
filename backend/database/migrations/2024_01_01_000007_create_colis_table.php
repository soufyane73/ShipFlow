<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colis', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code_barre')->nullable();
            $table->foreignUuid('expediteur_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->foreignUuid('destinataire_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->foreignUuid('entreprise_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->foreignId('ville_depart_id')->nullable()->constrained('villes')->nullOnDelete();
            $table->foreignId('ville_arrivee_id')->nullable()->constrained('villes')->nullOnDelete();
            $table->foreignId('secteur_arrivee_id')->nullable()->constrained('secteurs')->nullOnDelete();
            $table->text('adresse_livraison')->nullable();
            $table->decimal('poids', 10, 2)->nullable();
            $table->string('type_service')->nullable();
            $table->decimal('prix_total', 12, 2)->nullable();
            $table->string('statut')->default('En préparation');
            $table->boolean('paye')->default(false);
            $table->string('mode_paiement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('colis');
    }
};
