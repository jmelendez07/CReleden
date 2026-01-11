export enum PaymentMethods {
    CASH = 'Efectivo',
    CARD = 'Tarjeta',
    NEQUI = 'Nequi',
    BANCOLOMBIA = 'Bancolombia'
}

export enum OrderTypes {
    TO_GO = 'Para llevar',
    DELIVERY = 'Domicilio',
    DINE_IN = 'Para Aquí'
}

export enum Roles {
    ADMIN = 'Administrador',
    WAITER = 'Mesero'
}

export enum OrderStatuses {
    PENDING = 'Pendiente',
    CONFIRMED = 'Confirmada',
    READY = 'Lista',
    DELIVERED = 'Entregada',
    ON_CREDIT = 'Fiada',
    CANCELLED = 'Pagada'
}

export const orderTypesArray = [
    { key: OrderTypes.TO_GO, label: OrderTypes.TO_GO },
    { key: OrderTypes.DELIVERY, label: OrderTypes.DELIVERY },
    { key: OrderTypes.DINE_IN, label: OrderTypes.DINE_IN },
];