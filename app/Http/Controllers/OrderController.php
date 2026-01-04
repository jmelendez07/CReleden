<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderType;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $statusFilter = $request->input('status');

        $orders = Order::with(['type', 'method', 'details.product.category', 'details.product.ingredients'])
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
        $products = Product::with('category')->orderBy('name')->get();
        $orderTypes = OrderType::orderBy('name')->get();
        $paymentMethods = PaymentMethod::orderBy('name')->get();

        return Inertia::render('dashboard/orders/create', [
            'products' => $products,
            'orderTypes' => $orderTypes,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:orders,code|max:255',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
            'notes' => 'nullable|string|max:1000',
            'type_id' => 'required|exists:order_types,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'details' => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.notes' => 'nullable|string|max:500',
        ]);

        // Calcular total
        $total = 0;
        $detailsData = [];
        
        foreach ($request->details as $detail) {
            $product = Product::findOrFail($detail['product_id']);
            $quantity = $detail['quantity'];
            $unitPrice = $product->price;
            $subtotal = $quantity * $unitPrice;
            $total += $subtotal;

            $detailsData[] = [
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'subtotal' => $subtotal,
                'notes' => $detail['notes'] ?? '',
            ];
        }

        // Crear orden
        $order = Order::create([
            'code' => $request->code,
            'status' => $request->status,
            'total' => $total,
            'notes' => $request->notes,
            'type_id' => $request->type_id,
            'payment_method_id' => $request->payment_method_id,
        ]);

        // Crear detalles
        foreach ($detailsData as $detailData) {
            $detailData['order_id'] = $order->id;
            OrderDetail::create($detailData);
        }

        return redirect()->route('dashboard.orders.index')
            ->with('success', 'Pedido creado exitosamente');
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
        $order->load(['details.product']);
        $products = Product::with('category')->orderBy('name')->get();
        $orderTypes = OrderType::orderBy('name')->get();
        $paymentMethods = PaymentMethod::orderBy('name')->get();

        return Inertia::render('dashboard/orders/edit', [
            'order' => $order,
            'products' => $products,
            'orderTypes' => $orderTypes,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'code' => 'required|string|max:255|unique:orders,code,' . $order->id,
            'status' => 'required|in:pending,in_progress,completed,cancelled',
            'notes' => 'nullable|string|max:1000',
            'type_id' => 'required|exists:order_types,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'details' => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity' => 'required|integer|min:1',
            'details.*.notes' => 'nullable|string|max:500',
        ]);

        // Calcular total
        $total = 0;
        $detailsData = [];
        
        foreach ($request->details as $detail) {
            $product = Product::findOrFail($detail['product_id']);
            $quantity = $detail['quantity'];
            $unitPrice = $product->price;
            $subtotal = $quantity * $unitPrice;
            $total += $subtotal;

            $detailsData[] = [
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'subtotal' => $subtotal,
                'notes' => $detail['notes'] ?? '',
            ];
        }

        // Actualizar orden
        $order->update([
            'code' => $request->code,
            'status' => $request->status,
            'total' => $total,
            'notes' => $request->notes,
            'type_id' => $request->type_id,
            'payment_method_id' => $request->payment_method_id,
        ]);

        // Eliminar detalles antiguos y crear nuevos
        $order->details()->delete();
        
        foreach ($detailsData as $detailData) {
            $detailData['order_id'] = $order->id;
            OrderDetail::create($detailData);
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
