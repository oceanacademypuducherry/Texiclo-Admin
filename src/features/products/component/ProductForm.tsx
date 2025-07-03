// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ProductAddForm } from "./ProductAddForm";
// import Select from "react-select";
// import { IoMdAddCircle } from "react-icons/io";
// import { productSchema } from "../validation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../app";
// import { useEffect } from "react";
// import { resetForm, setFormData } from "../redux";
// import { useNavigate } from "react-router-dom";

// export type GSMOption = number;
// export type SizeOption = string;
// export type ColorOption = { name: string; code: string };
// let debounceTimer: NodeJS.Timeout;
// export type ProductFormInputs = {
//   productName: string;
//   collectionType: string;
//   category: string;
//   description: string;
//   prices: { [gsm: string]: number };
//   sizes: SizeOption[];
//   discount: number;
//   variants: {
//     color: ColorOption;
//     previewImage: File | null;
//     frontImage: File | null;
//     backImage: File | null;
//     otherImages: File[];
//   }[];
// };

// export const ProductForm = ({
//   onSubmit: externalSubmit,
// }: {
//   onSubmit: (data: ProductFormInputs) => void;
// }) => {
//   const gsmOptions: GSMOption[] = [120, 140, 160, 180, 200, 220];
//   const sizeOptions: SizeOption[] = ["S", "M", "L", "XL", "XXL"];
//   const colorOptions: ColorOption[] = [
//     { name: "Black", code: "#000000" },
//     { name: "Red", code: "#FF0000" },
//     { name: "Blue", code: "#0000FF" },
//     { name: "Green", code: "#00FF00" },
//     { name: "White", code: "#FFFFFF" },
//     { name: "Yellow", code: "#FFFF00" },
//   ];

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const defaultFormData = useSelector((state: RootState) => state.productForm);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<ProductFormInputs>({
//     resolver: yupResolver(productSchema),
//     defaultValues: {
//       productName: defaultFormData.productName || "",
//       collectionType: defaultFormData.collectionType || "",
//       category: defaultFormData.category || "",
//       description: defaultFormData.description || "",
//       discount: defaultFormData.discount || 0,
//       sizes: [...(defaultFormData.sizes || [])],
//       prices: defaultFormData.prices ?? {},
//       // ✅ make writable copy
//       variants: (defaultFormData.variants || []).map((variant) => ({
//         color: { ...variant.color },
//         previewImage: variant.previewImage,
//         frontImage: variant.frontImage,
//         backImage: variant.backImage,
//         otherImages: [...variant.otherImages],
//       })),
//     },
//   });
//   console.log(errors);

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "variants",
//   });

//   useEffect(() => {
//     console.log(defaultFormData);
//     reset({
//       productName: defaultFormData.productName || "",
//       collectionType: defaultFormData.collectionType || "",
//       category: defaultFormData.category || "",
//       description: defaultFormData.description || "",
//       discount: defaultFormData.discount || 0,
//       sizes: [...(defaultFormData.sizes || [])],
//       prices: { ...(defaultFormData.prices ?? {}) },
//       variants: (defaultFormData.variants || []).map((variant) => ({
//         color: { ...variant.color },
//         previewImage: variant.previewImage,
//         frontImage: variant.frontImage,
//         backImage: variant.backImage,
//         otherImages: [...variant.otherImages],
//       })),
//     });
//   }, [defaultFormData, reset]);

//   const formValues = watch();

//   useEffect(() => {
//     dispatch(setFormData(formValues));
//   }, [dispatch]);

//   const onSubmit = (data: ProductFormInputs) => {
//     console.log("Form Submitted:", data);
//     externalSubmit(data);
//     dispatch(resetForm());
//     reset();
//     navigate(-1);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="mx-auto max-w-xl space-y-6 rounded bg-white p-6 shadow"
//     >
//       {/* Basic Fields */}
//       {[
//         { name: "productName", label: "Product Name" },
//         { name: "collectionType", label: "Collection Type" },
//         { name: "category", label: "Category" },
//       ].map(({ name, label }) => (
//         <div key={name} className="space-y-1">
//           <div className="flex items-center">
//             <label className="w-36">{label}</label>
//             <input
//               {...register(name as keyof ProductFormInputs)}
//               className="flex-1 rounded border border-gray-300 p-2"
//             />
//           </div>
//           {errors[name as keyof ProductFormInputs] && (
//             <p className="ml-40 text-sm text-red-500">
//               {errors[name as keyof ProductFormInputs]?.message as string}
//             </p>
//           )}
//         </div>
//       ))}

//       {/* Description */}
//       <div className="space-y-1">
//         <div className="flex items-center">
//           <label className="w-36">Description</label>
//           <textarea
//             {...register("description")}
//             className="flex-1 rounded border border-gray-300 p-2"
//             rows={2}
//           />
//         </div>
//         {errors.description && (
//           <p className="ml-40 text-sm text-red-500">
//             {errors.description.message}
//           </p>
//         )}
//       </div>

//       {/* Prices by GSM */}
//       <div className="flex items-start gap-4">
//         <label className="mb-2 block w-36">Product Price</label>
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//           {gsmOptions.map((gsm) => (
//             <div key={gsm} className="space-y-1">
//               <div className="flex flex-col justify-center gap-2">
//                 <label className="w-24">{gsm} GSM</label>
//                 <input
//                   type="number"
//                   {...register(`prices.${gsm}`)}
//                   className="flex-1 rounded border border-gray-300 p-2"
//                   placeholder="₹"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         {errors.prices && (
//           <p className="text-sm text-red-500">{errors.prices.root?.message}</p>
//         )}
//       </div>

//       {/* Sizes */}
//       <div className="">
//         <div className="flex items-center">
//           <label className="w-33">Sizes</label>
//           <div className="flex-1">
//             <Select
//               isMulti
//               options={sizeOptions.map((s) => ({ value: s, label: s }))}
//               value={
//                 watch("sizes")?.map((size) => ({
//                   value: size,
//                   label: size,
//                 })) || []
//               }
//               onChange={(selected) =>
//                 setValue(
//                   "sizes",
//                   selected.map((s) => s.value),
//                   { shouldValidate: true },
//                 )
//               }
//             />
//           </div>
//         </div>
//         {errors.sizes && (
//           <p className="ml-40 text-sm text-red-500">{errors.sizes.message}</p>
//         )}
//       </div>

//       {/* Discount */}
//       <div className="">
//         <div className="flex items-center">
//           <label className="w-33">Discount %</label>
//           <input
//             type="number"
//             {...register("discount")}
//             className="w-32 rounded border border-gray-300 p-2"
//           />
//         </div>
//         {errors.discount && (
//           <p className="ml-40 text-sm text-red-500">
//             {errors.discount.message}
//           </p>
//         )}
//       </div>

//       {/* Variants */}
//       {fields.map((field, index) => (
//         <ProductAddForm
//           key={field.id}
//           index={index}
//           register={register}
//           errors={errors}
//           watch={watch}
//           control={control}
//           setValue={setValue}
//           onRemove={() => remove(index)}
//           colorOptions={colorOptions}
//         />
//       ))}

//       {/* Add Variant & Submit */}
//       <div className="flex flex-col items-center gap-4">
//         <button
//           type="button"
//           onClick={() =>
//             append({
//               color: { name: "", code: "" },
//               previewImage: null,
//               frontImage: null,
//               backImage: null,
//               otherImages: [],
//             })
//           }
//           className="flex items-center gap-2 text-gray-500"
//         >
//           <IoMdAddCircle size={20} />
//         </button>

//         <button
//           type="submit"
//           className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-6 py-2 font-medium"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductAddForm } from "./ProductAddForm";
import Select from "react-select";
import { IoMdAddCircle } from "react-icons/io";
import { productSchema } from "../validation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app";
import { useEffect, useCallback, useRef } from "react";
import { resetForm, setFormData } from "../redux";
import { useNavigate } from "react-router-dom";

export type GSMOption = number;
export type SizeOption = string;
export type ColorOption = { name: string; code: string };
let debounceTimer: NodeJS.Timeout;

export type ProductFormInputs = {
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  prices: { [gsm: string]: number };
  sizes: SizeOption[];
  discount: number;
  variants: {
    color: ColorOption;
    previewImage: File | null;
    frontImage: File | null;
    backImage: File | null;
    otherImages: File[];
  }[];
};

export const ProductForm = ({
  onSubmit: externalSubmit,
}: {
  onSubmit: (data: ProductFormInputs) => void;
}) => {
  const gsmOptions: GSMOption[] = [120, 140, 160, 180, 200, 220];
  const sizeOptions: SizeOption[] = ["S", "M", "L", "XL", "XXL"];
  const colorOptions: ColorOption[] = [
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#00FF00" },
    { name: "White", code: "#FFFFFF" },
    { name: "Yellow", code: "#FFFF00" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultFormData = useSelector((state: RootState) => state.productForm);

  // Helper function to create default values with deep copies
  const createDefaultValues = useCallback(() => {
    // Create a deep copy of prices to avoid extensibility issues
    const pricesCopy = defaultFormData.prices
      ? JSON.parse(JSON.stringify(defaultFormData.prices))
      : {};

    return {
      productName: defaultFormData.productName || "",
      collectionType: defaultFormData.collectionType || "",
      category: defaultFormData.category || "",
      description: defaultFormData.description || "",
      discount: defaultFormData.discount || 0,
      sizes: defaultFormData.sizes ? [...defaultFormData.sizes] : [],
      prices: pricesCopy,
      variants: defaultFormData.variants
        ? defaultFormData.variants.map((variant) => ({
            color: { ...variant.color },
            previewImage: variant.previewImage,
            frontImage: variant.frontImage,
            backImage: variant.backImage,
            otherImages: [...variant.otherImages],
          }))
        : [],
    };
  }, [defaultFormData]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(productSchema),
    defaultValues: createDefaultValues(),
  });

  // console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  // Reset form when defaultFormData changes
  useEffect(() => {
    // console.log(defaultFormData);
    const newDefaultValues = createDefaultValues();
    reset(newDefaultValues);
  }, [defaultFormData, reset, createDefaultValues]);

  // Watch form values and dispatch to Redux with debounce
  const formValues = watch();
  // Reset form when defaultFormData changes
  useEffect(() => {
    // console.log(defaultFormData);
    const newDefaultValues = createDefaultValues();
    reset(newDefaultValues);
  }, [defaultFormData, reset, createDefaultValues]);

  // Watch form values and dispatch to Redux with debounce
  const previousFormValues = useRef(formValues);

  useEffect(() => {
    // Compare current values with previous values
    const hasChanged =
      JSON.stringify(formValues) !== JSON.stringify(previousFormValues.current);

    if (!hasChanged) {
      return; // No changes, don't dispatch
    }

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer to dispatch after 300ms of no changes
    debounceTimer = setTimeout(() => {
      // Create a deep copy of form values to avoid mutation issues
      const formValuesCopy = JSON.parse(JSON.stringify(formValues));
      dispatch(setFormData(formValuesCopy));

      // Update the previous values ref
      previousFormValues.current = formValues;
    }, 300);

    // Cleanup function
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [formValues, dispatch]);

  const onSubmit = (data: ProductFormInputs) => {
    console.log("Form Submitted:", data);
    externalSubmit(data);
    dispatch(resetForm());
    reset();
    navigate(-1);
  };

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
              {...register(name as keyof ProductFormInputs)}
              className="flex-1 rounded border border-gray-300 p-2"
            />
          </div>
          {errors[name as keyof ProductFormInputs] && (
            <p className="ml-40 text-sm text-red-500">
              {errors[name as keyof ProductFormInputs]?.message as string}
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
          {gsmOptions.map((gsm) => (
            <div key={gsm} className="space-y-1">
              <div className="flex flex-col justify-center gap-2">
                <label className="w-24">{gsm} GSM</label>
                <input
                  type="number"
                  {...register(`prices.${gsm}`)}
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
              options={sizeOptions.map((s) => ({ value: s, label: s }))}
              closeMenuOnSelect={false}
              value={
                watch("sizes")?.map((size) => ({
                  value: size,
                  label: size,
                })) || []
              }
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
          key={field.id}
          index={index}
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          setValue={setValue}
          onRemove={() => remove(index)}
          colorOptions={colorOptions}
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
