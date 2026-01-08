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
        
        // Frutas para jugos
        $tomateArbol = Ingredient::where('name', 'Tomate de árbol')->first();
        $maracuya = Ingredient::where('name', 'Maracuyá')->first();
        $mora = Ingredient::where('name', 'Mora')->first();
        $limon = Ingredient::where('name', 'Limón')->first();
        $lulo = Ingredient::where('name', 'Lulo')->first();
        $nispero = Ingredient::where('name', 'Níspero')->first();
        $azucar = Ingredient::where('name', 'Azúcar')->first();
        $leche = Ingredient::where('name', 'Leche')->first();

        $products = [
            // ENTRADAS
            [
                'product' => [
                    'code' => '#001',
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
                    'code' => '#002',
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
                    'code' => '#003',
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
                    'code' => '#004',
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
                'product' => [
                    'code' => '#005',
                    'name' => 'Pechuga con Chimichurri',
                    'description' => 'Pechuga de pollo con salsa chimichurri',
                    'image' => '/images/asado-navbar.png',
                    'price' => 22000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carnePollo->id, 'quantity' => 0.25], // 250g de pechuga
                    ['id' => $papa->id, 'quantity' => 0.2], // 200g de papa
                    ['id' => $lechuga->id, 'quantity' => 0.03], // 30g de lechuga
                    ['id' => $tomate->id, 'quantity' => 0.05], // 50g de tomate
                    ['id' => $salsaAjo->id, 'quantity' => 0.05], // 50ml de chimichurri/salsa
                ]
            ],
            [
                'product' => [
                    'code' => '#006',
                    'name' => 'Pechuga Gratinada',
                    'description' => 'Pechuga de pollo gratinada',
                    'image' => '/images/asado-navbar.png',
                    'price' => 24000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carnePollo->id, 'quantity' => 0.25], // 250g de pechuga
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.08], // 80g de queso
                    ['id' => $papa->id, 'quantity' => 0.2], // 200g de papa
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $champinones->id, 'quantity' => 0.05], // 50g de champiñones
                ]
            ],
            [
                'product' => [
                    'code' => '#007',
                    'name' => 'Cerdo con Chimichurri',
                    'description' => 'Carne de cerdo con salsa chimichurri',
                    'image' => '/images/asado-navbar.png',
                    'price' => 23000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.25], // 250g de cerdo (usando carneRes como referencia)
                    ['id' => $papa->id, 'quantity' => 0.2],
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.04], // 40g de cebolla
                    ['id' => $salsaAjo->id, 'quantity' => 0.05],
                ]
            ],
            [
                'product' => [
                    'code' => '#008',
                    'name' => 'Cerdo Gratinado',
                    'description' => 'Carne de cerdo gratinada',
                    'image' => '/images/asado-navbar.png',
                    'price' => 25000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.25], // 250g de cerdo
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.08],
                    ['id' => $papa->id, 'quantity' => 0.2],
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $champinones->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.04],
                ]
            ],
            [
                'product' => [
                    'code' => '#009',
                    'name' => 'Carne de Res con Chimichurri',
                    'description' => 'Carne de res con salsa chimichurri',
                    'image' => '/images/asado-navbar.png',
                    'price' => 26000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.28], // 280g de carne de res
                    ['id' => $papa->id, 'quantity' => 0.2],
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.04],
                    ['id' => $salsaAjo->id, 'quantity' => 0.05],
                ]
            ],
            [
                'product' => [
                    'code' => '#010',
                    'name' => 'Churrasco',
                    'description' => 'Delicioso churrasco',
                    'image' => '/images/asado-navbar.png',
                    'price' => 32000,
                    'category_id' => $asados->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.35], // 350g de carne de res
                    ['id' => $papa->id, 'quantity' => 0.25], // 250g de papa
                    ['id' => $lechuga->id, 'quantity' => 0.04],
                    ['id' => $tomate->id, 'quantity' => 0.06],
                    ['id' => $cebolla->id, 'quantity' => 0.05],
                    ['id' => $aguacate->id, 'quantity' => 0.08], // 80g de aguacate
                    ['id' => $salsaAjo->id, 'quantity' => 0.06],
                ]
            ],

            // PICADAS
            [
                'product' => [
                    'code' => '#011',
                    'name' => 'Picada Personal',
                    'description' => 'Picada para una persona',
                    'image' => '/images/picada-navbar.png',
                    'price' => 19000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.08], // 80g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.08], // 80g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.06], // 60g de salchicha
                    ['id' => $papasFritas->id, 'quantity' => 0.15], // 150g de papas
                    ['id' => $salsaTomate->id, 'quantity' => 0.03],
                    ['id' => $mayonesa->id, 'quantity' => 0.03],
                ]
            ],
            [
                'product' => [
                    'code' => '#012',
                    'name' => 'Picada Dos Personas',
                    'description' => 'Picada para dos personas',
                    'image' => '/images/salchipapa-2.png',
                    'price' => 25000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15], // 150g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.15], // 150g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.12], // 120g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.06], // 60g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 0.3], // 300g de papas
                    ['id' => $salsaTomate->id, 'quantity' => 0.05],
                    ['id' => $mayonesa->id, 'quantity' => 0.05],
                ]
            ],
            [
                'product' => [
                    'code' => '#013',
                    'name' => 'Picada Tres Personas',
                    'description' => 'Picada para tres personas',
                    'image' => '/images/picada-navbar.png',
                    'price' => 30000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.22], // 220g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.22], // 220g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.18], // 180g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.09], // 90g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 0.45], // 450g de papas
                    ['id' => $salsaTomate->id, 'quantity' => 0.07],
                    ['id' => $mayonesa->id, 'quantity' => 0.07],
                ]
            ],
            [
                'product' => [
                    'code' => '#014',
                    'name' => 'Picada Cuatro Personas',
                    'description' => 'Picada para cuatro personas',
                    'image' => '/images/salchipapa-2.png',
                    'price' => 37000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.3], // 300g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.3], // 300g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.24], // 240g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.12], // 120g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 0.6], // 600g de papas
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.08], // 80g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.1],
                    ['id' => $mayonesa->id, 'quantity' => 0.1],
                ]
            ],
            [
                'product' => [
                    'code' => '#015',
                    'name' => 'Picada Mediana',
                    'description' => 'Picada mediana',
                    'image' => '/images/salchipapa-2.png',
                    'price' => 45000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.4], // 400g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.4], // 400g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.3], // 300g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.15], // 150g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 0.8], // 800g de papas
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.12], // 120g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.12],
                    ['id' => $mayonesa->id, 'quantity' => 0.12],
                ]
            ],
            [
                'product' => [
                    'code' => '#016',
                    'name' => 'Picada Grande',
                    'description' => 'Picada grande (55-65-80-90-100)',
                    'image' => '/images/picada-navbar.png',
                    'price' => 90000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.8], // 800g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.8], // 800g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.6], // 600g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.3], // 300g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 1.5], // 1.5kg de papas
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.25], // 250g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.25],
                    ['id' => $mayonesa->id, 'quantity' => 0.25],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.15],
                ]
            ],
            [
                'product' => [
                    'code' => '#017',
                    'name' => 'Picada Extra Grande',
                    'description' => 'Picada extra grande',
                    'image' => '/images/salchipapa-2.png',
                    'price' => 150000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 1.5], // 1.5kg de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 1.5], // 1.5kg de pollo
                    ['id' => $salchicha->id, 'quantity' => 1.0], // 1kg de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.5], // 500g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 2.5], // 2.5kg de papas
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.4], // 400g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.4],
                    ['id' => $mayonesa->id, 'quantity' => 0.4],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.25],
                ]
            ],
            [
                'product' => [
                    'code' => '#018',
                    'name' => 'Picada Mega Grande',
                    'description' => 'Picada mega grande',
                    'image' => '/images/picada-navbar.png',
                    'price' => 250000,
                    'category_id' => $picadas->id,
                ],
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 2.5], // 2.5kg de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 2.5], // 2.5kg de pollo
                    ['id' => $salchicha->id, 'quantity' => 1.8], // 1.8kg de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.8], // 800g de tocineta
                    ['id' => $papasFritas->id, 'quantity' => 4.0], // 4kg de papas
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.7], // 700g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.6],
                    ['id' => $mayonesa->id, 'quantity' => 0.6],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.4],
                    ['id' => $salsaRosada->id, 'quantity' => 0.3],
                ]
            ],

            // PATACÓN
            [
                'product' => [
                    'code' => '#019',
                    'name' => 'Patacón Personal',
                    'description' => 'Patacón para una persona',
                    'image' => '/images/categoria-patacones.png',
                    'price' => 20000,
                    'category_id' => $patacon->id,
                ],
                'ingredients' => [
                    ['id' => $papa->id, 'quantity' => 0.4], // 400g de papa
                    ['id' => $carneRes->id, 'quantity' => 0.15], // 150g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.1], // 100g de pollo
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.08], // 80g de queso
                    ['id' => $lechuga->id, 'quantity' => 0.03],
                    ['id' => $tomate->id, 'quantity' => 0.04],
                    ['id' => $salsaRosada->id, 'quantity' => 0.05],
                ]
            ],
            [
                'product' => [
                    'code' => '#020',
                    'name' => 'Patacón Dos Personas',
                    'description' => 'Patacón para dos personas',
                    'image' => '/images/categoria-patacones.png',
                    'price' => 27000,
                    'category_id' => $patacon->id,
                ],
                'ingredients' => [
                    ['id' => $papa->id, 'quantity' => 0.7], // 700g de papa
                    ['id' => $carneRes->id, 'quantity' => 0.25], // 250g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.2], // 200g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.1], // 100g de salchicha
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.12], // 120g de queso
                    ['id' => $lechuga->id, 'quantity' => 0.05],
                    ['id' => $tomate->id, 'quantity' => 0.06],
                    ['id' => $salsaRosada->id, 'quantity' => 0.08],
                ]
            ],
            [
                'product' => [
                    'code' => '#021',
                    'name' => 'Patacón Tres Personas',
                    'description' => 'Patacón para tres personas',
                    'image' => '/images/patacones-con-salchicha.png',
                    'price' => 35000,
                    'category_id' => $patacon->id,
                ],
                'ingredients' => [
                    ['id' => $papa->id, 'quantity' => 1.0], // 1kg de papa
                    ['id' => $carneRes->id, 'quantity' => 0.35], // 350g de carne de res
                    ['id' => $carnePollo->id, 'quantity' => 0.3], // 300g de pollo
                    ['id' => $salchicha->id, 'quantity' => 0.15], // 150g de salchicha
                    ['id' => $tocineta->id, 'quantity' => 0.08], // 80g de tocineta
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.18], // 180g de queso
                    ['id' => $lechuga->id, 'quantity' => 0.07],
                    ['id' => $tomate->id, 'quantity' => 0.08],
                    ['id' => $salsaRosada->id, 'quantity' => 0.12],
                ]
            ],

            // PERROS
            [
                'product' => [
                    'code' => '#022',
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
                    'code' => '#023',
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
                    'code' => '#024',
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
                    'code' => '#025',
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
                    'code' => '#026',
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
                    'code' => '#027',
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
                    'code' => '#028',
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
                    'code' => '#029',
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
                    'code' => '#030',
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
                'product' => [
                    'code' => '#031',
                    'name' => 'Mini Salchipapa',
                    'description' => 'Salchipapa para los más pequeños',
                    'image' => '/images/categoria-infantil.png',
                    'price' => 6000,
                    'category_id' => $menuInfantil->id,
                ],
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.05], // 50g de salchicha
                    ['id' => $papasFritas->id, 'quantity' => 0.08], // 80g de papas
                    ['id' => $salsaTomate->id, 'quantity' => 0.02],
                    ['id' => $mayonesa->id, 'quantity' => 0.02],
                ]
            ],
            [
                'product' => [
                    'code' => '#032',
                    'name' => 'Mini Perro + Jugo de Cajita',
                    'description' => 'Mini perro caliente con jugo de cajita',
                    'image' => '/images/hot-dog-navbar.jpg',
                    'price' => 10000,
                    'category_id' => $menuInfantil->id,
                ],
                'ingredients' => [
                    ['id' => $panPerro->id, 'quantity' => 1], // 1 pan pequeño
                    ['id' => $salchicha->id, 'quantity' => 0.06], // 60g de salchicha
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.03], // 30g de queso
                    ['id' => $salsaTomate->id, 'quantity' => 0.015],
                    ['id' => $mayonesa->id, 'quantity' => 0.015],
                    ['id' => $papasFritas->id, 'quantity' => 0.06], // 60g de papas
                ]
            ],

            // BEBIDAS
            [
                'name' => 'Coca Cola 1.5',
                'code' => '#033',
                'description' => 'Coca Cola de 1.5 litros',
                'image' => '/images/categoria-bebidas.png',
                'price' => 8000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Cola Romana 1.5',
                'code' => '#034',
                'description' => 'Cola Romana de 1.5 litros',
                'image' => '/images/gaseosa-roja.png',
                'price' => 8000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Coca Cola Litro',
                'code' => '#035',
                'description' => 'Coca Cola de 1 litro',
                'image' => '/images/categoria-bebidas.png',
                'price' => 6000,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Coca Cola Personal',
                'code' => '#036',
                'description' => 'Coca Cola personal',
                'image' => '/images/categoria-bebidas.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Postobón Personal',
                'code' => '#037',
                'description' => 'Postobón personal',
                'image' => '/images/gaseosa-roja.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Jugo Hit',
                'code' => '#038',
                'description' => 'Jugo Hit',
                'image' => '/images/categoria-jugos-naturales.png',
                'price' => 3500,
                'category_id' => $bebidas->id,
            ],
            [
                'name' => 'Agua',
                'code' => '#039',
                'description' => 'Agua mineral',
                'image' => '/images/botella-agua.png',
                'price' => 2000,
                'category_id' => $bebidas->id,
            ],

            // JUGOS NATURALES EN AGUA
            [
                'product' => [
                    'code' => '#040',
                    'name' => 'Jugo de Tomate de Árbol en Agua',
                    'description' => 'Jugo natural de tomate de árbol en agua',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 8000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $tomateArbol->id, 'quantity' => 0.15], // 150g de tomate de árbol
                    ['id' => $azucar->id, 'quantity' => 0.03], // 30g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#041',
                    'name' => 'Jugo de Maracuyá en Agua',
                    'description' => 'Jugo natural de maracuyá en agua',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 8000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $maracuya->id, 'quantity' => 0.12], // 120g de maracuyá
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#042',
                    'name' => 'Jugo de Mora en Agua',
                    'description' => 'Jugo natural de mora en agua',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 8000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $mora->id, 'quantity' => 0.13], // 130g de mora
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#043',
                    'name' => 'Limonada en Agua',
                    'description' => 'Limonada natural en agua',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 8000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $limon->id, 'quantity' => 0.08], // 80g de limón
                    ['id' => $azucar->id, 'quantity' => 0.05], // 50g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#044',
                    'name' => 'Jugo de Lulo en Agua',
                    'description' => 'Jugo natural de lulo en agua',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 8000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $lulo->id, 'quantity' => 0.14], // 140g de lulo
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#045',
                    'name' => 'Limonada Cerezada',
                    'description' => 'Limonada cerezada',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $limon->id, 'quantity' => 0.08], // 80g de limón
                    ['id' => $mora->id, 'quantity' => 0.06], // 60g de mora (cereza)
                    ['id' => $azucar->id, 'quantity' => 0.05], // 50g de azúcar
                ]
            ],

            // JUGOS NATURALES EN LECHE
            [
                'product' => [
                    'code' => '#046',
                    'name' => 'Jugo de Tomate de Árbol en Leche',
                    'description' => 'Jugo natural de tomate de árbol en leche',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $tomateArbol->id, 'quantity' => 0.15], // 150g de tomate de árbol
                    ['id' => $leche->id, 'quantity' => 0.2], // 200ml de leche
                    ['id' => $azucar->id, 'quantity' => 0.03], // 30g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#047',
                    'name' => 'Jugo de Maracuyá en Leche',
                    'description' => 'Jugo natural de maracuyá en leche',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $maracuya->id, 'quantity' => 0.12], // 120g de maracuyá
                    ['id' => $leche->id, 'quantity' => 0.2], // 200ml de leche
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#048',
                    'name' => 'Jugo de Mora en Leche',
                    'description' => 'Jugo natural de mora en leche',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $mora->id, 'quantity' => 0.13], // 130g de mora
                    ['id' => $leche->id, 'quantity' => 0.2], // 200ml de leche
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#049',
                    'name' => 'Jugo de Níspero en Leche',
                    'description' => 'Jugo natural de níspero en leche',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $nispero->id, 'quantity' => 0.14], // 140g de níspero
                    ['id' => $leche->id, 'quantity' => 0.2], // 200ml de leche
                    ['id' => $azucar->id, 'quantity' => 0.03], // 30g de azúcar
                ]
            ],
            [
                'product' => [
                    'code' => '#050',
                    'name' => 'Jugo de Lulo en Leche',
                    'description' => 'Jugo natural de lulo en leche',
                    'image' => '/images/categoria-jugos-naturales.png',
                    'price' => 10000,
                    'category_id' => $jugosNaturales->id,
                ],
                'ingredients' => [
                    ['id' => $lulo->id, 'quantity' => 0.14], // 140g de lulo
                    ['id' => $leche->id, 'quantity' => 0.2], // 200ml de leche
                    ['id' => $azucar->id, 'quantity' => 0.04], // 40g de azúcar
                ]
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
