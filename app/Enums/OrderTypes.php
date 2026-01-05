<?php

namespace App\Enums;

enum OrderTypes: string
{
    case TO_GO = 'Para llevar';
    case DELIVERY = 'Domicilio';
    case DINE_IN = 'Para Aquí';
}
