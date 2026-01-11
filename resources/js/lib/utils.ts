import { OrderStatuses } from '@/enums';
import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function whatsappUrl(message?: string): string {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573004780907';
    const baseUrl = `https://wa.me/${whatsappNumber}`;
    
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    
    return baseUrl;
}

export const isCompletedOrder = (status: string) => {
    return status === OrderStatuses.ON_CREDIT || status === OrderStatuses.CANCELLED;
};

export const canDeleteOrder = (status: string) => {
    return status !== OrderStatuses.DELIVERED;
};

export const isDeliveredOrder = (status: string) => {
    return status === OrderStatuses.DELIVERED;
};

export const isOnCreditOrder = (status: string) => {
    return status === OrderStatuses.ON_CREDIT;
}