import AppLayout from "@/layouts/app-layout";
import { Order } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Search, ShoppingCart, ChevronRight } from "lucide-react";
import { create, destroy } from "@/routes/dashboard/orders";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { OrderStatuses, orderTypesArray, PaymentMethods } from "@/enums";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductOrder from "@/components/product-order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { OrderBroadcastingProvider, useOrderBroadcasting } from "@/contexts/OrderBroadcastingContext";
import { canDeleteOrder, isCompletedOrder, isDeliveredOrder, isOnCreditOrder } from "@/lib/utils";

const getNextStatusAction = (currentStatus: string) => {
    const statusFlow: Record<string, { nextStatus: string; buttonText: string } | null> = {
        [OrderStatuses.PENDING]: {
            nextStatus: OrderStatuses.CONFIRMED,
            buttonText: 'Confirmada!'
        },
        [OrderStatuses.CONFIRMED]: {
            nextStatus: OrderStatuses.READY,
            buttonText: 'Lista!'
        },
        [OrderStatuses.READY]: {
            nextStatus: OrderStatuses.DELIVERED,
            buttonText: 'Entregada!'
        },
        [OrderStatuses.DELIVERED]: null,
        [OrderStatuses.ON_CREDIT]: null,
        [OrderStatuses.CANCELLED]: null,
    };

    return statusFlow[currentStatus] || null;
};

export default function OrderIndex({ 
    orders: initialOrders, 
    filters 
}: { 
    orders: Order[], 
    filters: { search: string, status: string } 
}) {
    const [statusFilter, setStatusFilter] = useState(filters?.status || OrderStatuses.PENDING);

    return (
        <OrderBroadcastingProvider initialOrders={initialOrders} currentStatus={statusFilter}>
            <OrderIndexContent filters={filters} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        </OrderBroadcastingProvider>
    );
}

function OrderIndexContent({ 
    filters,
    statusFilter,
    setStatusFilter
}: { 
    filters: { search: string, status: string };
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { orders, newOrdersCountByStatus, resetCountForStatus } = useOrderBroadcasting();
    const [search, setSearch] = useState(filters?.search || '');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [isGuarantorModalOpen, setIsGuarantorModalOpen] = useState(false);
    const [guarantorName, setGuarantorName] = useState<string>('');
    const [guarantorSuggestions, setGuarantorSuggestions] = useState<Array<{ id: number; name: string }>>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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

    const debouncedGuarantorSearch = useDebouncedCallback((value: string) => {
        if (value.trim().length >= 2) {
            fetch(`/dashboard/guarantors/search?search=${encodeURIComponent(value)}`)
                .then(res => res.json())
                .then(data => {
                    setGuarantorSuggestions(data);
                    setShowSuggestions(data.length > 0);
                })
                .catch(() => {
                    setGuarantorSuggestions([]);
                    setShowSuggestions(false);
                });
        } else {
            setGuarantorSuggestions([]);
            setShowSuggestions(false);
        }
    }, 300);

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        // Resetear el contador cuando se cambia al estado
        resetCountForStatus(status);
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

    return (
        <AppLayout>
            <div className="grid grid-cols-1 gap-[20px] px-[40px] py-[30px]">
                <div className="grid grid-cols-[1fr_auto] place-content-start place-items-start">
                    <div className="block">
                        <h2 className="nunito-bold text-[30px] leading-7">Pedidos</h2>
                        <p className="nunito-medium text-[#5C5C5C] text-[20px]">
                            Administra todos los pedidos del restaurante
                        </p>
                    </div>
                    <div className="flex gap-[12px]">
                        <div className="relative flex-1 max-w-sm">
                            <input 
                                type="search"
                                placeholder="Buscar por código"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    debouncedSearch(e.target.value);
                                }}
                                className="nunito bg-white w-full font-semibold pl-[48px] pr-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2]"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                        </div>
                        {/* <Link
                            href={create.url()}
                            className="nunito-semibold text-[18px] bg-[#F03328] text-white px-[24px] py-[14px] rounded-[16px] flex items-center gap-2 hover:bg-[#d92b21] transition-colors"
                        >
                            Nuevo Pedido
                        </Link> */}
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-[12px]">
                    {Object.entries(OrderStatuses).map(([key, label], index, array) => (
                        <>
                            <button
                                key={key}
                                onClick={() => handleStatusFilter(label)}
                                className={`cursor-pointer nunito-semibold border text-[16px] px-[20px] py-[10px] rounded-full transition-all relative ${
                                    statusFilter === label
                                        ? 'bg-[#F8B78D] text-white shadow-md border-transparent'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#F8B78D]'
                                }`}
                            >
                                {label}s
                                {newOrdersCountByStatus[label] > 0 && statusFilter !== label && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                                        {newOrdersCountByStatus[label]}
                                    </span>
                                )}
                            </button>
                            {index < array.length - 1 && (
                                <ChevronRight className="text-gray-400 self-center" size={20} />
                            )}
                        </>
                    ))}
                </div>
                
                {orders.length === 0 ? (
                    <div className="bg-white rounded-[20px] overflow-hidden">
                        <div className="text-center py-[100px]">
                            <ShoppingCart className="size-25 mx-auto text-gray-300 mb-[20px]" />
                            <p className="nunito-medium text-gray-500 text-[20px]">
                                No hay pedidos registrados
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-[40px] divide-y-4 divide-dashed divide-gray-200 mt-[20px]">
                        {orders.map((order) => (
                            <div key={order.id} className="w-full grid grid-cols-[35%_65%] gap-[20px] pb-[40px]">
                                <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] place-content-start">
                                    <div className="flex items-center gap-2 flex-wrap mb-[10px]">
                                        <h4 className="nunito-bold text-[24px] leading-8">
                                            Pedido
                                            <span className="cookie-regular text-[36px] text-[#F03327] ml-[10px]">
                                                #{order.code}
                                            </span>
                                            {order.guarantor && (
                                                <span className="nunito-medium text-[20px] text-gray-400">
                                                    {" "} - Fiado a {order.guarantor.name}
                                                </span>
                                            )}
                                        </h4>
                                        {order.new && (
                                            <div className="bg-green-500 px-[14px] py-[6px] rounded-full -rotate-20 mb-[15px] nunito-bold text-white">
                                                Nuevo!
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center flex-wrap gap-4">
                                        {orderTypesArray.map((type) => (
                                            <button
                                                key={type.key}
                                                // onClick={() => setOrderType(type.key)}
                                                className={`px-4 py-3 rounded-full nunito-medium text-[16px] transition-all ${
                                                    order.type?.name === type.key
                                                        ? 'bg-[#F03328] text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {type.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-2 max-h-[200px] pr-[5px] overflow-y-auto mt-[10px]">
                                        {(order.details ?? []).map((detail, index) => (
                                            <div 
                                                key={detail.id} 
                                                className={`
                                                    flex justify-between items-start text-sm py-2
                                                    ${(order.details ?? []).length - 1 === index ? '' : 'border-b border-gray-100'}    
                                                `}
                                            >
                                                <div className="flex-1">
                                                    <p className="nunito-medium text-gray-800">
                                                        {detail.product?.name ?? 'Producto Eliminado'}
                                                    </p>
                                                    {detail.notes && (
                                                        <p className="text-xs text-gray-500 italic mt-1">
                                                            {detail.notes}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {detail.unit_price.toLocaleString('es-CO', {
                                                            style: 'currency',
                                                            currency: 'COP',
                                                            minimumFractionDigits: 0,
                                                        })} x {detail.quantity}
                                                    </p>
                                                </div>
                                                <p className="nunito-bold text-gray-800">
                                                    {(detail.unit_price * detail.quantity).toLocaleString('es-CO', {
                                                        style: 'currency',
                                                        currency: 'COP',
                                                        minimumFractionDigits: 0,
                                                    })}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t px-4 py-4 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="nunito-bold text-lg">
                                                Total:
                                            </span>
                                            <span className="nunito-bold text-2xl text-[#F03328]">
                                                {order.total.toLocaleString('es-CO', {
                                                    style: 'currency',
                                                    currency: 'COP',
                                                    minimumFractionDigits: 0,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex gap-6">
                                            {isDeliveredOrder(order.status) ? (
                                                <>
                                                    <Button
                                                        className="cursor-pointer flex-1 py-[20px] bg-[#F03328] hover:bg-[#D02820] rounded-full text-[18px] nunito-bold"
                                                        onClick={() => {
                                                            setSelectedOrderId(order.id);
                                                            setIsPaymentModalOpen(true);
                                                        }}
                                                    >
                                                        Pagado!
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="cursor-pointer flex-1 py-[20px] rounded-full text-[18px] nunito-bold border-[#F03328] text-[#F03328] hover:bg-[#F03328] hover:text-white"
                                                        onClick={() => {
                                                            setSelectedOrderId(order.id);
                                                            setIsGuarantorModalOpen(true);
                                                        }}
                                                    >
                                                        Fiado!
                                                    </Button>
                                                </>
                                            ) : isCompletedOrder(order.status) ? (
                                                <>
                                                    {isOnCreditOrder(order.status) ? (
                                                        <Button
                                                            className="cursor-pointer flex-1 py-[20px] bg-[#F03328] hover:bg-[#D02820] rounded-full text-[18px] nunito-bold"
                                                            onClick={() => {
                                                                setSelectedOrderId(order.id);
                                                                setIsPaymentModalOpen(true);
                                                            }}
                                                        >
                                                            Pagado!
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            disabled
                                                            className="cursor-not-allowed flex-1 py-[20px] rounded-full text-[18px] nunito-bold"
                                                        >
                                                            {order.method?.name ?? 'Pagado'}
                                                        </Button>  
                                                    )}
                                                    {canDeleteOrder(order.status) && (
                                                        <Button
                                                            variant="outline"
                                                            className="cursor-pointer flex-1 rounded-full nunito text-[18px]"
                                                            onClick={() => {
                                                                router.delete(destroy.url({ order: order.id.toString() }), {
                                                                    preserveScroll: true,
                                                                });
                                                            }}
                                                        >
                                                            Borrar
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {getNextStatusAction(order.status) && (
                                                        <Button
                                                            className="cursor-pointer flex-1 py-[20px] bg-[#F03328] hover:bg-[#D02820] rounded-full text-[18px] nunito-bold"
                                                            onClick={() => {
                                                                const action = getNextStatusAction(order.status);
                                                                if (action) {
                                                                    router.patch(`/dashboard/orders/${order.id}/status`, {
                                                                        status: action.nextStatus
                                                                    }, {
                                                                        preserveScroll: true,
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            {getNextStatusAction(order.status)?.buttonText}
                                                        </Button>
                                                    )}
                                                    {canDeleteOrder(order.status) && (
                                                        <Button
                                                            variant="outline"
                                                            className="cursor-pointer flex-1 rounded-full nunito text-[18px]"
                                                            onClick={() => {
                                                                router.delete(destroy.url({ order: order.id.toString() }), {
                                                                    preserveScroll: true,
                                                                });
                                                            }}
                                                        >
                                                            Borrar
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Carousel 
                                    plugins={[
                                        Autoplay({
                                            delay: 2000
                                        })
                                    ]}
                                    className="w-full"
                                >
                                    <CarouselContent>
                                        {(order.details ?? []).map((detail) => (
                                            <CarouselItem key={detail.id} className="basis-1/2">
                                                <ProductOrder
                                                    item={detail}
                                                    updateQuantity={() => {}}
                                                    removeProduct={() => {}}
                                                    updateProductNote={() => {}}
                                                    productNotes={{}}
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="nunito-bold text-[26px] leading-6">Método de Pago</DialogTitle>
                        <DialogDescription className="nunito-medium text-[18px] text-gray-600">
                            Selecciona el método de pago utilizado
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {Object.entries(PaymentMethods).map(([key, label]) => (
                            <Button
                                key={key}
                                className={`cursor-pointer nunito-semibold text-[18px] py-6 rounded-xl transition-all ${
                                    selectedPaymentMethod === label
                                        ? 'bg-[#F03328] hover:bg-[#D02820] text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                                onClick={() => setSelectedPaymentMethod(label)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-6 mt-6">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-full cursor-pointer text-[16px] !py-[20px] nunito-semibold"
                            onClick={() => {
                                setIsPaymentModalOpen(false);
                                setSelectedPaymentMethod('');
                                setSelectedOrderId(null);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="flex-1 rounded-full cursor-pointer text-[16px] !py-[20px] nunito-bold bg-[#F03328] hover:bg-[#D02820]"
                            disabled={!selectedPaymentMethod}
                            onClick={() => {
                                if (selectedOrderId && selectedPaymentMethod) {
                                    router.patch(`/dashboard/orders/${selectedOrderId}/status`, {
                                        status: OrderStatuses.CANCELLED,
                                        payment_method: selectedPaymentMethod
                                    }, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            setIsPaymentModalOpen(false);
                                            setSelectedPaymentMethod('');
                                            setSelectedOrderId(null);
                                        }
                                    });
                                }
                            }}
                        >
                            Confirmar Pago
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            
            <Dialog open={isGuarantorModalOpen} onOpenChange={setIsGuarantorModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="nunito-bold text-[26px] leading-6">Fiador</DialogTitle>
                        <DialogDescription className="nunito-medium text-[18px] text-gray-600">
                            Ingresa el nombre del fiador para esta orden
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 relative">
                        <input
                            type="text"
                            value={guarantorName}
                            onChange={(e) => {
                                const value = e.target.value;
                                setGuarantorName(value);
                                debouncedGuarantorSearch(value);
                            }}
                            onFocus={() => {
                                if (guarantorSuggestions.length > 0) {
                                    setShowSuggestions(true);
                                }
                            }}
                            placeholder="Nombre del fiador"
                            className="nunito-medium w-full px-4 py-3 text-[18px] rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F03328] focus:border-transparent"
                            autoFocus
                        />
                        {showSuggestions && guarantorSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-[200px] overflow-y-auto">
                                {guarantorSuggestions.map((guarantor) => (
                                    <button
                                        key={guarantor.id}
                                        type="button"
                                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors nunito-medium text-[16px] first:rounded-t-xl last:rounded-b-xl"
                                        onClick={() => {
                                            setGuarantorName(guarantor.name);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        {guarantor.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-6 mt-6">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-full cursor-pointer text-[16px] !py-[20px] nunito-semibold"
                            onClick={() => {
                                setIsGuarantorModalOpen(false);
                                setGuarantorName('');
                                setSelectedOrderId(null);
                                setGuarantorSuggestions([]);
                                setShowSuggestions(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="flex-1 rounded-full cursor-pointer text-[16px] !py-[20px] nunito-bold bg-[#F03328] hover:bg-[#D02820]"
                            disabled={!guarantorName.trim()}
                            onClick={() => {
                                if (selectedOrderId && guarantorName.trim()) {
                                    router.patch(`/dashboard/orders/${selectedOrderId}/status`, {
                                        status: OrderStatuses.ON_CREDIT,
                                        guarantor_name: guarantorName.trim()
                                    }, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            setIsGuarantorModalOpen(false);
                                            setGuarantorName('');
                                            setSelectedOrderId(null);
                                            setGuarantorSuggestions([]);
                                            setShowSuggestions(false);
                                        }
                                    });
                                }
                            }}
                        >
                            Confirmar Fiado
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}