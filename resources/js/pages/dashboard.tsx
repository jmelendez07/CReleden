import FirstElipseBanner from '@/components/dashboard/banner/first-elipse';
import SecondElipseBanner from '@/components/dashboard/banner/second-elipse';
import ThirdElipseBanner from '@/components/dashboard/banner/third-elipse';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem, Order } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Search, Clock, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ recentOrders }: { recentOrders: Order[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid px-[40px] py-[30px] gap-[32px]">
                <div className="grid items-center relative z-2 grid-cols-[1fr_auto]">
                    <h4 className='nunito-bold text-[40px] leading-14'>Hola, {auth.user.name}</h4>
                    <div className="relative w-sm max-w-sm">
                        <input 
                            type="search"
                            placeholder="¿Qué quieres buscar hoy?"
                            className="nunito bg-white w-full font-semibold pl-[48px] pr-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2]"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F03328] size-5" />
                    </div>
                </div>
                <div className="relative bg-gradient-to-r from-[#F03328] to-[#DB4A58] w-full rounded-[16px] p-[32px] flex flex-col justify-center">
                    <h5 className="nunito-bold text-white text-[40px]">
                        Total de Ingresos Generados el Día de <span className="text-[#FCDBB2]">Hoy</span>
                    </h5>
                    <p className='nunito font-extrabold text-white text-[60px] leading-18 mb-[20px]'>$243.000</p>
                    <p className="nunito-medium text-white text-[18px] opacity-90">
                        Revisa el total de ventas y pedidos completados del día actual
                    </p>
                    <FirstElipseBanner className="absolute right-[250px] top-0" />
                    <SecondElipseBanner className="absolute right-0 bottom-0" />
                    <ThirdElipseBanner className="absolute left-0 bottom-0" />
                    <img 
                        src="/images/banner.png" 
                        alt="Imagen de banner"
                        className='absolute w-[400px] top-1/2 -translate-y-[calc(50%-20px)] right-[120px] object-cover'
                    />
                </div>
                <div className="grid gap-[20px]">
                    <h6 className='nunito-bold text-[26px] leading-12'>
                        <span className='bg-[#FCDBB2] px-[14px] py-[8px] text-shadow-md rounded-full text-white mr-[14px]'>Pedidos</span>
                        Recientes
                    </h6>
                    <div className="grid grid-cols-3 gap-[20px]">
                        {recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => {
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
                            })
                        ) : (
                            <div className="col-span-3 text-center py-[40px]">
                                <ShoppingCart className="size-16 mx-auto text-gray-300 mb-[12px]" />
                                <p className="nunito-medium text-gray-500 text-[16px]">
                                    No hay órdenes recientes
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
