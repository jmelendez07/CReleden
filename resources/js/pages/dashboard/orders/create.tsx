import ProductCard from "@/components/dashboard/product-card";
import ProductOrder from "@/components/product-order";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrderTypes } from "@/enums";
import AppLayout from "@/layouts/app-layout";
import { index } from "@/routes/dashboard/orders";
import { Category, Product } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { ClipboardList, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface OrderCreateProps {
    products: Product[];
    categories: Category[];
}

interface SelectedProductItem {
    id: string;
    product: Product;
    note: string;
}

export default function OrderCreate({ products, categories }: OrderCreateProps) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProductItem[]>([]);
    const [productNotes, setProductNotes] = useState<Record<number, string>>({});
    const [selectedOrderType, setSelectedOrderType] = useState<OrderTypes | null>(OrderTypes.DINE_IN);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [processing, setProcessing] = useState(false);

    const { props } = usePage<any>();

    const filteredProducts = selectedCategory 
        ? products.filter(product => product.category_id === selectedCategory)
        : products;

    const handleProductClick = (product: Product) => {
        setSelectedProducts(prev => [...prev, { 
            id: `${product.id}-${Date.now()}-${Math.random()}`,
            product, 
            note: '' 
        }]);
    };

    const updateQuantity = (productId: number, change: number) => {
        setSelectedProducts(prev => {
            const productIndex = prev.findIndex(p => p.product.id === productId);
            if (productIndex === -1) return prev;
            
            const count = prev.filter(p => p.product.id === productId).length;
            const newCount = count + change;
            
            if (newCount < 1) return prev;
            
            if (change > 0) {
                const itemToCopy = prev[productIndex];
                return [...prev, { 
                    id: `${itemToCopy.product.id}-${Date.now()}-${Math.random()}`,
                    product: itemToCopy.product,
                    note: ''
                }];
            } else {
                // Eliminar desde el final para mantener el orden
                const newArray = [...prev];
                for (let i = newArray.length - 1; i >= 0; i--) {
                    if (newArray[i].product.id === productId) {
                        newArray.splice(i, 1);
                        break;
                    }
                }
                return newArray;
            }
        });
    };

    const updateNote = (itemId: string, note: string) => {
        setSelectedProducts(prev => 
            prev.map(item => 
                item.id === itemId ? { ...item, note } : item
            )
        );
    };

    const updateProductNote = (productId: number, note: string) => {
        setProductNotes(prev => ({
            ...prev,
            [productId]: note
        }));
    };

    const removeProduct = (productId: number) => {
        setSelectedProducts(prev => prev.filter(item => item.product.id !== productId));
        setProductNotes(prev => {
            const newNotes = { ...prev };
            delete newNotes[productId];
            return newNotes;
        });
    };

    const isProductSelected = (productId: number) => {
        return selectedProducts.some(p => p.product.id === productId);
    };

    // Agrupar productos y contar cantidades
    const groupedProducts = selectedProducts.reduce((acc, item) => {
        const existing = acc.find(group => group.product.id === item.product.id);
        if (existing) {
            existing.quantity += 1;
            existing.items.push(item);
        } else {
            acc.push({ product: item.product, quantity: 1, items: [item] });
        }
        return acc;
    }, [] as { product: Product; quantity: number; items: SelectedProductItem[] }[]);

    // Calcular total
    const total = groupedProducts.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            alert('Debes seleccionar al menos un producto');
            return;
        }

        if (!selectedOrderType) {
            alert('Debes seleccionar un tipo de orden');
            return;
        }

        // Agrupar productos por ID y sumar cantidades
        const productsMap = selectedProducts.reduce((acc, item) => {
            const productId = item.product.id;
            if (!acc[productId]) {
                acc[productId] = {
                    product_id: productId,
                    quantity: 0,
                    note: productNotes[productId] || ''
                };
            }
            acc[productId].quantity += 1;
            return acc;
        }, {} as Record<number, { product_id: number; quantity: number; note: string }>);

        const productsData = Object.values(productsMap);

        console.log('Sending order data:', {
            order_type: selectedOrderType,
            products: productsData
        });

        setProcessing(true);

        router.post('/dashboard/orders', {
            order_type: selectedOrderType,
            products: productsData
        }, {
            onError: (errors) => {
                console.error('Order creation errors:', errors);
                const firstError = Object.values(errors)[0] as string;
                setErrorMessage(firstError || 'Error desconocido al crear el pedido');
                setShowErrorDialog(true);
                setProcessing(false);
            },
            onSuccess: () => {
                console.log('Order created successfully');
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-[60%_40%] h-[calc(100vh-20px)] overflow-hidden">
                <div className="overflow-y-auto p-[30px] border-r border-gray-200">
                    <div className="flex items-center-safe justify-center mb-5 gap-[8px]">
                        <h3 className="nunito-bold text-[28px]">Selecciona tu Orden</h3>
                        <ClipboardList className="size-8" />
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button 
                            type="button"
                            onClick={() => setSelectedCategory(null)}
                            className={`cursor-pointer border rounded-full flex items-center justify-center px-[20px] py-[5px] ${
                                selectedCategory === null 
                                    ? 'bg-[#F03328] text-white border-[#F03328]' 
                                    : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            <span className="nunito-semibold text-[20px]">
                                Todos
                            </span>
                        </button>
                        {categories.map(category => (
                            <button 
                                key={category.id}
                                type="button"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`cursor-pointer border rounded-full grid grid-cols-[auto_1fr] items-center px-[20px] py-[5px] gap-[20px] ${
                                    selectedCategory === category.id 
                                        ? 'bg-[#F03328] text-white border-[#F03328]' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                <img 
                                    src={category.image}
                                    alt={category.name}
                                    className="h-[45px] w-auto object-cover"
                                />
                                <span className="nunito-semibold text-start text-[20px]">
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-[30px]">
                        {filteredProducts.map(product => {
                            const isSelected = isProductSelected(product.id);
                            return (
                                <button
                                    type="button"
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className={`cursor-pointer relative ${isSelected ? 'ring-4 ring-[#F03328] rounded-[20px]' : ''}`}
                                >
                                    <ProductCard product={product} />
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-[#F03328] text-white rounded-full w-8 h-8 flex items-center justify-center nunito-bold text-sm">
                                            ✓
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-rows-[1fr_auto_auto] pt-[90px] overflow-hidden relative bg-white p-[30px]">
                    <Link
                        href={index.url()}
                        className="absolute top-[20px] left-1/2 bg-red-500 text-white -translate-x-1/2 p-[14px] rounded-full"
                    >
                        <X className="size-6" />
                    </Link>
                    {selectedProducts.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center py-[80px]">
                            <ClipboardList className="size-24 text-gray-300 mb-[20px]" />
                            <p className="nunito-semibold text-gray-400 text-[22px] text-center">
                                Aquí aparecerán los productos seleccionados
                            </p>
                            <p className="nunito text-gray-400 text-[16px] text-center mt-[10px]">
                                Haz clic en un producto para agregarlo a tu pedido
                            </p>
                        </div>
                    ) : (
                        <Carousel 
                            className="w-full px-[40px]"
                            plugins={[
                                Autoplay({
                                    delay: 2000
                                })
                            ]}
                            opts={{
                                align: "start",
                                loop: true
                            }}
                            orientation="vertical"
                        >
                            <CarouselContent className="-mt-1 h-[calc(100vh-320px)]">
                                {groupedProducts.map((item, index) => (
                                    <CarouselItem key={`${item.product.id}-${index}`} className="pt-1 basis-1/2">
                                        <ProductOrder 
                                            item={item} 
                                            removeProduct={removeProduct}
                                            updateQuantity={updateQuantity}
                                            updateProductNote={updateProductNote}
                                            productNotes={productNotes}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                    <div className="w-full flex items-center gap-3 justify-center mt-[40px]">
                        <button
                            type="button"
                            onClick={() => setSelectedOrderType(OrderTypes.DINE_IN)}
                            className={`cursor-pointer border px-[20px] py-[10px] nunito-medium rounded-full ${
                                selectedOrderType === OrderTypes.DINE_IN
                                    ? 'border-[#F03328] bg-[#F03328] text-white'
                                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            {OrderTypes.DINE_IN}
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedOrderType(OrderTypes.TO_GO)}
                            className={`cursor-pointer border px-[20px] py-[10px] nunito-medium rounded-full ${
                                selectedOrderType === OrderTypes.TO_GO
                                    ? 'border-[#F03328] bg-[#F03328] text-white'
                                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            {OrderTypes.TO_GO}
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedOrderType(OrderTypes.DELIVERY)}
                            className={`cursor-pointer border px-[20px] py-[10px] nunito-medium rounded-full ${
                                selectedOrderType === OrderTypes.DELIVERY
                                    ? 'border-[#F03328] bg-[#F03328] text-white'
                                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            {OrderTypes.DELIVERY}
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center mt-[30px]">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing || selectedProducts.length === 0 || !selectedOrderType}
                            className="cursor-pointer flex-1 w-full max-w-md nunito-semibold bg-[#F03328] text-white px-[24px] py-[16px] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#d92b21] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[20px]"
                        >
                            {processing ? 'Creando...' : 'Crear Pedido'}
                        </button>
                    </div>
                </div>
            </div>
            
            <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Error al crear pedido</DialogTitle>
                        <DialogDescription className="text-gray-700">
                            {errorMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button
                            onClick={() => setShowErrorDialog(false)}
                            className="cursor-pointer w-full bg-[#F03328] text-white px-4 py-2 rounded-md hover:bg-[#d92b21] nunito-semibold"
                        >
                            Cerrar
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}