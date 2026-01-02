import { Link } from '@inertiajs/react';
import CircularGradient from './circular-gradient';

export default function Hero({ className = '' }: { className?: string }) {
    return (
        <article className={`w-full grid h-full grid-cols-[45%_55%] items-center gap-[36px] ${className}`}>
            <div className="flex flex-col justify-center items-start h-full">
                <div className="flex items-center gap-[10px] mb-[15px]">
                    <h2 className='nunito-bold text-[61px] 2xl:text-[75px] 2xl:!font-extrabold text-[#2D2D2D]'>Come y</h2>
                    <div className="-rotate-12 flex items-center justify-center py-[5px] px-[40px] rounded-[54px] bg-gradient-to-r from-[#DB4A58] to-[#F03328]">
                        <h2 className='cookie-regular text-[58px] 2xl:text-[70px] text-white'>Disfruta</h2>
                    </div>
                </div>
                <h1 className='nunito-bold text-[61px] 2xl:text-[75px] 2xl:!font-extrabold text-[#2D2D2D]'>El verdadero Edén</h1>
                <p className="text-[#666666] mb-[37px] text-[25px] nunito-regular">
                    El Edén es donde el antojo manda. Comidas rápidas irresistibles, porciones generosas y ese sabor que te hace volver. Buen parche, buena comida y pura gozadera.
                </p>
                <Link 
                    href="#"
                    className='nunito font-extrabold text-[20px] text-[white] py-[15.5px] px-[43px] bg-[#F03328] rounded-[38px]'
                >
                    Ordena Ahora!
                </Link>
            </div>
            <div className="relative flex items-end justify-end">
                <button 
                    type='button'
                    className='absolute z-1 left-0 top-0 text-white bg-[#F03328] rounded-[38px] px-[43px] py-[12px] nunito font-[900] text-[34.65px]'
                >
                    $23.000
                </button>
                <div className="relative bg-[#F03328] size-[36.8vw] mt-[20px] mr-[40px] rounded-full">
                    <CircularGradient className="absolute -z-1 size-[55vw] top-1/2 left-1/2 -translate-x-[calc(50%+40px)] -translate-y-1/2" />
                </div>
                <img 
                    style={{ width: '43vw', height: 'auto' }}
                    className='absolute top-[22px] left-[22px]'
                    src="/images/burguer-hero.png"
                    alt="Imagen de una hamburguesa" 
                />
            </div>
        </article>
    );
}