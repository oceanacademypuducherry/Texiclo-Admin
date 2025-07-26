import { useFormContext, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app";
import { getErrorMessage } from "../../../utils";
import Select from "react-select";
import {
  GET_OPTIONS_CATEGORY,
  GET_OPTIONS_COLLECTIONTYPE,
  GET_OPTIONS_SIZE,
} from "../service";
export const ProductDetails = () => {
  const {
    register,
    control,
    // watch,
    formState: { errors },
  } = useFormContext();

  // console.log(watch());
  // console.log(errors);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchCollections = () => {
    if (!collections || collections.length === 0)
      dispatch(GET_OPTIONS_COLLECTIONTYPE());
  };

  const handleFetchCategories = () => {
    if (!categories || categories.length === 0)
      dispatch(GET_OPTIONS_CATEGORY());
  };

  const handleFetchSizes = () => {
    if (!sizes.length) dispatch(GET_OPTIONS_SIZE());
  };

  const { sizes, gsms, collections, categories } = useSelector(
    (state: RootState) => state.productFormOptions,
  );

  console.log(gsms);

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
          <Controller
            name="collectionType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={collections}
                className="react-select-container"
                classNamePrefix="react-select"
                onFocus={handleFetchCollections}
              />
            )}
          />
          <p className="mt-1 text-sm text-red-500">
            {getErrorMessage(errors.collectionType)}
          </p>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                className="react-select-container"
                classNamePrefix="react-select"
                onFocus={handleFetchCategories}
              />
            )}
          />
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

        {/* <div className="md:col-span-2">
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
        </div> */}
        <div className="md:col-span-2">
          <label className="mb-2 block font-semibold">
            Product Price (by GSM)
          </label>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {gsms.map((gsm, index) => (
              <div key={gsm._id} className="flex flex-col">
                <span className="text-center text-sm font-medium">
                  {gsm.value}
                </span>

                {/* Hidden GSM ID field */}
                <Controller
                  name={`prices.${index}.gsmId`}
                  control={control}
                  defaultValue={gsm._id}
                  render={({ field }) => <input type="hidden" {...field} />}
                />

                {/* Price input */}
                <Controller
                  name={`prices.${index}.amount`}
                  control={control}
                  defaultValue=""
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
                options={sizes}
                className="react-select-container"
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                onFocus={handleFetchSizes}
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
