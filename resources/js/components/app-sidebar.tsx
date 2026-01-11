import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChefHat, HandPlatter, LayoutGrid, Pizza, Utensils } from 'lucide-react';
import { resolveUrl } from '@/lib/utils';
import { index as ordersIndex } from '@/routes/dashboard/orders';
import { index as productsIndex } from '@/routes/dashboard/products';
import { index as categoriesIndex } from '@/routes/dashboard/categories';
import { index as ingredientsIndex } from '@/routes/dashboard/ingredients';
import { useState } from 'react';
import { Roles } from '@/enums';

const itemsWaiter: NavItem[] = [
    {
        title: 'Pedidos',
        href: ordersIndex(),
        icon: HandPlatter,
    },
];

const itemsAdmin: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: Utensils,
    },
    {
        title: 'Pedidos',
        href: ordersIndex(),
        icon: HandPlatter,
    },
    {
        title: 'Productos',
        href: productsIndex(),
        icon: Pizza,
    },
    {
        title: 'Categorias',
        href: categoriesIndex(),
        icon: LayoutGrid,
    },
    {
        title: 'Ingredientes',
        href: ingredientsIndex(),
        icon: ChefHat,
    }
];

export function AppSidebar() {
    const page = usePage();
    const { auth } = usePage<SharedData>().props;
    const [mainNavItems, setMainNavItems] = useState<NavItem[]>(
        auth.user?.roles.includes(Roles.ADMIN) ? itemsAdmin : itemsWaiter
    );

    return (
        <Sidebar className='pt-[20px]' collapsible="icon" variant="inset">
            <h1 className="text-[#F03328] text-[50px] cookie-regular tracking-[3px] text-center mt-[5px] mb-[40px]">El Edén</h1>
            <div className="grid grid-cols-1 gap-[16px] place-content-start px-[16px] h-full w-full">
                {mainNavItems.map((item, index) => {
                    const currentPath = page.url.split('?')[0];
                    const itemPath = resolveUrl(item.href).split('?')[0];
                    const isActive = currentPath === itemPath;
                    
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`
                                w-full nunito flex px-[20px] py-[16px] rounded-[16px] text-[18px] font-medium gap-[24px] items-center
                                ${isActive ? "bg-[#F03328] text-white" : "bg-transparent text-[#A098AE]" }
                            `}
                        >
                            {item.icon && <item.icon className='size-6 ml-[4px]' />}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
