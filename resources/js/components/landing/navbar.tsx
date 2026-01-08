import { Category } from "@/types";
import { Link } from "@inertiajs/react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { menu } from "@/routes";

interface NavbarProps {
    className?: string;
    categories: Category[];
}

export default function Navbar({ className = '', categories }: NavbarProps) {
    return (
        <nav className={`grid relative grid-cols-1 ${className}`}>
            <Carousel 
                plugins={[
                    Autoplay({
                        delay: 2000
                    })
                ]}
                className="w-full relative"
            >
                <CarouselContent className="-ml-[24px] mb-[10px]">
                    {categories.map((category) => (
                        <CarouselItem key={category.id} className="pl-[24px] basis-1/4">
                            <Link
                                href={menu.url({ query: { categoryId: category.id } })}
                                className="bg-white rounded-[20px] flex flex-col items-center justify-start py-[22px] shadow-md"
                            >
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="mb-[12px] h-[100px] 2xl:h-[140px] w-auto object-cover rounded-[10px]" 
                                />
                                <h3 className="nunito-semibold text-[30px] w-full text-center mb-[10px]">
                                    {category.name}
                                </h3>
                                <p className="w-full text-center px-[10px] text-[#666666] nunito-medium text-[18px]">
                                    {category.description}
                                </p>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </nav>
    );
}