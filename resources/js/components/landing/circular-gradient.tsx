
interface CircularGradientProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function CircularGradient({ className = '', style }: CircularGradientProps) {
    return (
        <div className={`rounded-full bg-[#F8B78D] opacity-20 blur-3xl ${className}`} style={style}>

        </div>
    );
}