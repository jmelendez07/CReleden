<?php

namespace Database\Seeders;

use App\Models\OrderType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderTypeSeeder extends Seeder
{
    public function run(): void
    {
        $orderTypes = [
            ['name' => 'Para llevar'],
            ['name' => 'Domicilio'],
            ['name' => 'Para Aquí'],
        ];

        foreach ($orderTypes as $type) {
            OrderType::firstOrCreate(['name' => $type['name']], $type);
        }
    }
}
