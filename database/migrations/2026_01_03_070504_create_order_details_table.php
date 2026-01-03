<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger("quantity");
            $table->decimal("unit_price");
            $table->decimal("subtotal");
            $table->string("notes");
            $table->foreignIdFor(Order::class)->nullable()->constrained()->onDelete("set null");
            $table->foreignIdFor(Product::class)->nullable()->constrained()->onDelete("set null");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
