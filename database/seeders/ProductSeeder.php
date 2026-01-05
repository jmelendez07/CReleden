<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener categorías
        $entradas = Category::where('name', 'Entradas')->first();
        $asados = Category::where('name', 'Asados')->first();
        $picadas = Category::where('name', 'Picadas')->first();
        $patacon = Category::where('name', 'Patacón')->first();
        $perros = Category::where('name', 'Perros')->first();
        $hamburguesas = Category::where('name', 'Hamburguesas')->first();
        $menuInfantil = Category::where('name', 'Menú Infantil')->first();
        $bebidas = Category::where('name', 'Bebidas')->first();
        $jugosNaturales = Category::where('name', 'Jugos Naturales')->first();

        $products = [
            // ENTRADAS
            [
                'name' => 'Canasta de Patacón Rellena de Pollo',
                'description' => 'Canasta de patacón rellena con pollo',
                'image' => '/images/canasta-de-patacon-relleno-de-pollo.png',
                'price' => 12000,
                'category_id' => $entradas->id,
            ],
            [
                'name' => 'Canasta de Patacón Rellena de Salchicha Ranchera',
                'description' => 'Canasta de patacón rellena con salchicha ranchera',
                'image' => '/images/patacones-con-salchicha.png',
                'price' => 10000,
                'category_id' => $entradas->id,
            ],
            [
                'name' => 'Pinchos de Chorizo y Butifarra',
                'description' => 'Deliciosos pinchos de chorizo y butifarra',
                'image' => '/images/pinchos-chorizon.png',
                'price' => 4500,
                'category_id' => $entradas->id,
            ],
            [
                'name' => 'Aros de Cebolla',
                'description' => 'Aros de cebolla crujientes',
                'image' => '/images/aros-de-cebolla.png',
                'price' => 5000,
                'category_id' => $entradas->id,
            ],

            // ASADOS
            [
                'name' => 'Pechuga con Chimichurri',
                'description' => 'Pechuga de pollo con salsa chimichurri',
                'image' => '/images/asado-navbar.png',
                'price' => 22000,
                'category_id' => $asados->id,
            ],
            [
                'name' => 'Pechuga Gratinada',
                'description' => 'Pechuga de pollo gratinada',
                'image' => '/images/asado-navbar.png',
                'price' => 24000,
                'category_id' => $asados->id,
            ],
            [
                'name' => 'Cerdo con Chimichurri',
                'description' => 'Carne de cerdo con salsa chimichurri',
                'image' => '/images/asado-navbar.png',
                'price' => 23000,
                'category_id' => $asados->id,
            ],
            [
                'name' => 'Cerdo Gratinado',
                'description' => 'Carne de cerdo gratinada',
                'image' => '/images/asado-navbar.png',
                'price' => 25000,
                'category_id' => $asados->id,
            ],
            [
                'name' => 'Carne de Res con Chimichurri',
                'description' => 'Carne de res con salsa chimichurri',
                'image' => '/images/asado-navbar.png',
                'price' => 26000,
                'category_id' => $asados->id,
            ],
            [
                'name' => 'Churrasco',
                'description' => 'Delicioso churrasco',
                'image' => '/images/asado-navbar.png',
                'price' => 32000,
                'category_id' => $asados->id,
            ],

            // PICADAS
            [
                'name' => 'Picada Personal',
                'description' => 'Picada para una persona',
                'image' => '/images/picada-navbar.png',
                'price' => 19000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Dos Personas',
                'description' => 'Picada para dos personas',
                'image' => '/images/salchipapa-2.png',
                'price' => 25000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Tres Personas',
                'description' => 'Picada para tres personas',
                'image' => '/images/picada-navbar.png',
                'price' => 30000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Cuatro Personas',
                'description' => 'Picada para cuatro personas',
                'image' => '/images/salchipapa-2.png',
                'price' => 37000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Mediana',
                'description' => 'Picada mediana',
                'image' => '/images/salchipapa-2.png',
                'price' => 45000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Grande',
                'description' => 'Picada grande (55-65-80-90-100)',
                'image' => '/images/picada-navbar.png',
                'price' => 90000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Extra Grande',
                'description' => 'Picada extra grande',
                'image' => '/images/salchipapa-2.png',
                'price' => 150000,
                'category_id' => $picadas->id,
            ],
            [
                'name' => 'Picada Mega Grande',
                'description' => 'Picada mega grande',
                'image' => '/images/picada-navbar.png',
                'price' => 250000,
                'category_id' => $picadas->id,
            ],

            // PATACÓN
            [
                'name' => 'Patacón Personal',
                'description' => 'Patacón para una persona',
                'image' => '/images/categoria-patacones.png',
                'price' => 20000,
                'category_id' => $patacon->id,
            ],
            [
                'name' => 'Patacón Dos Personas',
                'description' => 'Patacón para dos personas',
                'image' => '/images/categoria-patacones.png',
                'price' => 27000,
                'category_id' => $patacon->id,
            ],
            [
                'name' => 'Patacón Tres Personas',
                'description' => 'Patacón para tres personas',
                'image' => '/images/patacones-con-salchicha.png',
                'price' => 35000,
                'category_id' => $patacon->id,
            ],

            // PERROS
            [
                'name' => 'Perro Súper',
                'description' => 'Perro caliente súper con mucho queso',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 9000,
                'category_id' => $perros->id,
            ],
            [
                'name' => 'Perro Americano',
                'description' => 'Perro caliente americano con mucho queso',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 12000,
                'category_id' => $perros->id,
            ],
            [
                'name' => 'Perro Choripero',
                'description' => 'Perro caliente choripero con mucho queso',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 13000,
                'category_id' => $perros->id,
            ],
            [
                'name' => 'Perro Suizo',
                'description' => 'Perro caliente suizo con mucho queso',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 14000,
                'category_id' => $perros->id,
            ],
            [
                'name' => 'Perro Ranchero',
                'description' => 'Perro caliente ranchero con mucho queso',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 15000,
                'category_id' => $perros->id,
            ],

            // HAMBURGUESAS
            [
                'name' => 'Hamburguesa Sencilla de Res',
                'description' => 'Hamburguesa sencilla de carne de res',
                'image' => '/images/burguer-navbar.jpg',
                'price' => 20000,
                'category_id' => $hamburguesas->id,
            ],
            [
                'name' => 'Hamburguesa Sencilla de Pechuga',
                'description' => 'Hamburguesa sencilla de pechuga',
                'image' => '/images/burguer-hero.png',
                'price' => 21000,
                'category_id' => $hamburguesas->id,
            ],
            [
                'name' => 'Hamburguesa Doble Carne',
                'description' => 'Hamburguesa con doble carne',
                'image' => '/images/burguer-navbar.jpg',
                'price' => 25000,
                'category_id' => $hamburguesas->id,
            ],
            [
                'name' => 'Hamburguesa de la Casa',
                'description' => 'Hamburguesa especial de la casa',
                'image' => '/images/burguer-navbar.jpg',
                'price' => 27000,
                'category_id' => $hamburguesas->id,
            ],

            // MENÚ INFANTIL
            [
                'name' => 'Mini Salchipapa',
                'description' => 'Salchipapa para los más pequeños',
                'image' => '/images/categoria-infantil.png',
                'price' => 6000,
                'category_id' => $menuInfantil->id,
            ],
            [
                'name' => 'Mini Perro + Jugo de Cajita',
                'description' => 'Mini perro caliente con jugo de cajita',
                'image' => '/images/hot-dog-navbar.jpg',
                'price' => 10000,
                'category_id' => $menuInfantil->id,
            ],

            // BEBIDAS
            [
                'name' => 'Coca Cola 1.5',
                'description' => 'Coca Cola de 1.5 litros',
                'image' => '/images/categoria-bebidas.png',
                'price' => 8000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Cola Romana 1.5',
                'description' => 'Cola Romana de 1.5 litros',
                'image' => '/images/gaseosa-roja.png',
                'price' => 8000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Coca Cola Litro',
                'description' => 'Coca Cola de 1 litro',
                'image' => '/images/categoria-bebidas.png',
                'price' => 6000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Coca Cola Personal',
                'description' => 'Coca Cola personal',
                'image' => '/images/categoria-bebidas.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Postobón Personal',
                'description' => 'Postobón personal',
                'image' => '/images/gaseosa-roja.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Jugo Hit',
                'description' => 'Jugo Hit',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Agua',
                'description' => 'Agua mineral',
                'image' => '/images/botella-agua.png',
                'price' => 2000,
                'category_id' => $bebidas->id,
            ],

            // JUGOS NATURALES EN AGUA
            [
                'name' => 'Jugo de Tomate de Árbol en Agua',
                'description' => 'Jugo natural de tomate de árbol en agua',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 8000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Maracuyá en Agua',
                'description' => 'Jugo natural de maracuyá en agua',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 8000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Mora en Agua',
                'description' => 'Jugo natural de mora en agua',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 8000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Limonada en Agua',
                'description' => 'Limonada natural en agua',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 8000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Lulo en Agua',
                'description' => 'Jugo natural de lulo en agua',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 8000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Limonada Cerezada',
                'description' => 'Limonada cerezada',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],

            // JUGOS NATURALES EN LECHE
            [
                'name' => 'Jugo de Tomate de Árbol en Leche',
                'description' => 'Jugo natural de tomate de árbol en leche',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Maracuyá en Leche',
                'description' => 'Jugo natural de maracuyá en leche',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Mora en Leche',
                'description' => 'Jugo natural de mora en leche',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Níspero en Leche',
                'description' => 'Jugo natural de níspero en leche',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],
            [
                'name' => 'Jugo de Lulo en Leche',
                'description' => 'Jugo natural de lulo en leche',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 10000,
                'category_id' => $jugosNaturales->id,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
