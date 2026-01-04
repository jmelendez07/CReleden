<?php

namespace App\Http\Controllers;

use App\Exports\OrdersExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class OrderExportController extends Controller
{
    /**
     * Exportar todas las órdenes a Excel
     */
    public function export()
    {
        $fileName = 'extracto_pedidos_' . now()->format('Y-m-d_H-i-s') . '.xlsx';
        
        return Excel::download(new OrdersExport, $fileName);
    }
}
