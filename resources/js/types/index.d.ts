import ingredients from '@/routes/dashboard/ingredients';
import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface Ingredient {
    id: number;
    name: string;
    unit_of_measurement: string;
    unit_price: number;
    supplier: string | null;
    current_stock: number;
    created_at: string;
    updated_at: string;
    pivot?: {
        quantity_needed: string;
    }
}

export interface Product {
    id: number;
    name: string;
    code: string;
    description: string | null;
    image: string;
    price: number;
    category_id: number;
    category?: Category;
    created_at: string;
    updated_at: string;
    ingredients: Ingredient[];
}

export interface OrderType {
    id: number;
    name: string;
    description: string | null;
}

export interface PaymentMethod {
    id: number;
    name: string;
    description: string | null;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    notes: string | null;
    product?: Product;
}

export interface Order {
    id: number;
    code: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    total: number;
    notes: string | null;
    type_id: number;
    payment_method_id: number;
    type?: OrderType;
    method?: PaymentMethod;
    details?: OrderDetail[];
    created_at: string;
    updated_at: string;
}