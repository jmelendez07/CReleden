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

        // Crear pedidos de ejemplo distribuidos en los últimos 45 días
        // Simular horarios de operación: 6 PM - 6 AM (turno completo)
        $orders = [];
        $orderCount = 1;
        
        // Generar órdenes para los últimos 45 días
        for ($daysAgo = 45; $daysAgo >= 0; $daysAgo--) {
            // Número aleatorio de pedidos por día (entre 2 y 8)
            $ordersPerDay = rand(2, 8);
            
            for ($i = 0; $i < $ordersPerDay; $i++) {
                // Hora aleatoria entre 18:00 y 05:59 (turno de trabajo)
                $hour = rand(0, 11);
                if ($hour < 6) {
                    // Madrugada (00:00 - 05:59)
                    $actualHour = $hour;
                    $baseDate = now()->subDays($daysAgo - 1);
                } else {
                    // Noche (18:00 - 23:59)
                    $actualHour = $hour + 12;
                    $baseDate = now()->subDays($daysAgo);
                }
                
                $minute = rand(0, 59);
                $createdAt = $baseDate->setHour($actualHour)->setMinute($minute)->setSecond(rand(0, 59));
                
                // Seleccionar tipo, método de pago y productos aleatoriamente
                $types = [$paraLlevar, $domicilio, $mesa];
                $methods = [$efectivo, $tarjeta, $nequi];
                $statuses = ['completed', 'completed', 'completed', 'completed', 'pending', 'in_progress'];
                
                $selectedType = $types[array_rand($types)];
                $selectedMethod = $methods[array_rand($methods)];
                $selectedStatus = $statuses[array_rand($statuses)];
                
                // Seleccionar entre 1 y 4 productos aleatorios
                $numProducts = rand(1, 4);
                $selectedProducts = [];
                
                for ($p = 0; $p < $numProducts; $p++) {
                    $productIndex = rand(0, min($products->count() - 1, 19));
                    $quantity = rand(1, 3);
                    $selectedProducts[] = [
                        'product_index' => $productIndex,
                        'quantity' => $quantity,
                        'notes' => '',
                    ];
                }
                
                $orders[] = [
                    'code' => 'ORD-' . str_pad($orderCount, 4, '0', STR_PAD_LEFT),
                    'status' => $selectedStatus,
                    'notes' => '',
                    'type_id' => $selectedType->id,
                    'payment_method_id' => $selectedMethod->id,
                    'products' => $selectedProducts,
                    'created_at' => $createdAt,
                ];
                
                $orderCount++;
            }
        }

        // Procesar las órdenes
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
            $createdAt = $orderData['created_at'];
            unset($orderData['created_at']);
            
            $order = Order::create($orderData);
            
            // Establecer la fecha de creación personalizada
            $order->created_at = $createdAt;
            $order->updated_at = $createdAt;
            $order->save();

            // Crear detalles de la orden
            foreach ($details as $detail) {
                $detail['order_id'] = $order->id;
                $orderDetail = OrderDetail::create($detail);
                $orderDetail->created_at = $createdAt;
                $orderDetail->updated_at = $createdAt;
                $orderDetail->save();
            }
        }

        $this->command->info("Se crearon {$orderCount} pedidos distribuidos en los últimos 45 días.");
    }
}
