<?php

namespace Database\Seeders;

use App\Enums\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(
            ['name' => Roles::ADMIN->value],
            ['guard_name' => 'web']
        );

        Role::firstOrCreate(
            ['name' => Roles::WAITER->value],
            ['guard_name' => 'web']
        );
    }
}
