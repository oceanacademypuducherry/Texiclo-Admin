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
import { useEffect } from "react";
import {
  GET_OPTIONS_GSM,
  GET_OPTIONS_SIZE,
  GET_OPTIONS_CATEGORY,
  GET_OPTIONS_COLLECTIONTYPE,
} from "../service/productOptionsService";
import { base64ToFile } from "../../../utils";
import { UPDATE_PRODUCT, GET_PRODUCT_BY_ID } from "../service";
import { useNavigate, useParams } from "react-router-dom";
import { resetUpdateStatus } from "../redux/productSlice";

export const ProductUpdatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, updateSuccess } = useSelector(
    (state: RootState) => state.product,
  );
  const { product } = useSelector((state: RootState) => state.productDetial);
  const { categories, collections, sizes, gsms } = useSelector(
    (state: RootState) => state.productFormOptions || {},
  );

  const methods = useForm({
    resolver: yupResolver(productSchema),
    mode: "onBlur",
  });

  // Fetch data on mount
  useEffect(() => {
    if (id) dispatch(GET_PRODUCT_BY_ID(id));
    dispatch(GET_OPTIONS_GSM());
    dispatch(GET_OPTIONS_SIZE());
    dispatch(GET_OPTIONS_CATEGORY());
    dispatch(GET_OPTIONS_COLLECTIONTYPE());
  }, [dispatch, id]);

  // Reset form with product data
  useEffect(() => {
    if (product && categories && collections && sizes && gsms) {
      const categoryOption = categories.find(
        (cat: any) => cat.value === product.category,
      );
      const collectionOption = collections.find(
        (col: any) => col.value === product.collectionType,
      );
      const sizeOptions = product.sizes
        .map((s: any) => sizes.find((size: any) => size.label === s))
        .filter(Boolean);

      const pricesData = product.prices
        ? product.prices.map((price: any) => {
            const gsmMatch = gsms.find(
              (gsm: any) => String(gsm.name) === String(price.gsmName),
            );
            return {
              gsmId: gsmMatch?.value || price.gsmId || "", // fallback to gsmId if exists
              amount: price.amount,
            };
          })
        : [];

      const formData = {
        productName: product.title,
        category: categoryOption || {
          value: product.category,
          label: product.category,
        },
        collectionType: collectionOption || {
          value: product.collectionType,
          label: product.collectionType,
        },
        description: product.description,
        discount: product.discountPercentage,
        sizes: sizeOptions,
        prices: pricesData,
        variants: product.variants.map((variant: any, i: number) => ({
          id: `variant-${i}`,
          color: variant.color,
          previewImage: variant.previewImage,
          frontImage: variant.frontImage,
          backImage: variant.backImage,
          otherImages: variant.otherImages || [],
          _id: variant._id,
        })),
      };

      methods.reset(formData);
    }
  }, [product, categories, collections, sizes, gsms, methods]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdateStatus());
      navigate("/products");
    }
  }, [updateSuccess, dispatch, navigate]);

  const onSubmit = async (data: any) => {
    if (!id) return;

    const {
      variants,
      category,
      collectionType,
      productName,
      discount,
      sizes,
      description,
      prices,
    } = data;

    const processImage = async (image: any) => {
      if (image instanceof File) return image;
      if (typeof image === "string" && image.startsWith("data:")) {
        return await base64ToFile(image);
      }
      return image;
    };

    const transformedVariants = await Promise.all(
      variants.map(async (variant: any) => ({
        color: variant.color,
        variantImage: await processImage(variant.previewImage),
        frontImage: await processImage(variant.frontImage),
        backImage: await processImage(variant.backImage),
        otherImages: variant.otherImages
          ? await Promise.all(variant.otherImages.map(processImage))
          : [],
        ...(variant._id && { _id: variant._id }),
      })),
    );

    const formattedPrices = prices.map((price: any) => ({
      gsmId: price.gsmId, // assuming this is already the correct ID
      amount: price.amount,
    }));

    const transformedData = {
      categoryId: category.value,
      collectionId: collectionType.value,
      sizeIds: sizes.map((s: any) => s.value),
      name: productName,
      discountPercentage: discount,
      variants: transformedVariants,
      prices: formattedPrices,
      description,
    };

    const { payload } = await dispatch(
      UPDATE_PRODUCT({ id, productData: transformedData }),
    );

    console.log(payload, "🛺🛺🛺🛺🛺 UPDATE RESULT");
  };

  if (!product && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading product data...</div>
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
          Update Product
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
              className="bg-primary text-secondary hover:bg-secondary hover:text-primary hover:bg-opacity-80 rounded px-6 py-2 font-medium transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
