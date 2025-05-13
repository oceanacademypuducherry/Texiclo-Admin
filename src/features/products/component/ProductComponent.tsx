import { FC } from "react";
import { Link } from "react-router-dom";

interface ProductProps {
  id:string
  image: string;
  title: string;
  price: number;
  discountprice: number;
  discount: number;
}

export const ProductComponent: FC<ProductProps> = ({
  id,
  image,
  title,
  price,
  discountprice,
  discount,
}) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  const formattedDiscountPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(discountprice);

  return (
    <Link to={`/products/${id}`}>
      <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl p-4 shadow-md sm:w-64">
        <div className="h-[220px] w-[220px]">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-md object-cover"
            aria-label={`Image of ${title}`}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div>
            <h2 className="text-base font-semibold text-gray-800 capitalize">
              {title}
            </h2>
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-gray-700">
              {formattedDiscountPrice}{" "}
              {price !== discountprice && (
                <span className="line-through">{formattedPrice}</span>
              )}
            </p>
            {discount > 0 && (
              <p className="text-sm text-green-600">{discount}% off</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
