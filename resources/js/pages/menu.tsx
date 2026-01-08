import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import CategoriesMenu from "@/components/landing/menu/categories";
import { useLenis } from "@/hooks/useLenis";
import { Category, Product } from "@/types";

interface MenuProps {
    categories: Category[];
    products: Product[];
    selectedCategoryId?: number;
}

export default function Menu({ categories, products, selectedCategoryId }: MenuProps) {

    const lenisRef = useLenis();

    const selectedCategory = (): Category | undefined => {
        if (!selectedCategoryId) return undefined;
        return categories.find(c => c.id.toString() === selectedCategoryId.toString());
    }

    const scrollToTop = () => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { duration: 1.5 });
        }
    };

    return (
        <main className="w-full bg-[#F8B78D]/10 min-h-screen grid grid-cols-1 place-content-start relative pt-[40px]">
            <Header className='mb-[44px] z-1 px-[80px]' />
            <CategoriesMenu categories={categories} className="mb-[80px]" />
            <div className="px-[100px]">
                <div className="flex items-center justify-start gap-[12px]">
                    {selectedCategory() && (
                        <img 
                            src={selectedCategory()?.image ?? ""} 
                            alt={selectedCategory()?.name ?? ""} 
                            className="h-[80px] w-auto object-cover"
                        />
                    )}
                    <h1 className="text-[70px] nunito font-extrabold">{selectedCategory()?.name ?? 'Nuestro Menú'}</h1>
                </div>
                <p className="nunito-medium text-[24px] text-[#666666] mt-[20px] mb-[40px] max-w-8xl">
                    {selectedCategory() 
                        ? `Descubre nuestra selección de ${selectedCategory()?.name.toLowerCase()}. Cada platillo preparado con ingredientes frescos y el sabor auténtico que nos caracteriza. ¡Déjate tentar por lo mejor!`
                        : 'Explora nuestro delicioso menú lleno de sabor y tradición. Desde hamburguesas jugosas hasta perros calientes irresistibles, cada platillo está preparado con ingredientes frescos y mucho amor. ¡Encuentra tu favorito y disfruta de una experiencia única!'
                    }
                </p>
                <div className="grid grid-cols-1 px-[100px] divide-y divide-red-200 divide-dashed gap-[40px] mb-[40px]">
                    {products.map(product => (
                        <div 
                            key={product.id} 
                            className="grid grid-cols-[auto_1fr] gap-[40px] pb-[40px]"
                        >
                            <div className="w-[340px] overflow-hidden rounded-[20px] flex items-center justify-center">
                                <img
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-[auto] object-contain h-[280px]"
                                />
                            </div>
                            <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] place-content-start">
                                <h3 className="nunito-bold text-[26px] leading-8">{product.name}</h3>
                                <p className="nunito text-[18px] text-gray-600 mb-[10px]">{product.description}</p>
                                {product.ingredients && product.ingredients.length > 0 ? (
                                    <div className="grid grid-cols-[auto_1fr] gap-[50px] mb-[14px]">
                                        <p className="nunito-medium text-[18px]">Ingredientes:</p>
                                        <ul className="list-disc list-inside nunito text-[16px]">
                                            {product.ingredients.map(ingredient => (
                                                <li key={ingredient.id}>
                                                    {ingredient.name} 
                                                    <span className="ml-[10px] nunito-bold">
                                                        {ingredient.pivot?.quantity_needed}{" "}
                                                        {ingredient.unit_of_measurement}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ): (
                                    <div className="h-full"></div>
                                )}
                                <div className="flex items-center justify-between w-full">
                                    <a 
                                        href="https://wa.me/573246399328"
                                        target="_blank"
                                        className="cursor-pointer nunito font-extrabold text-[18px] text-[white] py-[12px] px-[36px] bg-[#F03328] rounded-[38px]"
                                    >
                                        Ordenar Ahora!
                                    </a>
                                    <p className="nunito text-[20px]">
                                        De 
                                        <span className="nunito-bold text-[30px] ml-[10px]">
                                            {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}