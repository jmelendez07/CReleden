import { Product } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { OrderTypes } from "@/enums";
import { router } from "@inertiajs/react";

export interface CartItem {
    id: string; // ID único del item en el carrito
    product: Product;
    quantity: number;
    notes?: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, notes?: string) => void;
    removeFromCart: (itemId: string | number) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    updateItemNotes: (itemId: string, notes: string) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    orderType: OrderTypes | null;
    setOrderType: (type: OrderTypes) => void;
    submitOrder: (paymentMethod?: string) => void;
    isSubmitting: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'creleden_cart';
const ORDER_TYPE_STORAGE_KEY = 'creleden_order_type';

export function CartProvider({ children }: { children: ReactNode }) {
    // Cargar el carrito y orderType desde localStorage al inicializar
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });
    
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [orderType, setOrderType] = useState<OrderTypes>(() => {
        if (typeof window !== 'undefined') {
            const savedOrderType = localStorage.getItem(ORDER_TYPE_STORAGE_KEY);
            return savedOrderType ? (savedOrderType as OrderTypes) : OrderTypes.TO_GO;
        }
        return OrderTypes.TO_GO;
    });

    // Guardar el carrito en localStorage cada vez que cambia
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items]);

    // Guardar el orderType en localStorage cada vez que cambia
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(ORDER_TYPE_STORAGE_KEY, orderType);
        }
    }, [orderType]);

    const addToCart = (product: Product, notes?: string) => {
        setItems((prevItems) => {
            // Buscar un item que tenga el mismo producto Y las mismas notas
            const existingItem = prevItems.find(
                (item) => item.product.id === product.id && item.notes === notes
            );
            
            if (existingItem) {
                // Si existe con las mismas notas exactas, solo incrementar cantidad
                return prevItems.map((item) =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            // Si no existe o tiene notas diferentes, crear un nuevo item con ID único
            const newItem: CartItem = {
                id: `${product.id}-${Date.now()}-${Math.random()}`,
                product,
                quantity: 1,
                notes
            };
            return [...prevItems, newItem];
        });

        if (items.length === 0) {
            setIsOpen(true);
        }
    };

    const removeFromCart = (itemId: string | number) => {
        itemId = itemId.toString();
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const updateItemNotes = (itemId: string, notes: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, notes } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const submitOrder = (paymentMethod?: string) => {
        if (items.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        if (!orderType) {
            alert('Debe seleccionar un tipo de orden');
            return;
        }

        setIsSubmitting(true);

        // Serializar items para que Inertia pueda manejarlos
        const serializedItems = items.map(item => ({
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
            },
            quantity: item.quantity,
            notes: item.notes || '',
        }));

        clearCart();
        closeCart();

        router.post('/store-cart', {
            order_type: orderType,
            payment_method: paymentMethod || '',
            items: serializedItems,
        }, {
            onSuccess: (page) => {
                const response = page.props as any;
                if (response.flash?.success) {
                    alert(response.flash.success);
                } else {
                    alert('¡Orden creada exitosamente!');
                }
            },
            onError: (errors) => {
                console.error('Error al enviar la orden:', errors);
                const errorMessage = Object.values(errors).flat().join(', ');
                alert(`Error: ${errorMessage}`);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateItemNotes,
                clearCart,
                getTotalItems,
                getTotalPrice,
                isOpen,
                openCart,
                closeCart,
                orderType,
                setOrderType,
                submitOrder,
                isSubmitting,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
