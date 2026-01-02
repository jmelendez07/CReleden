import { Link } from "@inertiajs/react";

const categories = [
    {
        name: 'Picadas',
        description: 'Una verdadera delicia',
        img: '/images/picada-navbar.png',
        href: '#'
    },
    {
        name: 'Hamburguesas',
        description: 'Nunca probarás otra igual',
        img: '/images/burguer-navbar.jpg',
        href: '#'
    },
    {
        name: 'Asados',
        description: 'La mejor de la ciudad',
        img: '/images/asado-navbar.png',
        href: '#'
    },
    {
        name: 'Perros',
        description: 'Con mucho queso',
        img: '/images/hot-dog-navbar.jpg',
        href: '#'
    }
]

export default function Navbar({ className = '' }: { className?: string }) {
    return (
        <nav className={`grid grid-cols-4 gap-[24px] ${className}`}>
            {categories.map((category) => (
                <Link
                    className="bg-white rounded-[20px] flex flex-col items-center justify-start py-[22px] shadow-md"
                >
                    <img 
                        src={category.img} 
                        alt={category.name}
                        className="mb-[12px] h-[100px] 2xl:h-[140px] w-auto object-cover rounded-[10px]" 
                    />
                    <h3 className="nunito-semibold text-[30px] w-full text-center mb-[16px]">
                        {category.name}
                    </h3>
                    <p className="w-full text-center text-[#666666] nunito-medium text-[20px]">
                        {category.description}
                    </p>
                </Link>
            ))}
        </nav>
    );
}