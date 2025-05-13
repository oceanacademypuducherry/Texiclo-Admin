import React, { useCallback } from "react";
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
import { MdOutlineCancel } from "react-icons/md";

interface Props {
  register: UseFormRegister<ProductFormInputs>;
  errors: FieldErrors<ProductFormInputs>;
  setValue: UseFormSetValue<ProductFormInputs>;
  watch: UseFormWatch<ProductFormInputs>;
  control: Control<ProductFormInputs>;
  index: number;
  onRemove: () => void;
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
  index,
  onRemove,
}) => {
  const onProductDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(`products.${index}.productImage`, acceptedFiles, {
        shouldValidate: true,
      });
    },
    [index, setValue],
  );
  const {
    getRootProps: getProductRootProps,
    getInputProps: getProductInputProps,
    isDragActive: isProductDragActive,
  } = useDropzone({ onDrop: onProductDrop, multiple: true });

  const productImage = watch(`products.${index}.productImage`);
  const makeOptions = (data: string[] = []) => {
    return data.map((e) => {
      const option = { value: e, label: e };
      return option;
    });
  };

  return (
    <div className="relative rounded-md bg-[#F0F0F0] p-4">
      {index > 0 && (
        <div
          onClick={onRemove}
          className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
          title="Remove Product"
        >
          <MdOutlineCancel />
        </div>
      )}

      <div>
        <label className="mb-1 block font-semibold">Product Image:</label>
        <div
          {...getProductRootProps()}
          className="hover:border-secondary relative w-full cursor-pointer rounded border-2 border-dashed border-gray-300 py-6 text-center transition"
        >
          <input {...getProductInputProps()} />
          {productImage && productImage.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {productImage.map((file, index) => {
                const imageUrl =
                  typeof file === "string" ? file : URL.createObjectURL(file); // Check if file is a string
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-24 rounded object-cover"
                  />
                );
              })}
            </div>
          ) : (
            <p>
              {isProductDragActive
                ? "Drop files here..."
                : "Click or drag image here"}
            </p>
          )}
        </div>
        <p className="text-sm text-red-500">
          {errors?.products?.[index]?.productImage?.message}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label>Color:</label>
          <select
            {...register(`products.${index}.color`)}
            className="w-full rounded border p-2"
          >
            <option value="">Select color</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
          <p className="text-sm text-red-500">
            {errors?.products?.[index]?.color?.message}
          </p>
        </div>

        <div>
          <label>GSM (Multiple):</label>
          <Controller
            name={`products.${index}.gsm`}
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={gsmOptions}
                defaultValue={makeOptions(field.value || [])}
                onChange={(selected) =>
                  field.onChange(selected.map((opt) => opt.value))
                }
                className="text-sm"
              />
            )}
          />
          <p className="text-sm text-red-500">
            {" "}
            {errors?.products?.[index]?.gsm?.message}
          </p>
        </div>

        <div>
          <label>Size (Multiple):</label>
          <Controller
            name={`products.${index}.size`}
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={sizeOptions}
                value={
                  field.value?.map((val: string) =>
                    sizeOptions.find((opt) => opt.value === val),
                  ) || []
                }
                onChange={(selected) =>
                  field.onChange(selected.map((opt) => opt.value))
                }
                className="text-sm"
              />
            )}
          />
          <p className="text-sm text-red-500">
            {errors?.products?.[index]?.size?.message}
          </p>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            {...register(`products.${index}.price`)}
            className="w-full rounded border p-2"
            placeholder="Enter price"
          />
          <p className="text-sm text-red-500">
            {" "}
            {errors?.products?.[index]?.price?.message}
          </p>
        </div>

        <div>
          <label>Discount:</label>
          <input
            type="number"
            step="0.01"
            {...register(`products.${index}.discount`)}
            className="w-full rounded border p-2"
            placeholder="Enter discount"
          />
          <p className="text-sm text-red-500">
            {" "}
            {errors?.products?.[index]?.discount?.message}
          </p>
        </div>
      </div>
    </div>
  );
};
