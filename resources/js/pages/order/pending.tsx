import { Order } from "@/types";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import CircularGradient from "@/components/landing/circular-gradient";
import FastFoodPizzaIcon from "@/components/icons/fast-food-pizza";
import FastFoodBurguerIcon from "@/components/icons/fast-food-burguer";
import { Clock, MessageCircle } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { whatsappUrl } from "@/lib/utils";

interface OrderClientShowProps {
    order: Order;
}

export default function OrderPending({ order }: OrderClientShowProps) {
    useLenis();

    const handleSendWhatsApp = () => {
        const message = `Hola! Soy un cliente y acabo de realizar una orden.\n\n` +
            `Código: ${order.code}\n` +
            `Por favor, confirma mi orden. ¡Gracias!`;
        
        window.open(whatsappUrl(message), '_blank');
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <main className="w-full bg-[#F8B78D]/10 min-h-screen grid grid-cols-1 place-content-start relative pt-[40px]">
            <CircularGradient className='absolute z-0 size-[46.25vw] -top-[105px] -left-[228px]' />
            
            <div className="absolute z-0 grid grid-cols-1 grid-rows-1 w-full h-full overflow-hidden">
                <div className="relative">
                    <FastFoodBurguerIcon
                        className="absolute left-[15%] top-[100px] opacity-90 z-0 -rotate-25 pointer-events-none"
                        width="180px"
                        height="180px"
                        fill="#F8B78D"
                    />
                    <FastFoodPizzaIcon 
                        className="absolute right-[10%] top-[300px] opacity-90 z-0 rotate-20 pointer-events-none"
                        width="200px"
                        height="200px"
                        fill="#F8B78D"
                    />
                </div>
            </div>

            <Header className='mb-[44px] z-10 px-[80px]' />
            
            {/* Mensaje de Orden Pendiente */}
            <div className="relative z-10 px-[80px] mb-[60px] flex justify-center">
                <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 border-2 border-[#F8B78D]/30">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="bg-[#F8B78D]/20 rounded-full p-6">
                            <Clock className="w-16 h-16 text-[#F8B78D] animate-pulse" />
                        </div>
                        
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-800">
                                ¡Orden Recibida!
                            </h1>
                            <p className="text-xl text-gray-600">
                                Tu pedido está pendiente de revisión
                            </p>
                        </div>

                        <div className="bg-[#F8B78D]/10 rounded-2xl p-6 w-full">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-600 font-medium">Código de Orden:</span>
                                <span className="text-2xl font-bold text-[#F8B78D]">{order.code}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Total:</span>
                                <span className="text-2xl font-bold text-gray-800">
                                    {formatCurrency(order.total)}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed max-w-md">
                            Tu orden ha sido registrada exitosamente. Un mesero la revisará en breve 
                            y te confirmará los detalles. Por favor, espera un momento.
                        </p>

                        <button
                            onClick={handleSendWhatsApp}
                            className="cursor-pointer flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <MessageCircle className="size-6" />
                            Contactar al Mesero por WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Productos */}
            <div className="relative z-10 px-[80px] mb-[80px]">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Detalles de tu Orden</h2>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-[#F8B78D]/20">
                    <div className="divide-y divide-gray-200">
                        {order.details?.map((detail) => (
                            <div key={detail.id} className="p-6 hover:bg-[#F8B78D]/5 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        {detail.product?.image && (
                                            <img 
                                                src={detail.product.image} 
                                                alt={detail.product.name}
                                                className="w-20 h-20 rounded-xl object-cover border-2 border-[#F8B78D]/30"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {detail.product?.name}
                                            </h3>
                                            {detail.notes && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Nota: {detail.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 text-right">
                                        <div>
                                            <p className="text-sm text-gray-600">Cantidad</p>
                                            <p className="text-lg font-bold text-[#F8B78D]">×{detail.quantity}</p>
                                        </div>
                                        <div className="min-w-[120px]">
                                            <p className="text-sm text-gray-600">Subtotal</p>
                                            <p className="text-lg font-bold text-gray-800">
                                                {formatCurrency(detail.subtotal)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-[#F8B78D]/10 p-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Total de la Orden:</span>
                            <span className="text-3xl font-bold text-[#F8B78D]">
                                {formatCurrency(order.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Información Adicional */}
                {order.notes && (
                    <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#F8B78D]/20">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Notas de la Orden:</h3>
                        <p className="text-gray-600">{order.notes}</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}