import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { productSchema } from "../validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app";
import Select from "react-select";
import { IoMdAddCircle } from "react-icons/io";
import { ProductAddForm } from "./ProductAddForm";
import { fileToBase64 } from "../../../utils";
import { setFormData } from "../redux";
import { useEffect } from "react";

export interface ProductFormValues {
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  discount?: number;

  prices: {
    [key: string]: number | string | undefined; // GSM dynamic keys
  };

  sizes: string[];

  variants: {
    color: {
      name: string;
      code: string;
    };
    previewImage: File | null;
    frontImage: File | null;
    backImage: File | null;
    otherImages: (File | string)[];
  }[];
}

export const AddProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gsms } = useSelector((state: RootState) => state.gsm);
  const { sizes } = useSelector((state: RootState) => state.size);
  const { colors } = useSelector((state: RootState) => state.color);
  const productFormData = useSelector((state: RootState) => state.productForm);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: productFormData || {},
    resolver: yupResolver(productSchema),
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const onSubmit = async (data: ProductFormValues) => {
    // Convert image File objects to base64
    const variants = await Promise.all(
      data.variants.map(async (variant) => ({
        ...variant,
        previewImage:
          typeof variant.previewImage === "string"
            ? variant.previewImage
            : await fileToBase64(variant.previewImage),
        frontImage:
          typeof variant.frontImage === "string"
            ? variant.frontImage
            : await fileToBase64(variant.frontImage),
        backImage:
          typeof variant.backImage === "string"
            ? variant.backImage
            : await fileToBase64(variant.backImage),
        otherImages: await Promise.all(
          variant.otherImages.map((img) =>
            typeof img === "string" ? img : fileToBase64(img),
          ),
        ),
      })),
    );

    const payload = { ...data, variants };
    dispatch(setFormData(payload));
  };

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(setFormData(value as ProductFormValues));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-6 rounded bg-white p-6 shadow"
    >
      {/* Basic Fields */}
      {[
        { name: "productName", label: "Product Name" },
        { name: "collectionType", label: "Collection Type" },
        { name: "category", label: "Category" },
      ].map(({ name, label }) => (
        <div key={name} className="space-y-1">
          <div className="flex items-center">
            <label className="w-36">{label}</label>
            <input
              {...register(name as keyof ProductFormValues)}
              className="flex-1 rounded border border-gray-300 p-2"
            />
          </div>
          {errors[name as keyof ProductFormValues] && (
            <p className="ml-40 text-sm text-red-500">
              {errors[name as keyof ProductFormValues]?.message as string}
            </p>
          )}
        </div>
      ))}

      {/* Description */}
      <div className="space-y-1">
        <div className="flex items-center">
          <label className="w-36">Description</label>
          <textarea
            {...register("description")}
            className="flex-1 rounded border border-gray-300 p-2"
            rows={2}
          />
        </div>
        {errors.description && (
          <p className="ml-40 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Prices by GSM */}
      <div className="flex items-start gap-4">
        <label className="mb-2 block w-36">Product Price</label>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gsms.map((gsm) => (
            <div key={gsm._id} className="space-y-1">
              <div className="flex flex-col justify-center gap-2">
                <label className="w-24">{gsm.gsm} GSM</label>
                <input
                  type="number"
                  {...register(`prices.${gsm.gsm}` as const)}
                  className="flex-1 rounded border border-gray-300 p-2"
                  placeholder="₹"
                />
              </div>
            </div>
          ))}
        </div>
        {errors.prices && (
          <p className="text-sm text-red-500">{errors.prices.root?.message}</p>
        )}
      </div>

      {/* Sizes */}
      <div className="">
        <div className="flex items-center">
          <label className="w-33">Sizes</label>
          <div className="flex-1">
            <Select
              isMulti
              options={sizes.map((s) => ({ value: s._id, label: s.size }))}
              closeMenuOnSelect={false}
              onChange={(selected) =>
                setValue(
                  "sizes",
                  selected ? selected.map((s) => s.value) : [],
                  { shouldValidate: true },
                )
              }
            />
          </div>
        </div>
        {errors.sizes && (
          <p className="ml-40 text-sm text-red-500">{errors.sizes.message}</p>
        )}
      </div>

      {/* Discount */}
      <div className="">
        <div className="flex items-center">
          <label className="w-33">Discount %</label>
          <input
            type="number"
            {...register("discount")}
            className="w-32 rounded border border-gray-300 p-2"
          />
        </div>
        {errors.discount && (
          <p className="ml-40 text-sm text-red-500">
            {errors.discount.message}
          </p>
        )}
      </div>

      {/* Variants */}
      {fields.map((field, index) => (
        <ProductAddForm
          colorOptions={colors}
          key={field.id}
          index={index}
          register={register}
          watch={watch}
          errors={errors}
          control={control}
          setValue={setValue}
          onRemove={() => remove(index)}
        />
      ))}

      {/* Add Variant & Submit */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() =>
            append({
              color: { name: "", code: "" },
              previewImage: null,
              frontImage: null,
              backImage: null,
              otherImages: [],
            })
          }
          className="flex items-center gap-2 text-gray-500"
        >
          <IoMdAddCircle size={20} />
        </button>

        <button
          type="submit"
          className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-6 py-2 font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
