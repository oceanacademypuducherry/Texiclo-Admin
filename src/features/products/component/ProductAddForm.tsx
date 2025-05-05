import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Control,
} from "react-hook-form";
import Select from "react-select";
import { ProductFormInputs } from "../page";

interface Props {
  register: UseFormRegister<ProductFormInputs>;
  errors: FieldErrors<ProductFormInputs>;
  setValue: UseFormSetValue<ProductFormInputs>;
  watch: UseFormWatch<ProductFormInputs>;
  control: Control<ProductFormInputs>;
}

const gsmOptions = [
  { value: "120", label: "120" },
  { value: "150", label: "150" },
  { value: "180", label: "180" },
];

const sizeOptions = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
];

export const ProductAddForm: React.FC<Props> = ({
  register,
  errors,
  setValue,
  watch,
  control,
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
          <label>GSM (Multiple):</label>
          <Controller
            name="gsm"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={gsmOptions}
                value={field.value?.map((val: string) =>
                  gsmOptions.find((opt) => opt.value === val),
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((opt) => opt.value))
                }
                className="text-sm"
              />
            )}
          />
          <p className="text-sm text-red-500">{errors.gsm?.message}</p>
        </div>

        <div>
          <label>Size (Multiple):</label>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={sizeOptions}
                value={field.value?.map((val: string) =>
                  sizeOptions.find((opt) => opt.value === val),
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((opt) => opt.value))
                }
                className="text-sm"
              />
            )}
          />
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
