<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Productos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #F03328;
            padding-bottom: 15px;
        }
        
        .header h1 {
            color: #F03328;
            font-size: 28px;
            margin-bottom: 5px;
        }
        
        .header p {
            color: #666;
            font-size: 14px;
        }
        
        .date {
            text-align: right;
            color: #666;
            margin-bottom: 20px;
            font-size: 11px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        th {
            background-color: #F03328;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-size: 12px;
            font-weight: bold;
        }
        
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .product-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .product-code {
            color: #F03328;
            font-weight: bold;
            font-size: 13px;
        }
        
        .product-name {
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 3px;
        }
        
        .product-description {
            color: #666;
            font-size: 10px;
            line-height: 1.3;
        }
        
        .product-price {
            color: #F03328;
            font-weight: bold;
            font-size: 14px;
        }
        
        .category-name {
            color: #666;
            font-size: 11px;
            background-color: #f0f0f0;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
        }
        
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #999;
            font-size: 10px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        
        .total-products {
            text-align: right;
            margin-top: 15px;
            font-weight: bold;
            color: #F03328;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LISTA DE PRODUCTOS</h1>
        <p>Catálogo completo de productos disponibles</p>
    </div>
    
    <div class="date">
        Generado el: {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}
    </div>
    
    <table>
        <thead>
            <tr>
                <th style="width: 80px;">Imagen</th>
                <th style="width: 80px;">Código</th>
                <th>Producto</th>
                <th style="width: 120px;">Categoría</th>
                <th style="width: 80px; text-align: right;">Precio</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
            <tr>
                <td style="text-align: center;">
                    @if($product->image)
                        <img src="{{ public_path($product->image) }}" class="product-image" alt="{{ $product->name }}">
                    @else
                        <div style="width: 60px; height: 60px; background-color: #f0f0f0; border-radius: 8px;"></div>
                    @endif
                </td>
                <td>
                    <span class="product-code">{{ $product->code }}</span>
                </td>
                <td>
                    <div class="product-name">{{ $product->name }}</div>
                    <div class="product-description">{{ $product->description ?: 'Sin descripción' }}</div>
                </td>
                <td>
                    <span class="category-name">{{ $product->category->name ?? 'Sin categoría' }}</span>
                </td>
                <td style="text-align: right;">
                    <span class="product-price">${{ number_format($product->price, 0, ',', '.') }}</span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <div class="total-products">
        Total de productos: {{ count($products) }}
    </div>
    
    <div class="footer">
        <p>Este documento fue generado automáticamente por el sistema de gestión de productos.</p>
        <p>&copy; {{ date('Y') }} - Todos los derechos reservados</p>
    </div>
</body>
</html>
