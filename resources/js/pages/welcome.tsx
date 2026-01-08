import Hero from '@/components/landing/hero';
import Header from '@/components/landing/header';
import { Category, Product } from '@/types';
import Navbar from '@/components/landing/navbar';
import CircularGradient from '@/components/landing/circular-gradient';
import Footer from '@/components/landing/footer';
import HeroBestFoods from '@/components/landing/hero-best-foods';
import WhatsappIcon from '@/components/landing/whatsapp-icon';
import Aside from '@/components/landing/aside';
import Feedback from '@/components/landing/feedback';
import { useLenis } from '@/hooks/useLenis';

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
            <Header className='mb-[44px] z-1 px-[80px]' />
            <Hero className='mb-[86px] relative z-0 px-[80px] max-w-full' />
            <Navbar categories={categories} className='mb-[80px] z-1 relative px-[80px]' />
            <Aside className='px-[80px] mb-[80px]' />
            <HeroBestFoods topProducts={topProducts} className='mb-[56px] z-1 px-[80px]' />
            <Feedback className='mb-[56px] px-[80px]' />
            <Footer />
            <a 
                className="fixed z-5 bg-[#51c85d] flex justify-center items-center bottom-10 right-10 size-18 rounded-full bg-[]"
                href='https://wa.me/573246399328'
                target='_blank'
            >
                <WhatsappIcon className='size-8' />
            </a>
        </main>
    );
}
