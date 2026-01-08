<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        $topProducts = Product::select('products.*', DB::raw('SUM(order_details.quantity) as total_sold'))
            ->join('order_details', 'products.id', '=', 'order_details.product_id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->whereNotIn('categories.name', ['Bebidas', 'Jugos Naturales'])
            ->groupBy('products.id')
            ->orderBy('total_sold', 'desc')
            ->limit(9)
            ->get();

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'categories' => $categories,
            'topProducts' => $topProducts,
        ]);
    }

    public function menu()
    {
        $categories = Category::all();
        $categoryId = request('categoryId');
        $products = Product::query()
            ->with(['category', 'ingredients'])
            ->when($categoryId, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->get();

        return Inertia::render('menu', [
            'categories' => $categories,
            'products' => $products,
            'selectedCategoryId' => $categoryId,
        ]);
    }
}
