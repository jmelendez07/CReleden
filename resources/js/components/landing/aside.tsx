import { title } from "process";

const items = [
    {
        image: '/images/biker.svg',
        title: 'Conveniente y confiable',
        description: 'Ya sea que cenes aquí, pidas comida para llevar o a domicilio, nuestro servicio es conveniente, rápido y confiable, lo que hace que la hora de comer sea libre de complicaciones.'
    },
    {
        image: '/images/list.png',
        title: 'Variedad de opciones',
        description: 'Desde comidas abundantes hasta refrigerios ligeros, ofrecemos una amplia gama de opciones para todos los gustos y antojos.'
    },
    {
        image: '/images/burguer-icon.png',
        title: 'Comer hamburguesa',
        description: 'Nuestras hamburguesas están asadas a la perfección, con jugosas hamburguesas y aderezos sabrosos que hacen de cada bocado una experiencia deliciosa.'
    }
]

interface AsideProps {
    className?: string;
}

export default function Aside({ className = '' }: AsideProps) {
    return (
        <div className={`grid grid-cols-2 gap-[100px] ${className}`}>
            <div className="sticky top-[40px] self-start">
                <img 
                    src="/images/burguers-with-friends.jpg" 
                    alt="Imagen de personas comiendo hamburguesas con amigos" 
                    className="w-full h-auto object-cover rounded-[30px]"
                />
            </div>
            <div className="grid grid-cols-1 justify-center">
                <h3 className="nunito-bold text-center text-[48px] mb-[35px]">
                    ¿Por qué la gente nos elige?
                </h3>
                <div className="grid grid-cols-1 gap-[41px]">
                    {items.map(item => (
                        <div className="grid rounded-[18px] items-center grid-cols-[auto_1fr] px-[16px] py-[18px] bg-white shadow-sm gap-[26px]">
                            <div className="rounded-full shadow-md flex items-center justify-center w-[70px] h-[70px]">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-[45px] h-auto object-cover"
                                />
                            </div>
                            <div className="block">
                                <h5 className="nunito-semibold text-[31px]">
                                    {item.title}
                                </h5>
                                <p className="nunito-medium text-[#404040] text-[20px]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}