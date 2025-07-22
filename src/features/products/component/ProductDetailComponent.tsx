import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app";
import { DELETE_PRODUCT, GET_PRODUCT_BY_ID } from "../service";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
import { resetForm } from "../redux";

export const ProductDetailComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { product, loading, error } = useSelector(
    (state: RootState) => state.productDetial,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedGsm, setSelectedGsm] = useState<string>("");
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Fetch product by ID
  useEffect(() => {
    if (id) dispatch(GET_PRODUCT_BY_ID(id));
  }, [id, dispatch]);

  // Sync UI local state after product is loaded
  useEffect(() => {
    if (product) {
      const firstVariant = product.variants?.[0];
      const firstGsm = Object.keys(product.prices)?.[0];

      setSelectedVariant(firstVariant);
      setSelectedGsm(firstGsm);
      setMainImage(firstVariant?.variantImage || null);
    }
  }, [product]);

  if (loading) return <ProductDetailSkeleton />;
  if (!loading && (error || !product)) {
    return (
      <div className="mt-10 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  const allImages = [
    selectedVariant?.variantImage,
    selectedVariant?.frontImage,
    selectedVariant?.backImage,
    ...(selectedVariant?.otherImages || []),
  ].filter(Boolean);

  const originalPrice = product.prices[selectedGsm];
  const discountPrice = Math.round(
    originalPrice * (1 - product.discountPercentage / 100),
  );

  const handleUpdate = (id: string) => {
    navigate(`/updateproduct/${id}`);
  };
  const handleDelete = async () => {
    if (!id) return;

    try {
      await dispatch(DELETE_PRODUCT(id)).unwrap();
      setIsModalOpen(false);
      navigate("/products");
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      setIsModalOpen(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 xl:flex-row">
      {/* Left: Images */}
      <div className="flex flex-col gap-4 sm:flex-row">
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
          {mainImage && (
            <img
              src={mainImage}
              alt={product?.title}
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex w-[340px] flex-col justify-center gap-4 sm:w-[400px] md:gap-3 lg:gap-4">
        <h2 className="text-xl font-bold md:text-2xl">{product?.title}</h2>
        <p className="text-sm text-gray-600 md:text-base">
          {product?.description}
        </p>

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
                setMainImage(variant.variantImage);
              }}
              className={`h-6 w-6 rounded-full border transition-all duration-200 ${
                selectedVariant?.color?.code === variant.color?.code
                  ? "border-secondary scale-110 border-2"
                  : "border-gray-300"
              }`}
              style={{
                backgroundColor: variant.color?.code || "#ccc", // fallback for safety
              }}
              title={variant.color?.name || "Color"}
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
            {product.discountPercentage}% off
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-primary text-secondary rounded px-6 py-2 text-sm font-medium md:text-base"
            onClick={() => handleUpdate(id)}
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
