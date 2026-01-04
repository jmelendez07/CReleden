<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderExportController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('dashboard/orders', OrderController::class)->names('dashboard.orders');
    Route::resource('dashboard/products', ProductController::class)->names('dashboard.products');
    Route::resource('dashboard/categories', CategoryController::class)->names('dashboard.categories');
    Route::resource('dashboard/ingredients', IngredientController::class)->names('dashboard.ingredients');
    Route::get('dashboard/orders-export', [OrderExportController::class, 'export'])->name('dashboard.orders.export');
});

require __DIR__.'/settings.php';
