
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app';
import { getErrorMessage } from '../../../utils';


export const ProductDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const {sizes} = useSelector((state: RootState) => state.size); 
  const {gsms} = useSelector((state: RootState) => state.gsm);   

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input {...register('productName')} className="input w-full" />
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.productName)}</p>
        </div>

        <div>
          <label className="block font-semibold mb-1">Collection Type</label>
          <input {...register('collectionType')} className="input w-full" />
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.collectionType)}</p>
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input {...register('category')} className="input w-full" />
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.category)}</p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Description</label>
          <input {...register('description')} className="input w-full" />
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.description)}</p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Product Price (by GSM)</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {gsms.map((gsm) => (
              <div key={gsm._id} className="flex flex-col">
                <span className="text-sm font-medium text-center">{gsm.gsm}</span>
                <Controller
                  name={`prices.${gsm.gsm}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="input text-center"
                      placeholder="₹"
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.prices)}</p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Sizes</label>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size) => (
              <label key={size._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size.size}
                  {...register('sizes')}
                  className="accent-black"
                />
                <span>{size.size}</span>
              </label>
            ))}
          </div>
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.sizes)}</p>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Discount (%)</label>
          <input type="number" {...register('discount')} className="input w-full" />
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(errors.discount)}</p>
        </div>
      </div>
    </section>
  );
};


