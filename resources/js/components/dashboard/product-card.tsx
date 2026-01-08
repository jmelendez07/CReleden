import { Product } from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function ProductCard({ product }: { product: Product }) {

    return (
        <div className="overflow-hidden rounded-[16px] transition-shadow">
            <div className="w-full h-[300px] rounded-[16px] overflow-hidden flex items-center justify-center bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full object-cover"
                />
            </div>
            <div className="p-[20px]">
                <div className="flex items-start gap-[10px] justify-between mb-[8px]">
                    <h6 className="nunito-bold text-[20px] line-clamp-2 text-start">
                        <span className="text-gray-600">{product.code}</span>{" "}
                        {product.name}
                    </h6>
                    <span className="nunito-bold text-[#F03328] text-[20px]">
                        ${product.price}
                    </span>
                </div>
                {product.ingredients && product.ingredients.length > 0 && (
                    <div className="max-w-full overflow-hidden mb-[10px]">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-1">
                                {product.ingredients.map((ingredient) => (
                                    <CarouselItem key={ingredient.id} className="pl-1 basis-auto">
                                        <span className="nunito-medium text-[13px] px-[8px] py-[4px] bg-gray-100 rounded-full whitespace-nowrap inline-block">
                                            {ingredient.pivot?.quantity_needed}{ingredient.unit_of_measurement} {ingredient.name}
                                        </span>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
                <p className="nunito text-[16px] text-center text-gray-600 mb-[12px] line-clamp-2 min-h-[40px]">
                    {product.description || 'Sin descripción'}
                </p>
            </div>
        </div>
    );
}