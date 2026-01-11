<?php

use App\Enums\OrderStatuses;
use App\Enums\Roles;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('orders.pending', function (User $user) {
    return $user->hasRole([Roles::ADMIN->value, Roles::WAITER->value]);
});

Broadcast::channel('orders.status', function (User $user) {
    return $user->hasRole([Roles::ADMIN->value, Roles::WAITER->value]);
});