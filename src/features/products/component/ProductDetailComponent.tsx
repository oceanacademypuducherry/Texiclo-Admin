import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProductsData } from "../data/productData";
import { DeleteModal } from "./DeleteModal";

export const ProductDetailComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = ProductsData.find((item) => item.id === id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="mt-10 text-center text-xl font-semibold">
        Product not found
      </div>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedGsm, setSelectedGsm] = useState(Object.keys(product.prices)[0]);
  const [mainImage, setMainImage] = useState(selectedVariant.previewImage);

  const allImages = [
    selectedVariant.previewImage,
    selectedVariant.frontImage,
    selectedVariant.backImage,
    ...(selectedVariant.otherImages || []),
  ].filter(Boolean);

  const originalPrice = product.prices[selectedGsm];
  const discountPrice = Math.round(originalPrice * (1 - product.discount / 100));

  const handleDelete = () => {
    console.log("Product deleted!");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center  justify-center gap-6 xl:flex-row">
      {/* Left: Images */}
      <div className="flex flex-col gap-4 sm:flex-row    ">
        {/* Thumbnails */}
        <div className="flex flex-row justify-center gap-2 pt-2 sm:flex-col sm:justify-start">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(img)}
              onMouseEnter={() => setMainImage(img)}
              className={`h-16 w-16 cursor-pointer rounded border object-cover transition duration-200 ${
                mainImage === img ? "border-secondary" : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="h-80 w-80 rounded-md sm:w-96 md:h-96">
          <img
            src={mainImage}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex w-[340px] flex-col   justify-center gap-4 sm:w-[400px] md:gap-3 lg:gap-4">
        <h2 className="text-xl font-bold md:text-2xl">{product.title}</h2>
        <p className="text-sm text-gray-600 md:text-base">{product.description}</p>

        {/* GSM Selection */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold md:text-base">GSM:</span>
          {Object.keys(product.prices).map((gsm, i) => (
            <button
              key={i}
              className={`rounded px-2 py-1 text-xs md:text-sm ${
                selectedGsm === gsm ? "bg-secondary text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedGsm(gsm)}
            >
              {gsm}
            </button>
          ))}
        </div>

        {/* Color Selection */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold md:text-base">Color:</span>
          {product.variants.map((variant, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedVariant(variant);
                setMainImage(variant.previewImage);
              }}
              className={`h-6 w-6 rounded-full border transition-all duration-200 ${
                selectedVariant.color.code === variant.color.code
                  ? "border-2 border-secondary scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: variant.color.code }}
              title={variant.color.name}
            />
          ))}
        </div>

        {/* Sizes */}
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

        {/* Price Display */}
        <div className="pt-2">
          <span className="text-secondary text-lg font-semibold md:text-xl">
            ₹{discountPrice}
          </span>
          <span className="ml-2 text-sm text-gray-500 line-through md:text-base">
            ₹{originalPrice}
          </span>
          <span className="ml-2 text-sm text-green-500 md:text-base">
            {product.discount}% off
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-primary text-secondary rounded px-6 py-2 text-sm font-medium md:text-base"
            onClick={() => navigate(`/updateproduct/${id}`)}
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

      {/* Confirm Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
