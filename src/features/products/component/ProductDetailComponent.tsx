import { ProductsData } from "../data/productData";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export const ProductDetailComponent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const product = ProductsData.find((item) => item.id === id);

  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || product?.image,
  );
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("Product deleted!");
    setIsModalOpen(false);
  };
  if (!product) {
    return (
      <div className="mt-10 text-center text-xl font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 xl:flex-row">
      {/* Left Section - Image Thumbnails + Main Image */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Thumbnails */}
        <div className="flex flex-row justify-center gap-2 pt-2 sm:flex-col sm:justify-start">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => {
                setMainImage(img);
                setSelectedImage(img);
              }}
              onMouseEnter={() => setMainImage(img)}
              className={`h-16 w-16 cursor-pointer rounded border object-cover transition duration-200 ${
                selectedImage === img
                  ? "border-secondary"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="h-80 w-80 rounded-md sm:w-96 md:h-96">
          <img
            src={mainImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="flex w-[340px] flex-col justify-center gap-4 sm:w-[400px] md:gap-3 lg:gap-4">
        <h2 className="text-xl font-bold md:text-2xl">{product.name}</h2>

        <p className="text-sm text-gray-600 md:text-base">
          {product.description}
        </p>

        {/* GSM */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold md:text-base">GSM:</span>
          {product.gsm.map((g, i) => (
            <span
              key={i}
              className="rounded bg-gray-200 px-2 py-1 text-xs md:text-sm"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Color */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold md:text-base">Color:</span>

          <span className="rounded bg-gray-200 px-2 py-1 text-xs md:text-sm">
            {product.colors}
          </span>
        </div>

        {/* Size */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold md:text-base">Size:</span>
          {product.sizes.map((size, i) => (
            <span
              key={i}
              className="rounded bg-gray-200 px-2 py-1 text-xs md:text-sm"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Type */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold md:text-base">Type:</span>
          {product.types.map((type, i) => (
            <span
              key={i}
              className="rounded bg-gray-200 px-2 py-1 text-xs md:text-sm"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <p className="pt-2">
          <span className="text-secondary text-lg font-semibold md:text-xl">
            ₹{product.discountPrice}
          </span>
          <span className="ml-2 text-sm text-gray-500 line-through md:text-base">
            ₹{product.price}
          </span>
          <span className="ml-2 text-sm text-green-500 md:text-base">
            {product.discount}% off
          </span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-primary text-secondary rounded px-6 py-2 text-sm font-medium md:text-base"
            onClick={() => navigate(`/updateproduct/${product.id}`)}
          >
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-secondary rounded px-6 py-2 text-sm font-medium md:text-base"
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
