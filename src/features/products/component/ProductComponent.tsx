import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface Color {
  name: string;
  code: string;
}

interface ProductProps {
  id: string;
  title: string;
  discount: number;
  prices: { [gsmId: string]: number };
  colors: Color[];
  variantImage: string;
  type?: string;
  defaultGSM?: string;
}

export const ProductComponent: FC<ProductProps> = ({
  id,
  title,
  prices,
  discount,
  colors,
  variantImage,
  type = "",
  defaultGSM,
}) => {
  const gsmKeys = Object.keys(prices);
  const initialGSM = defaultGSM && prices[defaultGSM] ? defaultGSM : gsmKeys[0];
  const [selectedGsm, setSelectedGsm] = useState<string>(initialGSM);

  const originalPrice = prices[selectedGsm] || 0;
  const discountPrice = Math.round(originalPrice * (1 - discount / 100));

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(originalPrice);

  const formattedDiscountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(discountPrice);

  return (
    <Link to={`/products/${id}`} className="flex items-center justify-center">
      <div className="w-[220px] rounded-xl border border-gray-200 p-3 shadow transition hover:shadow-md">
        {/* Image */}
        <div className="mx-auto mb-2 h-[160px] w-[160px]">
          <img
            src={variantImage}
            alt={title}
            className="h-full w-full object-contain transition-all duration-300"
          />
        </div>

        {/* Color Dots */}
        {colors.length > 0 && (
          <div className="mb-1 flex items-center gap-1 px-1">
            {colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full border border-gray-300"
                title={color.name}
                style={{ backgroundColor: color.code }}
              />
            ))}
            {colors.length > 3 && (
              <span className="text-xs text-gray-500">
                +{colors.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title & Type */}
        <div className="truncate px-1 text-sm font-semibold text-gray-800">
          {title}
        </div>
        <div className="px-1 text-xs text-gray-500">{type}</div>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2 px-1">
          <span className="text-sm font-semibold text-black">
            {formattedDiscountPrice}
          </span>
          {discount > 0 && (
            <>
              <span className="text-xs text-gray-500 line-through">
                {formattedPrice}
              </span>
              <span className="text-xs font-medium text-green-600">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
