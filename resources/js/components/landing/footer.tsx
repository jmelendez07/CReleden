import { Link } from "@inertiajs/react";
import { Facebook, Instagram } from "lucide-react";

export default function Footer({ className = '' }: { className?: string }) {
    return (
        <footer className="grid grid-cols-1 w-screen">
            <div className="h-[180px] relative z-2">
                <img 
                    className="absolute left-[18.88%] top-[30px]"
                    src="/images/bread.svg"
                />
                <img 
                    className="absolute left-[10.27%] top-[0px]"
                    src="/images/sandwich.svg"
                />
                <img 
                    className="absolute left-[73.2%] top-[20px]"
                    src="/images/hot-dog-footer.svg"
                />
            </div>
            <div className="relative z-1 grid grid-cols-1 place-content-center place-items-center bg-[#FCDBB2] pt-[48px] pb-[84px]">
                <h6 className="nunito-bold text-[50px] text-white text-shadow-sm">
                    Consigue las
                </h6>
                <h5 className="cookie-regular text-[#D91F1F] text-[100px] leading-22">
                    Mejores y Más Sabrosas
                </h5>
                <h6 className="nunito-bold text-[50px] text-white text-shadow-sm mb-[15px]">
                    comidas con alta calidad
                </h6>
                <a
                    href="https://wa.me/573246399328"
                    target="_blank"
                    className="bg-white rounded-[50px] py-[16.5px] px-[34.5px] text-[#DB4A58] nunito-semibold text-[23px]"
                >
                    Ordena Ahora!
                </a>
                <div className="absolute right-[80px] bottom-[20px]">
                    <div className="flex items-center justify-end gap-4 mb-2">
                        <a  
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="bg-white rounded-[5px] grid place-content-center size-10 place-items-center"
                        >
                            <Facebook className="text-[#DB4A58] size-8" />
                        </a>
                        <a 
                            href="https://www.instagram.com/"
                            target="_blank"
                            className="bg-white rounded-[5px] grid place-content-center size-10 place-items-center"
                        >
                            <Instagram className="text-[#DB4A58] size-8" />
                        </a>
                    </div>
                    <a href="https://wa.me/573246399328" target="_blank" className="nunito-bold text-[20px]">
                        +57 3246399328
                    </a>
                </div>
            </div>
        </footer>
    );
}