import InputError from '@/components/input-error';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import { store } from '@/routes/login';
import { Form, Link } from '@inertiajs/react';
import CircularGradient from '@/components/landing/circular-gradient';
import FastFoodPizzaIcon from '@/components/icons/fast-food-pizza';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

const carrouselItems = [
    {
        img: '/images/carrousel-item-1.jpg',
    },
    {
        img: '/images/carrousel-item-2.jpg',
    },
    {
        img: '/images/carrousel-item-3.jpg',
    }
];

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {    
    return (
        <main className='bg-[#F8B78D]/10 relative overflow-x-hidden w-screen h-screen grid grid-cols-2 grid-rows-1'>
            <CircularGradient className='absolute z-0 size-[46.25vw] -top-[305px] -right-[228px] px-[80px]' />
            <FastFoodPizzaIcon 
                className="absolute left-[52%] top-[540px] opacity-100 z-0 -rotate-20 pointer-events-none"
                width="210px"
                height="210px"
                fill="#F8B78D"
            />
            <div className="z-2">
                <Carousel 
                    className='w-full h-full'
                    plugins={[
                        Autoplay({
                            delay: 2000
                        })
                    ]}
                >
                    <CarouselContent className='-ml-0'>
                        {carrouselItems.map((item, index) => (
                            <CarouselItem key={index} className='pl-0'>
                                <img 
                                    src={item.img} 
                                    alt={item.img}
                                    className='object-cover w-full h-screen'
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <Form 
                {...store.form()}
                resetOnSuccess={['password']}
                resetOnError={['password']}
                className="z-2 grid relative grid-cols-1 place-content-center place-items-center px-[80px] py-[40px]"
            >
                {({ processing, errors }) => (
                    <>
                        <Link
                            href={home()}
                        >
                            <img 
                                src="/images/logo.jpg" 
                                alt="Logo el edén"
                                className="absolute top-[20px] left-[20px] size-[50px] rounded-[10px] object-cover"
                            />
                        </Link>
                        <Link
                            href={home()}
                        >
                            <h1 className="text-[#F03328] text-[100px] cookie-regular tracking-[3px] mt-[5px]">El Edén</h1>
                        </Link>
                        <h2 className='nunito-bold text-[50px] text-center leading-12'>Bienvenido de nuevo</h2>
                        <p className='nunito text-[#5C5C5C] text-[30px] text-center mb-[30px]'>Inicia sesión en tu cuenta</p>
                        <div className="grid gap-2 mb-[24px]">
                            <input 
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                className='bg-white w-md max-w-md px-[18px] py-[14px] text-[18px] rounded-[16px] border border-[#8B8B8B] focus:outline-[#FCDBB2]'
                                placeholder='Correo Electronico'
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                className='bg-white w-md max-w-md px-[18px] py-[14px] text-[18px] rounded-[16px] border border-[#8B8B8B] focus:outline-[#FCDBB2]'
                                placeholder='Contraseña'
                            />
                            <InputError message={errors.password} />
                        </div>
                        <button
                            type="submit"
                            className="max-w-md flex items-center justify-center gap-2 cursor-pointer nunito font-extrabold text-[20px] text-[#F03328] !py-[12px] !px-[43px] border-[2px] border-[#F03328] hover:bg-[#F03328] hover:text-white rounded-[38px] mt-[40px] w-full"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            Iniciar Sesión
                            {processing && <Spinner className='size-5' />}
                        </button>  
                    </>
                )}
            </Form>
        </main>
    );
}
