import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { IoMdAddCircle } from "react-icons/io";
import { productSchema } from "../validation";
import { ProductAddForm } from "../component";

export type ProductFormInputs = {
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  previewImage: File[];
  productImage: File[];
  color: string;
  gsm: string;
  size: string;
  price: number;
  discount: number;
};

export const ProductAddPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data: ProductFormInputs) => {
    console.log("Submitted Data:", data);
  };

  const onPreviewDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue("previewImage", acceptedFiles, { shouldValidate: true });
    },
    [setValue],
  );

  const {
    getRootProps: getPreviewRootProps,
    getInputProps: getPreviewInputProps,
    isDragActive: isPreviewDragActive,
  } = useDropzone({ onDrop: onPreviewDrop, multiple: true });

  const previewImage = watch("previewImage");

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            {...register("productName")}
            className="w-full rounded border p-2"
            placeholder="Enter product name"
          />
          <p className="text-sm text-red-500">{errors.productName?.message}</p>
        </div>

        <div>
          <label>Collection Type:</label>
          <input
            type="text"
            {...register("collectionType")}
            className="w-full rounded border p-2"
            placeholder="Enter collection type"
          />
          <p className="text-sm text-red-500">
            {errors.collectionType?.message}
          </p>
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            {...register("category")}
            className="w-full rounded border p-2"
            placeholder="Enter category"
          />
          <p className="text-sm text-red-500">{errors.category?.message}</p>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            {...register("description")}
            className="w-full rounded border p-2"
            rows={4}
            placeholder="Enter product description"
          />
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        </div>

        {/* Preview Image Dropzone */}
        <div>
          <label className="mb-1 block font-semibold">Preview Image:</label>
          <div
            {...getPreviewRootProps()}
            className="hover:border-primary relative w-full cursor-pointer rounded border-2 border-dashed border-gray-300 py-6 text-center transition"
          >
            <input {...getPreviewInputProps()} />
            {previewImage && previewImage.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {previewImage.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 rounded object-cover"
                  />
                ))}
              </div>
            ) : (
              <p>
                {isPreviewDragActive
                  ? "Drop files here..."
                  : "Click or drag image here"}
              </p>
            )}
          </div>
          <p className="text-sm text-red-500">{errors.previewImage?.message}</p>
        </div>

        {/* Reusable Product Form Fields */}
        <ProductAddForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        <div className="mt-4 flex flex-col items-center gap-2">
          <IoMdAddCircle
            size={28}
            className="text-secondary hover:text-primary"
          />
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-4 py-2 font-medium transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
