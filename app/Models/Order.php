<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Order extends Model
{
    use SoftDeletes;

    protected $table = "orders";
    protected $fillable = [
        "code",
        "token",
        "status",
        "total",
        "notes",
        "type_id",
        "payment_method_id",
        "guarantor_id",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->token)) {
                $order->token = (string) Str::uuid();
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'token';
    }

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

    public function guarantor(): BelongsTo
    {
        return $this->belongsTo(Guarantor::class, "guarantor_id");
    }
}
