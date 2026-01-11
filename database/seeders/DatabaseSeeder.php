<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'jmelendez07@gmail.com'],
            [
                'name' => 'Jose Melendez',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'marcos@gmail.com'],
            [
                'name' => 'Marcos Pereira',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            PaymentMethodSeeder::class,
            OrderTypeSeeder::class,
            CategorySeeder::class,
            IngredientSeeder::class,
            ProductSeeder::class,
            // OrderSeeder::class
        ]);
    }
}
