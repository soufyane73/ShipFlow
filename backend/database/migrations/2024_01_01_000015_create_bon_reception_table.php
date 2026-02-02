<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bon_reception', function (Blueprint $table) {
            $table->foreignUuid('colis_id')->primary()->constrained('colis')->cascadeOnDelete();
            $table->text('photo_colis')->nullable();
            $table->string('signe_par')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bon_reception');
    }
};
