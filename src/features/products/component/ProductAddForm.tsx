import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { ProductFormInputs } from "../page";

interface Props {
  register: UseFormRegister<ProductFormInputs>;
  errors: FieldErrors<ProductFormInputs>;
  setValue: any;
  watch: UseFormWatch<ProductFormInputs>;
}

export const ProductAddForm: React.FC<Props> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const onProductDrop = (acceptedFiles: File[]) => {
    setValue("productImage", acceptedFiles, { shouldValidate: true });
  };

  const {
    getRootProps: getProductRootProps,
    getInputProps: getProductInputProps,
    isDragActive: isProductDragActive,
  } = useDropzone({ onDrop: onProductDrop, multiple: true });

  const productImage = watch("productImage");

  return (
    <div className="rounded-md bg-[#F0F0F0] p-4">
      <div>
        <label className="mb-1 block font-semibold">Product Image:</label>
        <div
          {...getProductRootProps()}
          className="hover:border-secondary relative w-full cursor-pointer rounded border-2 border-dashed border-gray-300 py-6 text-center transition"
        >
          <input {...getProductInputProps()} />
          {productImage && productImage.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {productImage.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Product ${index + 1}`}
                  className="h-24 w-24 rounded object-cover"
                />
              ))}
            </div>
          ) : (
            <p>
              {isProductDragActive
                ? "Drop files here..."
                : "Click or drag image here"}
            </p>
          )}
        </div>
        <p className="text-sm text-red-500">{errors.productImage?.message}</p>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label>Color:</label>
          <select {...register("color")} className="w-full rounded border p-2">
            <option value="">Select color</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
          <p className="text-sm text-red-500">{errors.color?.message}</p>
        </div>

        <div>
          <label>GSM:</label>
          <select {...register("gsm")} className="w-full rounded border p-2">
            <option value="">Select GSM</option>
            <option value="120">120</option>
            <option value="150">150</option>
            <option value="180">180</option>
          </select>
          <p className="text-sm text-red-500">{errors.gsm?.message}</p>
        </div>

        <div>
          <label>Size:</label>
          <select {...register("size")} className="w-full rounded border p-2">
            <option value="">Select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <p className="text-sm text-red-500">{errors.size?.message}</p>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full rounded border p-2"
            placeholder="Enter price"
          />
          <p className="text-sm text-red-500">{errors.price?.message}</p>
        </div>

        <div>
          <label>Discount:</label>
          <input
            type="number"
            step="0.01"
            {...register("discount")}
            className="w-full rounded border p-2"
            placeholder="Enter discount"
          />
          <p className="text-sm text-red-500">{errors.discount?.message}</p>
        </div>
      </div>
    </div>
  );
};
