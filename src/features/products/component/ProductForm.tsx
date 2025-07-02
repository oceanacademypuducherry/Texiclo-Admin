import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductAddForm } from './ProductAddForm';
import Select from 'react-select';
import { IoMdAddCircle } from 'react-icons/io';
import { productSchema } from '../validation';

export type GSMOption = number;
export type SizeOption = string;
export type ColorOption = { name: string; code: string };

export type ProductFormInputs = {
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  prices: { [gsm: string]: number };
  sizes: SizeOption[];
  discount: number;
  variants: {
    color: ColorOption;
    previewImage: File | null;
    frontImage: File | null;
    backImage: File | null;
    otherImages: File[];
  }[];
};

export const ProductForm = () => {
  const gsmOptions: GSMOption[] = [120, 140, 160, 180, 200, 220];
  const sizeOptions: SizeOption[] = ['S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions: ColorOption[] = [
    { name: 'Black', code: '#000000' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Yellow', code: '#FFFF00' }
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      productName: '',
      collectionType: '',
      category: '',
      description: '',
      prices: {},
      sizes: [],
      discount: 0,
      variants: [
        {
          color: { name: '', code: '' },
          previewImage: null,
          frontImage: null,
          backImage: null,
          otherImages: []
        }
      ]
    }
  });
  console.log(errors)

  const { fields, append, remove } = useFieldArray({ control, name: 'variants' });

  const onSubmit = (data: ProductFormInputs) => {
    console.log('Form Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white  shadow rounded space-y-6">
      {/* Basic Fields */}
      {[
        { name: 'productName', label: 'Product Name' },
        { name: 'collectionType', label: 'Collection Type' },
        { name: 'category', label: 'Category' }
      ].map(({ name, label }) => (
        <div key={name} className="space-y-1">
          <div className="flex items-center ">
            <label className="w-36">{label}</label>
            <input
              {...register(name as keyof ProductFormInputs)}
              className="flex-1 border p-2 rounded border-gray-300"
            />
          </div>
          {errors[name as keyof ProductFormInputs] && (
            <p className="text-red-500 text-sm ml-40">
              {errors[name as keyof ProductFormInputs]?.message as string}
            </p>
          )}
        </div>
      ))}

      {/* Description */}
      <div className="space-y-1">
        <div className="flex items-center">
          <label className="w-36">Description</label>
          <textarea
            {...register('description')}
            className="flex-1 border p-2 rounded border-gray-300"
            rows={2}
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm ml-40">{errors.description.message}</p>
        )}
      </div>

      {/* Prices by GSM */}
      <div className='flex items-start gap-4 '>
        <label className="block mb-2 w-36">Product Price</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gsmOptions.map((gsm) => (
            <div key={gsm} className="space-y-1"> 
              <div className="flex justify-center  flex-col gap-2">
                <label className="w-24">{gsm} GSM</label>
                <input
                  type="number"
                  {...register(`prices.${gsm}`)}
                  className="flex-1 p-2 border rounded border-gray-300"
                  placeholder="₹"
                />
              </div>
            </div>
          ))}
        </div>
        {errors.prices && (
          <p className="text-red-500 text-sm">{errors.prices.root.message}</p>
        )}
      </div>

      {/* Sizes */}
      <div className="">
        <div className="flex items-center">
          <label className="w-33">Sizes</label>
          <div className="flex-1">
            <Select
              isMulti
              options={sizeOptions.map((s) => ({ value: s, label: s }))}
              onChange={(selected) =>
                setValue('sizes', selected.map((s) => s.value), { shouldValidate: true })
              }
            />
          </div>
        </div>
        {errors.sizes && (
          <p className="text-red-500 text-sm ml-40">{errors.sizes.message}</p>
        )}
      </div>

      {/* Discount */}
      <div className="">
        <div className="flex items-center ">
          <label className="w-33">Discount %</label>
          <input
            type="number"
            {...register('discount')}
            className="w-32 border p-2 rounded border-gray-300"
          />
        </div>
        {errors.discount && (
          <p className="text-red-500 text-sm ml-40">{errors.discount.message}</p>
        )}
      </div>

      {/* Variants */}
      {fields.map((field, index) => (
        <ProductAddForm
          key={field.id}
          index={index}
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          setValue={setValue}
          onRemove={() => remove(index)}
          colorOptions={colorOptions}
        />
      ))}

      {/* Add Variant & Submit */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() =>
            append({
              color: { name: '', code: '' },
              previewImage: null,
              frontImage: null,
              backImage: null,
              otherImages: []
            })
          }
          className="flex items-center gap-2 text-gray-500"
        >
          <IoMdAddCircle size={20} /> 
        </button>

        <button type="submit" className="bg-primary text-secondary  font-medium px-6 py-2 rounded hover:bg-secondary hover:text-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
