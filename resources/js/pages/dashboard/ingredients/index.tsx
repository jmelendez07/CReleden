import AppLayout from "@/layouts/app-layout";
import { Ingredient } from "@/types";
import { useForm, router } from "@inertiajs/react";
import { Plus, Search, Trash2, Edit2, Package } from "lucide-react";
import { store, destroy, update } from "@/routes/dashboard/ingredients";
import { FormEventHandler, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function IngredientIndex({ ingredients, filters }: { ingredients: Ingredient[], filters: { search: string } }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: null as number | null,
        name: '',
        unit_of_measurement: '',
        unit_price: '',
        supplier: '',
        current_stock: '',
    });

    const [search, setSearch] = useState(filters?.search || '');
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing && data.id) {
            put(update.url({ ingredient: data.id }), {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                },
            });
        } else {
            post(store.url(), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleEdit = (ingredient: Ingredient) => {
        setData({
            id: ingredient.id,
            name: ingredient.name,
            unit_of_measurement: ingredient.unit_of_measurement,
            unit_price: ingredient.unit_price.toString(),
            supplier: ingredient.supplier || '',
            current_stock: ingredient.current_stock.toString(),
        });
        setIsEditing(true);
        
        // Scroll al formulario
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleCancelEdit = () => {
        reset();
        setIsEditing(false);
    };

    const handleDelete = (ingredient: Ingredient) => {
        if (confirm(`¿Estás seguro de eliminar el ingrediente "${ingredient.name}"?`)) {
            router.delete(destroy.url({ ingredient: ingredient.id }));
        }
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-1 gap-[40px] px-[40px] py-[30px]">
                <div className="grid grid-cols-[1fr_auto] place-content-start place-items-start">
                    <div className="block">
                        <h2 className="nunito-bold text-[30px]">Tus Ingredientes</h2>
                        <p className="nunito-medium text-[#5C5C5C] text-[20px]">
                            Gestiona el inventario de ingredientes de tu restaurante
                        </p>
                    </div>
                    <div className="relative">
                        <input 
                            type="search"
                            placeholder="¿Qué ingrediente buscas?"
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

                {/* Formulario de Creación/Edición */}
                <form ref={formRef} onSubmit={submit} className="bg-white rounded-[16px] border-2 border-dashed p-[24px]">
                    <h3 className="nunito-bold text-[24px] mb-[20px] flex items-center gap-2">
                        <Package className="size-6 text-[#F03328]" />
                        {isEditing ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
                    </h3>
                    <div className="grid grid-cols-5 gap-[16px]">
                        <div className="flex flex-col">
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Nombre"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                className={`nunito font-semibold text-[16px] px-[16px] py-[12px] rounded-[8px] border focus:ring-0 focus:outline-[#FCDBB2] ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs nunito mt-1">{errors.name}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="text"
                                name="unit_of_measurement" 
                                placeholder="Unidad (kg, lt, und)"
                                value={data.unit_of_measurement}
                                onChange={e => setData('unit_of_measurement', e.target.value)}
                                required
                                className={`nunito font-semibold text-[16px] px-[16px] py-[12px] rounded-[8px] border focus:ring-0 focus:outline-[#FCDBB2] ${errors.unit_of_measurement ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.unit_of_measurement && (
                                <span className="text-red-500 text-xs nunito mt-1">{errors.unit_of_measurement}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="number"
                                step="0.01"
                                name="unit_price" 
                                placeholder="Precio por unidad"
                                value={data.unit_price}
                                onChange={e => setData('unit_price', e.target.value)}
                                required
                                className={`nunito font-semibold text-[16px] px-[16px] py-[12px] rounded-[8px] border focus:ring-0 focus:outline-[#FCDBB2] ${errors.unit_price ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.unit_price && (
                                <span className="text-red-500 text-xs nunito mt-1">{errors.unit_price}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="text"
                                name="supplier" 
                                placeholder="Proveedor"
                                value={data.supplier}
                                onChange={e => setData('supplier', e.target.value)}
                                className={`nunito font-semibold text-[16px] px-[16px] py-[12px] rounded-[8px] border focus:ring-0 focus:outline-[#FCDBB2] ${errors.supplier ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.supplier && (
                                <span className="text-red-500 text-xs nunito mt-1">{errors.supplier}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input 
                                type="number"
                                step="0.01"
                                name="current_stock" 
                                placeholder="Stock actual"
                                value={data.current_stock}
                                onChange={e => setData('current_stock', e.target.value)}
                                required
                                className={`nunito font-semibold text-[16px] px-[16px] py-[12px] rounded-[8px] border focus:ring-0 focus:outline-[#FCDBB2] ${errors.current_stock ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.current_stock && (
                                <span className="text-red-500 text-xs nunito mt-1">{errors.current_stock}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-[12px] mt-[20px]">
                        <button
                            type="submit"
                            disabled={processing}
                            className="nunito-semibold bg-[#F03328] text-white px-[24px] py-[12px] rounded-[8px] flex items-center gap-2 hover:bg-[#d92b21] disabled:opacity-50 transition-colors"
                        >
                            <Plus className="size-5" />
                            {isEditing ? 'Actualizar' : 'Agregar'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="nunito-semibold bg-gray-300 text-gray-700 px-[24px] py-[12px] rounded-[8px] hover:bg-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                {/* Tabla de Ingredientes */}
                <div className="bg-white rounded-[16px] overflow-hidden border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px] text-gray-700">Nombre</th>
                                <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px] text-gray-700">Unidad</th>
                                <th className="nunito-bold text-right px-[24px] py-[16px] text-[16px] text-gray-700">Precio Unitario</th>
                                <th className="nunito-bold text-left px-[24px] py-[16px] text-[16px] text-gray-700">Proveedor</th>
                                <th className="nunito-bold text-right px-[24px] py-[16px] text-[16px] text-gray-700">Stock</th>
                                <th className="nunito-bold text-center px-[24px] py-[16px] text-[16px] text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-[40px]">
                                        <Package className="size-16 mx-auto text-gray-300 mb-[16px]" />
                                        <p className="nunito-medium text-gray-500 text-[18px]">
                                            No hay ingredientes registrados
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                ingredients.map((ingredient) => (
                                    <tr key={ingredient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="nunito-semibold px-[24px] py-[16px] text-[16px]">{ingredient.name}</td>
                                        <td className="nunito px-[24px] py-[16px] text-[16px] text-gray-600">{ingredient.unit_of_measurement}</td>
                                        <td className="nunito-semibold px-[24px] py-[16px] text-[16px] text-right text-[#F03328]">
                                            ${ingredient.unit_price}
                                        </td>
                                        <td className="nunito px-[24px] py-[16px] text-[16px] text-gray-600">
                                            {ingredient.supplier || '-'}
                                        </td>
                                        <td className="nunito-semibold px-[24px] py-[16px] text-[16px] text-right">
                                            {ingredient.current_stock}
                                        </td>
                                        <td className="px-[24px] py-[16px]">
                                            <div className="flex items-center justify-center gap-[8px]">
                                                <button
                                                    onClick={() => handleEdit(ingredient)}
                                                    className="cursor-pointer p-[8px] rounded-[8px] hover:bg-blue-50 transition-colors group"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="size-5 text-blue-500 group-hover:text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ingredient)}
                                                    className="cursor-pointer p-[8px] rounded-[8px] hover:bg-red-50 transition-colors group"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="size-5 text-[#F03328] group-hover:text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}