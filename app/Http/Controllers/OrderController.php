<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMethods;
use App\Enums\OrderStatuses;
use App\Events\OrderPendingCreated;
use App\Events\OrderStatusUpdated;
use App\Models\Guarantor;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderType;
use App\Models\PaymentMethod;
use Illuminate\Support\Str;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $statusFilter = $request->input('status', OrderStatuses::PENDING->value);

        $orders = Order::with(['type', 'method', 'details.product.category', 'details.product.ingredients', 'guarantor'])
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                      ->orWhere('notes', 'like', "%{$search}%");
            })
            ->when($statusFilter, function ($query, $statusFilter) {
                $query->where('status', $statusFilter);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/orders/index', [
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'status' => $statusFilter,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('category', 'ingredients')->orderBy('name')->get();
        $categories = $products->pluck('category')->unique()->values();
        $orderTypes = OrderType::orderBy('name')->get();
        $paymentMethods = PaymentMethod::orderBy('name')->get();

        return Inertia::render('dashboard/orders/create', [
            'products' => $products,
            'orderTypes' => $orderTypes,
            'paymentMethods' => $paymentMethods,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'order_type' => 'required|string',
                'payment_method' => 'nullable|string',
                'products' => 'required|array|min:1',
                'products.*.product_id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'products.*.note' => 'nullable|string|max:500',
            ]);

            // Buscar el tipo de orden por nombre
            $orderType = OrderType::where('name', $request->order_type)->first();

        // Buscar método de pago por nombre (opcional)
        $paymentMethodId = null;
        if ($request->payment_method) {
            $paymentMethod = PaymentMethod::where('name', $request->payment_method)->first();
            if ($paymentMethod) {
                $paymentMethodId = $paymentMethod->id;
            }
        }

        // Calcular total y preparar detalles
        $total = 0;
        $detailsData = [];
        $orderNotes = [];
        
        foreach ($request->products as $item) {
            $product = Product::findOrFail($item['product_id']);
            $quantity = $item['quantity'];
            $unitPrice = $product->price;
            $subtotal = $quantity * $unitPrice;
            $total += $subtotal;

            $note = $item['note'] ?? '';
            
            $detailsData[] = [
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'subtotal' => $subtotal,
                'notes' => $note,
            ];

            // Compilar notas para la orden general
            if (!empty($note)) {
                $orderNotes[] = "{$product->name}: {$note}";
            }
        }

        // Crear orden
        $order = Order::create([
            'code' => '00000', // Temporal, se actualizará después
            'token' => (string) Str::uuid(),
            'status' => 'pending',
            'total' => $total,
            'notes' => !empty($orderNotes) ? implode(', ', $orderNotes) : null,
            'type_id' => $orderType->id,
            'payment_method_id' => $paymentMethodId,
        ]);

        // Generar código con ID de 5 dígitos
        $order->update([
            'code' => str_pad($order->id, 5, '0', STR_PAD_LEFT)
        ]);

        // Crear detalles
        foreach ($detailsData as $detailData) {
            $detailData['order_id'] = $order->id;
            OrderDetail::create($detailData);
        }

            return redirect()->route('dashboard.orders.index')
                ->with('success', 'Pedido creado exitosamente');
        } catch (\Exception $e) {
            
            return back()->withErrors(['message' => 'Error al crear el pedido: ' . $e->getMessage()]);
        }
    }

    public function storeCart(Request $request)
    {
        try {
            $request->validate([
                'order_type' => 'required|string',
                'items' => 'required|array|min:1',
                'items.*.product.id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.notes' => 'nullable|string|max:500',
            ]);

            $orderType = OrderType::where('name', $request->order_type)->first();
            
            if (!$orderType) {
                return back()->withErrors(['message' => 'Tipo de orden no válido']);
            }

            $total = 0;
            $detailsData = [];
            $orderNotes = [];
            
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product']['id']);
                $quantity = $item['quantity'];
                $unitPrice = $product->price;
                $subtotal = $quantity * $unitPrice;
                $total += $subtotal;

                $note = $item['notes'] ?? '';
                
                $detailsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                    'notes' => $note,
                ];

                if (!empty($note)) {
                    $orderNotes[] = "{$product->name}: {$note}";
                }
            }

            $order = Order::create([
                'code' => '00000', // Temporal, se actualizará después
                'token' => (string) Str::uuid(),
                'status' => OrderStatuses::PENDING->value,
                'total' => $total,
                'notes' => !empty($orderNotes) ? implode(', ', $orderNotes) : null,
                'type_id' => $orderType->id,
                'payment_method_id' => null,
            ]);

            $order->update([
                'code' => str_pad($order->id, 5, '0', STR_PAD_LEFT)
            ]);

            foreach ($detailsData as $detailData) {
                $detailData['order_id'] = $order->id;
                OrderDetail::create($detailData);
            }

            event(new OrderPendingCreated($order));

            return Inertia::location(route('order.pending', ['token' => $order->token]));
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error al crear el pedido: ' . $e->getMessage()]);
        }
    }

    public function pending($token)
    {
        $order = Order::where('token', $token)->firstOrFail();
        $order->load(['type', 'method', 'details.product.category']);

        if ($order->status !== OrderStatuses::PENDING->value) {
            return redirect()
                ->route('home')
                ->withErrors(['message' => 'La orden no está pendiente.']);
        }

        return Inertia::render('order/pending', [
            'order' => $order,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['type', 'method', 'details.product.category']);

        return Inertia::render('dashboard/orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['details.product', 'type', 'method']);
        $products = Product::with('category', 'ingredients')->orderBy('name')->get();
        $categories = $products->pluck('category')->unique()->values();
        $orderTypes = OrderType::orderBy('name')->get();
        $paymentMethods = PaymentMethod::orderBy('name')->get();

        return Inertia::render('dashboard/orders/edit', [
            'order' => $order,
            'products' => $products,
            'categories' => $categories,
            'orderTypes' => $orderTypes,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            $request->validate([
                'order_type' => 'required|string',
                'payment_method' => 'nullable|string',
                'products' => 'required|array|min:1',
                'products.*.product_id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'products.*.note' => 'nullable|string|max:500',
            ]);

            // Buscar el tipo de orden por nombre
            $orderType = OrderType::where('name', $request->order_type)->first();

            // Buscar método de pago por nombre (opcional)
            $paymentMethodId = null;
            if ($request->payment_method) {
                $paymentMethod = PaymentMethod::where('name', $request->payment_method)->first();
                if ($paymentMethod) {
                    $paymentMethodId = $paymentMethod->id;
                }
            }

            // Calcular total y preparar detalles
            $total = 0;
            $detailsData = [];
            $orderNotes = [];
            
            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['product_id']);
                $quantity = $item['quantity'];
                $unitPrice = $product->price;
                $subtotal = $quantity * $unitPrice;
                $total += $subtotal;

                $note = $item['note'] ?? '';
                
                $detailsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                    'notes' => $note,
                ];

                // Compilar notas para la orden general
                if (!empty($note)) {
                    $orderNotes[] = "{$product->name}: {$note}";
                }
            }

            // Actualizar orden
            $order->update([
                'status' => $request->status ?? $order->status,
                'total' => $total,
                'notes' => !empty($orderNotes) ? implode(', ', $orderNotes) : null,
                'type_id' => $orderType->id,
                'payment_method_id' => $paymentMethodId,
            ]);

            // Eliminar detalles antiguos y crear nuevos
            $order->details()->delete();
            
            foreach ($detailsData as $detailData) {
                $detailData['order_id'] = $order->id;
                OrderDetail::create($detailData);
            }

            return redirect()->route('dashboard.orders.index')
                ->with('success', 'Pedido actualizado exitosamente');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error al actualizar el pedido: ' . $e->getMessage()]);
        }

        return redirect()->route('dashboard.orders.index')
            ->with('success', 'Pedido actualizado exitosamente');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:' . implode(',', array_column(OrderStatuses::cases(), 'value')),
            'guarantor_name' => 'nullable|string|max:255',
            'payment_method' => 'nullable|string|in:' . implode(',', array_column(PaymentMethods::cases(), 'value')),
        ]);

        $order = Order::findOrFail($id);
        
        // Guardar el estado anterior
        $oldStatus = $order->status;
        
        $updateData = ['status' => $request->status];
        
        if ($request->status === OrderStatuses::CANCELLED->value && $request->payment_method) {
            $paymentMethod = PaymentMethod::where('name', $request->payment_method)->first();
            if ($paymentMethod) {
                $updateData['payment_method_id'] = $paymentMethod->id;
            }
        }

        if ($request->status === OrderStatuses::ON_CREDIT->value && $request->guarantor_name) {
            $guarantor = Guarantor::firstOrCreate(['name' => $request->guarantor_name]);
            $updateData['guarantor_id'] = $guarantor->id;
        }
        
        $order->update($updateData);
        event(new OrderStatusUpdated($order, $oldStatus, $request->status));

        return back()
            ->with('success', 'Estado del pedido actualizado exitosamente');
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return back()
            ->with('success', 'Pedido eliminado exitosamente');
    }
}
