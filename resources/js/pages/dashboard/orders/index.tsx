import AppLayout from "@/layouts/app-layout";
import { Order } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Plus, Search, Trash2, Edit2, Eye, ShoppingCart, Clock, CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react";
import { create, destroy } from "@/routes/dashboard/orders";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import OrderCard from "@/components/dashboard/order-card";

const statusConfig = {
    pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    in_progress: { label: 'En progreso', color: 'bg-blue-100 text-blue-700', icon: ShoppingCart },
    completed: { label: 'Completado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function OrderIndex({ 
    orders, 
    filters 
}: { 
    orders: Order[], 
    filters: { search: string, status: string } 
}) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

    const toggleOrder = (orderId: number) => {
        setExpandedOrders(prev => 
            prev.includes(orderId) 
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.get(
            window.location.pathname,
            { search: value, status: statusFilter },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, 500);

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(
            window.location.pathname,
            { search: search, status: status },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleDelete = (order: Order) => {
        if (confirm(`¿Estás seguro de eliminar el pedido "${order.code}"?`)) {
            router.delete(destroy.url({ order: order.id }));
        }
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-1 gap-[40px] px-[40px] py-[30px]">
                <div className="grid grid-cols-[1fr_auto] place-content-start place-items-start">
                    <div className="block">
                        <h2 className="nunito-bold text-[30px]">Pedidos</h2>
                        <p className="nunito-medium text-[#5C5C5C] text-[20px]">
                            Administra todos los pedidos del restaurante
                        </p>
                    </div>
                    <div className="flex gap-[12px]">
                        <Link
                            href={create.url()}
                            className="nunito-semibold text-[18px] bg-[#F03328] text-white px-[24px] py-[14px] rounded-[16px] flex items-center gap-2 hover:bg-[#d92b21] transition-colors"
                        >
                            <Plus className="size-5" />
                            Nuevo Pedido
                        </Link>
                    </div>
                </div>

                <div className="flex gap-[12px]">
                    <Select
                        value={statusFilter || "all"}
                        onValueChange={(value) => handleStatusFilter(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="nunito h-full bg-white font-semibold px-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2] w-[280px]">
                            <SelectValue placeholder="Todos los estados" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="in_progress">En progreso</SelectItem>
                            <SelectItem value="completed">Completado</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative flex-1 max-w-sm">
                        <input 
                            type="search"
                            placeholder="Buscar por código o notas..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                            className="nunito bg-white w-full font-semibold pl-[48px] pr-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2]"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    </div>
                </div>

                <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                    {orders.length === 0 ? (
                        <div className="text-center py-[60px]">
                            <ShoppingCart className="size-20 mx-auto text-gray-300 mb-[20px]" />
                            <p className="nunito-medium text-gray-500 text-[20px]">
                                No hay pedidos registrados
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-[20px]">
                            {orders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}