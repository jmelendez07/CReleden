<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderStatisticsService
{
    /**
     * Obtener el total de ingresos del día actual
     * Considerando el turno de 6 AM a 6 AM del día siguiente
     */
    public function getTodayRevenue(): float
    {
        $driver = DB::connection()->getDriverName();
        
        switch ($driver) {
            case 'pgsql':
                $result = Order::selectRaw("SUM(total) as total")
                    ->whereRaw("DATE(created_at - INTERVAL '6 hours') = CURRENT_DATE")
                    ->first();
                break;
                
            case 'sqlite':
                $result = Order::selectRaw("SUM(total) as total")
                    ->whereRaw("DATE(datetime(created_at, '-6 hours')) = DATE('now')")
                    ->first();
                break;
                
            default: // mysql, mariadb
                $result = Order::selectRaw("SUM(total) as total")
                    ->whereRaw("DATE(DATE_SUB(created_at, INTERVAL 6 HOUR)) = CURDATE()")
                    ->first();
        }
        
        return (float) ($result->total ?? 0);
    }

    /**
     * Obtener ingresos diarios del último mes (30 días)
     * Compatible con MySQL, PostgreSQL y SQLite
     */
    public function getMonthlyRevenueData(): array
    {
        $driver = DB::connection()->getDriverName();
        
        switch ($driver) {
            case 'pgsql':
                $revenueData = $this->getDailyRevenueDataPostgreSQL();
                break;
                
            case 'sqlite':
                $revenueData = $this->getDailyRevenueDataSQLite();
                break;
                
            default: // mysql, mariadb
                $revenueData = $this->getDailyRevenueDataMySQL();
        }
        
        // Mapear resultados
        return $revenueData->map(function ($item) {
            return [
                'day' => $item->day,
                'ingresos' => (float) $item->ingresos,
                'pedidos' => (int) $item->pedidos
            ];
        })->values()->toArray();
    }

    /**
     * Obtener ventas por día de la semana considerando turnos de trabajo
     * Turno: de 6 PM a 6 AM del día siguiente (pedidos de 00:00-06:00 cuentan para el día anterior)
     * Compatible con MySQL, PostgreSQL y SQLite
     */
    public function getTopDaysData(): array
    {
        $driver = DB::connection()->getDriverName();
        
        switch ($driver) {
            case 'pgsql':
                $topDaysData = $this->getTopDaysDataPostgreSQL();
                break;
                
            case 'sqlite':
                $topDaysData = $this->getTopDaysDataSQLite();
                break;
                
            default: // mysql, mariadb
                $topDaysData = $this->getTopDaysDataMySQL();
        }
        
        // Mapear resultados
        $topDaysData = $topDaysData->map(function ($item) {
            return [
                'day' => $item->day,
                'ventas' => (int) $item->ventas
            ];
        });
        
        // Asegurar que todos los días estén presentes
        return $this->ensureAllDaysPresent($topDaysData);
    }

    /**
     * Obtener datos para PostgreSQL
     */
    protected function getTopDaysDataPostgreSQL()
    {
        return Order::selectRaw("
            CASE EXTRACT(DOW FROM (created_at - INTERVAL '6 hours'))
                WHEN 0 THEN 'Dom'
                WHEN 1 THEN 'Lun'
                WHEN 2 THEN 'Mar'
                WHEN 3 THEN 'Mié'
                WHEN 4 THEN 'Jue'
                WHEN 5 THEN 'Vie'
                WHEN 6 THEN 'Sáb'
            END as day,
            COUNT(*) as ventas
        ")
        ->groupBy(DB::raw("EXTRACT(DOW FROM (created_at - INTERVAL '6 hours'))"))
        ->orderBy(DB::raw("EXTRACT(DOW FROM (created_at - INTERVAL '6 hours'))"))
        ->get();
    }

    /**
     * Obtener datos para SQLite
     */
    protected function getTopDaysDataSQLite()
    {
        return Order::selectRaw("
            CASE strftime('%w', datetime(created_at, '-6 hours'))
                WHEN '0' THEN 'Dom'
                WHEN '1' THEN 'Lun'
                WHEN '2' THEN 'Mar'
                WHEN '3' THEN 'Mié'
                WHEN '4' THEN 'Jue'
                WHEN '5' THEN 'Vie'
                WHEN '6' THEN 'Sáb'
            END as day,
            COUNT(*) as ventas
        ")
        ->groupBy(DB::raw("strftime('%w', datetime(created_at, '-6 hours'))"))
        ->orderBy(DB::raw("strftime('%w', datetime(created_at, '-6 hours'))"))
        ->get();
    }

    /**
     * Obtener datos para MySQL/MariaDB
     */
    protected function getTopDaysDataMySQL()
    {
        return Order::selectRaw("
            CASE DAYOFWEEK(DATE_SUB(created_at, INTERVAL 6 HOUR))
                WHEN 1 THEN 'Dom'
                WHEN 2 THEN 'Lun'
                WHEN 3 THEN 'Mar'
                WHEN 4 THEN 'Mié'
                WHEN 5 THEN 'Jue'
                WHEN 6 THEN 'Vie'
                WHEN 7 THEN 'Sáb'
            END as day,
            COUNT(*) as ventas
        ")
        ->groupBy(DB::raw('DAYOFWEEK(DATE_SUB(created_at, INTERVAL 6 HOUR))'))
        ->orderBy(DB::raw('DAYOFWEEK(DATE_SUB(created_at, INTERVAL 6 HOUR))'))
        ->get();
    }

    /**
     * Asegurar que todos los días de la semana estén presentes
     */
    protected function ensureAllDaysPresent($topDaysData): array
    {
        $daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        
        return collect($daysOfWeek)->map(function ($day) use ($topDaysData) {
            $found = $topDaysData->firstWhere('day', $day);
            return [
                'day' => $day,
                'ventas' => $found ? $found['ventas'] : 0
            ];
        })->values()->toArray();
    }

    /**
     * Obtener ingresos diarios para PostgreSQL (últimos 30 días)
     */
    protected function getDailyRevenueDataPostgreSQL()
    {
        return Order::selectRaw("
            TO_CHAR((created_at - INTERVAL '6 hours'), 'DD/MM') as day,
            SUM(total) as ingresos,
            COUNT(*) as pedidos
        ")
        ->where('created_at', '>=', DB::raw("NOW() - INTERVAL '30 days'"))
        ->groupBy(DB::raw("DATE((created_at - INTERVAL '6 hours'))"))
        ->orderBy(DB::raw("DATE((created_at - INTERVAL '6 hours'))"))
        ->get();
    }

    /**
     * Obtener ingresos diarios para SQLite (últimos 30 días)
     */
    protected function getDailyRevenueDataSQLite()
    {
        return Order::selectRaw("
            strftime('%d/%m', datetime(created_at, '-6 hours')) as day,
            SUM(total) as ingresos,
            COUNT(*) as pedidos
        ")
        ->where('created_at', '>=', DB::raw("datetime('now', '-30 days')"))
        ->groupBy(DB::raw("DATE(datetime(created_at, '-6 hours'))"))
        ->orderBy(DB::raw("DATE(datetime(created_at, '-6 hours'))"))
        ->get();
    }

    /**
     * Obtener ingresos diarios para MySQL/MariaDB (últimos 30 días)
     */
    protected function getDailyRevenueDataMySQL()
    {
        return Order::selectRaw("
            DATE_FORMAT(DATE_SUB(created_at, INTERVAL 6 HOUR), '%d/%m') as day,
            SUM(total) as ingresos,
            COUNT(*) as pedidos
        ")
        ->where('created_at', '>=', DB::raw('DATE_SUB(NOW(), INTERVAL 30 DAY)'))
        ->groupBy(DB::raw('DATE(DATE_SUB(created_at, INTERVAL 6 HOUR))'))
        ->orderBy(DB::raw('DATE(DATE_SUB(created_at, INTERVAL 6 HOUR))'))
        ->get();
    }
}
