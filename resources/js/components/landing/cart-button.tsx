import { useCart } from "@/contexts/cart-context";
import { ShoppingCartIcon } from "lucide-react";

export default function CartButton() {
    const { getTotalItems, openCart } = useCart();
    const totalItems = getTotalItems();

    return (
        <button 
            onClick={openCart}
            className="cursor-pointer fixed z-50 bg-[#F03328] hover:bg-[#D02820] hover:scale-110 transition-all flex justify-center items-center bottom-30 right-10 size-18 rounded-full shadow-lg animate-bounce"
        >
            <ShoppingCartIcon className="size-8 text-white" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#F03328] nunito-bold text-sm rounded-full size-7 flex items-center justify-center shadow-md animate-pulse">
                    {totalItems}
                </span>
            )}
        </button>
    );
}