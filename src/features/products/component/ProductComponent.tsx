import { FC } from "react";

interface ProductProps {
  image: string;
  title: string;
  price: number;
  discount: number;
}

export const ProductComponent: FC<ProductProps> = ({
  image,
  title,
  price,
  discount,
}) => {
  return (
    <div className="flex w-full max-w-xs flex-col items-center rounded-xl p-4 shadow-md sm:w-64">
      <div className="h-[220px] w-[220px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded-md object-cover"
        />
      </div>

      <div className="mt-3 space-y-1 text-center">
        <h2 className="text-base font-semibold text-gray-800 capitalize">
          {title}
        </h2>
        <p className="text-sm text-gray-700">₹ {price}</p>
        <p className="text-sm text-green-600">Discount {discount}%</p>
      </div>
    </div>
  );
};
