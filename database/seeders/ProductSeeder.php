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
        // Asegurarse de que existen categorías
        $hamburguesas = Category::where('name', 'Hamburguesas')->first();
        $perros = Category::where('name', 'Perros')->first();
        $pizzas = Category::where('name', 'Picadas')->first();
        $asados = Category::where('name', 'Asados')->first();

        // Si no existen categorías, crearlas
        if (!$hamburguesas) {
            $hamburguesas = Category::create(['name' => 'Hamburguesas', 'description' => 'Deliciosas hamburguesas', 'image' => '']);
        }
        if (!$perros) {
            $perros = Category::create(['name' => 'Perros', 'description' => 'Perros calientes', 'image' => '']);
        }
        if (!$pizzas) {
            $pizzas = Category::create(['name' => 'Picadas', 'description' => 'Picadas y entradas', 'image' => '']);
        }
        if (!$asados) {
            $asados = Category::create(['name' => 'Asados', 'description' => 'Carnes asadas', 'image' => '']);
        }

        // Obtener ingredientes
        $carneRes = Ingredient::where('name', 'Carne de res molida')->first();
        $carnePollo = Ingredient::where('name', 'Carne de pollo')->first();
        $tocineta = Ingredient::where('name', 'Tocineta')->first();
        $salchicha = Ingredient::where('name', 'Salchicha para perros')->first();
        $quesoCheddar = Ingredient::where('name', 'Queso cheddar')->first();
        $quesoMozzarella = Ingredient::where('name', 'Queso mozzarella')->first();
        $quesoAmericano = Ingredient::where('name', 'Queso americano')->first();
        $lechuga = Ingredient::where('name', 'Lechuga')->first();
        $tomate = Ingredient::where('name', 'Tomate')->first();
        $cebolla = Ingredient::where('name', 'Cebolla')->first();
        $cebollaCaramelizada = Ingredient::where('name', 'Cebolla caramelizada')->first();
        $pepinillos = Ingredient::where('name', 'Pepinillos')->first();
        $jalapenos = Ingredient::where('name', 'Jalapeños')->first();
        $champinones = Ingredient::where('name', 'Champiñones')->first();
        $papasFritas = Ingredient::where('name', 'Papas fritas congeladas')->first();
        $salsaBBQ = Ingredient::where('name', 'Salsa BBQ')->first();
        $salsaRosada = Ingredient::where('name', 'Salsa rosada')->first();
        $salsaPicante = Ingredient::where('name', 'Salsa picante')->first();
        $salsaAjo = Ingredient::where('name', 'Salsa de ajo')->first();
        $panHamburguesa = Ingredient::where('name', 'Pan para hamburguesa')->first();
        $panPerro = Ingredient::where('name', 'Pan para perro caliente')->first();
        $aguacate = Ingredient::where('name', 'Aguacate')->first();

        $products = [
            // Hamburguesas
            [
                'name' => 'Hamburguesa Clásica',
                'description' => 'Carne de res, lechuga, tomate, cebolla, queso cheddar y salsas especiales',
                'image' => '',
                'price' => 15000,
                'category_id' => $hamburguesas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $lechuga->id, 'quantity' => 0.05],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.03],
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                ],
            ],
            [
                'name' => 'Hamburguesa BBQ',
                'description' => 'Carne de res, queso cheddar, tocineta, cebolla caramelizada y salsa BBQ',
                'image' => '',
                'price' => 18000,
                'category_id' => $hamburguesas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                    ['id' => $tocineta->id, 'quantity' => 0.04],
                    ['id' => $cebollaCaramelizada->id, 'quantity' => 0.05],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.03],
                ],
            ],
            [
                'name' => 'Hamburguesa Doble',
                'description' => 'Doble carne de res, doble queso americano, lechuga, tomate y pepinillos',
                'image' => '',
                'price' => 22000,
                'category_id' => $hamburguesas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.30],
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $quesoAmericano->id, 'quantity' => 0.10],
                    ['id' => $lechuga->id, 'quantity' => 0.05],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $pepinillos->id, 'quantity' => 0.03],
                ],
            ],
            [
                'name' => 'Hamburguesa Especial',
                'description' => 'Carne de res, queso mozzarella, champiñones, tocineta y salsa de ajo',
                'image' => '',
                'price' => 20000,
                'category_id' => $hamburguesas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.05],
                    ['id' => $champinones->id, 'quantity' => 0.06],
                    ['id' => $tocineta->id, 'quantity' => 0.04],
                    ['id' => $salsaAjo->id, 'quantity' => 0.03],
                ],
            ],
            [
                'name' => 'Hamburguesa Mexicana',
                'description' => 'Carne de res, queso cheddar, jalapeños, guacamole, nachos y salsa picante',
                'image' => '',
                'price' => 19000,
                'category_id' => $hamburguesas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $panHamburguesa->id, 'quantity' => 1],
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                    ['id' => $jalapenos->id, 'quantity' => 0.03],
                    ['id' => $aguacate->id, 'quantity' => 0.08],
                    ['id' => $salsaPicante->id, 'quantity' => 0.03],
                ],
            ],

            // Perros Calientes
            [
                'name' => 'Perro Sencillo',
                'description' => 'Salchicha premium, salsas de la casa y papas chips',
                'image' => '',
                'price' => 10000,
                'category_id' => $perros->id,
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.12],
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $papasFritas->id, 'quantity' => 0.10],
                ],
            ],
            [
                'name' => 'Perro Especial',
                'description' => 'Salchicha, queso mozzarella, tocineta, salsa rosada y papas chips',
                'image' => '',
                'price' => 14000,
                'category_id' => $perros->id,
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.12],
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.05],
                    ['id' => $tocineta->id, 'quantity' => 0.04],
                    ['id' => $salsaRosada->id, 'quantity' => 0.03],
                    ['id' => $papasFritas->id, 'quantity' => 0.10],
                ],
            ],
            [
                'name' => 'Perro Americano',
                'description' => 'Salchicha, queso cheddar, cebolla caramelizada, mostaza y salsa BBQ',
                'image' => '',
                'price' => 13000,
                'category_id' => $perros->id,
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.12],
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $quesoCheddar->id, 'quantity' => 0.05],
                    ['id' => $cebollaCaramelizada->id, 'quantity' => 0.04],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.03],
                ],
            ],
            [
                'name' => 'Perro Gratinado',
                'description' => 'Salchicha, abundante queso gratinado, tocineta y salsa de la casa',
                'image' => '',
                'price' => 16000,
                'category_id' => $perros->id,
                'ingredients' => [
                    ['id' => $salchicha->id, 'quantity' => 0.12],
                    ['id' => $panPerro->id, 'quantity' => 1],
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.08],
                    ['id' => $tocineta->id, 'quantity' => 0.04],
                ],
            ],

            // Picadas y Entradas
            [
                'name' => 'Picada Personal',
                'description' => 'Carne asada, chicharrón, papa criolla, chorizo y arepa',
                'image' => '',
                'price' => 25000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $carnePollo->id, 'quantity' => 0.10],
                    ['id' => $papasFritas->id, 'quantity' => 0.15],
                ],
            ],
            [
                'name' => 'Picada Familiar',
                'description' => 'Carne asada, pollo, chicharrón, papa criolla, chorizo, morcilla y arepas',
                'image' => '',
                'price' => 65000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.40],
                    ['id' => $carnePollo->id, 'quantity' => 0.30],
                    ['id' => $papasFritas->id, 'quantity' => 0.40],
                ],
            ],
            [
                'name' => 'Alitas BBQ',
                'description' => '10 alitas de pollo marinadas en salsa BBQ con papas fritas',
                'image' => '',
                'price' => 22000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $carnePollo->id, 'quantity' => 0.40],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.08],
                    ['id' => $papasFritas->id, 'quantity' => 0.15],
                ],
            ],
            [
                'name' => 'Dedos de Queso',
                'description' => '8 dedos de queso mozzarella empanizados con salsa de tomate',
                'image' => '',
                'price' => 15000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.20],
                ],
            ],

            // Asados
            [
                'name' => 'Churrasco',
                'description' => 'Corte de carne premium, chimichurri, papa criolla y ensalada',
                'image' => '',
                'price' => 32000,
                'category_id' => $asados->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.25],
                    ['id' => $papasFritas->id, 'quantity' => 0.15],
                    ['id' => $lechuga->id, 'quantity' => 0.05],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                ],
            ],
            [
                'name' => 'Pechuga a la Plancha',
                'description' => 'Pechuga de pollo a la plancha, arroz, papas fritas y ensalada',
                'image' => '',
                'price' => 24000,
                'category_id' => $asados->id,
                'ingredients' => [
                    ['id' => $carnePollo->id, 'quantity' => 0.25],
                    ['id' => $papasFritas->id, 'quantity' => 0.15],
                    ['id' => $lechuga->id, 'quantity' => 0.05],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                ],
            ],
            [
                'name' => 'Costillas BBQ',
                'description' => 'Costillas de cerdo bañadas en salsa BBQ, papas al horno y maíz',
                'image' => '',
                'price' => 35000,
                'category_id' => $asados->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.35],
                    ['id' => $salsaBBQ->id, 'quantity' => 0.10],
                    ['id' => $papasFritas->id, 'quantity' => 0.20],
                ],
            ],
            [
                'name' => 'Parrillada Mix',
                'description' => 'Carne de res, pollo, chorizo, morcilla, papa criolla y yuca',
                'image' => '',
                'price' => 38000,
                'category_id' => $asados->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.20],
                    ['id' => $carnePollo->id, 'quantity' => 0.20],
                    ['id' => $papasFritas->id, 'quantity' => 0.20],
                ],
            ],

            // Más opciones variadas
            [
                'name' => 'Papas Supremas',
                'description' => 'Papas fritas gigantes con queso cheddar, tocineta y cebolla verde',
                'image' => '',
                'price' => 16000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $papasFritas->id, 'quantity' => 0.30],
                    ['id' => $quesoCheddar->id, 'quantity' => 0.10],
                    ['id' => $tocineta->id, 'quantity' => 0.06],
                    ['id' => $cebolla->id, 'quantity' => 0.03],
                ],
            ],
            [
                'name' => 'Salchipapas',
                'description' => 'Papas fritas con salchicha, salsas de la casa y queso',
                'image' => '',
                'price' => 12000,
                'category_id' => $perros->id,
                'ingredients' => [
                    ['id' => $papasFritas->id, 'quantity' => 0.20],
                    ['id' => $salchicha->id, 'quantity' => 0.12],
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.05],
                ],
            ],
            [
                'name' => 'Patacones con Todo',
                'description' => 'Patacones con carne desmechada, queso, guacamole y hogao',
                'image' => '',
                'price' => 18000,
                'category_id' => $pizzas->id,
                'ingredients' => [
                    ['id' => $carneRes->id, 'quantity' => 0.15],
                    ['id' => $quesoMozzarella->id, 'quantity' => 0.06],
                    ['id' => $aguacate->id, 'quantity' => 0.10],
                    ['id' => $tomate->id, 'quantity' => 0.05],
                    ['id' => $cebolla->id, 'quantity' => 0.03],
                ],
            ],
        ];

        foreach ($products as $productData) {
            $ingredients = $productData['ingredients'];
            unset($productData['ingredients']);
            
            $product = Product::create($productData);
            
            // Attach ingredients with quantities
            $ingredientsData = [];
            foreach ($ingredients as $ingredient) {
                $ingredientsData[$ingredient['id']] = [
                    'quantity_needed' => $ingredient['quantity']
                ];
            }
            $product->ingredients()->attach($ingredientsData);
        }
    }
}
