<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $table = "orders";
    protected $fillable = [
        "code",
        "status",
        "total",
        "notes",
        "type_id",
        "payment_method_id"
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(OrderType::class, "type_id");
    }

    public function method(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class,"payment_method_id");
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }
}
