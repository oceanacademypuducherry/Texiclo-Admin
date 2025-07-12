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
import { addNewProduct, resetForm } from "../redux";
import { useEffect } from "react";

import {
  GET_OPTIONS_CATEGORY,
  GET_OPTIONS_COLLECTIONTYPE,
  GET_OPTIONS_GSM,
  GET_OPTIONS_SIZE,
} from "../service/productOptionsService";
import { base64ToFile } from "../../../utils";
import { ADD_PRODUCT } from "../service";
import { useNavigate } from "react-router-dom";

export const ProductAddPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { formData } = useSelector((state: RootState) => state.productForm);
  const methods = useForm({
    defaultValues: formData,
    resolver: yupResolver(productSchema as any),
    mode: "onBlur",
  });

  useEffect(() => {
    dispatch(GET_OPTIONS_GSM());
    dispatch(GET_OPTIONS_SIZE());
    dispatch(GET_OPTIONS_CATEGORY());
    dispatch(GET_OPTIONS_COLLECTIONTYPE());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    // dispatch(addNewProduct(data));
    // console.log("Submitted form:", data);

    const {
      variants,
      category,
      collectionType,
      productName,
      discount,
      sizes,
      ...rest
    } = data;
    console.log(variants);

    const transformedVariants = await Promise.all(
      variants.map(async (variant: any) => ({
        color: variant.color,
        variantImage: await base64ToFile(variant.previewImage),
        frontImage: await base64ToFile(variant.frontImage),
        backImage: await base64ToFile(variant.backImage),
        otherImages: await Promise.all(
          variant.otherImages.map((img: any) => base64ToFile(img)),
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
      ...rest,
    };
    console.log(transformedData, "🚓🚓🚓🚓🚓");
    const { payload } = await dispatch(ADD_PRODUCT(transformedData));
    const { success } = payload;
    if (success) {
      dispatch(resetForm());
      navigate("/products");
    }
    console.log(payload, "🛺🛺🛺🛺🛺");
  };

  return (
    <div>
      <div className="mx-8 mt-2">
        <BackBtn />
      </div>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-secondary text-center text-2xl font-bold">
          Add Products
        </h1>
      </div>

      {/* <ProductForm /> */}
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
              className="hover:bg-opacity-80 bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-6 py-2 font-medium transition"
            >
              Submit Product
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
