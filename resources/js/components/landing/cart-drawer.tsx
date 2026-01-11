import { useCart} from "@/contexts/cart-context";
import { useState, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { OrderTypes, orderTypesArray } from "@/enums";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductOrder from "../product-order";

export default function CartDrawer() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        updateItemNotes,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isOpen,
        closeCart,
        orderType,
        setOrderType,
        submitOrder,
        isSubmitting,
    } = useCart();

    const [productNotes, setProductNotes] = useState<Record<string, string>>({});

    useEffect(() => {
        const notesFromItems = items.reduce((acc, item) => {
            if (item.notes) {
                acc[item.id] = item.notes;
            }
            return acc;
        }, {} as Record<string, string>);
        setProductNotes(notesFromItems);
    }, [items]);

    const updateProductNote = (itemId: string | number, note: string) => {
        itemId = itemId.toString();
        setProductNotes(prev => ({
            ...prev,
            [itemId]: note
        }));
        updateItemNotes(itemId, note);
    };

    const handleUpdateQuantity = (itemId: string | number, change: number) => {
        itemId = itemId.toString();
        const item = items.find(i => i.id === itemId);
        if (item) {
            const newQuantity = item.quantity + change;
            updateQuantity(itemId, newQuantity);
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && closeCart()}>
            <DrawerContent className={`max-h-[80vh] px-[20px] ${items.length > 0 ? 'h-[70vh]' : 'h-[50vh]'}`}>
                <div className={`w-full h-full grid ${items.length > 0 ? 'grid-cols-[70%_30%]' : 'grid-cols-1'}`}>
                    <div className={`grid grid-rows-[auto_1fr] ${items.length > 0 ? 'border-r border-dashed border-gray-200 pr-[20px]' : ''}`}>
                        <DrawerHeader className="py-[0px]">
                            <DrawerTitle className="flex items-center gap-2 leading-2 nunito-bold text-[30px]">
                                Aqui Esta Tu <span className="cookie-regular text-red-600 text-[40px] leading-10">Pedido</span>
                                <ShoppingCartIcon className="size-7 text-red-600 mb-2" />
                            </DrawerTitle>
                            <DrawerDescription className="!w-fit nunito">
                                {getTotalItems() === 0
                                    ? 'Tu carrito está vacío'
                                    : `${getTotalItems()} ${getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito`}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex items-center w-full max-w-full overflow-hidden h-full">
                            {items.length === 0 ? (
                                <div className="px-4 py-4 flex flex-col items-center justify-center w-full h-full text-center gap-4">
                                    <ShoppingCartIcon className="size-32 text-gray-300" />
                                    <p className="text-gray-500 nunito text-[20px]">
                                        Aún no has agregado productos a tu carrito
                                    </p>
                                </div>
                            ) : (
                                <Carousel 
                                    plugins={[
                                        Autoplay({
                                            delay: 2000
                                        })
                                    ]}
                                    className="w-full"
                                >
                                    <CarouselContent>
                                        {items.map((item) => (
                                            <CarouselItem className="basis-1/2" key={item.id}>
                                                <ProductOrder
                                                    item={item}
                                                    updateQuantity={handleUpdateQuantity}
                                                    removeProduct={removeFromCart}
                                                    updateProductNote={updateProductNote}
                                                    productNotes={productNotes}
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            )}
                        </div>
                    </div>
                    {items.length > 0 && (
                        <div className="grid gap-[20px] pl-[20px] grid-cols-1 place-content-start">
                            <h4 className="nunito-bold text-[30px]">Detalles Adicionales</h4>
                            <div className="flex items-center flex-wrap gap-4">
                                {orderTypesArray.map((type) => (
                                    <button
                                        key={type.key}
                                        onClick={() => setOrderType(type.key)}
                                        className={`px-4 py-3 rounded-full nunito-medium text-[16px] transition-all ${
                                            orderType === type.key
                                                ? 'bg-[#F03328] text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-2 max-h-[200px] pr-[5px] overflow-y-auto">
                                {items.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`
                                            flex justify-between items-start text-sm py-2
                                            ${items.length - 1 === index ? '' : 'border-b border-gray-100'}    
                                        `}
                                    >
                                        <div className="flex-1">
                                            <p className="nunito-medium text-gray-800">
                                                {item.product.name}
                                            </p>
                                            {item.notes && (
                                                <p className="text-xs text-gray-500 italic mt-1">
                                                    {item.notes}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-600 mt-1">
                                                {item.product.price.toLocaleString('es-CO', {
                                                    style: 'currency',
                                                    currency: 'COP',
                                                    minimumFractionDigits: 0,
                                                })} x {item.quantity}
                                            </p>
                                        </div>
                                        <p className="nunito-bold text-gray-800">
                                            {(item.product.price * item.quantity).toLocaleString('es-CO', {
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
                                        {getTotalPrice().toLocaleString('es-CO', {
                                            style: 'currency',
                                            currency: 'COP',
                                            minimumFractionDigits: 0,
                                        })}
                                    </span>
                                </div>
                                <div className="flex gap-6">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer flex-1 rounded-full nunito text-[18px]"
                                        onClick={clearCart}
                                    >
                                        Vaciar
                                    </Button>
                                    <Button
                                        className="cursor-pointer flex-1 bg-[#F03328] hover:bg-[#D02820] rounded-full text-[18px] nunito-bold"
                                        onClick={() => submitOrder()}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Ordenando...' : 'Ordenar!'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
