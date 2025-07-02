import { useDropzone } from 'react-dropzone';
import { MdOutlineCancel } from 'react-icons/md';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { ProductFormInputs, ColorOption } from './ProductForm';
import { useImageCropper } from './useImageCropper';
import { AiOutlineCloudUpload } from 'react-icons/ai';

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
  colorOptions,
  onRemove
}: Props) => {
  const { cropImageFromFile, CropperModal } = useImageCropper();

  const previewImage = watch(`variants.${index}.previewImage`);
  const frontImage = watch(`variants.${index}.frontImage`);
  const backImage = watch(`variants.${index}.backImage`);
  const otherImages = watch(`variants.${index}.otherImages`) || [];

  const handleCropped = (
    field: keyof ProductFormInputs['variants'][0],
    file: File
  ) => {
    setValue(`variants.${index}.${field}`, file, { shouldValidate: true });
  };

  const handleOtherImages = (files: File[]) => {
    if (files.length === 0) return;
    const existing = watch(`variants.${index}.otherImages`) || [];

    cropImageFromFile(files[0], (croppedFile) => {
      const updated = [...existing, croppedFile];
      processOtherImages(files, 1, updated);
    });
  };

  const processOtherImages = (files: File[], startIndex: number, updated: File[]) => {
    if (startIndex >= files.length) {
      setValue(`variants.${index}.otherImages`, updated, { shouldValidate: true });
      return;
    }

    cropImageFromFile(files[startIndex], (cropped) => {
      const nextUpdated = [...updated, cropped];
      processOtherImages(files, startIndex + 1, nextUpdated);
    });
  };

  const getImageDropProps = (field: keyof ProductFormInputs['variants'][0], multiple = false) =>
    useDropzone({
      onDrop: (files) => {
        if (multiple) {
          handleOtherImages(files);
        } else {
          cropImageFromFile(files[0], (file) => handleCropped(field, file));
        }
      },
      multiple
    });

  const previewImageDrop = getImageDropProps('previewImage');
  const frontImageDrop = getImageDropProps('frontImage');
  const backImageDrop = getImageDropProps('backImage');
  const otherImageDrop = getImageDropProps('otherImages', true);

  const renderImagePreview = (image: File | null | undefined, onRemove: () => void) => {
    if (!image) return null;
    const url = URL.createObjectURL(image);
    return (
      <div className="relative w-24 h-24 mt-2">
        <img src={url} alt="Preview" className="w-full h-full object-cover rounded" />
        <button
          onClick={onRemove}
          type="button"
          className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
        >
          <MdOutlineCancel size={18} />
        </button>
      </div>
    );
  };

  const variantErrors = errors?.variants?.[index];

  return (
    <div className=" pt-4 rounded relative mb-4   border-gray-200  p-2  space-y-4">
      <button onClick={onRemove} className="absolute -top-2 right-2 text-red-500">
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
                code: colorOptions.find((c) => c.name === e.target.value)?.code || ''
              })
            }
            className="flex-1 border border-gray-300 p-2 rounded"
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
          <p className="text-red-500 text-sm ml-40">{variantErrors.color.name.message}</p>
        )}
        {variantErrors?.color?.code && (
          <p className="text-red-500 text-sm ml-40">{variantErrors.color.code.message}</p>
        )}
      </div>

      {/* Preview Image */}
      <div className="space-y-1">
        <div className="flex flex-col gap-4">
          <label className="w-33">Preview Image</label>
          <div className="flex-1">
            {!previewImage ? (
              <div {...previewImageDrop.getRootProps()} className="border-dashed border-2 border-gray-300 p-3 rounded text-center cursor-pointer">
                <input {...previewImageDrop.getInputProps()} />
                <p className='text-gray-500'>Upload a preview image</p>
              </div>
            ) : (
              renderImagePreview(previewImage, () =>
                setValue(`variants.${index}.previewImage`, undefined)
              )
            )}
          </div>
        </div>
        {variantErrors?.previewImage && (
          <p className="text-red-500 text-sm ml-40">{variantErrors.previewImage.message}</p>
        )}
      </div>

      {/* Front & Back Images */}
      <div className="grid grid-cols-2 gap-4">
        {[{ label: 'Front Image', drop: frontImageDrop, field: 'frontImage', image: frontImage },
          { label: 'Back Image', drop: backImageDrop, field: 'backImage', image: backImage }
        ].map(({ label, drop, field, image }) => (
          <div key={field} className="space-y-1">
            <label className="block mb-1">{label}</label>
            {!image ? (
              <div {...drop.getRootProps()} className="border-dashed border-2 p-3 rounded border-gray-300 text-center cursor-pointer">
                <input {...drop.getInputProps()} />
                <p className='text-gray-500'>Upload </p>
              </div>
            ) : (
              renderImagePreview(image, () =>
                setValue(`variants.${index}.${field as keyof ProductFormInputs['variants'][0]}`, undefined)
              )
            )}
            {variantErrors?.[field as keyof typeof variantErrors] && (
      <p className="text-red-500 text-sm">
        {variantErrors[field as keyof typeof variantErrors]?.message}
      </p>
    )}
          </div>
        ))}
      </div>

      {/* Other Images */}
      <div className="">
       <div className='flex  justify-between items-center'>
          <label className="block mb-1">Other Images</label>
        <div {...otherImageDrop.getRootProps()} className="border p-2 border-gray-300  bg-gray-200 rounded-lg text-center cursor-pointer w-fit">
          <input {...otherImageDrop.getInputProps()} />
          <div className='flex gap-2 items-center '>
            <p className='text-secondary '>Upload</p>
            <AiOutlineCloudUpload />
          </div>
          
        </div>
       </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {otherImages.map((file: File, i: number) => (
            <div key={i} className="relative w-20 h-20">
              <img src={URL.createObjectURL(file)} alt={`Other ${i}`} className="w-full h-full object-cover rounded" />
              <button
                onClick={() => {
                  const updated = [...otherImages];
                  updated.splice(i, 1);
                  setValue(`variants.${index}.otherImages`, updated, { shouldValidate: true });
                }}
                type="button"
                className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
              >
                <MdOutlineCancel size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Global Cropper Modal */}
      {CropperModal}
    </div>
  );
};
