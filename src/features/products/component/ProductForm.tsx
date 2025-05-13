import { useFieldArray, useForm } from "react-hook-form";
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
  previewImage: (File | string)[];
  products: {
    productImage: (File | string)[];
    color: string;
    gsm: string[];
    size: string[];
    price: number;
    discount: number;
  }[];
};

type ProductFormProps = {
  existingProductData?: ProductFormInputs;
  onSubmit: (data: ProductFormInputs) => void;
};

export const ProductForm = ({
  existingProductData,
  onSubmit,
}: ProductFormProps) => {
  const isUpdate = !!existingProductData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(productSchema),
    defaultValues: existingProductData || { products: [{}] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onPreviewDrop = (acceptedFiles: File[]) => {
    setValue("previewImage", acceptedFiles, { shouldValidate: true });
  };

  const {
    getRootProps: getPreviewRootProps,
    getInputProps: getPreviewInputProps,
    isDragActive: isPreviewDragActive,
  } = useDropzone({ onDrop: onPreviewDrop, multiple: true });

  const previewImage = watch("previewImage");

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {isUpdate ? "Update Product" : "Add Product"}
      </h1>
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
                {previewImage.map((file, index) => {
                  const imageUrl =
                    typeof file === "string" ? file : URL.createObjectURL(file);
                  return (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 rounded object-cover"
                    />
                  );
                })}
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
        {fields.map((field, index) => (
          <ProductAddForm
            key={field.id}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            control={control}
            index={index}
            onRemove={() => {
              if (fields.length > 1) remove(index);
            }}
          />
        ))}

        <div className="mt-4 flex flex-col items-center gap-2">
          <IoMdAddCircle
            size={28}
            className="text-secondary hover:text-primary"
            onClick={() => append({})}
          />
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary rounded px-4 py-2 font-medium transition"
          >
            {isUpdate ? "Update" : "Add"} Product
          </button>
        </div>
      </form>
    </div>
  );
};
