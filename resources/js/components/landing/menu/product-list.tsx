import { Category, Product } from "@/types";
import FastFoodSteakIcon from "@/components/icons/fast-food-steak";
import FastFoodTacoIcon from "@/components/icons/fast-food-taco";
import FastFoodFrenchIcon from "@/components/icons/fast-food-french";
import FastFoodHotDogIcon from "@/components/icons/fast-food-hot-dog";
import FastFoodHotDog2Icon from "@/components/icons/fast-food-hot-dog-2";
import FastFoodPizzaIcon from "@/components/icons/fast-food-pizza";
import FastFoodBurguerIcon from "@/components/icons/fast-food-burguer";
import CircularGradient from "../circular-gradient";
import { whatsappUrl } from "@/lib/utils";

interface ProductListProps {
    products: Product[];
    selectedCategory: () => Category | undefined;
}

export default function ProductList({ products, selectedCategory }: ProductListProps) {
    return (
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
            <div className="grid grid-cols-1 gap-[40px] mb-[40px] relative">
                {products.map((product, index) => {
                    const icons = [
                        { Icon: FastFoodPizzaIcon, left: '-8%', opacity: 'opacity-85', width: '200px', rotation: 'rotate-12' },
                        { Icon: FastFoodHotDogIcon, left: '88%', opacity: 'opacity-100', width: '210px', rotation: '-rotate-20' },
                        { Icon: FastFoodTacoIcon, left: '-5%', opacity: 'opacity-100', width: '230px', rotation: 'rotate-30' },
                        { Icon: FastFoodFrenchIcon, left: '90%', opacity: 'opacity-90', width: '195px', rotation: '-rotate-15' },
                        { Icon: FastFoodSteakIcon, left: '30%', opacity: 'opacity-100', width: '225px', rotation: 'rotate-25' },
                        { Icon: FastFoodHotDog2Icon, left: '87%', opacity: 'opacity-90', width: '180px', rotation: '-rotate-10' },
                        { Icon: FastFoodBurguerIcon, left: '-10%', opacity: 'opacity-85', width: '190px', rotation: 'rotate-35' },
                        { Icon: FastFoodPizzaIcon, left: '92%', opacity: 'opacity-100', width: '190px', rotation: '-rotate-25' },
                    ];
                    const iconData = icons[index % icons.length];
                    
                    return (
                        <div key={product.id} className="relative">
                            <iconData.Icon 
                                className={`absolute z-0 pointer-events-none ${iconData.opacity} ${iconData.rotation}`}
                                style={{ left: iconData.left, top: '50%', transform: `translateY(-50%)` }}
                                width={iconData.width}
                                height={iconData.width}
                                fill="#F8B78D"
                                color="#F8B78D"
                            />
                            <div 
                                className="grid px-[100px] z-1 border-b border-dashed border-b-red-200 grid-cols-[auto_1fr] gap-[40px] pb-[40px] relative"
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
                                        href={whatsappUrl()}
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
                            {(index + 1) % 2 === 0 && index < products.length - 1 && index < 3 && (
                                <CircularGradient 
                                    className={`absolute z-0 size-[30vw] pointer-events-none ${
                                        Math.floor(index / 2) % 2 === 0 ? '-left-[150px]' : '-right-[150px]'
                                    }`}
                                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}