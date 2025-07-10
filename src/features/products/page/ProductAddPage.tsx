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
import { addNewProduct } from "../redux";
import { useEffect } from "react";
import { GET_GSM } from "../../gsm";

export const ProductAddPage = () => {
  const { formData } = useSelector((state: RootState) => state.productForm);
  const methods = useForm({
    defaultValues: formData,
    resolver: yupResolver(productSchema as any),
    mode: "onBlur",
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GET_GSM());
  }, [dispatch]);

  const onSubmit = (data: any) => {
    dispatch(addNewProduct(data));
    console.log("Submitted form:", data);
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
