<?php

namespace App\Enums;

enum OrderStatuses: string
{
    case PENDING = 'Pendiente';
    case CONFIRMED = 'Confirmada';
    case READY = 'Lista';
    case DELIVERED = 'Entregada';
    case ON_CREDIT = 'Fiada';
    case CANCELLED = 'Pagada';
}
