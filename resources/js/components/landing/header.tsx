import { login } from '@/routes';
import { Link } from '@inertiajs/react';

export default function Header({ className = '' }: { className?: string }) {
    return (
        <nav className={`w-full flex items-center justify-between ${className}`}>
            <div className="flex items-center gap-5">
                <img 
                    src="/images/logo.jpg" 
                    alt="Logo el edén"
                    className="size-[50px] rounded-[10px] object-cover"
                />
                <h2 className="text-[#F03328] text-[50px] cookie-regular tracking-[3px] mt-[5px]">El Edén</h2>
            </div>
            <div className="flex items-center gap-[79px]">
                <Link 
                    className="nunito-medium text-[20px] text-[#3A3A3A] hover:text-[#F03328] underline-0 hover:underline hover:underline-offset-10 decoration-[#F03328]"
                    href=""
                >
                    Inicio
                </Link>
                <Link 
                    className="nunito-medium text-[20px] text-[#3A3A3A] hover:text-[#F03328] underline-0 hover:underline hover:underline-offset-10 decoration-[#F03328]"
                    href=""
                >
                    Nuestro Menú
                </Link>
                <a 
                    className="nunito-medium text-[20px] text-[#3A3A3A] hover:text-[#F03328] underline-0 hover:underline hover:underline-offset-10 decoration-[#F03328]"
                    href='https://wa.me/573246399328'
                    target='_blank'
                >
                    Contáctanos
                </a>
                <Link 
                    className="nunito font-extrabold text-[20px] text-[#F03328] py-[12px] px-[43px] border-[2px] border-[#F03328] rounded-[38px]"
                    href={login()}
                >
                    Acceder
                </Link>
            </div>
        </nav>
    );
}