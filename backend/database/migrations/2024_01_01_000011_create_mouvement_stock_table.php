<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mouvement_stock', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('produit_id')->constrained('produits')->cascadeOnDelete();
            $table->integer('quantite');
            $table->string('type');
            $table->text('motif')->nullable();
            $table->foreignUuid('colis_id')->nullable()->constrained('colis')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mouvement_stock');
    }
};
