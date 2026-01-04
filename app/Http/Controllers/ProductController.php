<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryFilter = $request->input('category');

        $products = Product::with(['category', 'ingredients'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($categoryFilter, function ($query, $categoryFilter) {
                $query->where('category_id', $categoryFilter);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::orderBy('name')->get();

        return Inertia::render('dashboard/products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categoryFilter,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        $ingredients = Ingredient::orderBy('name')->get();
        
        return Inertia::render('dashboard/products/create', [
            'categories' => $categories,
            'ingredients' => $ingredients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:0.01',
        ]);

        $imagePath = null;
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/products'), $imageName);
            $imagePath = '/images/products/' . $imageName;
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'image' => $imagePath,
        ]);

        // Attach ingredients with quantities
        $ingredientsData = [];
        foreach ($request->ingredients as $ingredient) {
            $ingredientsData[$ingredient['ingredient_id']] = [
                'quantity_needed' => $ingredient['quantity']
            ];
        }
        $product->ingredients()->attach($ingredientsData);

        return redirect()->route('dashboard.products.index')
            ->with('success', 'Producto creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::orderBy('name')->get();
        $ingredients = Ingredient::orderBy('name')->get();
        $product->load('ingredients');
        
        return Inertia::render('dashboard/products/edit', [
            'product' => $product,
            'categories' => $categories,
            'ingredients' => $ingredients,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:0.01',
        ]);

        $imagePath = $product->image;
        
        if ($request->hasFile('image')) {
            if ($product->image) {
                $oldImagePath = public_path($product->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/products'), $imageName);
            $imagePath = '/images/products/' . $imageName;
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'image' => $imagePath,
        ]);

        // Sync ingredients with quantities
        $ingredientsData = [];
        foreach ($request->ingredients as $ingredient) {
            $ingredientsData[$ingredient['ingredient_id']] = [
                'quantity_needed' => $ingredient['quantity']
            ];
        }
        $product->ingredients()->sync($ingredientsData);

        return redirect()->route('dashboard.products.index')
            ->with('success', 'Producto actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            $imagePath = public_path($product->image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $product->delete();

        return redirect()->route('dashboard.products.index')
            ->with('success', 'Producto eliminado exitosamente');
    }
}
