import FeedbackBGPolygon from "../feeback-bg-polygon";

export default function Feedback({ className = '' }: { className?: string }) {
    return (
        <section
            className={`grid grid-cols-2 items-center gap-[105px] ${className}`}
        >
            <div className="block">
                <h2 className="nunito-bold text-[50px] leading-14 mb-[14px]">
                    Comentarios de los 
                    <span className="text-[#F03328] cookie-regular ml-[18px] leading-14 text-[75px]">clientes</span>
                </h2>
                <p className="nunito text-[22px] text-[#3D3D3D]">
                    Hace poco cené en su restaurante y quería compartir 
                    mi experiencia. La comida estuvo absolutamente deliciosa 
                    y me impresionó la frescura de los ingredientes. 
                    Cada plato rebosaba de sabor y las porciones eran perfectas. 
                    El servicio fue rápido y eficiente, y el personal fue 
                    increíblemente amable y atento.
                </p>
            </div>
            <div className="relative flex items-center justify-center">
                <img 
                    src="/images/Chef.png" 
                    alt="Imagen de chef"  
                    className="w-full h-auto z-1"
                />
                <FeedbackBGPolygon className="absolute bottom-0 left-1/2 -translate-x-1/2" />
            </div>
        </section>
    );
}