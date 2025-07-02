
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface ColorOption {
  name: string;
  code: string;
  image: string;
}

interface ProductProps {
  id: string;
  previewImage: string;
  title: string;
  price: number;
  discountprice: number;
  discount: number;
  colors?: ColorOption[];
  type?: string;
}

export const ProductComponent: FC<ProductProps> = ({
  id,
  previewImage,
  title,
  price,
  discountprice,
  discount,
  colors = [],
  type = "",
}) => {
  const [selectedImage, setSelectedImage] = useState(previewImage);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  const formattedDiscountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(discountprice);

  const handleColorClick = (e: React.MouseEvent, colorImage: string) => {
    e.preventDefault();
    setSelectedImage(colorImage);
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
        {colors.length > 0 && (
          <div className="mb-1 flex items-center gap-1 px-1">
            {colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="h-4 w-4 cursor-pointer rounded-full border border-gray-300"
                title={color.name}
                style={{ backgroundColor: color.code }}
                onClick={(e) => handleColorClick(e, color.image)}
              />
            ))}
            {colors.length > 3 && (
              <span className="text-xs text-gray-500">
                +{colors.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title and Type */}
        <div className="truncate px-1 text-sm font-semibold text-gray-800">
          {title}
        </div>
        <div className="px-1 text-xs text-gray-500">{type}</div>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2 px-1">
          <span className="text-sm font-semibold text-black">
            {formattedDiscountPrice}
          </span>
          {price !== discountprice && (
            <span className="text-xs text-gray-500 line-through">
              {formattedPrice}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-medium text-green-600">
              {discount}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
