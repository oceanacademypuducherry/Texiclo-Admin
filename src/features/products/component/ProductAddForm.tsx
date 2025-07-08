import { useDropzone } from "react-dropzone";
import { MdOutlineCancel } from "react-icons/md";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useImageCropper } from "./useImageCropper";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { JSX, useEffect, useState } from "react";
import { ProductFormValues } from "./AddProductForm";
import { ColorsData } from "../../color";

interface Props {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  control: Control<ProductFormValues>;
  index: number;
  colorOptions: ColorsData[];
  onRemove: () => void;
}

export const ProductAddForm = ({
  register,
  errors,
  setValue,
  watch,
  index,
  control,
  colorOptions,
  onRemove,
}: Props) => {
  const { cropImageFromFile, CropperModal } = useImageCropper();

  const [files, setFiles] = useState<
    Record<"previewImage" | "frontImage" | "backImage", File | null>
  >({
    previewImage: null,
    frontImage: null,
    backImage: null,
  });

  const [urls, setUrls] = useState<
    Record<"previewImage" | "frontImage" | "backImage", string | null>
  >({
    previewImage: null,
    frontImage: null,
    backImage: null,
  });

  const otherImages = watch(`variants.${index}.otherImages`) || [];

  // Update preview URLs when file changes
  useEffect(() => {
    (["previewImage", "frontImage", "backImage"] as const).forEach((key) => {
      const base64 = watch(`variants.${index}.${key}`);
      if (typeof base64 === "string" && base64.startsWith("data:image")) {
        setUrls((prev) => ({ ...prev, [key]: base64 }));
      } else {
        setUrls((prev) => ({ ...prev, [key]: null }));
      }
    });
  }, [watch(`variants.${index}`)]);

  const handleCropped = (
    field: keyof ProductFormValues["variants"][0],
    file: File,
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      const variants = [...(watch("variants") ?? [])];
      const updatedVariant = { ...variants[index], [field]: base64String };
      variants[index] = updatedVariant;

      setValue("variants", variants, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      if (["previewImage", "frontImage", "backImage"].includes(field)) {
        setFiles((prev) => ({ ...prev, [field]: file }));
      }
    };
    reader.readAsDataURL(file); // read file as base64
  };

  const handleOtherImages = (files: File[]) => {
    if (files.length === 0) return;
    cropImageFromFile(files[0], (croppedFile) => {
      const updated = [...otherImages, croppedFile];
      processOtherImages(files, 1, updated);
    });
  };

  const processOtherImages = (
    files: File[],
    startIndex: number,
    updated: (File | string)[],
  ) => {
    if (startIndex >= files.length) {
      setValue(`variants.${index}.otherImages`, updated, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return;
    }

    cropImageFromFile(files[startIndex], (cropped) => {
      processOtherImages(files, startIndex + 1, [...updated, cropped]);
    });
  };

  const getDropzoneProps = (
    field: keyof ProductFormValues["variants"][0],
    multiple = false,
  ) =>
    useDropzone({
      onDrop: (files) => {
        if (multiple) {
          handleOtherImages(files);
        } else {
          cropImageFromFile(files[0], (file) => handleCropped(field, file));
        }
      },
      multiple,
    });

  const renderImage = (
    url: string | null,
    onRemove: () => void,
  ): JSX.Element | null => {
    if (!url) return null;
    return (
      <div className="relative mt-2 h-24 w-24">
        <img
          src={url}
          alt="Preview"
          className="h-full w-full rounded object-cover"
        />
        <button
          onClick={onRemove}
          type="button"
          className="absolute top-0 right-0 rounded-full bg-white p-1 text-red-600 shadow"
        >
          <MdOutlineCancel size={18} />
        </button>
      </div>
    );
  };
  const otherImageDropzone = getDropzoneProps("otherImages", true);
  const variantErrors = errors?.variants?.[index];

  return (
    <div className="relative mb-4 space-y-4 rounded border border-gray-200 p-2 pt-4">
      <button
        onClick={onRemove}
        className="absolute -top-2 right-2 text-red-500"
      >
        <MdOutlineCancel size={20} />
      </button>

      {/* Color Dropdown */}
      <div className="space-y-1">
        <div className="flex items-center">
          <label className="w-33">Color</label>
          <select
            {...register(`variants.${index}.color.name`)}
            onChange={(e) => {
              const name = e.target.value;
              const code = colorOptions.find((c) => c.colorName === name);
              setValue(`variants.${index}.color`, {
                name,
                code: code?.colorValue || "",
              });
            }}
            className="flex-1 rounded border border-gray-300 p-2"
          >
            <option value="">Choose Color</option>
            {colorOptions?.map((c) => (
              <option key={c._id} value={c.colorValue}>
                {c.colorName}
              </option>
            ))}
          </select>
        </div>
        {variantErrors?.color?.name && (
          <p className="ml-40 text-sm text-red-500">
            {variantErrors.color.name.message}
          </p>
        )}
        {variantErrors?.color?.code && (
          <p className="ml-40 text-sm text-red-500">
            {variantErrors.color.code.message}
          </p>
        )}
      </div>

      {/* Preview, Front, and Back Images */}
      {(["previewImage", "frontImage", "backImage"] as const).map((field) => {
        const drop = getDropzoneProps(field);
        return (
          <div key={field} className="space-y-1">
            <label className="block">{field.replace(/Image/, "")} Image</label>
            {!files[field] ? (
              <div
                {...drop.getRootProps()}
                className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
              >
                <input {...drop.getInputProps()} />
                <p className="text-gray-500">Upload</p>
              </div>
            ) : (
              renderImage(urls[field], () => {
                setFiles((prev) => ({ ...prev, [field]: null }));
                setValue(`variants.${index}.${field}`, null, {
                  shouldValidate: true,
                });
              })
            )}
            {variantErrors?.[field] && (
              <p className="text-sm text-red-500">
                {variantErrors[field]?.message}
              </p>
            )}
          </div>
        );
      })}

      {/* Other Images */}
      <div>
        <div>
          <div className="flex items-center justify-between">
            <label className="mb-1 block">Other Images</label>
            <div
              {...otherImageDropzone.getRootProps()}
              className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-gray-200 p-2 text-center"
            >
              <input {...otherImageDropzone.getInputProps()} />
              <div className="flex items-center gap-2">
                <p className="text-secondary">Upload</p>
                <AiOutlineCloudUpload />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {Array.isArray(otherImages) &&
            otherImages?.map((img, i) => {
              const url =
                img instanceof File
                  ? URL.createObjectURL(img)
                  : (img as string);
              return (
                <div key={i} className="relative h-20 w-20">
                  <img
                    src={url}
                    alt={`Other ${i}`}
                    className="h-full w-full rounded object-cover"
                  />
                  <button
                    onClick={() => {
                      const updated = [...otherImages];
                      updated.splice(i, 1);
                      setValue(`variants.${index}.otherImages`, updated, {
                        shouldValidate: true,
                      });
                    }}
                    type="button"
                    className="absolute top-0 right-0 rounded-full bg-white p-1 text-red-600 shadow"
                  >
                    <MdOutlineCancel size={18} />
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      {CropperModal}
    </div>
  );
};
