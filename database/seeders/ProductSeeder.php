<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Ingredient;
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

        // Obtener ingredientes
        $carneRes = Ingredient::where('name', 'Carne de res molida')->first();
        $carnePollo = Ingredient::where('name', 'Carne de pollo')->first();
        $tocineta = Ingredient::where('name', 'Tocineta')->first();
        $salchicha = Ingredient::where('name', 'Salchicha para perros')->first();
        $jamon = Ingredient::where('name', 'Jamón')->first();
        $quesoMozzarella = Ingredient::where('name', 'Queso mozzarella')->first();
        $quesoCheddar = Ingredient::where('name', 'Queso cheddar')->first();
        $quesoAmericano = Ingredient::where('name', 'Queso americano')->first();
        $lechuga = Ingredient::where('name', 'Lechuga')->first();
        $tomate = Ingredient::where('name', 'Tomate')->first();
        $cebolla = Ingredient::where('name', 'Cebolla')->first();
        $cebollaCaramelizada = Ingredient::where('name', 'Cebolla caramelizada')->first();
        $pepinillos = Ingredient::where('name', 'Pepinillos')->first();
        $jalapenos = Ingredient::where('name', 'Jalapeños')->first();
        $champinones = Ingredient::where('name', 'Champiñones')->first();
        $papa = Ingredient::where('name', 'Papa para freír')->first();
        $papasFritas = Ingredient::where('name', 'Papas fritas congeladas')->first();
        $arosCebolla = Ingredient::where('name', 'Aros de cebolla')->first();
        $salsaTomate = Ingredient::where('name', 'Salsa de tomate')->first();
        $mayonesa = Ingredient::where('name', 'Mayonesa')->first();
        $mostaza = Ingredient::where('name', 'Mostaza')->first();
        $salsaBBQ = Ingredient::where('name', 'Salsa BBQ')->first();
        $salsaRosada = Ingredient::where('name', 'Salsa rosada')->first();
        $salsaPicante = Ingredient::where('name', 'Salsa picante')->first();
        $salsaAjo = Ingredient::where('name', 'Salsa de ajo')->first();
        $panHamburguesa = Ingredient::where('name', 'Pan para hamburguesa')->first();
        $panPerro = Ingredient::where('name', 'Pan para perro caliente')->first();
        $huevo = Ingredient::where('name', 'Huevo')->first();
        $aguacate = Ingredient::where('name', 'Aguacate')->first();

        $products = [
            // ENTRADAS
            [
                'product' => [
                    'name' => 'Canasta de Patacón Rellena de Pollo',
                    'description' => 'Canasta de patacón rellena con pollo',
                    'image' => '/images/canasta-de-patacon-relleno-de-pollo.png',
                    'price' => 12000,
                    'category_id' => $entradas->id,
                ],
                'ingredients' => [
                    ['id' => $papa->id, 'quantity' => 0.3], // 300g de papa
                    ['id' => $carnePollo->id, 'quantity' => 0.15], // 150g de pollo
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.05], // 50g de queso
                    ['id' => $salsaRosada->id, 'quantity' => 0.03], // 30ml de salsa
                ]
            ],
            [
                'product' => [
                    'name' => 'Canasta de Patacón Rellena de Salchicha Ranchera',
                    'description' => 'Canasta de patacón rellena con salchicha ranchera',
                    'image' => '/images/patacones-con-salchicha.png',
                    'price' => 10000,
                    'category_id' => $entradas->id,
                ],
                'ingredients' => [
                    ['id' => $papa->id, 'quantity' => 0.3], // 300g de papa
                    ['id' => $salchicha->id, 'quantity' => 0.1], // 100g de salchicha
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.05], // 50g de queso
                    ['id' => $salsaRosada->id, 'quantity' => 0.03], // 30ml de salsa
                ]
            ],
            [
                'product' => [
                    'name' => 'Pinchos de Chorizo y Butifarra',
                    'description' => 'Deliciosos pinchos de chorizo y butifarra',
                    'image' => '/images/pinchos-chorizo.png',
                    'price' => 4500,
                    'category_id' => $entradas->id,
                ],
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.12], // 120g de salchicha
                    ['id' => $salsaBBQ->id, 'quantity' => 0.02], // 20ml de salsa BBQ
                ]
            ],
            [
                'product' => [
                    'name' => 'Aros de Cebolla',
                    'description' => 'Aros de cebolla crujientes',
                    'image' => '/images/aros-de-cebolla.png',
                    'price' => 5000,
                    'category_id' => $entradas->id,
                ],
                'ingredients' => [
                    ['id' => $arosCebolla->id, 'quantity' => 0.2], // 200g de aros
                    ['id' => $mayonesa->id, 'quantity' => 0.03], // 30ml de mayonesa
                ]
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
                'product' => [
                    'name' => 'Perro Súper',
                    'description' => 'Perro caliente súper con mucho queso',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 9000,
                    'category_id' => $perros->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1], // 1 pan
                    ['id' => $salchicha->id, 'quantity' => 0.08], // 80g de salchicha
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.04], // 40g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.02], // 20ml
                    ['id' => $mayonesa->id, 'quantity' => 0.02], // 20ml
                    ['id' => $papasFritas->id, 'quantity' => 0.08], // 80g de papas
                ]
            ],
            [
                'product' => [
                    'name' => 'Perro Americano',
                    'description' => 'Perro caliente americano con mucho queso',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 12000,
                    'category_id' => $perros->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $salchicha->id, 'quantity' => 0.08],
                    ['id' => $tocineta->id, 'quantity' => 0.03], // 30g de tocineta
                    ['id' => $quesoAmericano->id, 'quantity' => 0.05], // 50g de queso
                    ['id' => $cebolla->id, 'quantity' => 0.02], // 20g de cebolla
                    ['id' => $salsaTomate->id, 'quantity' => 0.02],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.1],
                ]
            ],
            [
                'product' => [
                    'name' => 'Perro Choripero',
                    'description' => 'Perro caliente choripero con mucho queso',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 13000,
                    'category_id' => $perros->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $salchicha->id, 'quantity' => 0.12], // chorizo
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.03],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.1],
                ]
            ],
            [
                'product' => [
                    'name' => 'Perro Suizo',
                    'description' => 'Perro caliente suizo con mucho queso',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 14000,
                    'category_id' => $perros->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $salchicha->id, 'quantity' => 0.08],
                    ['id' => $champinones->id, 'quantity' => 0.04], // 40g de champiñones
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.06], // 60g de queso
                    ['id' => $salsaAjo->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.1],
                ]
            ],
            [
                'product' => [
                    'name' => 'Perro Ranchero',
                    'description' => 'Perro caliente ranchero con mucho queso',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 15000,
                    'category_id' => $perros->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $salchicha->id, 'quantity' => 0.12], // salchicha ranchera
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.06],
                    ['id' => $tocineta->id, 'quantity' => 0.04],
                    ['id' => $cebolla->id, 'quantity' => 0.03],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.12],
                ]
            ],

            // HAMBURGUESAS
            [
                'product' => [
                    'name' => 'Hamburguesa Sencilla de Res',
                    'description' => 'Hamburguesa sencilla de carne de res',
                    'image' => '/images/burguer-navbar.jpg',
                    'price' => 20000,
                    'category_id' => $hamburguesas->id,
                ],
                'ingredients' => [
                    ['id' => $panHamburguesa->id, 'quantity' => 1], // 1 pan
                    ['id' => $carneRes->id, 'quantity' => 0.15], // 150g de carne
                    ['id' => $quesoAmericano->id, 'quantity' => 0.04], // 40g de queso
                    ['id' => $lechuga->id, 'quantity' => 0.02], // 20g
                    ['id' => $tomate->id, 'quantity' => 0.03], // 30g
                    ['id' => $cebolla->id, 'quantity' => 0.02], // 20g
                    ['id' => $salsaTomate->id, 'quantity' => 0.02],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.15], // 150g de papas
                ]
            ],
            [
                'product' => [
                    'name' => 'Hamburguesa Sencilla de Pechuga',
                    'description' => 'Hamburguesa sencilla de pechuga',
                    'image' => '/images/burguer-hero.png',
                    'price' => 21000,
                    'category_id' => $hamburguesas->id,
                ],
                'ingredients' => [
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $carnePollo->id, 'quantity' => 0.15], // 150g de pechuga
                    ['id' => $quesoAmericano->id, 'quantity' => 0.04],
                    ['id' => $lechuga->id, 'quantity' => 0.02],
                    ['id' => $tomate->id, 'quantity' => 0.03],
                    ['id' => $cebolla->id, 'quantity' => 0.02],
                    ['id' => $salsaTomate->id, 'quantity' => 0.02],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                    ['id' => $papasFritas->id, 'quantity' => 0.15],
                ]
            ],
            [
                'product' => [
                    'name' => 'Hamburguesa Doble Carne',
                    'description' => 'Hamburguesa con doble carne',
                    'image' => '/images/burguer-navbar.jpg',
                    'price' => 25000,
                    'category_id' => $hamburguesas->id,
                ],
                'ingredients' => [
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $carneRes->id, 'quantity' => 0.3], // 300g de carne (doble)
                    ['id' => $quesoCheddar->id, 'quantity' => 0.06], // 60g de queso
                    ['id' => $tocineta->id, 'quantity' => 0.04], // 40g de tocineta
                    ['id' => $lechuga->id, 'quantity' => 0.02],
                    ['id' => $tomate->id, 'quantity' => 0.03],
                    ['id' => $cebolla->id, 'quantity' => 0.02],
                    ['id' => $salsaTomate->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.03],
                    ['id' => $papasFritas->id, 'quantity' => 0.18],
                ]
            ],
            [
                'product' => [
                    'name' => 'Hamburguesa de la Casa',
                    'description' => 'Hamburguesa especial de la casa',
                    'image' => '/images/burguer-navbar.jpg',
                    'price' => 27000,
                    'category_id' => $hamburguesas->id,
                ],
                'ingredients' => [
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $carneRes->id, 'quantity' => 0.2], // 200g de carne
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                    ['id' => $tocineta->id, 'quantity' => 0.05],
                    ['id' => $huevo->id, 'quantity' => 1], // 1 huevo
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.04],
                    ['id' => $cebollaCaramelizada->id, 'quantity' => 0.04],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.03],
                    ['id' => $papasFritas->id, 'quantity' => 0.2],
                ]
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

        foreach ($products as $item) {
            // Si el producto tiene la estructura con ingredientes
            if (isset($item['product']) && isset($item['ingredients'])) {
                $product = Product::create($item['product']);
                
                // Adjuntar ingredientes con sus cantidades
                foreach ($item['ingredients'] as $ingredient) {
                    $product->ingredients()->attach($ingredient['id'], [
                        'quantity_needed' => $ingredient['quantity']
                    ]);
                }
            } else {
                // Productos sin ingredientes (bebidas, jugos, etc.)
                Product::create($item);
            }
        }
    }
}
