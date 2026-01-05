<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $paymentMethods = [
            ['name' => 'Efectivo'],
            ['name' => 'Tarjeta'],
            ['name' => 'Nequi'],
            ['name' => 'Bancolombia']
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::firstOrCreate(['name' => $method['name']], $method);
        }
    }
}
