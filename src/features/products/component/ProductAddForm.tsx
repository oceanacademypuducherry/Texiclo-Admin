// import { useDropzone } from "react-dropzone";
// import { MdOutlineCancel } from "react-icons/md";
// import {
//   Control,
//   FieldErrors,
//   UseFormRegister,
//   UseFormSetValue,
//   UseFormWatch,
//   useWatch,
// } from "react-hook-form";
// import { ProductFormInputs, ColorOption } from "./ProductForm";
// import { useImageCropper } from "./useImageCropper";
// import { AiOutlineCloudUpload } from "react-icons/ai";

// interface Props {
//   register: UseFormRegister<ProductFormInputs>;
//   errors: FieldErrors<ProductFormInputs>;
//   setValue: UseFormSetValue<ProductFormInputs>;
//   watch: UseFormWatch<ProductFormInputs>;
//   control: Control<ProductFormInputs>;
//   index: number;
//   colorOptions: ColorOption[];
//   onRemove: () => void;
// }

// export const ProductAddForm = ({
//   register,
//   errors,
//   setValue,
//   watch,
//   index,
//   control,
//   colorOptions,
//   onRemove,
// }: Props) => {
//   const { cropImageFromFile, CropperModal } = useImageCropper();

//   const previewImage = useWatch({
//     name: `variants.${index}.previewImage`,
//     control,
//   });
//   const frontImage = useWatch({
//     name: `variants.${index}.frontImage`,
//     control,
//   });
//   const backImage = useWatch({ name: `variants.${index}.backImage`, control });
//   const otherImages =
//     useWatch({ name: `variants.${index}.otherImages`, control }) || [];

//   const handleCropped = (
//     field: keyof ProductFormInputs["variants"][0],
//     file: File,
//   ) => {
//     setValue(`variants.${index}.${field}`, file, {
//       shouldValidate: true,
//       shouldDirty: true,
//       shouldTouch: true,
//     });
//   };

//   const handleOtherImages = (files: File[]) => {
//     if (files.length === 0) return;
//     const existing = watch(`variants.${index}.otherImages`) || [];

//     cropImageFromFile(files[0], (croppedFile) => {
//       const updated = [...existing, croppedFile];
//       processOtherImages(files, 1, updated);
//     });
//   };

//   const processOtherImages = (
//     files: File[],
//     startIndex: number,
//     updated: File[],
//   ) => {
//     if (startIndex >= files.length) {
//       setValue(`variants.${index}.otherImages`, updated, {
//         shouldValidate: true,
//         shouldDirty: true,
//         shouldTouch: true,
//       });

//       return;
//     }

//     cropImageFromFile(files[startIndex], (cropped) => {
//       const nextUpdated = [...updated, cropped];
//       processOtherImages(files, startIndex + 1, nextUpdated);
//     });
//   };

//   const getImageDropProps = (
//     field: keyof ProductFormInputs["variants"][0],
//     multiple = false,
//   ) =>
//     useDropzone({
//       onDrop: (files) => {
//         if (multiple) {
//           handleOtherImages(files);
//         } else {
//           cropImageFromFile(files[0], (file) => handleCropped(field, file));
//         }
//       },
//       multiple,
//     });

//   const previewImageDrop = getImageDropProps("previewImage");
//   const frontImageDrop = getImageDropProps("frontImage");
//   const backImageDrop = getImageDropProps("backImage");
//   const otherImageDrop = getImageDropProps("otherImages", true);

//   // const renderImagePreview = (image: File | null |string| undefined, onRemove: () => void) => {
//   //   if (!image) return null;
//   //   // const url = URL.createObjectURL(image);
//   //   return (
//   //     <div className="relative w-24 h-24 mt-2">
//   //       <img src={url} alt="Preview" className="w-full h-full object-cover rounded" />
//   //       <button
//   //         onClick={onRemove}
//   //         type="button"
//   //         className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
//   //       >
//   //         <MdOutlineCancel size={18} />
//   //       </button>
//   //     </div>
//   //   );
//   // };
//   const renderImagePreview = (
//     image: File | string | null | undefined,
//     onRemove: () => void,
//   ) => {
//     if (!image) return null;

//     let url: string;

//     if (typeof image === "string") {
//       url = image; // from edit mode (URL from DB)
//     } else if (image instanceof File) {
//       url = URL.createObjectURL(image);
//     } else if (typeof image === "string" && image.startsWith("data:image")) {
//       url = image;
//     } else {
//       return null;
//     }

//     return (
//       <div className="relative mt-2 h-24 w-24">
//         <img
//           src={url}
//           alt="Preview"
//           className="h-full w-full rounded object-cover"
//         />
//         <button
//           onClick={onRemove}
//           type="button"
//           className="absolute top-0 right-0 rounded-full bg-white p-1 text-red-600 shadow"
//         >
//           <MdOutlineCancel size={18} />
//         </button>
//       </div>
//     );
//   };

//   const variantErrors = errors?.variants?.[index];

//   return (
//     <div className="relative mb-4 space-y-4 rounded border-gray-200 p-2 pt-4">
//       <button
//         onClick={onRemove}
//         className="absolute -top-2 right-2 text-red-500"
//       >
//         <MdOutlineCancel size={20} />
//       </button>

//       {/* Color Selection */}
//       <div className="space-y-1">
//         <div className="flex items-center">
//           <label className="w-33">Color</label>
//           <select
//             {...register(`variants.${index}.color.name`)}
//             onChange={(e) =>
//               setValue(`variants.${index}.color`, {
//                 name: e.target.value,
//                 code:
//                   colorOptions.find((c) => c.name === e.target.value)?.code ||
//                   "",
//               })
//             }
//             className="flex-1 rounded border border-gray-300 p-2"
//           >
//             <option value="">Choose Color</option>
//             {colorOptions.map((color) => (
//               <option key={color.name} value={color.name}>
//                 {color.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {variantErrors?.color?.name && (
//           <p className="ml-40 text-sm text-red-500">
//             {variantErrors.color.name.message}
//           </p>
//         )}
//         {variantErrors?.color?.code && (
//           <p className="ml-40 text-sm text-red-500">
//             {variantErrors.color.code.message}
//           </p>
//         )}
//       </div>

//       {/* Preview Image */}
//       <div className="space-y-1">
//         <div className="flex flex-col gap-4">
//           <label className="w-33">Preview Image</label>
//           <div className="flex-1">
//             {!previewImage ? (
//               <div
//                 {...previewImageDrop.getRootProps()}
//                 className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
//               >
//                 <input {...previewImageDrop.getInputProps()} />
//                 <p className="text-gray-500">Upload a preview image</p>
//               </div>
//             ) : (
//               renderImagePreview(previewImage, () =>
//                 setValue(`variants.${index}.previewImage`, undefined),
//               )
//             )}
//           </div>
//         </div>
//         {variantErrors?.previewImage && (
//           <p className="ml-40 text-sm text-red-500">
//             {variantErrors.previewImage.message}
//           </p>
//         )}
//       </div>

//       {/* Front & Back Images */}
//       <div className="grid grid-cols-2 gap-4">
//         {[
//           {
//             label: "Front Image",
//             drop: frontImageDrop,
//             field: "frontImage",
//             image: frontImage,
//           },
//           {
//             label: "Back Image",
//             drop: backImageDrop,
//             field: "backImage",
//             image: backImage,
//           },
//         ].map(({ label, drop, field, image }) => (
//           <div key={field} className="space-y-1">
//             <label className="mb-1 block">{label}</label>
//             {!image ? (
//               <div
//                 {...drop.getRootProps()}
//                 className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
//               >
//                 <input {...drop.getInputProps()} />
//                 <p className="text-gray-500">Upload </p>
//               </div>
//             ) : (
//               renderImagePreview(image, () =>
//                 setValue(
//                   `variants.${index}.${field as keyof ProductFormInputs["variants"][0]}`,
//                   undefined,
//                 ),
//               )
//             )}
//             {variantErrors?.[field as keyof typeof variantErrors] && (
//               <p className="text-sm text-red-500">
//                 {variantErrors[field as keyof typeof variantErrors]?.message}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Other Images */}
//       <div className="">
//         <div className="flex items-center justify-between">
//           <label className="mb-1 block">Other Images</label>
//           <div
//             {...otherImageDrop.getRootProps()}
//             className="w-fit cursor-pointer rounded-lg border border-gray-300 bg-gray-200 p-2 text-center"
//           >
//             <input {...otherImageDrop.getInputProps()} />
//             <div className="flex items-center gap-2">
//               <p className="text-secondary">Upload</p>
//               <AiOutlineCloudUpload />
//             </div>
//           </div>
//         </div>

//         <div className="mt-2 flex flex-wrap gap-2">
//           {/* {otherImages.map((file: File |string, i: number) => (
//             <div key={i} className="relative w-20 h-20">
//               <img src={URL.createObjectURL(file)} alt={`Other ${i}`} className="w-full h-full object-cover rounded" />
//               <button
//                 onClick={() => {
//                   const updated = [...otherImages];
//                   updated.splice(i, 1);
//                   setValue(`variants.${index}.otherImages`, updated, { shouldValidate: true });
//                 }}
//                 type="button"
//                 className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
//               >
//                 <MdOutlineCancel size={18} />
//               </button>
//             </div>
//           ))} */}
//           {otherImages.map((fileOrUrl: File | string, i: number) => {
//             const url =
//               typeof fileOrUrl === "string"
//                 ? fileOrUrl
//                 : URL.createObjectURL(fileOrUrl);

//             return (
//               <div key={i} className="relative h-20 w-20">
//                 <img
//                   src={url}
//                   alt={`Other ${i}`}
//                   className="h-full w-full rounded object-cover"
//                 />
//                 <button
//                   onClick={() => {
//                     const updated = [...otherImages];
//                     updated.splice(i, 1);
//                     setValue(`variants.${index}.otherImages`, updated, {
//                       shouldValidate: true,
//                     });
//                   }}
//                   type="button"
//                   className="absolute top-0 right-0 rounded-full bg-white p-1 text-red-600 shadow"
//                 >
//                   <MdOutlineCancel size={18} />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Global Cropper Modal */}
//       {CropperModal}
//     </div>
//   );
// };
import { useDropzone } from "react-dropzone";
import { MdOutlineCancel } from "react-icons/md";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";
import { ProductFormInputs, ColorOption } from "./ProductForm";
import { useImageCropper } from "./useImageCropper";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEffect } from "react";
import { ImagePreview } from "./ImagePreview";

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

  const previewImage = watch(`variants.${index}.previewImage`);
  const frontImage = watch(`variants.${index}.frontImage`);
  const backImage = watch(`variants.${index}.backImage`);
  const otherImages = watch(`variants.${index}.otherImages`) || [];

  const handleCropped = (
    field: keyof ProductFormInputs["variants"][0],
    file: File,
  ) => {
    console.log("Cropped file for", field, file);
    setValue(`variants.${index}.${field}`, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleOtherImages = (files: File[]) => {
    if (files.length === 0) return;
    const existing = watch(`variants.${index}.otherImages`) || [];

    cropImageFromFile(files[0], (croppedFile) => {
      const updated = [...existing, croppedFile];
      processOtherImages(files, 1, updated);
    });
  };

  const processOtherImages = (
    files: File[],
    startIndex: number,
    updated: File[],
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

  // ✅ Fixed Hooks (moved out of function)
  const previewImageDrop = useDropzone({
    onDrop: (files) => {
      cropImageFromFile(files[0], (file) =>
        handleCropped("previewImage", file),
      );
    },
    multiple: false,
  });

  const frontImageDrop = useDropzone({
    onDrop: (files) => {
      cropImageFromFile(files[0], (file) => handleCropped("frontImage", file));
    },
    multiple: false,
  });

  const backImageDrop = useDropzone({
    onDrop: (files) => {
      cropImageFromFile(files[0], (file) => handleCropped("backImage", file));
    },
    multiple: false,
  });

  const otherImageDrop = useDropzone({
    onDrop: (files) => {
      handleOtherImages(files);
    },
    multiple: true,
  });

  const variantErrors = errors?.variants?.[index];

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
        <div className="flex flex-col gap-4">
          <label className="w-33">Preview Image</label>
          <div className="flex-1">
            {!previewImage ? (
              <div
                {...previewImageDrop.getRootProps()}
                className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
              >
                <input {...previewImageDrop.getInputProps()} />
                <p className="text-gray-500">Upload a preview image</p>
              </div>
            ) : (
              <ImagePreview
                image={previewImage}
                onRemove={() =>
                  setValue(`variants.${index}.previewImage`, undefined, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
              />
            )}
          </div>
        </div>
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
            image: frontImage,
          },
          {
            label: "Back Image",
            drop: backImageDrop,
            field: "backImage",
            image: backImage,
          },
        ].map(({ label, drop, field, image }) => (
          <div key={field} className="space-y-1">
            <label className="mb-1 block">{label}</label>
            {!image ? (
              <div
                {...drop.getRootProps()}
                className="cursor-pointer rounded border-2 border-dashed border-gray-300 p-3 text-center"
              >
                <input {...drop.getInputProps()} />
                <p className="text-gray-500">Upload</p>
              </div>
            ) : (
              <ImagePreview
                image={image}
                onRemove={() =>
                  setValue(
                    `variants.${index}.${field as keyof ProductFormInputs["variants"][0]}`,
                    undefined,
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    },
                  )
                }
              />
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
      <div className="">
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
          {otherImages.map((img, i) => (
            <ImagePreview
              key={i}
              image={img}
              onRemove={() => {
                const updated = [...otherImages];
                updated.splice(i, 1);
                setValue(`variants.${index}.otherImages`, updated, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            />
          ))}
        </div>
      </div>

      {CropperModal}
    </div>
  );
};
