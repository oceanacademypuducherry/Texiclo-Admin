
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {  getVariantFieldError } from '../../../utils';
import { addLocalVariant } from '../redux';
import { ImageCropUpload } from './ImageCropUpload';

export const ProductVariants = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();

  const { fields, append,remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleAddVariant = () => {
    append({
      color: { name: '', code: '' },
      previewImage: null,
      frontImage: null,
      backImage: null,
      otherImages: [],
    });
    dispatch(addLocalVariant());
  };

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Product Variants</h3>

   {fields.map((field, index) => (
  <div key={field.id} className="border border-gray-300 p-4 mb-6 rounded relative">
     {fields.length > 1 && index > 0 && (
      <button
        type="button"
        className="absolute border px-2 rounded-full top-2 right-2 text-red-500 font-bold text-xl"
        onClick={() => remove(index)}
        title="Remove Variant"
      >
        ×
      </button>
    )}
    <h4 className="text-md text-slate-600 font-semibold mb-4">Variant {index + 1}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold mb-1">Color Name</label>
        <input
          {...register(`variants.${index}.color.name`)}
          className="input w-full"
        />
        <p className="text-red-500 text-sm mt-1">
          {getVariantFieldError(errors, index, 'color.name')}
        </p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Color Code</label>
        <input
          type="color"
          {...register(`variants.${index}.color.code`)}
          className="h-10 w-full rounded"
        />
        <p className="text-red-500 text-sm mt-1">
          {getVariantFieldError(errors, index, 'color.code')}
        </p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Preview Image</label>
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
        <p className="text-red-500 text-sm mt-1">
          {getVariantFieldError(errors, index, 'previewImage')}
        </p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Front Image</label>
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
        <p className="text-red-500 text-sm mt-1">
          {getVariantFieldError(errors, index, 'frontImage')}
        </p>
      </div>

      <div>
        <label className="block font-semibold mb-1">Back Image</label>
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
        <p className="text-red-500 text-sm mt-1">
          {getVariantFieldError(errors, index, 'backImage')}
        </p>
      </div>

      <div className="md:col-span-2">
        <label className="block font-semibold mb-1">Other Images</label>
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


      <div className="text-center">
        <button
          type="button"
          onClick={handleAddVariant}
          className="bg-white border-2 border-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>
    </section>
  );
};

