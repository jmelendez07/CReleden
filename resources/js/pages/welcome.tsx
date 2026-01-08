import Hero from '@/components/landing/hero';
import Header from '@/components/landing/header';
import { Category, Product } from '@/types';
import Navbar from '@/components/landing/navbar';
import CircularGradient from '@/components/landing/circular-gradient';
import Footer from '@/components/landing/footer';
import HeroBestFoods from '@/components/landing/hero-best-foods';
import Aside from '@/components/landing/aside';
import Feedback from '@/components/landing/feedback';
import { useLenis } from '@/hooks/useLenis';
import FastFoodBurguerIcon from '@/components/icons/fast-food-burguer';
import FastFoodFrenchIcon from '@/components/icons/fast-food-french';
import FastFoodHotDogIcon from '@/components/icons/fast-food-hot-dog';
import FastFoodHotDog2Icon from '@/components/icons/fast-food-hot-dog-2';
import FastFoodPizzaIcon from '@/components/icons/fast-food-pizza';
import FastFoodSandwichIcon from '@/components/icons/fast-food-sandwich';
import FastFoodSteakIcon from '@/components/icons/fast-food-steak';
import FastFoodTacoIcon from '@/components/icons/fast-food-taco';
import Whatsapp from '@/components/landing/whatsapp';

interface WelcomeProps {
    canRegister?: boolean;
    categories: Category[];
    topProducts: Product[];
}

export default function Welcome({
    canRegister = true,
    categories,
    topProducts
}: WelcomeProps) {
    useLenis();
    
    return (
        <main className="w-full bg-[#F8B78D]/10 min-h-screen grid grid-cols-1 place-content-start relative pt-[40px]">
            <CircularGradient className='absolute z-0 size-[46.25vw] -top-[105px] -left-[228px] px-[80px]' />
            <div className="absolute z-0 grid grid-cols-1 grid-rows-1 w-full h-full overflow-hidden">
                <div className="relative">
                    <FastFoodBurguerIcon
                        className="absolute left-[28%] top-[50px] opacity-90 z-0 -rotate-25 pointer-events-none"
                        width="215px"
                        height="215px"
                        fill="#F8B78D"
                    />
                    <FastFoodFrenchIcon 
                        className="absolute left-[25%] top-[600px] opacity-90 z-0 rotate-12 pointer-events-none"
                        width="200px"
                        height="200px"
                        fill="#F8B78D"
                    />
                    <FastFoodPizzaIcon 
                        className="absolute left-[80%] top-[1100px] opacity-100 z-0 -rotate-20 pointer-events-none"
                        width="210px"
                        height="210px"
                        fill="#F8B78D"
                    />
                    <FastFoodTacoIcon 
                        className="absolute left-[3%] top-[1300px] opacity-95 z-0 rotate-30 pointer-events-none"
                        width="220px"
                        height="220px"
                        fill="#F8B78D"
                        color="#F8B78D"
                    />
                    <FastFoodHotDogIcon 
                        className="absolute left-[80%] top-[2000px] opacity-90 z-0 -rotate-15 pointer-events-none"
                        width="200px"
                        height="200px"
                        fill="#F8B78D"
                    />
                    <FastFoodSandwichIcon 
                        className="absolute left-[7%] top-[2200px] opacity-100 z-0 rotate-25 pointer-events-none"
                        width="205px"
                        height="205px"
                        fill="#F8B78D"
                    />
                    <FastFoodSteakIcon
                        className="absolute left-[90%] top-[2700px] opacity-95 z-0 -rotate-10 pointer-events-none"
                        width="195px"
                        height="195px"
                        fill="#F8B78D"
                    />
                    <FastFoodHotDog2Icon 
                        className="absolute left-[50%] top-[3750px] opacity-100 z-0 -rotate-25 pointer-events-none"
                        width="200px"
                        height="200px"
                        fill="#F8B78D"
                    />
                </div>
            </div>
            <Header className='mb-[44px] z-1 px-[80px]' />
            <Hero className='mb-[86px] relative z-0 px-[80px] max-w-full' />
            <Navbar categories={categories} className='mb-[80px] z-1 relative px-[80px]' />
            <Aside className='px-[80px] mb-[80px] z-1' />
            <HeroBestFoods topProducts={topProducts} className='mb-[56px] z-1 px-[80px]' />
            <Feedback className='mb-[56px] px-[80px]' />
            <Footer />
            <Whatsapp />
        </main>
    );
}
