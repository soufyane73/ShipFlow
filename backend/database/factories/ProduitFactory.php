<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition(): array
    {
        return [
            'nom' => $this->faker->words(3, true),
            'reference' => 'REF-' . strtoupper($this->faker->bothify('##??##')),
            'categorie_id' => Categorie::inRandomOrder()->first()->id ?? Categorie::factory(),
            'poids_moyen' => $this->faker->randomFloat(2, 0.1, 50),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
