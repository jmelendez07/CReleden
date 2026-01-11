import { CartItem } from "@/contexts/cart-context";
import { OrderDetail } from "@/types";
import { ShoppingCart, Trash2 } from "lucide-react";


interface ProductOrderProps {
    item: CartItem | OrderDetail;
    productNotes: Record<string, string>;
    removeProduct: (itemId: string | number) => void;
    updateQuantity: (itemId: string | number, change: number) => void;
    updateProductNote: (itemId: string | number, note: string) => void;
}

export default function ProductOrder({ item, removeProduct, updateQuantity, updateProductNote, productNotes }: ProductOrderProps ) {
    return (
        <div className="rounded-[12px] p-[12px]">
            <button
                type="button"
                onClick={() => removeProduct(item.id)}
                className={`
                    w-full mb-[10px] cursor-pointer group flex items-center justify-center flex-shrink-0 rounded-[8px] overflow-hidden
                    ${item.product?.image ? '' : 'bg-gray-200 hover:bg-red-200 text-gray-400 hover:text-white'}
                `}
            >
                {item.product?.image ? (
                    <div className="relative rounded-[8px] w-full flex items-center justify-center h-[300px] max-h-[300px] overflow-hidden">
                        <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-auto h-full object-cover"
                        />
                        <div className="absolute z-1 left-2 top-2 text-white bg-[#F03327] rounded-full px-[24px] py-[8px] nunito font-[900] text-[22px]">
                            {item.product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                        </div>
                        <div className="absolute rounded-[8px] opacity-0 group-hover:opacity-100 inset-0 flex items-center justify-center bg-red-200/50 text-white transition-opacity duration-200">
                            <Trash2 className="size-20" />
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="size-20 block group-hover:hidden" />
                        <Trash2 className="size-20 hidden group-hover:block" />
                    </div>
                )}
            </button>
            <div className="flex items-center justify-between px-[12px] gap-[8px]">
                <h6 className="nunito-bold text-start text-[22px] line-clamp-2">
                    {item.product?.name}
                </h6>
                <div className="flex items-center justify-center gap-[6px]">
                    <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-8 h-8 flex items-center justify-center nunito-bold text-[20px]"
                    >
                        -
                    </button>
                    <span className='nunito-semibold text-[18px] min-w-[60px] text-center'>
                        Cant: {item.quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="cursor-pointer bg-[#F03328] hover:bg-[#d92b21] text-white rounded-full w-8 h-8 flex items-center justify-center nunito-bold text-[20px]"
                    >
                        +
                    </button>
                </div>
            </div>
            <input 
                type="text"
                value={productNotes[item.id] || ''}
                onChange={(e) => updateProductNote(item.id, e.target.value)}
                placeholder="¿Algún detalle Adicional? Escribe aquí..."
                className="px-[12px] focus:outline-0 w-full"
            />
        </div>
    );
}