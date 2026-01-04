import AppLayout from "@/layouts/app-layout";
import { Category, Ingredient, Product } from "@/types";
import { useForm, Link, router } from "@inertiajs/react";
import { ImagePlus, X } from "lucide-react";
import { update, index } from "@/routes/dashboard/products";
import { FormEventHandler, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductEditProps {
    product: Product;
    categories: Category[];
    ingredients: Ingredient[];
}

export default function ProductEdit({ product, categories, ingredients }: ProductEditProps) {
    const productIngredients = product.ingredients?.map(ing => ({
        ingredient_id: ing.id,
        quantity: parseFloat(ing.pivot?.quantity_needed || '1')
    })) || [];

    const { data, setData, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category_id: product.category_id.toString(),
        image: null as File | null,
        ingredients: productIngredients as { ingredient_id: number, quantity: number }[],
    });

    const [imagePreview, setImagePreview] = useState<string | null>(product.image);
    const [selectedIngredients, setSelectedIngredients] = useState<{ ingredient_id: number, quantity: number }[]>(productIngredients);

    const toggleIngredient = (ingredientId: number) => {
        setSelectedIngredients(prev => {
            const exists = prev.find(item => item.ingredient_id === ingredientId);
            const newSelected = exists
                ? prev.filter(item => item.ingredient_id !== ingredientId)
                : [...prev, { ingredient_id: ingredientId, quantity: 1 }];
            setData('ingredients', newSelected);
            return newSelected;
        });
    };

    const updateQuantity = (ingredientId: number, quantity: number) => {
        setSelectedIngredients(prev => {
            const newSelected = prev.map(item => 
                item.ingredient_id === ingredientId 
                    ? { ...item, quantity: Math.max(0.01, quantity) }
                    : item
            );
            setData('ingredients', newSelected);
            return newSelected;
        });
    };

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
        router.post(update.url({ product: product.id }), {
            _method: 'put',
            ...data,
        }, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <form onSubmit={submit} className="grid grid-cols-[60%_40%]">
                <div className="p-[30px] h-fit border-r border-gray-200">
                    <input
                        type="file"
                        id="product-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label 
                        htmlFor="product-image" 
                        className="w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[16px] cursor-pointer hover:border-[#F03328] transition-colors bg-gray-50"
                    >
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover rounded-[16px]"
                            />
                        ) : (
                            <div className="flex flex-col items-center">
                                <ImagePlus className="text-gray-400 size-40 mb-[12px]" />
                                <span className="nunito font-semibold text-gray-500 text-[24px]">Click para cambiar imagen</span>
                                <span className="nunito text-gray-400 text-[18px] mt-[8px]">JPG, PNG o WebP</span>
                            </div>
                        )}
                    </label>
                    {errors.image && (
                        <span className="text-red-500 text-sm mt-[12px] block nunito">{errors.image}</span>
                    )}
                </div>
                <div className="relative p-[30px]">
                    <Link
                        href={index.url()}
                        className="absolute top-[20px] left-1/2 bg-red-500 text-white -translate-x-1/2 p-[14px] rounded-full"
                    >
                        <X className="size-6" />
                    </Link>
                    <div className="space-y-[20px] mt-[80px]">
                        <div className="flex flex-col">
                            <label className="nunito-semibold text-[20px] mb-[8px]">
                                Nombre del Producto
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Ej: Hamburguesa Clásica"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                className={`nunito-semibold text-[18px] px-[16px] py-[14px] rounded-[12px] border-2 focus:ring-0 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#FCDBB2]'}`}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm mt-[8px] nunito">{errors.name}</span>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="nunito-semibold text-[20px] mb-[8px]">
                                Descripción
                            </label>
                            <textarea 
                                name="description"
                                placeholder="Describe tu producto, ingredientes y características..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                className={`nunito-semibold text-[18px] px-[16px] py-[14px] rounded-[12px] border-2 focus:ring-0 focus:outline-none resize-none transition-colors ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F03328]'}`}
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm mt-[8px] nunito">{errors.description}</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-[16px]">
                            <div className="flex flex-col">
                                <label className="nunito-semibold text-[18px] mb-[8px]">
                                    Precio
                                </label>
                                <div className="relative">
                                    <span className="absolute left-[16px] top-1/2 -translate-y-1/2 nunito-semibold text-gray-500 text-[16px]">
                                        $
                                    </span>
                                    <input 
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        placeholder="0.00"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        required
                                        className={`nunito-semibold text-[18px] pl-[32px] pr-[16px] py-[14px] rounded-[12px] border-2 focus:ring-0 focus:outline-none w-full transition-colors ${errors.price ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F03328]'}`}
                                    />
                                </div>
                                {errors.price && (
                                    <span className="text-red-500 text-sm mt-[8px] nunito">{errors.price}</span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label className="nunito-semibold text-[18px] mb-[8px]">
                                    Categoría
                                </label>
                                <select 
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    required
                                    className={`nunito-semibold text-[18px] px-[16px] py-[14px] rounded-[12px] border-2 focus:ring-0 focus:outline-none transition-colors ${errors.category_id ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F03328]'}`}
                                >
                                    <option value="">Seleccionar</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <span className="text-red-500 text-sm mt-[8px] nunito">{errors.category_id}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="nunito-semibold text-[20px] mb-[8px]">
                                Ingredientes
                            </label>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2">
                                    {ingredients.map((ingredient) => (
                                        <CarouselItem key={ingredient.id} className="pl-2 basis-auto">
                                            <button
                                                type="button"
                                                onClick={() => toggleIngredient(ingredient.id)}
                                                className={`nunito-semibold text-[18px] px-[16px] py-[8px] rounded-full border-2 transition-all whitespace-nowrap ${
                                                    selectedIngredients.some(item => item.ingredient_id === ingredient.id)
                                                        ? 'bg-[#F03328] border-[#F03328] text-white'
                                                        : 'bg-white border-gray-200 text-gray-700 hover:border-[#F03328] hover:text-[#F03328]'
                                                }`}
                                            >
                                                {ingredient.name}
                                            </button>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious type="button" className="left-0" />
                                <CarouselNext type="button" className="right-0" />
                            </Carousel>
                            {selectedIngredients.length > 0 && (
                                <div className="mt-[16px] flex flex-col gap-[12px]">
                                    <span className="nunito-semibold text-[18px] text-gray-700">Cantidades necesarias:</span>
                                    <div className="grid grid-cols-1 gap-[12px] max-h-[300px] overflow-y-auto pr-[8px]">
                                        {selectedIngredients.map(item => {
                                            const ingredient = ingredients.find(i => i.id === item.ingredient_id);
                                            return ingredient ? (
                                                <div key={item.ingredient_id} className="flex items-center gap-[12px] bg-gray-50 p-[12px] rounded-[12px] border border-gray-200">
                                                    <span className="nunito-semibold text-[15px] flex-1 text-gray-700">
                                                        {ingredient.name}
                                                    </span>
                                                    <div className="flex items-center gap-[8px]">
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0.01"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.ingredient_id, parseFloat(e.target.value))}
                                                            className="nunito-semibold text-[15px] w-[80px] px-[12px] py-[6px] rounded-[8px] border-2 border-gray-200 focus:border-[#F03328] focus:outline-none text-center"
                                                        />
                                                        <span className="nunito text-[14px] text-gray-500 min-w-[60px]">
                                                            {ingredient.unit_of_measurement}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleIngredient(item.ingredient_id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors p-[4px]"
                                                        >
                                                            <X className="size-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex items-center justify-center mt-[40px]">
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer flex-1 w-full max-w-md nunito-semibold bg-[#F03328] text-white px-[24px] py-[16px] rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#d92b21] disabled:opacity-50 transition-colors text-[20px]"
                            >
                                Actualizar Producto
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
