import FirstElipseBanner from '@/components/dashboard/banner/first-elipse';
import SecondElipseBanner from '@/components/dashboard/banner/second-elipse';
import ThirdElipseBanner from '@/components/dashboard/banner/third-elipse';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem, Order } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Download, Search, ShoppingCart, TrendingUp } from 'lucide-react';
import OrderCard from '@/components/dashboard/order-card';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { exportMethod } from '@/routes/dashboard/orders';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const chartConfig = {
    ingresos: {
        label: "Ingresos",
        color: "#F03328",
    },
    pedidos: {
        label: "Pedidos",
        color: "#FCDBB2",
    },
    ventas: {
        label: "Ventas",
        color: "#DB4A58",
    },
}

interface DashboardProps {
    recentOrders: Order[];
    topDaysData: Array<{ day: string; ventas: number }>;
    revenueData: Array<{ day: string; ingresos: number; pedidos: number }>;
    todayRevenue: number;
}

export default function Dashboard({ recentOrders, topDaysData, revenueData, todayRevenue }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;

    // Encontrar el día con más ventas
    const topDay = topDaysData && topDaysData.length > 0 
        ? topDaysData.reduce((max, day) => day.ventas > max.ventas ? day : max, topDaysData[0])
        : { day: 'Sábado', ventas: 0 };

    // Calcular el total de ingresos del mes
    const monthlyTotal = revenueData && revenueData.length > 0
        ? revenueData.reduce((sum, day) => sum + day.ingresos, 0)
        : 0;

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
                    <p className='nunito font-extrabold text-white text-[60px] leading-18 mb-[20px]'>
                        ${todayRevenue.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
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
                    <div className="flex items-center justify-between">
                        <h6 className='nunito-bold text-[26px] leading-12'>
                            <span className='bg-[#FCDBB2] px-[14px] py-[8px] text-shadow-md rounded-full text-white mr-[14px]'>Pedidos</span>
                            Recientes
                        </h6>
                    </div>
                    <div className="grid grid-cols-3 gap-[20px]">
                        {recentOrders && recentOrders.length > 0 ? (
                            recentOrders.map((order) => {
                                return (
                                    <OrderCard key={order.id} order={order} />
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
                <div className="grid gap-[20px]">
                    <div className="grid grid-cols-[1fr_auto] items-center">
                        <h6 className='nunito-bold text-[26px] leading-12'>
                            Tu negocio en <span className='text-[#F03328] cookie-regular text-[40px]'>Números</span>
                        </h6>
                        <a
                            href={exportMethod().url}
                            className="cursor-pointer flex items-center gap-[8px] bg-gradient-to-r from-[#F03328] to-[#DB4A58] text-white px-[20px] py-[12px] rounded-[12px] nunito-bold text-[18px] hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <Download className="size-5" />
                            Descargar Extracto
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-[2fr_1fr] gap-[20px]">
                        <div className="bg-white rounded-[16px] p-[24px] border border-gray-200">
                            <div className="mb-[20px]">
                                <h6 className="nunito-bold text-[20px] text-gray-800 mb-[4px]">
                                    Pulso de Ventas - <span className="text-[#F03328]">${monthlyTotal.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                </h6>
                                <p className="nunito text-[14px] text-gray-500">
                                    Ingresos diarios del último mes
                                </p>
                            </div>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <LineChart
                                    data={revenueData}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        stroke="#f0f0f0"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        className="nunito text-[12px]"
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        className="nunito text-[12px]"
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent 
                                                className="nunito"
                                                formatter={(value, name) => {
                                                    if (name === "ingresos") {
                                                        return `$${value.toLocaleString()}`
                                                    }
                                                    return value
                                                }}
                                            />
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ingresos"
                                        stroke="#F03328"
                                        strokeWidth={2.5}
                                        dot={{
                                            fill: "#F03328",
                                            r: 4,
                                        }}
                                        activeDot={{
                                            r: 7,
                                            fill: "#F03328",
                                        }}
                                    />
                                </LineChart>
                            </ChartContainer>
                            <div className="flex items-center gap-[8px] mt-[16px] justify-center">
                                <TrendingUp className="text-[#F03328] size-4" />
                                <p className="nunito text-[13px] text-gray-600">
                                    Crecimiento del <span className="nunito-bold text-[#F03328]">23.5%</span> este mes
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[16px] p-[24px] border border-gray-200">
                            <div className="mb-[20px]">
                                <h6 className="nunito-bold text-[20px] text-gray-800 mb-[4px]">
                                    Días Destacados
                                </h6>
                                <p className="nunito text-[14px] text-gray-500">
                                    Pedidos por día de la semana
                                </p>
                            </div>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <BarChart
                                    data={topDaysData}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        stroke="#f0f0f0"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        className="nunito text-[12px]"
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        className="nunito text-[12px]"
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent 
                                                className="nunito"
                                            />
                                        }
                                    />
                                    <Bar
                                        dataKey="ventas"
                                        fill="#DB4A58"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                            <div className="flex items-center gap-[8px] mt-[16px] justify-center">
                                <TrendingUp className="text-[#DB4A58] size-4" />
                                <p className="nunito text-[13px] text-gray-600">
                                    <span className="nunito-bold text-[#DB4A58]">{topDay.day}</span> es el día con más ventas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
