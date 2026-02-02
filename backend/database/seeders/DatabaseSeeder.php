<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Client;
use App\Models\Profile;
use App\Models\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Ville::insert([
            ['nom' => 'Paris', 'pays' => 'France', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Lyon', 'pays' => 'France', 'created_at' => now(), 'updated_at' => now()],
            ['nom' => 'Marseille', 'pays' => 'France', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Categorie::insert($categories = [
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'nom' => 'Électronique', 'created_at' => now(), 'updated_at' => now()],
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'nom' => 'Mobilier', 'created_at' => now(), 'updated_at' => now()],
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'nom' => 'Fournitures', 'created_at' => now(), 'updated_at' => now()],
        ]);
        
        
        // Create 50 random products
        \App\Models\Produit::factory()->count(50)->create([
            'categorie_id' => function () use ($categories) {
                return $categories[array_rand($categories)]['id'];
            }
        ]);

        $client = Client::create([
            'nom' => 'Acme Corp',
            'telephone' => '+33 1 00 00 00 00',
            'adresse' => '123 Rue Example',
            'ville_id' => 1,
            'type_client' => 'entreprise',
        ]);

        Profile::create([
            'nom' => 'Admin ShipFlow',
            'email' => 'admin@shipflow.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'telephone' => '+33 6 00 00 00 00',
        ]);
    }
}
