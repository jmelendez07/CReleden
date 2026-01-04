import { Order } from "@/types";
import Autoplay from 'embla-carousel-autoplay';
import { ShoppingCart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export default function OrderCard({ order }: { order: Order }) {
    return (
        <div key={order.id} className="bg-white rounded-[16px] p-[20px]">
            <div className="flex items-start justify-between mb-[16px]">
                <div>
                    <div className="grid grid-cols-[auto_1fr] gap-[12px] items-center">
                        <h5 className="nunito-bold text-[22px]">#{order.code}</h5>
                    </div>
                    <p className="nunito text-[18px] text-gray-500">
                        {order.type?.name}
                        {order.details && order.details.length > 0 && (
                            <span>
                                , Productos ({order.details.reduce((sum, detail) => sum + detail.quantity, 0)})
                            </span>
                        )}
                    </p>
                </div>
                <p className="nunito-bold text-[26px] text-[#F03328]">
                    ${order.total.toLocaleString('es-CO')}
                </p>
            </div>

            {order.details && order.details.length > 0 && (
                <div className="mb-[16px]">
                    <Carousel 
                        plugins={[
                            Autoplay({
                                delay: 2000
                            })
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {order.details.map((detail) => (
                                <CarouselItem key={detail.id}>
                                    <div className="rounded-[12px] p-[12px]">
                                        <div 
                                            className={`
                                                w-full h-[300px] mb-[10px] flex items-center justify-center flex-shrink-0 rounded-[8px] overflow-hidden
                                                ${detail.product?.image ? '' : 'bg-gray-200'}
                                            `}
                                        >
                                            {detail.product?.image ? (
                                                <img 
                                                    src={detail.product.image} 
                                                    alt={detail.product.name}
                                                    className="w-auto h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ShoppingCart className="size-20 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-[12px]">
                                            <div className="flex-1 min-w-0">
                                                <h6 className="nunito-bold text-center text-[22px] truncate">
                                                    {detail.product?.name}
                                                    <span className='nunito text-[16px] ml-[10px] text-gray-600'>Cant: {detail.quantity}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            )}
        </div>
    );
}