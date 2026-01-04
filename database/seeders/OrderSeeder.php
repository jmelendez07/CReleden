<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderType;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear tipos de pedido si no existen
        $orderTypes = [
            ['name' => 'Para llevar'],
            ['name' => 'Domicilio'],
            ['name' => 'Mesa'],
        ];

        foreach ($orderTypes as $type) {
            OrderType::firstOrCreate(['name' => $type['name']], $type);
        }

        // Crear métodos de pago si no existen
        $paymentMethods = [
            ['name' => 'Efectivo'],
            ['name' => 'Tarjeta'],
            ['name' => 'Transferencia'],
            ['name' => 'Nequi'],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::firstOrCreate(['name' => $method['name']], $method);
        }

        // Obtener tipos y métodos
        $paraLlevar = OrderType::where('name', 'Para llevar')->first();
        $domicilio = OrderType::where('name', 'Domicilio')->first();
        $mesa = OrderType::where('name', 'Mesa')->first();

        $efectivo = PaymentMethod::where('name', 'Efectivo')->first();
        $tarjeta = PaymentMethod::where('name', 'Tarjeta')->first();
        $nequi = PaymentMethod::where('name', 'Nequi')->first();

        // Obtener algunos productos
        $products = Product::with('ingredients')->get();

        if ($products->count() < 5) {
            $this->command->warn('No hay suficientes productos para crear pedidos. Ejecuta ProductSeeder primero.');
            return;
        }

        // Crear pedidos de ejemplo
        $orders = [
            [
                'code' => 'ORD-001',
                'status' => 'completed',
                'notes' => 'Sin cebolla en la hamburguesa',
                'type_id' => $paraLlevar->id,
                'payment_method_id' => $efectivo->id,
                'products' => [
                    ['product_index' => 0, 'quantity' => 2, 'notes' => ''],
                    ['product_index' => 5, 'quantity' => 1, 'notes' => 'Bien cocido'],
                ],
            ],
            [
                'code' => 'ORD-002',
                'status' => 'completed',
                'notes' => 'Cliente frecuente',
                'type_id' => $domicilio->id,
                'payment_method_id' => $nequi->id,
                'products' => [
                    ['product_index' => 1, 'quantity' => 3, 'notes' => ''],
                    ['product_index' => 6, 'quantity' => 2, 'notes' => 'Extra queso'],
                    ['product_index' => 9, 'quantity' => 1, 'notes' => ''],
                ],
            ],
            [
                'code' => 'ORD-003',
                'status' => 'pending',
                'notes' => 'Mesa 5',
                'type_id' => $mesa->id,
                'payment_method_id' => $tarjeta->id,
                'products' => [
                    ['product_index' => 2, 'quantity' => 1, 'notes' => 'Sin pepinillos'],
                    ['product_index' => 7, 'quantity' => 2, 'notes' => ''],
                    ['product_index' => 11, 'quantity' => 1, 'notes' => 'Para compartir'],
                ],
            ],
            [
                'code' => 'ORD-004',
                'status' => 'in_progress',
                'notes' => 'Pedido urgente',
                'type_id' => $paraLlevar->id,
                'payment_method_id' => $efectivo->id,
                'products' => [
                    ['product_index' => 3, 'quantity' => 2, 'notes' => ''],
                    ['product_index' => 8, 'quantity' => 3, 'notes' => 'Extra salsa'],
                ],
            ],
            [
                'code' => 'ORD-005',
                'status' => 'completed',
                'notes' => '',
                'type_id' => $domicilio->id,
                'payment_method_id' => $nequi->id,
                'products' => [
                    ['product_index' => 4, 'quantity' => 1, 'notes' => 'Picante'],
                    ['product_index' => 10, 'quantity' => 1, 'notes' => ''],
                    ['product_index' => 17, 'quantity' => 2, 'notes' => ''],
                ],
            ],
            [
                'code' => 'ORD-006',
                'status' => 'completed',
                'notes' => 'Mesa 12 - Cumpleaños',
                'type_id' => $mesa->id,
                'payment_method_id' => $tarjeta->id,
                'products' => [
                    ['product_index' => 13, 'quantity' => 2, 'notes' => 'Término medio'],
                    ['product_index' => 14, 'quantity' => 2, 'notes' => ''],
                    ['product_index' => 18, 'quantity' => 1, 'notes' => 'Extra grande'],
                ],
            ],
            [
                'code' => 'ORD-007',
                'status' => 'pending',
                'notes' => 'Recoger en 30 minutos',
                'type_id' => $paraLlevar->id,
                'payment_method_id' => $efectivo->id,
                'products' => [
                    ['product_index' => 15, 'quantity' => 1, 'notes' => ''],
                    ['product_index' => 12, 'quantity' => 1, 'notes' => 'Bien doradas'],
                ],
            ],
            [
                'code' => 'ORD-008',
                'status' => 'in_progress',
                'notes' => 'Dirección: Calle 45 #23-10',
                'type_id' => $domicilio->id,
                'payment_method_id' => $nequi->id,
                'products' => [
                    ['product_index' => 16, 'quantity' => 2, 'notes' => 'Extra BBQ'],
                    ['product_index' => 19, 'quantity' => 2, 'notes' => ''],
                ],
            ],
            [
                'code' => 'ORD-009',
                'status' => 'completed',
                'notes' => 'Mesa 3',
                'type_id' => $mesa->id,
                'payment_method_id' => $tarjeta->id,
                'products' => [
                    ['product_index' => 0, 'quantity' => 4, 'notes' => ''],
                    ['product_index' => 5, 'quantity' => 4, 'notes' => 'Sin papas'],
                    ['product_index' => 11, 'quantity' => 2, 'notes' => ''],
                ],
            ],
            [
                'code' => 'ORD-010',
                'status' => 'completed',
                'notes' => 'Cliente corporativo',
                'type_id' => $domicilio->id,
                'payment_method_id' => $tarjeta->id,
                'products' => [
                    ['product_index' => 1, 'quantity' => 5, 'notes' => ''],
                    ['product_index' => 2, 'quantity' => 5, 'notes' => ''],
                    ['product_index' => 18, 'quantity' => 3, 'notes' => ''],
                ],
            ],
        ];

        foreach ($orders as $orderData) {
            $productsData = $orderData['products'];
            unset($orderData['products']);

            $total = 0;
            $details = [];

            // Calcular total y preparar detalles
            foreach ($productsData as $productData) {
                $productIndex = $productData['product_index'];
                
                if ($productIndex >= $products->count()) {
                    continue;
                }

                $product = $products[$productIndex];
                $quantity = $productData['quantity'];
                $unitPrice = $product->price;
                $subtotal = $quantity * $unitPrice;
                $total += $subtotal;

                $details[] = [
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                    'notes' => $productData['notes'],
                    'product_id' => $product->id,
                ];
            }

            // Crear orden con total
            $orderData['total'] = $total;
            $order = Order::create($orderData);

            // Crear detalles de la orden
            foreach ($details as $detail) {
                $detail['order_id'] = $order->id;
                OrderDetail::create($detail);
            }
        }

        $this->command->info('Se crearon 10 pedidos con sus detalles exitosamente.');
    }
}
