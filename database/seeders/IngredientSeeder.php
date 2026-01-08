<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            // Carnes
            ['name' => 'Carne de res molida', 'unit_of_measurement' => 'kg', 'unit_price' => 15000, 'supplier' => 'Frigorífico El Rancho', 'current_stock' => 50],
            ['name' => 'Carne de pollo', 'unit_of_measurement' => 'kg', 'unit_price' => 12000, 'supplier' => 'Frigorífico El Rancho', 'current_stock' => 45],
            ['name' => 'Tocineta', 'unit_of_measurement' => 'kg', 'unit_price' => 18000, 'supplier' => 'Carnes Selectas', 'current_stock' => 20],
            ['name' => 'Salchicha para perros', 'unit_of_measurement' => 'kg', 'unit_price' => 14000, 'supplier' => 'Frigorífico El Rancho', 'current_stock' => 35],
            ['name' => 'Jamón', 'unit_of_measurement' => 'kg', 'unit_price' => 16000, 'supplier' => 'Carnes Selectas', 'current_stock' => 25],

            // Quesos
            ['name' => 'Queso mozzarella', 'unit_of_measurement' => 'kg', 'unit_price' => 20000, 'supplier' => 'Lácteos del Valle', 'current_stock' => 30],
            ['name' => 'Queso cheddar', 'unit_of_measurement' => 'kg', 'unit_price' => 22000, 'supplier' => 'Lácteos del Valle', 'current_stock' => 28],
            ['name' => 'Queso americano', 'unit_of_measurement' => 'kg', 'unit_price' => 19000, 'supplier' => 'Lácteos del Valle', 'current_stock' => 32],

            // Vegetales
            ['name' => 'Lechuga', 'unit_of_measurement' => 'kg', 'unit_price' => 3000, 'supplier' => 'Verduras Frescas', 'current_stock' => 15],
            ['name' => 'Tomate', 'unit_of_measurement' => 'kg', 'unit_price' => 3500, 'supplier' => 'Verduras Frescas', 'current_stock' => 20],
            ['name' => 'Cebolla', 'unit_of_measurement' => 'kg', 'unit_price' => 2500, 'supplier' => 'Verduras Frescas', 'current_stock' => 25],
            ['name' => 'Cebolla caramelizada', 'unit_of_measurement' => 'kg', 'unit_price' => 5000, 'supplier' => 'Preparados Gourmet', 'current_stock' => 10],
            ['name' => 'Pepinillos', 'unit_of_measurement' => 'kg', 'unit_price' => 8000, 'supplier' => 'Conservas Premium', 'current_stock' => 12],
            ['name' => 'Jalapeños', 'unit_of_measurement' => 'kg', 'unit_price' => 9000, 'supplier' => 'Conservas Premium', 'current_stock' => 8],
            ['name' => 'Champiñones', 'unit_of_measurement' => 'kg', 'unit_price' => 12000, 'supplier' => 'Verduras Frescas', 'current_stock' => 10],

            // Papas y Frituras
            ['name' => 'Papa para freír', 'unit_of_measurement' => 'kg', 'unit_price' => 4000, 'supplier' => 'Papas del Norte', 'current_stock' => 100],
            ['name' => 'Papas fritas congeladas', 'unit_of_measurement' => 'kg', 'unit_price' => 6500, 'supplier' => 'Alimentos Congelados', 'current_stock' => 80],
            ['name' => 'Aros de cebolla', 'unit_of_measurement' => 'kg', 'unit_price' => 8000, 'supplier' => 'Alimentos Congelados', 'current_stock' => 25],

            // Salsas y Condimentos
            ['name' => 'Salsa de tomate', 'unit_of_measurement' => 'lt', 'unit_price' => 12000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 20],
            ['name' => 'Mayonesa', 'unit_of_measurement' => 'lt', 'unit_price' => 15000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 25],
            ['name' => 'Mostaza', 'unit_of_measurement' => 'lt', 'unit_price' => 10000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 18],
            ['name' => 'Salsa BBQ', 'unit_of_measurement' => 'lt', 'unit_price' => 14000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 15],
            ['name' => 'Salsa rosada', 'unit_of_measurement' => 'lt', 'unit_price' => 13000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 20],
            ['name' => 'Salsa picante', 'unit_of_measurement' => 'lt', 'unit_price' => 11000, 'supplier' => 'Salsas Artesanales', 'current_stock' => 12],
            ['name' => 'Salsa de ajo', 'unit_of_measurement' => 'lt', 'unit_price' => 13500, 'supplier' => 'Salsas Artesanales', 'current_stock' => 14],
            ['name' => 'Aceite para freír', 'unit_of_measurement' => 'lt', 'unit_price' => 8000, 'supplier' => 'Distribuidora Central', 'current_stock' => 50],
            ['name' => 'Sal', 'unit_of_measurement' => 'kg', 'unit_price' => 2000, 'supplier' => 'Distribuidora Central', 'current_stock' => 30],
            ['name' => 'Pimienta', 'unit_of_measurement' => 'kg', 'unit_price' => 15000, 'supplier' => 'Especias del Mundo', 'current_stock' => 5],

            // Panes
            ['name' => 'Pan para hamburguesa', 'unit_of_measurement' => 'und', 'unit_price' => 800, 'supplier' => 'Panadería La Especial', 'current_stock' => 200],
            ['name' => 'Pan para perro caliente', 'unit_of_measurement' => 'und', 'unit_price' => 600, 'supplier' => 'Panadería La Especial', 'current_stock' => 180],
            ['name' => 'Pan artesanal', 'unit_of_measurement' => 'und', 'unit_price' => 1200, 'supplier' => 'Panadería La Especial', 'current_stock' => 100],

            // Bebidas y Lácteos
            ['name' => 'Leche', 'unit_of_measurement' => 'lt', 'unit_price' => 4500, 'supplier' => 'Lácteos del Valle', 'current_stock' => 40],
            ['name' => 'Crema de leche', 'unit_of_measurement' => 'lt', 'unit_price' => 8000, 'supplier' => 'Lácteos del Valle', 'current_stock' => 20],

            // Extras
            ['name' => 'Huevo', 'unit_of_measurement' => 'und', 'unit_price' => 500, 'supplier' => 'Granja Avícola', 'current_stock' => 300],
            ['name' => 'Aguacate', 'unit_of_measurement' => 'kg', 'unit_price' => 7000, 'supplier' => 'Verduras Frescas', 'current_stock' => 20],
            ['name' => 'Piña', 'unit_of_measurement' => 'kg', 'unit_price' => 4000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 15],
            
            // Frutas para Jugos
            ['name' => 'Tomate de árbol', 'unit_of_measurement' => 'kg', 'unit_price' => 5000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 20],
            ['name' => 'Maracuyá', 'unit_of_measurement' => 'kg', 'unit_price' => 6000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 18],
            ['name' => 'Mora', 'unit_of_measurement' => 'kg', 'unit_price' => 8000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 15],
            ['name' => 'Limón', 'unit_of_measurement' => 'kg', 'unit_price' => 3000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 25],
            ['name' => 'Lulo', 'unit_of_measurement' => 'kg', 'unit_price' => 7000, 'supplier' => 'Frutas Tropicales', 'current_stock' => 12],
            ['name' => 'Níspero', 'unit_of_measurement' => 'kg', 'unit_price' => 6500, 'supplier' => 'Frutas Tropicales', 'current_stock' => 10],
            ['name' => 'Azúcar', 'unit_of_measurement' => 'kg', 'unit_price' => 3500, 'supplier' => 'Distribuidora Central', 'current_stock' => 50],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create($ingredient);
        }
    }
}
