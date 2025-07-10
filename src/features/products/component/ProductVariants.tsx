import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getVariantFieldError } from "../../../utils";
import { addLocalVariant } from "../redux";
import { ImageCropUpload } from "./ImageCropUpload";
import { IoAddCircle } from "react-icons/io5";

export const ProductVariants = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddVariant = () => {
    append({
      color: { name: "", code: "" },
      previewImage: null,
      frontImage: null,
      backImage: null,
      otherImages: [],
    });
    dispatch(addLocalVariant());
  };

  return (
    <section className="max-w-xl rounded-lg bg-gray-50 p-6 shadow-md">
      <h3 className="mb-4 text-lg font-bold">Product Variants</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative mb-6 rounded border border-gray-300 p-4"
        >
          {fields.length > 1 && index > 0 && (
            <button
              type="button"
              className="absolute top-2 right-2 rounded-full border px-2 text-xl font-bold text-red-500"
              onClick={() => remove(index)}
              title="Remove Variant"
            >
              ×
            </button>
          )}
          <h4 className="text-md mb-4 font-semibold text-slate-600">
            Variant {index + 1}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8">
              <div>
                <label className="mb-1 block font-semibold">Color Name</label>
                <input
                  {...register(`variants.${index}.color.name`)}
                  className="input w-full"
                />
                <p className="mt-1 text-sm text-red-500">
                  {getVariantFieldError(errors, index, "color.name")}
                </p>
              </div>

              <div>
                <label className="mb-1 block font-semibold">Color Code</label>
                <input
                  type="color"
                  {...register(`variants.${index}.color.code`)}
                  className="h-10 w-10 rounded-xl"
                />
                <p className="mt-1 text-sm text-red-500">
                  {getVariantFieldError(errors, index, "color.code")}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <label className="mb-1 block font-semibold">Preview Image</label>
              <div className="pr-10">
                <Controller
                  name={`variants.${index}.previewImage`}
                  control={control}
                  render={({ field }) => (
                    <ImageCropUpload
                      file={field.value}
                      onChange={field.onChange}
                      label="Upload Preview"
                    />
                  )}
                />
                <p className="mt-1 text-sm text-red-500">
                  {getVariantFieldError(errors, index, "previewImage")}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <label className="mb-1 block font-semibold">Front Image</label>
              <div className="pr-10">
                <Controller
                  name={`variants.${index}.frontImage`}
                  control={control}
                  render={({ field }) => (
                    <ImageCropUpload
                      file={field.value}
                      onChange={field.onChange}
                      label="Upload Front"
                    />
                  )}
                />
                <p className="mt-1 text-sm text-red-500">
                  {getVariantFieldError(errors, index, "frontImage")}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <label className="mb-1 block font-semibold">Back Image</label>
              <div className="pr-10">
                <Controller
                  name={`variants.${index}.backImage`}
                  control={control}
                  render={({ field }) => (
                    <ImageCropUpload
                      file={field.value}
                      onChange={field.onChange}
                      label="Upload Back"
                    />
                  )}
                />
                <p className="mt-1 text-sm text-red-500">
                  {getVariantFieldError(errors, index, "backImage")}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block font-semibold">Other Images</label>
              <Controller
                name={`variants.${index}.otherImages`}
                control={control}
                render={({ field }) => (
                  <ImageCropUpload
                    isMultiple={true}
                    file={field.value}
                    onChange={field.onChange}
                    label="Upload Other"
                  />
                )}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddVariant}
          className="flex h-10 w-10 items-center justify-center rounded-full"
        >
          <IoAddCircle className="text-gray-400" size={32} />
        </button>
      </div>
    </section>
  );
};
