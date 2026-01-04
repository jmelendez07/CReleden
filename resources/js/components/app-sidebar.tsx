import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChefHat, Folder, HandPlatter, LayoutGrid, ListOrdered, Pizza, ShoppingBasket, Utensils } from 'lucide-react';
import AppLogo from './app-logo';
import { resolveUrl } from '@/lib/utils';
import { index as ordersIndex } from '@/routes/dashboard/orders';
import { index as productsIndex } from '@/routes/dashboard/products';
import { index as categoriesIndex } from '@/routes/dashboard/categories';
import { index as ingredientsIndex } from '@/routes/dashboard/ingredients';

const mainNavItems: NavItem[] = [
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

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage();

    return (
        <Sidebar className='pt-[20px]' collapsible="icon" variant="inset">
            {/* <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            */}
            <h1 className="text-[#F03328] text-[50px] cookie-regular tracking-[3px] text-center mt-[5px] mb-[40px]">El Edén</h1>
            <div className="grid gap-[16px] place-content-start px-[16px] h-full">
                {mainNavItems.map((item, index) => {
                    const currentPath = page.url.split('?')[0];
                    const itemPath = resolveUrl(item.href).split('?')[0];
                    const isActive = currentPath === itemPath;
                    
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`
                                nunito flex px-[20px] py-[16px] rounded-[16px] text-[18px] font-medium gap-[24px] items-center
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
