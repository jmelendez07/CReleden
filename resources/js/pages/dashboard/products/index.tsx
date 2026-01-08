import AppLayout from "@/layouts/app-layout";
import { Category, Product } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Edit2, Plus, Search, ShoppingBag, Trash2, FileDown } from "lucide-react";
import { create } from "@/routes/dashboard/products";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/dashboard/product-card";
import { destroy } from "@/routes/dashboard/products";

export default function ProductIndex({ 
    products, 
    categories, 
    filters 
}: { 
    products: Product[], 
    categories: Category[], 
    filters: { search: string, category: string } 
}) {
    const [search, setSearch] = useState(filters?.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters?.category || '');

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.get(
            window.location.pathname,
            { search: value, category: categoryFilter },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, 500);

    const handleCategoryFilter = (categoryId: string) => {
        setCategoryFilter(categoryId);
        router.get(
            window.location.pathname,
            { search: search, category: categoryId },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleDelete = (product: Product) => {
        if (confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
            router.delete(destroy.url({ product: product.id }));
        }
    };

    const handleExportPdf = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (categoryFilter) params.append('category', categoryFilter);
        
        window.open(`/dashboard/products-export-pdf?${params.toString()}`, '_blank');
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-1 gap-[40px] px-[40px] py-[30px]">
                <div className="grid grid-cols-[1fr_auto] place-content-start place-items-start">
                    <div className="block">
                        <h2 className="nunito-bold text-[30px]">Tus Productos</h2>
                        <p className="nunito-medium text-[#5C5C5C] text-[20px]">
                            Administra el menú de productos de tu restaurante
                        </p>
                    </div>
                    <div className="flex gap-[12px]">
                        <button
                            onClick={handleExportPdf}
                            type="button"
                            className="cursor-pointer nunito-semibold bg-white border-2 border-[#F03328] text-[#F03328] text-[18px] px-[22px] py-[12px] rounded-[16px] flex items-center gap-2 hover:bg-[#F03328] hover:text-white transition-colors"
                        >
                            <FileDown className="size-5" />
                            Exportar a PDF
                        </button>
                        <Link
                            href={create.url()}
                            className="nunito-semibold bg-[#F03328] text-[18px] text-white px-[22px] py-[12px] rounded-[16px] flex items-center gap-2 hover:bg-[#d92b21] transition-colors"
                        >
                            <Plus className="size-5" />
                            Nuevo Producto
                        </Link>
                    </div>
                </div>

                <div className="flex gap-[12px]">
                    <Select
                        value={categoryFilter || "all"}
                        onValueChange={(value) => handleCategoryFilter(value === "all" ? "" : value)}
                    >
                        <SelectTrigger className="nunito h-full bg-white font-semibold px-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2] w-[280px]">
                            <SelectValue className="!nunito !text-[18px]" placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} className="nunito text-[18px]" value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="relative flex-1 max-w-sm">
                        <input 
                            type="search"
                            placeholder="¿Qué producto buscas?"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                            className="nunito bg-white w-full font-semibold pl-[48px] pr-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2]"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-[40px]">
                    {products.length === 0 ? (
                        <div className="col-span-4 text-center py-[60px]">
                            <ShoppingBag className="size-20 mx-auto text-gray-300 mb-[20px]" />
                            <p className="nunito-medium text-gray-500 text-[20px]">
                                No hay productos registrados
                            </p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="relative">
                                <ProductCard product={product} />
                                <div className="absolute opacity-0 hover:opacity-100 bg-gray-100/60 inset-0 flex items-center justify-center transition-opacity gap-[40px]">
                                    <Link
                                        href={`/dashboard/products/${product.id}/edit`}
                                        className="p-[6px] rounded-[6px] hover:bg-gray-200 transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 className="size-14" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product)}
                                        className="cursor-pointer p-[6px] rounded-[6px] hover:bg-red-50 transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="size-14 text-[#F03328]" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}