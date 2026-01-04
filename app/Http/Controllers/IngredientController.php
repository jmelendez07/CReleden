<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $ingredients = Ingredient::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('supplier', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/ingredients/index', [
            'ingredients' => $ingredients,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'unit_of_measurement' => 'required|string|max:50',
            'unit_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'current_stock' => 'required|numeric|min:0',
        ]);

        Ingredient::create([
            'name' => $request->name,
            'unit_of_measurement' => $request->unit_of_measurement,
            'unit_price' => $request->unit_price,
            'supplier' => $request->supplier,
            'current_stock' => $request->current_stock,
        ]);

        return redirect()->route('dashboard.ingredients.index')
            ->with('success', 'Ingrediente creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ingredient $ingredient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ingredient $ingredient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'unit_of_measurement' => 'required|string|max:50',
            'unit_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
            'current_stock' => 'required|numeric|min:0',
        ]);

        $ingredient->update([
            'name' => $request->name,
            'unit_of_measurement' => $request->unit_of_measurement,
            'unit_price' => $request->unit_price,
            'supplier' => $request->supplier,
            'current_stock' => $request->current_stock,
        ]);

        return redirect()->route('dashboard.ingredients.index')
            ->with('success', 'Ingrediente actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return redirect()->route('dashboard.ingredients.index')
            ->with('success', 'Ingrediente eliminado exitosamente');
    }
}
