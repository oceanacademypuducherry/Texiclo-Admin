import { useDispatch, useSelector } from "react-redux";
import {
  BackBtn,
  FormSyncWatcher,
  ProductDetails,
  ProductVariants,
} from "../component";
import { AppDispatch, RootState } from "../../../app";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../validation";
import { resetForm } from "../redux";
import { useEffect } from "react";
import { GET_OPTIONS_GSM } from "../service/productOptionsService";
import { base64ToFile } from "../../../utils";
import { GET_UPDATE_PRODUCT_BY_ID, UPDATE_PRODUCT } from "../service";
import { useNavigate, useParams } from "react-router-dom";

export const ProductUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { formData, isLoading, success } = useSelector(
    (state: RootState) => state.productForm,
  );
  const { loading } = useSelector((state: RootState) => state.product);

  const methods = useForm({
    defaultValues: formData,
    resolver: yupResolver(productSchema as any),
    mode: "onBlur",
  });

  // Reset form when data is loaded from API
  useEffect(() => {
    if (!isLoading) {
      console.log("Resetting form with fetched data:", formData);
      methods.reset(formData);
    }
  }, [isLoading]);

  // Fetch data on component mount
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log("Fetching product data for ID:", id);
    dispatch(GET_UPDATE_PRODUCT_BY_ID(id));
    dispatch(GET_OPTIONS_GSM());
    // dispatch(GET_OPTIONS_SIZE());
    // dispatch(GET_OPTIONS_CATEGORY());
  }, [dispatch, id]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    const {
      variants,
      category,
      collectionType,
      productName,
      discount,
      sizes,
      ...rest
    } = data;
    console.log("Submitting variants:", variants);
    const transformImage = async (img: any) => {
      console.log(img);
      if (!img) return null;

      // Firebase URL or external image URL
      if (typeof img === "string" && img.startsWith("https")) {
        return img;
      }

      // Base64 input object
      if (img?.base64 && img?.name && img?.type) {
        console.log("base 64 converted");
        return await base64ToFile(img); // convert to File
      }

      return null; // fallback for invalid input
    };

    const transformedVariants = await Promise.all(
      variants.map(async (variant: any) => ({
        _id: variant._id || variant?.id || "",
        color: variant.color,
        variantImage: await transformImage(variant.variantImage),
        frontImage: await transformImage(variant.frontImage),
        backImage: await transformImage(variant.backImage),
        otherImages: await Promise.all(
          variant.otherImages.map((img: any) => transformImage(img)),
        ),
      })),
    );

    const transformedData = {
      categoryId: category.value,
      collectionId: collectionType.value,
      sizeIds: sizes.map((size: any) => size.value),
      name: productName,
      discountPercentage: discount,
      variants: transformedVariants,
      prices: Object.entries(data.prices).map(([gsmName, amount]) => ({
        gsmName,
        amount: Number(amount),
      })),
    };

    console.log("Transformed data:", transformedData);
    const { payload } = await dispatch(
      UPDATE_PRODUCT({ id, productData: transformedData }),
    );
    const { success } = payload;
    if (success) {
      dispatch(resetForm());
      navigate("/products");
    }
    console.log("API Response:", payload);
  };

  // Show loading while fetching initial data
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading product data...</div>
      </div>
    );
  }

  // Show error if no data after loading
  if (!isLoading && !success && id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">Failed to load product data</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-8 mt-2">
        <BackBtn />
      </div>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">
          Update Products
        </h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-xl space-y-8"
        >
          <FormSyncWatcher />
          <ProductDetails />
          <ProductVariants />
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="hover:bg-opacity-80 bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-6 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Update Product"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
