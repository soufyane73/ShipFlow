<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bon_livraison', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('colis_id')->unique()->constrained('colis')->cascadeOnDelete();
            $table->json('photo_preuve')->nullable(); // text[] in ERD
            $table->text('signature_client')->nullable();
            $table->string('nom_client')->nullable();
            $table->timestamp('date_livraison')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bon_livraison');
    }
};
