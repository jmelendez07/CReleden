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
        // Obtener tipos y métodos
        $paraLlevar = OrderType::where('name', 'Para llevar')->first();
        $domicilio = OrderType::where('name', 'Domicilio')->first();
        $paraAqui = OrderType::where('name', 'Para Aquí')->first();

        $efectivo = PaymentMethod::where('name', 'Efectivo')->first();
        $tarjeta = PaymentMethod::where('name', 'Tarjeta')->first();
        $nequi = PaymentMethod::where('name', 'Nequi')->first();

        // Obtener productos por categorías
        $products = Product::all();

        if ($products->count() < 5) {
            $this->command->warn('No hay suficientes productos para crear pedidos. Ejecuta ProductSeeder primero.');
            return;
        }

        // Agrupar productos por categorías para selección más inteligente
        $hamburguesas = $products->where('category.name', 'Hamburguesas')->values();
        $perros = $products->where('category.name', 'Perros')->values();
        $asados = $products->where('category.name', 'Asados')->values();
        $picadas = $products->where('category.name', 'Picadas')->values();
        $entradas = $products->where('category.name', 'Entradas')->values();
        $patacones = $products->where('category.name', 'Patacón')->values();
        $bebidas = $products->where('category.name', 'Bebidas')->values();
        $jugosNaturales = $products->where('category.name', 'Jugos Naturales')->values();
        $menuInfantil = $products->where('category.name', 'Menú Infantil')->values();

        // Crear pedidos de ejemplo distribuidos en los últimos 45 días
        // Simular horarios de operación: 6 PM - 6 AM (turno completo)
        $orders = [];
        $orderCount = 1;
        
        // Generar órdenes para los últimos 45 días
        for ($daysAgo = 45; $daysAgo >= 0; $daysAgo--) {
            // Número aleatorio de pedidos por día (entre 5 y 15)
            $ordersPerDay = rand(5, 15);
            
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
                
                // Seleccionar tipo, método de pago y estado
                $types = [$paraLlevar, $domicilio, $paraAqui];
                $methods = [$efectivo, $tarjeta, $nequi];
                $statuses = ['completed', 'completed', 'completed', 'completed', 'completed', 'pending', 'in_progress'];
                
                $selectedType = $types[array_rand($types)];
                $selectedMethod = $methods[array_rand($methods)];
                $selectedStatus = $statuses[array_rand($statuses)];
                
                // Selección inteligente de productos según patrones comunes
                $selectedProducts = [];
                $orderType = rand(1, 100);
                
                // 35% - Combo simple (plato fuerte + bebida)
                if ($orderType <= 35) {
                    $mainDish = rand(1, 10);
                    if ($mainDish <= 4 && $hamburguesas->count() > 0) {
                        $product = $hamburguesas->random();
                        $selectedProducts[] = ['product' => $product, 'quantity' => rand(1, 2)];
                    } elseif ($mainDish <= 7 && $perros->count() > 0) {
                        $product = $perros->random();
                        $selectedProducts[] = ['product' => $product, 'quantity' => rand(1, 3)];
                    } elseif ($asados->count() > 0) {
                        $product = $asados->random();
                        $selectedProducts[] = ['product' => $product, 'quantity' => 1];
                    }
                    
                    // Agregar bebida
                    if (rand(1, 10) <= 8) {
                        if (rand(1, 2) == 1 && $bebidas->count() > 0) {
                            $selectedProducts[] = ['product' => $bebidas->random(), 'quantity' => 1];
                        } elseif ($jugosNaturales->count() > 0) {
                            $selectedProducts[] = ['product' => $jugosNaturales->random(), 'quantity' => 1];
                        }
                    }
                }
                // 25% - Pedido múltiple (varios platos + bebidas)
                elseif ($orderType <= 60) {
                    $numItems = rand(2, 4);
                    $categories = [$hamburguesas, $perros, $asados, $entradas];
                    
                    for ($j = 0; $j < $numItems; $j++) {
                        $category = $categories[array_rand($categories)];
                        if ($category->count() > 0) {
                            $selectedProducts[] = ['product' => $category->random(), 'quantity' => 1];
                        }
                    }
                    
                    // Agregar bebidas
                    $numBebidas = rand(1, 3);
                    for ($j = 0; $j < $numBebidas; $j++) {
                        if (rand(1, 2) == 1 && $bebidas->count() > 0) {
                            $selectedProducts[] = ['product' => $bebidas->random(), 'quantity' => 1];
                        } elseif ($jugosNaturales->count() > 0) {
                            $selectedProducts[] = ['product' => $jugosNaturales->random(), 'quantity' => 1];
                        }
                    }
                }
                // 20% - Picadas o Patacones (para grupos)
                elseif ($orderType <= 80) {
                    if (rand(1, 2) == 1 && $picadas->count() > 0) {
                        $selectedProducts[] = ['product' => $picadas->random(), 'quantity' => 1];
                    } elseif ($patacones->count() > 0) {
                        $selectedProducts[] = ['product' => $patacones->random(), 'quantity' => 1];
                    }
                    
                    // Agregar bebidas (más cantidad para grupos)
                    $numBebidas = rand(2, 5);
                    for ($j = 0; $j < $numBebidas; $j++) {
                        if ($bebidas->count() > 0) {
                            $selectedProducts[] = ['product' => $bebidas->random(), 'quantity' => 1];
                        }
                    }
                }
                // 10% - Entradas + plato fuerte
                elseif ($orderType <= 90) {
                    if ($entradas->count() > 0) {
                        $selectedProducts[] = ['product' => $entradas->random(), 'quantity' => rand(1, 2)];
                    }
                    
                    $mainCategories = [$hamburguesas, $perros, $asados];
                    $mainCategory = $mainCategories[array_rand($mainCategories)];
                    if ($mainCategory->count() > 0) {
                        $selectedProducts[] = ['product' => $mainCategory->random(), 'quantity' => 1];
                    }
                    
                    if ($jugosNaturales->count() > 0) {
                        $selectedProducts[] = ['product' => $jugosNaturales->random(), 'quantity' => rand(1, 2)];
                    }
                }
                // 10% - Menú infantil o solo bebidas
                else {
                    if (rand(1, 2) == 1 && $menuInfantil->count() > 0) {
                        $selectedProducts[] = ['product' => $menuInfantil->random(), 'quantity' => rand(1, 2)];
                    } else {
                        $numBebidas = rand(1, 4);
                        for ($j = 0; $j < $numBebidas; $j++) {
                            if (rand(1, 2) == 1 && $bebidas->count() > 0) {
                                $selectedProducts[] = ['product' => $bebidas->random(), 'quantity' => 1];
                            } elseif ($jugosNaturales->count() > 0) {
                                $selectedProducts[] = ['product' => $jugosNaturales->random(), 'quantity' => 1];
                            }
                        }
                    }
                }
                
                if (count($selectedProducts) == 0) {
                    continue;
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
                $product = $productData['product'];
                $quantity = $productData['quantity'];
                $unitPrice = $product->price;
                $subtotal = $quantity * $unitPrice;
                $total += $subtotal;

                $details[] = [
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                    'notes' => '',
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

        $this->command->info("Se crearon " . count($orders) . " pedidos distribuidos en los últimos 45 días.");
    }
}
