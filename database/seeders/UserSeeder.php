<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuario Administrador
        $admin = User::firstOrCreate(
            ['email' => 'admin@creleden.com'],
            [
                'name' => 'Sergio Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole(Roles::ADMIN->value);

        // Crear usuario Mesero
        $waiter = User::firstOrCreate(
            ['email' => 'mesero@creleden.com'],
            [
                'name' => 'Mesero',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $waiter->assignRole(Roles::WAITER->value);
    }
}
