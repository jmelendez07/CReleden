<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderStatisticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $orderStatisticsService;

    public function __construct(OrderStatisticsService $orderStatisticsService)
    {
        $this->orderStatisticsService = $orderStatisticsService;
    }

    public function index()
    {
        $recentOrders = Order::with(['type', 'method', 'details.product.category'])
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
        
        // Obtener datos de días destacados
        $topDaysData = $this->orderStatisticsService->getTopDaysData();
        
        // Obtener ingresos mensuales del último mes
        $revenueData = $this->orderStatisticsService->getMonthlyRevenueData();
        
        // Obtener el total de ingresos del día de hoy
        $todayRevenue = $this->orderStatisticsService->getTodayRevenue();
        
        return Inertia::render('dashboard', [
            'recentOrders' => $recentOrders,
            'topDaysData' => $topDaysData,
            'revenueData' => $revenueData,
            'todayRevenue' => $todayRevenue,
        ]);
    }
}
