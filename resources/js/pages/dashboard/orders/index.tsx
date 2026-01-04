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

                {/* Tabla de Pedidos */}
                <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                    {orders.length === 0 ? (
                        <div className="text-center py-[60px]">
                            <ShoppingCart className="size-20 mx-auto text-gray-300 mb-[20px]" />
                            <p className="nunito-medium text-gray-500 text-[20px]">
                                No hay pedidos registrados
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Código</th>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Estado</th>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Tipo</th>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Pago</th>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Total</th>
                                        <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px]">Items</th>
                                        <th className="nunito-bold text-center px-[24px] py-[16px] text-[16px]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                                        const isExpanded = expandedOrders.includes(order.id);
                                        return (
                                            <>
                                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-[24px] py-[16px]">
                                                        <div className="flex items-center gap-[12px]">
                                                            <button
                                                                onClick={() => toggleOrder(order.id)}
                                                                className="p-[4px] rounded-[6px] hover:bg-gray-200 transition-colors"
                                                            >
                                                                {isExpanded ? (
                                                                    <ChevronDown className="size-4 text-gray-600" />
                                                                ) : (
                                                                    <ChevronRight className="size-4 text-gray-600" />
                                                                )}
                                                            </button>
                                                            <div>
                                                                <span className="nunito-bold text-[16px]">{order.code}</span>
                                                                {order.notes && (
                                                                    <p className="nunito text-[13px] text-gray-500 line-clamp-1">{order.notes}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <span className={`nunito-semibold text-[13px] px-[12px] py-[6px] rounded-full inline-flex items-center gap-1 ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                                                            <StatusIcon className="size-3" />
                                                            {statusConfig[order.status as keyof typeof statusConfig].label}
                                                        </span>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <span className="nunito text-[15px]">{order.type?.name}</span>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <span className="nunito text-[15px]">{order.method?.name}</span>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <span className="nunito-bold text-[16px] text-[#F03328]">
                                                            ${order.total.toLocaleString('es-CO')}
                                                        </span>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <span className="nunito text-[15px] text-gray-600">
                                                            {order.details?.length || 0} items
                                                        </span>
                                                    </td>
                                                    <td className="px-[24px] py-[16px]">
                                                        <div className="flex gap-[8px] justify-center">
                                                            <Link
                                                                href={`/dashboard/orders/${order.id}`}
                                                                className="p-[6px] rounded-[6px] hover:bg-green-50 transition-colors"
                                                                title="Ver detalle"
                                                            >
                                                                <Eye className="size-4 text-green-500" />
                                                            </Link>
                                                            <Link
                                                                href={`/dashboard/orders/${order.id}/edit`}
                                                                className="p-[6px] rounded-[6px] hover:bg-blue-50 transition-colors"
                                                                title="Editar"
                                                            >
                                                                <Edit2 className="size-4 text-blue-500" />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(order)}
                                                                className="p-[6px] rounded-[6px] hover:bg-red-50 transition-colors"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 className="size-4 text-[#F03328]" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {isExpanded && order.details && order.details.length > 0 && (
                                                    <tr key={`${order.id}-details`}>
                                                        <td colSpan={7} className="bg-gray-50 px-[24px] py-[20px]">
                                                            <div className="space-y-[16px]">
                                                                <h4 className="nunito-bold text-[16px] text-gray-700 mb-[12px]">Productos del pedido</h4>
                                                                {order.details.map((detail) => (
                                                                    <div key={detail.id} className="bg-white rounded-[12px] p-[16px] border border-gray-200">
                                                                        <div className="flex gap-[16px]">
                                                                            {/* Imagen del producto */}
                                                                            <div className="w-[100px] h-[100px] flex-shrink-0 bg-gray-100 rounded-[8px] overflow-hidden">
                                                                                {detail.product?.image ? (
                                                                                    <img 
                                                                                        src={detail.product.image} 
                                                                                        alt={detail.product.name}
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="w-full h-full flex items-center justify-center">
                                                                                        <ShoppingCart className="size-8 text-gray-400" />
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            {/* Detalles del producto */}
                                                                            <div className="flex-1 space-y-[8px]">
                                                                                <div className="flex items-start justify-between">
                                                                                    <div>
                                                                                        <h5 className="nunito-bold text-[16px]">{detail.product?.name}</h5>
                                                                                        <p className="nunito text-[13px] text-gray-500">{detail.product?.category?.name}</p>
                                                                                    </div>
                                                                                    <div className="text-right">
                                                                                        <p className="nunito text-[13px] text-gray-500">
                                                                                            {detail.quantity} x ${detail.unit_price.toLocaleString('es-CO')}
                                                                                        </p>
                                                                                        <p className="nunito-bold text-[16px] text-[#F03328]">
                                                                                            ${detail.subtotal.toLocaleString('es-CO')}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Notas del producto */}
                                                                                {detail.notes && (
                                                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-[8px] p-[8px]">
                                                                                        <p className="nunito-semibold text-[12px] text-yellow-800">
                                                                                            <span className="font-bold">Nota:</span> {detail.notes}
                                                                                        </p>
                                                                                    </div>
                                                                                )}

                                                                                {/* Ingredientes */}
                                                                                {detail.product?.ingredients && detail.product.ingredients.length > 0 && (
                                                                                    <div className="mt-[8px]">
                                                                                        <p className="nunito-semibold text-[12px] text-gray-600 mb-[6px]">Ingredientes:</p>
                                                                                        <Carousel
                                                                                            opts={{
                                                                                                align: "start",
                                                                                            }}
                                                                                            className="w-full"
                                                                                        >
                                                                                            <CarouselContent className="-ml-1">
                                                                                                {detail.product.ingredients.map((ingredient) => (
                                                                                                    <CarouselItem key={ingredient.id} className="pl-1 basis-auto">
                                                                                                        <span className="nunito-medium text-[11px] px-[8px] py-[4px] bg-gray-100 text-gray-700 rounded-full whitespace-nowrap inline-block">
                                                                                                            {ingredient.name}
                                                                                                            {ingredient.pivot?.quantity_needed && (
                                                                                                                <span className="text-gray-500 ml-1">
                                                                                                                    ({ingredient.pivot.quantity_needed} {ingredient.unit_of_measurement})
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </span>
                                                                                                    </CarouselItem>
                                                                                                ))}
                                                                                            </CarouselContent>
                                                                                        </Carousel>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}