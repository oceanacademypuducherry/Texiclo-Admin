import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdCloseCircle } from "react-icons/io";
import { RootState, AppDispatch } from "../../../app/store";
import { setBulkEdit, updateMany } from "../redux";
import { bulkEditValidation } from "../validation";
import { DropzoneField } from "./DropzoneField";

type BannerFormData = {
  id: string;
  position: number;
  image: File | string | null;
};

export const BulkEditModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isBulkEdit, banners } = useSelector(
    (state: RootState) => state.banners,
  );

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ banners: BannerFormData[] }>({
    resolver: yupResolver(bulkEditValidation),
    defaultValues: { banners: [] },
  });

  const { fields, replace, update } = useFieldArray({
    control,
    name: "banners",
  });

  useEffect(() => {
    if (isBulkEdit) {
      replace(banners);
      reset({ banners });
    }
  }, [isBulkEdit]);

  const handleDrop = (index: number) => (files: File[]) => {
    if (files[0]) {
      update(index, { ...fields[index], image: files[0] });
    }
  };

  const handleRemoveImage = (index: number) => {
    update(index, { ...fields[index], image: null });
  };

  const handleSave = (data: { banners: BannerFormData[] }) => {
    dispatch(updateMany(data.banners));
    dispatch(setBulkEdit(false));
  };

  if (!isBulkEdit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl sm:max-w-2xl"
      >
        <button
          onClick={() => dispatch(setBulkEdit(false))}
          type="button"
          className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-700"
        >
          <IoMdCloseCircle />
        </button>

        <h2 className="mb-6 text-center text-xl font-bold">Edit Banners</h2>

        {/* Global array-level error (like sequential/unique) */}
        {errors.banners?.root?.message && (
          <p className="mb-4 text-center text-sm font-semibold text-red-600">
            {errors.banners.root.message}
          </p>
        )}

        <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-2">
          {fields.map((field, index) => {
            const bannerErrors = errors?.banners?.[index];

            return (
              <div
                key={field.id}
                className="flex flex-col items-center justify-center gap-x-4 gap-y-4 p-4 sm:flex-row"
              >
                {/* Position Input */}
                <div>
                  <div className="flex flex-col items-center">
                    <label className="mb-1 text-sm font-medium">Position</label>
                    <input
                      type="number"
                      min={1}
                      {...register(`banners.${index}.position` as const)}
                      className="w-24 rounded border px-3 py-2 text-center focus:border-black focus:outline-none"
                    />
                    {bannerErrors?.position && (
                      <p className="mt-1 text-xs text-red-500">
                        {bannerErrors.position.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropzone */}
                <div className="flex flex-col">
                  <DropzoneField
                    index={index}
                    image={field.image}
                    onDrop={handleDrop(index)}
                    onRemove={() => handleRemoveImage(index)}
                  />
                  {bannerErrors?.image && (
                    <p className="mt-2 text-center text-xs text-red-500">
                      {bannerErrors.image.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            type="submit"
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => dispatch(setBulkEdit(false))}
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary w-full rounded-md px-6 py-3 font-medium sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
