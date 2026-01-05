<?php

namespace App\Enums\Enums;

enum PaymentMethods: string
{
    case CASH = 'Efectivo';
    case CARD = 'Tarjeta';
    case NEQUI = 'Nequi';
    case BANCOLOMBIA = 'Bancolombia';
}
