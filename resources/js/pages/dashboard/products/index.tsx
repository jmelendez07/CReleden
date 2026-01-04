import AppLayout from "@/layouts/app-layout";
import { Category, Product } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Plus, Search, Trash2, Edit2, ShoppingBag } from "lucide-react";
import { destroy } from "@/routes/dashboard/products";
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
                        <Link
                            href={create.url()}
                            className="nunito-semibold bg-[#F03328] text-[18px] text-white px-[24px] py-[14px] rounded-[16px] flex items-center gap-2 hover:bg-[#d92b21] transition-colors"
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

                <div className="grid grid-cols-4 gap-[40px]">
                    {products.length === 0 ? (
                        <div className="col-span-4 text-center py-[60px]">
                            <ShoppingBag className="size-20 mx-auto text-gray-300 mb-[20px]" />
                            <p className="nunito-medium text-gray-500 text-[20px]">
                                No hay productos registrados
                            </p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="relative overflow-hidden rounded-[16px] transition-shadow">
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
                                <div className="w-full h-[200px] rounded-[16px] overflow-hidden flex items-center justify-center bg-gray-100">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="h-full object-cover"
                                    />
                                </div>
                                <div className="p-[20px]">
                                    <div className="flex items-start justify-between mb-[8px]">
                                        <h6 className="nunito-bold text-[20px] flex-1">{product.name}</h6>
                                        <span className="nunito-bold text-[#F03328] text-[20px]">
                                            ${product.price}
                                        </span>
                                    </div>
                                    {product.ingredients && product.ingredients.length > 0 && (
                                        <div className="max-w-full overflow-hidden mb-[10px]">
                                            <Carousel
                                                opts={{
                                                    align: "start",
                                                }}
                                                className="w-full"
                                            >
                                                <CarouselContent className="-ml-1">
                                                    {product.ingredients.map((ingredient) => (
                                                        <CarouselItem key={ingredient.id} className="pl-1 basis-auto">
                                                            <span className="nunito-medium text-[13px] px-[8px] py-[4px] bg-gray-100 rounded-full whitespace-nowrap inline-block">
                                                                {ingredient.pivot?.quantity_needed}{ingredient.unit_of_measurement} {ingredient.name}
                                                            </span>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                            </Carousel>
                                        </div>
                                    )}
                                    <p className="nunito text-[16px] text-center text-gray-600 mb-[12px] line-clamp-2 min-h-[40px]">
                                        {product.description || 'Sin descripción'}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}