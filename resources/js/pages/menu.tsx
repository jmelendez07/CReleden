import CircularGradient from "@/components/landing/circular-gradient";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import CategoriesMenu from "@/components/landing/menu/categories";
import { useLenis } from "@/hooks/useLenis";
import { Category, Product } from "@/types";
import FastFoodBurguerIcon from "@/components/icons/fast-food-burguer";
import FastFoodSandwichIcon from "@/components/icons/fast-food-sandwich";
import ProductList from "@/components/landing/menu/product-list";
import Whatsapp from "@/components/landing/whatsapp";

interface MenuProps {
    categories: Category[];
    products: Product[];
    selectedCategoryId?: number;
}

export default function Menu({ categories, products, selectedCategoryId }: MenuProps) {

    useLenis();

    const selectedCategory = (): Category | undefined => {
        if (!selectedCategoryId) return undefined;
        return categories.find(c => c.id.toString() === selectedCategoryId.toString());
    }

    return (
        <main className="w-full bg-[#F8B78D]/10 min-h-screen grid grid-cols-1 place-content-start relative pt-[40px] overflow-x-hidden">
            <CircularGradient className='absolute z-0 size-[46.25vw] -top-[105px] -left-[228px] px-[80px]' />
            <FastFoodBurguerIcon 
                className="absolute left-[3%] top-[180px] -rotate-30 z-0"
                width="200px"
                height="200px"
                fill="#F8B78D"
            />
            <FastFoodSandwichIcon 
                className="absolute left-[85%] top-[350px] opacity-60 rotate-10 z-0"
                width="200px"
                height="200px"
                fill="#F8B78D"
            />
            <Header className='mb-[44px] z-1 px-[80px]' />
            <CategoriesMenu categories={categories} className="z-1 mb-[80px]" />
            <ProductList products={products} selectedCategory={selectedCategory} />
            <Footer />
            <Whatsapp />
        </main>
    );
}