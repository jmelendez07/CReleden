<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                "name" => 'Entradas',
                "description" => "Aquí comienza lo bueno",
                "image" => "/images/categoria-entradas.png"
            ],
            [
                "name" => 'Asados',
                "description" => 'La mejor de la ciudad',
                "image" => '/images/asado-navbar.png',
            ],
            [
                "name" => 'Picadas',
                "description" => 'Una verdadera delicia',
                "image" => '/images/picada-navbar.png',
            ],
            [
                "name" => 'Patacón',
                "description" => 'Un deleite sin igual',
                "image" => '/images/categoria-patacones.png',
            ],
            [
                "name" => 'Perros',
                "description" => 'Con mucho queso',
                "image" => '/images/hot-dog-navbar.jpg',
            ],
            [
                "name" => 'Hamburguesas',
                "description" => 'Nunca probarás otra igual',
                "image" => '/images/burguer-navbar.jpg',
            ],
            [
                "name" => 'Menú Infantil',
                "description" => 'Lo mejor para los más pequeños',
                "image" => '/images/categoria-infantil.png'
            ],
            [
                "name" => 'Bebidas',
                "description" => 'Refrescante y tu mejor compañero',
                "image" => '/images/categoria-bebidas.png'
            ],
            [
                "name" => 'Jugos Naturales',
                "description" => 'Refrescante y sencillamente natural',
                "image" => '/images/categoria-jugos-naturales.png'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
