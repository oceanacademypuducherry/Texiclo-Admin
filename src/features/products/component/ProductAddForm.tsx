import { useDropzone } from "react-dropzone";
import { MdOutlineCancel } from "react-icons/md";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProductFormInputs, ColorOption } from "./ProductForm";
import { useImageCropper } from "./useImageCropper";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEffect, useState } from "react";

interface Props {
  register: UseFormRegister<ProductFormInputs>;
  errors: FieldErrors<ProductFormInputs>;
  setValue: UseFormSetValue<ProductFormInputs>;
  watch: UseFormWatch<ProductFormInputs>;
  control: Control<ProductFormInputs>;
  index: number;
  colorOptions: ColorOption[];
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

  // ————
  // Local state for image files (source of truth for previews)
  // ————
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  // ————
  // Local state for object URLs (to display as previews)
  // ————
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [frontUrl, setFrontUrl] = useState<string | null>(null);
  const [backUrl, setBackUrl] = useState<string | null>(null);

  // Update preview URL when previewFile changes
  useEffect(() => {
    if (previewFile) {
      const url = URL.createObjectURL(previewFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [previewFile]);

  // Update front URL when frontFile changes
  useEffect(() => {
    if (frontFile) {
      const url = URL.createObjectURL(frontFile);
      setFrontUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFrontUrl(null);
    }
  }, [frontFile]);

  // Update back URL when backFile changes
  useEffect(() => {
    if (backFile) {
      const url = URL.createObjectURL(backFile);
      setBackUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setBackUrl(null);
    }
  }, [backFile]);

  // ————
  // Other images are still stored in the form state (they’re a list)
  // ————
  const otherImages = watch(`variants.${index}.otherImages`) || [];

  // ————
  // Handling cropped images: update both form state and local state if needed
  // ————
  const handleCropped = (
    field: keyof ProductFormInputs["variants"][0],
    file: File,
  ) => {
    setValue(`variants.${index}.${field}`, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    if (field === "previewImage") {
      setPreviewFile(file);
    } else if (field === "frontImage") {
      setFrontFile(file);
    } else if (field === "backImage") {
      setBackFile(file);
    }
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
      const nextUpdated = [...updated, cropped];
      processOtherImages(files, startIndex + 1, nextUpdated);
    });
  };

  // ————
  // Dropzone setup
  // ————
  const getImageDropProps = (
    field: keyof ProductFormInputs["variants"][0],
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

  const previewImageDrop = getImageDropProps("previewImage");
  const frontImageDrop = getImageDropProps("frontImage");
  const backImageDrop = getImageDropProps("backImage");
  const otherImageDrop = getImageDropProps("otherImages", true);

  // ————
  // Render helper for image preview with removal
  // ————
  const renderImagePreview = (url: string | null, onRemove: () => void) => {
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

  const variantErrors = watch(`variants.${index}`) && errors?.variants?.[index];

  return (
    <div className="relative mb-4 space-y-4 rounded border-gray-200 p-2 pt-4">
      <button
        onClick={onRemove}
        className="absolute -top-2 right-2 text-red-500"
      >
        <MdOutlineCancel size={20} />
      </button>

      {/* Color Selection */}
      <div className="space-y-1">
        <div className="flex items-center">
          <label className="w-33">Color</label>
          <select
            {...register(`variants.${index}.color.name`)}
            onChange={(e) =>
              setValue(`variants.${index}.color`, {
                name: e.target.value,
                code:
                  colorOptions.find((c) => c.name === e.target.value)?.code ||
                  "",
              })
            }
            className="flex-1 rounded border border-gray-300 p-2"
          >
            <option value="">Choose Color</option>
            {colorOptions.map((color) => (
              <option key={color.name} value={color.name}>
                {color.name}
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

      {/* Preview Image */}
      <div className="space-y-1">
        <label className="w-33">Preview Image</label>
        {!previewFile ? (
          <div
            {...previewImageDrop.getRootProps()}
            className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
          >
            <input {...previewImageDrop.getInputProps()} />
            <p className="text-gray-500">Upload a preview image</p>
          </div>
        ) : (
          renderImagePreview(previewUrl, () => {
            // Clear both local state and form value for previewImage
            setPreviewFile(null);
            setValue(`variants.${index}.previewImage`, undefined, {
              shouldValidate: true,
            });
          })
        )}
        {variantErrors?.previewImage && (
          <p className="ml-40 text-sm text-red-500">
            {variantErrors.previewImage.message}
          </p>
        )}
      </div>

      {/* Front & Back Images */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: "Front Image",
            drop: frontImageDrop,
            field: "frontImage",
            file: frontFile,
            url: frontUrl,
          },
          {
            label: "Back Image",
            drop: backImageDrop,
            field: "backImage",
            file: backFile,
            url: backUrl,
          },
        ].map(({ label, drop, field, file, url }) => (
          <div key={field} className="space-y-1">
            <label className="mb-1 block">{label}</label>
            {!file ? (
              <div
                {...drop.getRootProps()}
                className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
              >
                <input {...drop.getInputProps()} />
                <p className="text-gray-500">Upload</p>
              </div>
            ) : (
              renderImagePreview(url, () => {
                // Clear local and form for the field
                if (field === "frontImage") {
                  setFrontFile(null);
                } else if (field === "backImage") {
                  setBackFile(null);
                }
                setValue(`variants.${index}.${field}` as any, undefined, {
                  shouldValidate: true,
                });
              })
            )}
            {variantErrors?.[field as keyof typeof variantErrors] && (
              <p className="text-sm text-red-500">
                {variantErrors[field as keyof typeof variantErrors]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Other Images */}
      <div>
        <div className="flex items-center justify-between">
          <label className="mb-1 block">Other Images</label>
          <div
            {...otherImageDrop.getRootProps()}
            className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-gray-200 p-2 text-center"
          >
            <input {...otherImageDrop.getInputProps()} />
            <div className="flex items-center gap-2">
              <p className="text-secondary">Upload</p>
              <AiOutlineCloudUpload />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {otherImages.map((img, i) => {
            // For other images, create an object URL on the fly.
            // (You might consider a similar local state approach if needed.)
            const url =
              img instanceof File ? URL.createObjectURL(img) : (img as string);
            return (
              <div key={i} className="relative h-20 w-20">
                <img
                  src={url || ""}
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
