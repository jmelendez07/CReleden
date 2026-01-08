import { Link } from "@inertiajs/react";
import CircularGradient from "./circular-gradient";
import { Product } from "@/types";

interface HeroBestFoodsProps {
    className?: string;
    topProducts?: Product[];
}

export default function HeroBestFoods({ className = '', topProducts = [] }: HeroBestFoodsProps) {
    return (
        <div className={`relative overflow-x-hidden flex flex-col items-center justify-start ${className} pb-[10px]`}>
            <h4 className="nunito-bold text-[55px] z-2 2xl:text-[70px]">
                Los más pedidos del 
                <span className="cookie-regular text-[#F03328] text-[80px] 2xl:text-[100px] 2xl:leading-20 ml-[16px]">Edén</span> 
                🔥🔥
            </h4>
            <p className="nunito text-[#5C5C5C] z-2 text-[25px] max-w-3xl text-center mb-[70px]">
                Los que todo el mundo pide. Comida rápida sabrosa, bien servida y hecha para disfrutar sin complique.
            </p>
            <div className="grid grid-cols-3 gap-8 z-2">
                {topProducts.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden shadow-md rounded-[20px] pb-[30px]">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full object-cover h-[300px] mb-[30px]"
                        />
                        <div className="grid grid-cols-[1fr_auto] gap-5 items-center px-[20px] mb-[8px]">
                            <p className="nunito-medium text-[24px] leading-7 line-clamp-2">
                                {product.name}
                            </p>
                            <Link
                                href="#"
                                className="nunito-medium bg-[#F03328] rounded-full text-white text-[20px] py-[6px] px-[20px]"
                            >
                                Ordenar
                            </Link>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] overflow-hidden items-center gap-5 px-[20px]">
                            <p className="nunito-medium text-[18px] line-clamp-2 leading-5 text-[#404040] line-clamp-3">
                                {product.description}
                            </p>
                            <p className="nunito-bold text-[34px]">
                                {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <CircularGradient className='absolute z-0 size-[76.94vw] top-[140px] left-[48.47vw]' />
        </div>
    );
}