<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderType;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $statusFilter = $request->input('status');
        $dateRange = $request->input('date_range', 'today'); // Por defecto 'today'

        $orders = Order::with(['type', 'method', 'details.product.category', 'details.product.ingredients'])
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                      ->orWhere('notes', 'like', "%{$search}%");
            })
            ->when($statusFilter, function ($query, $statusFilter) {
                $query->where('status', $statusFilter);
            })
            ->when($dateRange, function ($query, $dateRange) {
                $driver = DB::connection()->getDriverName();
                
                switch ($dateRange) {
                    case 'today':
                        switch ($driver) {
                            case 'pgsql':
                                $query->whereRaw("DATE(created_at - INTERVAL '6 hours') = CURRENT_DATE");
                                break;
                            case 'sqlite':
                                $query->whereRaw("DATE(datetime(created_at, '-6 hours')) = DATE('now')");
                                break;
                            default: // mysql, mariadb
                                $query->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) = CURDATE()");
                        }
                        break;
                        
                    case 'yesterday':
                        switch ($driver) {
                            case 'pgsql':
                                $query->whereRaw("DATE(created_at - INTERVAL '6 hours') = CURRENT_DATE - INTERVAL '1 day'");
                                break;
                            case 'sqlite':
                                $query->whereRaw("DATE(datetime(created_at, '-6 hours')) = DATE('now', '-1 day')");
                                break;
                            default: // mysql, mariadb
                                $query->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)");
                        }
                        break;
                        
                    case 'last_week':
                        switch ($driver) {
                            case 'pgsql':
                                $query->whereRaw("DATE(created_at - INTERVAL '6 hours') >= CURRENT_DATE - INTERVAL '7 days'")
                                      ->whereRaw("DATE(created_at - INTERVAL '6 hours') <= CURRENT_DATE");
                                break;
                            case 'sqlite':
                                $query->whereRaw("DATE(datetime(created_at, '-6 hours')) >= DATE('now', '-7 days')")
                                      ->whereRaw("DATE(datetime(created_at, '-6 hours')) <= DATE('now')");
                                break;
                            default: // mysql, mariadb
                                $query->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)")
                                      ->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) <= CURDATE()");
                        }
                        break;
                        
                    case 'last_month':
                        switch ($driver) {
                            case 'pgsql':
                                $query->whereRaw("DATE(created_at - INTERVAL '6 hours') >= CURRENT_DATE - INTERVAL '30 days'")
                                      ->whereRaw("DATE(created_at - INTERVAL '6 hours') <= CURRENT_DATE");
                                break;
                            case 'sqlite':
                                $query->whereRaw("DATE(datetime(created_at, '-6 hours')) >= DATE('now', '-30 days')")
                                      ->whereRaw("DATE(datetime(created_at, '-6 hours')) <= DATE('now')");
                                break;
                            default: // mysql, mariadb
                                $query->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)")
                                      ->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) <= CURDATE()");
                        }
                        break;
                }
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/orders/index', [
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'status' => $statusFilter,
                'date_range' => $dateRange,
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

        // Generar código único para la orden
        $code = 'ORD-' . strtoupper(uniqid());

        // Crear orden
        $order = Order::create([
            'code' => $code,
            'status' => 'pending',
            'total' => $total,
            'notes' => !empty($orderNotes) ? implode(', ', $orderNotes) : null,
            'type_id' => $orderType->id,
            'payment_method_id' => $paymentMethodId,
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->details()->delete();
        $order->delete();

        return redirect()->route('dashboard.orders.index')
            ->with('success', 'Pedido eliminado exitosamente');
    }
}
