import { FC, useState } from "react";
import { Link } from "react-router-dom";

// interface ColorOption {
//   name: string;
//   code: string;
//   image: string;
// }

// interface Variant {
//   color: { name: string; code: string };
//   previewImage: string;
// }

// interface ProductProps {
//   id: string;
//   title: string;
//   discount: number;
//   prices: { [gsm: string]: number }; // multiple GSM-based prices
//   variants: Variant[];
//   type?: string;
//   defaultGSM?: string; // optional default gsm
// }

interface Variant {
  color: { name: string; code: string };
  previewImage: string;
}

interface ProductProps {
  id: string;
  title: string;
  discount: number;
  prices: { [gsmId: string]: number };
  variants: Variant[];
  type?: string;
  defaultGSM?: string;
}

export const ProductComponent: FC<ProductProps> = ({
  id,
  title,
  prices,
  discount,
  variants,
  type = "",
  defaultGSM,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [selectedImage, setSelectedImage] = useState<string>(
    variants[0]?.previewImage || "",
  );
  const gsmKeys = Object.keys(prices);
  const initialGSM = defaultGSM && prices[defaultGSM] ? defaultGSM : gsmKeys[0];
  const [selectedGsm, setSelectedGsm] = useState<string>(initialGSM);

  const originalPrice = prices[selectedGsm] ||0;
  const discountPrice = Math.round(originalPrice * (1 - discount / 100));

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(originalPrice);

  const formattedDiscountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(discountPrice);

  const handleColorClick = (variant: Variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.previewImage);
  };

  return (
    <Link to={`/products/${id}`}>
      <div className="w-[220px] rounded-xl border border-gray-200 p-3 shadow transition hover:shadow-md">
        {/* Image */}
        <div className="mx-auto mb-2 h-[160px] w-[160px]">
          <img
            src={selectedImage}
            alt={title}
            className="h-full w-full object-contain transition-all duration-300"
          />
        </div>

        {/* Color Dots */}
        {variants.length > 0 && (
          <div className="mb-1 flex items-center gap-1 px-1">
            {variants.slice(0, 3).map((variant, index) => (
              <div
                key={index}
                className="h-4 w-4 cursor-pointer rounded-full border border-gray-300"
                title={variant.color.name}
                style={{ backgroundColor: variant.color.code }}
                onClick={() => handleColorClick(variant)}
              />
            ))}
            {variants.length > 3 && (
              <span className="text-xs text-gray-500">
                +{variants.length - 3}
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
