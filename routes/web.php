<?php

use App\Enums\Roles;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuarantorController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderExportController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('menu', [WelcomeController::class, 'menu'])->name('menu');
Route::post('store-cart', [OrderController::class, 'storeCart'])->name('store.cart');
Route::get('orden-pendiente/{token}', [OrderController::class, 'pending'])->name('order.pending');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:' . implode('|', [Roles::ADMIN->value, Roles::WAITER->value])])->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('dashboard/orders', OrderController::class)->names('dashboard.orders');
        Route::patch('dashboard/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('dashboard.orders.updateStatus');
        Route::get('dashboard/guarantors/search', [GuarantorController::class, 'index'])->name('dashboard.guarantors.search');
    });

    Route::middleware(['role:' . Roles::ADMIN->value])->group(function () {
        Route::resource('dashboard/products', ProductController::class)->names('dashboard.products');
        Route::get('dashboard/products-export-pdf', [ProductController::class, 'exportPdf'])->name('dashboard.products.export.pdf');
        Route::resource('dashboard/categories', CategoryController::class)->names('dashboard.categories');
        Route::resource('dashboard/ingredients', IngredientController::class)->names('dashboard.ingredients');
        Route::get('dashboard/orders-export', [OrderExportController::class, 'export'])->name('dashboard.orders.export');
    });
});

require __DIR__.'/settings.php';
