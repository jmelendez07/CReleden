import { menu } from "@/routes";
import { Category } from "@/types";
import { Link } from "@inertiajs/react";

interface CategoriesMenuProps {
    className?: string;
    categories: Category[];
}

export default function CategoriesMenu({ className = '', categories }: CategoriesMenuProps) {
    return (
        <div className={`flex flex-row flex-wrap justify-center gap-[20px] ${className}`}>
            <Link
                href={menu()}
                className="basis-1/6 grid grid-cols-[auto_1fr] items-center px-[20px]"
            >
                <div className="size-[40px]"></div>
                <p className="nunito-medium text-[18px] text-center">Menú Completo</p>
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={menu.url({ query: { categoryId: category.id } })}
                    className="basis-1/6 grid grid-cols-[auto_1fr] items-center px-[20px]"
                >
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-[40px] h-auto object-cover"
                    />
                    <p className="nunito-medium text-[18px] text-center">{category.name}</p>
                </Link>
            ))}
        </div>
    );
}