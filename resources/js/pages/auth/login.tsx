import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import CircularGradient from '@/components/landing/circular-gradient';

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
    // return (
    //     <AuthLayout
    //         title="Log in to your account"
    //         description="Enter your email and password below to log in"
    //     >
    //         <Head title="Log in" />

    //         <Form
    //             {...store.form()}
    //             resetOnSuccess={['password']}
    //             className="flex flex-col gap-6"
    //         >
    //             {({ processing, errors }) => (
    //                 <>
    //                     <div className="grid gap-6">
    //                         <div className="grid gap-2">
    //                             <Label htmlFor="email">Email address</Label>
    //                             <Input
    //                                 id="email"
    //                                 type="email"
    //                                 name="email"
    //                                 required
    //                                 autoFocus
    //                                 tabIndex={1}
    //                                 autoComplete="email"
    //                                 placeholder="email@example.com"
    //                             />
    //                             <InputError message={errors.email} />
    //                         </div>

    //                         <div className="grid gap-2">
    //                             <div className="flex items-center">
    //                                 <Label htmlFor="password">Password</Label>
    //                                 {canResetPassword && (
    //                                     <TextLink
    //                                         href={request()}
    //                                         className="ml-auto text-sm"
    //                                         tabIndex={5}
    //                                     >
    //                                         Forgot password?
    //                                     </TextLink>
    //                                 )}
    //                             </div>
    //                             <Input
    //                                 id="password"
    //                                 type="password"
    //                                 name="password"
    //                                 required
    //                                 tabIndex={2}
    //                                 autoComplete="current-password"
    //                                 placeholder="Password"
    //                             />
    //                             <InputError message={errors.password} />
    //                         </div>

    //                         <div className="flex items-center space-x-3">
    //                             <Checkbox
    //                                 id="remember"
    //                                 name="remember"
    //                                 tabIndex={3}
    //                             />
    //                             <Label htmlFor="remember">Remember me</Label>
    //                         </div>

    //                         <Button
    //                             type="submit"
    //                             className="mt-4 w-full"
    //                             tabIndex={4}
    //                             disabled={processing}
    //                             data-test="login-button"
    //                         >
    //                             {processing && <Spinner />}
    //                             Log in
    //                         </Button>
    //                     </div>

    //                     {canRegister && (
    //                         <div className="text-center text-sm text-muted-foreground">
    //                             Don't have an account?{' '}
    //                             <TextLink href={register()} tabIndex={5}>
    //                                 Sign up
    //                             </TextLink>
    //                         </div>
    //                     )}
    //                 </>
    //             )}
    //         </Form>

    //         {status && (
    //             <div className="mb-4 text-center text-sm font-medium text-green-600">
    //                 {status}
    //             </div>
    //         )}
    //     </AuthLayout>
    // );
    
    return (
        <main className='relative overflow-x-hidden w-screen h-screen grid grid-cols-2 grid-rows-1'>
            <CircularGradient className='absolute z-0 size-[46.25vw] -top-[305px] -right-[228px] px-[80px]' />
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
                            className="max-w-md flex items-center justify-center gap-2 cursor-pointer nunito font-extrabold text-[20px] text-[#F03328] !py-[12px] !px-[43px] border-[2px] border-[#F03328] rounded-[38px] mt-[40px] w-full"
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
