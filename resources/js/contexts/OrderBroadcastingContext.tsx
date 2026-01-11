import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Order } from '@/types';
import { OrderStatuses } from '@/enums';

interface OrderBroadcastingContextType {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    newOrdersCountByStatus: Record<string, number>;
    resetCountForStatus: (status: string) => void;
}

const OrderBroadcastingContext = createContext<OrderBroadcastingContextType | undefined>(undefined);

export function OrderBroadcastingProvider({ 
    children, 
    initialOrders, 
    currentStatus 
}: { 
    children: ReactNode; 
    initialOrders: Order[]; 
    currentStatus: string;
}) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [newOrdersCountByStatus, setNewOrdersCountByStatus] = useState<Record<string, number>>({});

    // Sincronizar orders cuando cambian los initialOrders
    useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    // Escuchar nuevas órdenes pendientes
    useEffect(() => {
        const channel = window.Echo.private('orders.pending');
        
        channel.listen('.order.pending.created', (event: { order: Order }) => {
            // Si estamos en la vista de Pendientes, agregar la orden a la lista
            if (currentStatus === OrderStatuses.PENDING) {
                setOrders(prevOrders => [{...event.order, new: true}, ...prevOrders]);
            } else {
                // Si no, solo incrementar el contador de nuevas órdenes para Pendiente
                setNewOrdersCountByStatus(prev => ({
                    ...prev,
                    [OrderStatuses.PENDING]: (prev[OrderStatuses.PENDING] || 0) + 1
                }));
            }
        });

        return () => {
            channel.stopListening('.order.pending.created');
            window.Echo.leave('orders.pending');
        };
    }, [currentStatus]);

    // Escuchar cambios de estado de órdenes
    useEffect(() => {
        const channel = window.Echo.private('orders.status');
        
        channel.listen('.order.status.updated', (event: { order: Order; oldStatus: string; newStatus: string }) => {
            const { order, newStatus } = event;
            
            // Si estamos en la vista del nuevo estado de la orden
            if (currentStatus === newStatus) {
                // Agregar o actualizar la orden en la lista
                setOrders(prevOrders => {
                    const existingIndex = prevOrders.findIndex(o => o.id === order.id);
                    if (existingIndex >= 0) {
                        // Actualizar orden existente
                        const updated = [...prevOrders];
                        updated[existingIndex] = { ...order, new: true };
                        return updated;
                    } else {
                        // Agregar nueva orden al inicio
                        return [{ ...order, new: true }, ...prevOrders];
                    }
                });
            } else {
                // Remover la orden si estaba en la lista actual
                setOrders(prevOrders => prevOrders.filter(o => o.id !== order.id));
                
                // Incrementar el contador del nuevo estado
                setNewOrdersCountByStatus(prev => ({
                    ...prev,
                    [newStatus]: (prev[newStatus] || 0) + 1
                }));
            }
        });

        return () => {
            channel.stopListening('.order.status.updated');
            window.Echo.leave('orders.status');
        };
    }, [currentStatus]);

    const resetCountForStatus = (status: string) => {
        setNewOrdersCountByStatus(prev => {
            const updated = { ...prev };
            delete updated[status];
            return updated;
        });
    };

    return (
        <OrderBroadcastingContext.Provider 
            value={{ 
                orders, 
                setOrders, 
                newOrdersCountByStatus, 
                resetCountForStatus 
            }}
        >
            {children}
        </OrderBroadcastingContext.Provider>
    );
}

export function useOrderBroadcasting() {
    const context = useContext(OrderBroadcastingContext);
    if (context === undefined) {
        throw new Error('useOrderBroadcasting must be used within an OrderBroadcastingProvider');
    }
    return context;
}
