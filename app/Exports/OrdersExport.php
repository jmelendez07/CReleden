<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Events\AfterSheet;

class OrdersExport implements FromCollection, WithHeadings, WithStyles, WithEvents
{
    protected $totalAmount = 0;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $data = collect();
        
        // Obtener todas las órdenes con sus relaciones
        $orders = Order::with(['details.product.category'])
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($orders as $order) {
            foreach ($order->details as $detail) {
                // Si la cantidad es mayor a 1, repetir la fila por cada unidad
                for ($i = 0; $i < $detail->quantity; $i++) {
                    $data->push([
                        'order_code' => $order->code,
                        'order_date' => $order->created_at->format('d/m/Y H:i'),
                        'product_name' => $detail->product->name,
                        'product_category' => $detail->product->category->name ?? 'Sin categoría',
                        'order_detail_unit_price' => number_format($detail->unit_price, 2, '.', ''),
                    ]);
                    
                    $this->totalAmount += $detail->unit_price;
                }
            }
        }

        return $data;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'Código de Orden',
            'Fecha del Pedido',
            'Nombre del Producto',
            'Categoría del Producto',
            'Precio Unitario',
        ];
    }

    /**
     * @param Worksheet $sheet
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        return [
            // Estilo para el encabezado
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF'],
                    'size' => 12,
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'F03328'],
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
            ],
        ];
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                
                // Obtener la última fila con datos
                $lastRow = $sheet->getHighestRow();
                $totalRow = $lastRow + 2;

                // Agregar fila de total
                $sheet->setCellValue('D' . $totalRow, 'TOTAL:');
                $sheet->setCellValue('E' . $totalRow, number_format($this->totalAmount, 2, '.', ''));

                // Estilo para la fila de total
                $sheet->getStyle('D' . $totalRow . ':E' . $totalRow)->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 12,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'DB4A58'],
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    ],
                ]);

                // Ajustar ancho de columnas
                $sheet->getColumnDimension('A')->setWidth(20);
                $sheet->getColumnDimension('B')->setWidth(25);
                $sheet->getColumnDimension('C')->setWidth(35);
                $sheet->getColumnDimension('D')->setWidth(25);
                $sheet->getColumnDimension('E')->setWidth(20);

                // Aplicar bordes a todas las celdas con datos
                $sheet->getStyle('A1:E' . $lastRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['rgb' => 'CCCCCC'],
                        ],
                    ],
                ]);

                // Centrar la columna de precio
                $sheet->getStyle('E2:E' . $lastRow)->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT,
                    ],
                ]);
            },
        ];
    }
}
