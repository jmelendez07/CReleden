import AppLayout from "@/layouts/app-layout";
import { Category } from "@/types";
import { useForm, router } from "@inertiajs/react";
import { ImagePlus, Plus, Search, Trash2 } from "lucide-react";
import { store, destroy } from "@/routes/dashboard/categories";
import { FormEventHandler, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function CategoryIndex({ categories, filters }: { categories: Category[], filters: { search: string } }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [search, setSearch] = useState(filters?.search || '');

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.get(
            window.location.pathname,
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, 500);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(store.url(), {
            forceFormData: true,
            onSuccess: () => {
                setData({ name: '', description: '', image: null });
                setImagePreview(null);
            },
        });
    };

    const handleDelete = (category: Category) => {
        if (confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
            router.delete(destroy.url({ category: category.id }));
        }
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-1 gap-[40px] px-[40px] py-[30px]">
                <div className="grid grid-cols-[1fr_auto] place-content-start place-items-start">
                    <div className="block">
                        <h2 className="nunito-bold text-[30px]">Tus Categorías</h2>
                        <p className="nunito-medium text-[#5C5C5C] text-[20px]">
                            Administra y organiza las categorías de productos de tu restaurante
                        </p>
                    </div>
                    <div className="relative">
                        <input 
                            type="search"
                            placeholder="¿Que quieres buscar hoy?"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                            className="nunito bg-white w-sm font-semibold max-w-sm pl-[48px] pr-[18px] py-[14px] text-[18px] rounded-[16px] border border-gray-200 focus:outline-[#FCDBB2]"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-[40px]">
                    <form onSubmit={submit} className="relative border-2 border-dashed rounded-[16px] py-[16px]">
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label 
                            htmlFor="image-upload" 
                            className="w-full flex flex-col items-center justify-center mb-[20px] cursor-pointer"
                        >
                            {imagePreview ? (
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="h-[140px] object-cover rounded-[8px]"
                                />
                            ) : (
                                <ImagePlus className="text-gray-400 size-[140px]" />
                            )}
                            {errors.image && (
                                <span className="text-red-500 text-xs mt-2 text-center nunito">{errors.image}</span>
                            )}
                        </label>
                        <div className="px-[20px] flex flex-col items-center gap-1">
                            <div className="w-full">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Nombre"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    className={`nunito-bold text-[24px] text-center focus:ring-0 focus:outline-none w-full ${errors.name ? 'border-b-2 border-red-500' : ''}`}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs block text-center nunito mt-1">{errors.name}</span>
                                )}
                            </div>
                            <div className="w-full">
                                <input 
                                    type="text"
                                    name="description" 
                                    placeholder="Descripción"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className={`nunito font-medium text-[18px] text-gray-600 text-center focus:ring-0 focus:outline-none w-full ${errors.description ? 'border-b-2 border-red-500' : ''}`}
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-xs block text-center nunito mt-1">{errors.description}</span>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-[#F03328] rounded-[8px] size-9 flex items-center justify-center absolute top-2 right-2 disabled:opacity-50"
                        >
                            <Plus className="text-white size-7" />
                        </button>
                    </form>
                    {categories.map((category, index) => (
                        <div key={index} className="relative rounded-[16px] overflow-hidden">
                            <div className="w-full flex items-center justify-center">
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="h-[200px] object-cover"
                                />
                            </div>
                            <div className="px-[20px] flex flex-col items-center">
                                <h6 className="nunito-bold text-[24px]">{category.name}</h6>
                                <p className="nunito font-medium text-[18px] text-gray-600">{category.description}</p>
                            </div>
                            <div 
                                onClick={() => handleDelete(category)}
                                className="absolute cursor-pointer opacity-0 hover:opacity-100 bg-gray-100/60 inset-0 flex items-center justify-center transition-opacity"
                            >
                                <Trash2 className="text-[#F03328] size-14" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}