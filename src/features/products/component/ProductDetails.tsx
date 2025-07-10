import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../app";
import { getErrorMessage } from "../../../utils";
import Select from "react-select";
export const ProductDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { sizes } = useSelector((state: RootState) => state.size);
  const { gsms } = useSelector((state: RootState) => state.gsm);
  const sizeOptions = sizes.map((size) => ({
    value: size.size,
    label: size.size,
  }));
  return (
    <section className="max-w-xl rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col">
        <div>
          <label className="mb-1 block font-semibold">Product Name</label>
          <input {...register("productName")} className="input w-full" />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.productName)}
          </p>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Collection Type</label>
          <input {...register("collectionType")} className="input w-full" />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.collectionType)}
          </p>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Category</label>
          <input {...register("category")} className="input w-full" />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.category)}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block font-semibold">Description</label>
          <input {...register("description")} className="input w-full" />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.description)}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-semibold">
            Product Price (by GSM)
          </label>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {gsms.map((gsm) => (
              <div key={gsm._id} className="flex flex-col">
                <span className="text-center text-sm font-medium">
                  {gsm.value}
                </span>
                <Controller
                  name={`prices.${gsm.value}`}
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
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.prices)}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-semibold">Sizes</label>
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={sizeOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
              />
            )}
          />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.sizes)}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block font-semibold">Discount (%)</label>
          <input
            type="number"
            {...register("discount")}
            className="input w-full"
          />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.discount)}
          </p>
        </div>
      </div>
    </section>
  );
};
