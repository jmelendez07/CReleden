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
                "name" => 'Picadas',
                "description" => 'Una verdadera delicia',
                "image" => '/images/picada-navbar.png',
            ],
            [
                "name" => 'Hamburguesas',
                "description" => 'Nunca probarás otra igual',
                "image" => '/images/burguer-navbar.jpg',
            ],
            [
                "name" => 'Asados',
                "description" => 'La mejor de la ciudad',
                "image" => '/images/asado-navbar.png',
            ],
            [
                "name" => 'Perros',
                "description" => 'Con mucho queso',
                "image" => '/images/hot-dog-navbar.jpg',
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
