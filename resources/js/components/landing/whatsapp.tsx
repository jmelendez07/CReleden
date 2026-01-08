import { whatsappUrl } from "@/lib/utils";
import WhatsappIcon from "./whatsapp-icon";

export default function Whatsapp() {
    return (
        <a 
            className="fixed z-5 bg-[#51c85d] flex justify-center items-center bottom-10 right-10 size-18 rounded-full bg-[]"
            href={whatsappUrl()}
            target='_blank'
        >
            <WhatsappIcon className='size-8' />
        </a>
    );
}