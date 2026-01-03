<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use SoftDeletes;

    protected $table = "ingredients";
    protected $fillable = [
        "name",
        "unit_of_measurement",
        "unit_price",
        "supplier",
        "current_stock"
    ];
}
