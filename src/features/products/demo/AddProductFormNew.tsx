/* eslint-disable @typescript-eslint/no-explicit-any */
// src/forms/AddProductForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app';
import { productSchema } from '../validation';
import { addNewProduct } from '../redux';
import { ProductDetails } from './ProductDetails';
import { ProductVariants } from './ProductVariants';
import { FormSyncWatcher } from './FormSynchWatcher';


export const AddProductFormNew = () => {
    const { formData } = useSelector((state: RootState) => state.productForm);
    const methods = useForm({
        defaultValues: formData,
        resolver: yupResolver(productSchema),
        mode: 'onBlur',
    });
    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        dispatch(addNewProduct(data));
        console.log('Submitted form:', data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
                <FormSyncWatcher />
                <ProductDetails />
                <ProductVariants />
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white py-2 px-6 rounded hover:bg-opacity-80 transition"
                    >
                        Submit Product
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};


