import { cn } from "@/lib/utils";

interface Props {
    amount: number | undefined;
    className?: string;
}

const PriceFormatter = ({amount, className}: Props) => {
    const formattedPrice = new Number(amount).toLocaleString("en-PH", {
        currency: "PHP",
        style: "currency",
        minimumFractionDigits: 2,
    });
    
    return (
        <span className={cn(
            "text-sm font-semibold text-darkColor bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm",
            className
        )}>
            {formattedPrice}
        </span>
    );
};

export default PriceFormatter;