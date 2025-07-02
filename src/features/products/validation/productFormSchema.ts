import * as yup from 'yup';

export const productSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  collectionType: yup.string().required('Collection type is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  discount: yup
    .number()
    .min(0, "Discount can't be less than 0")
    .max(100, "Discount can't be more than 100")
    .typeError('Discount must be a number'),

  prices: yup
    .object()
    .test('at-least-one-price', 'At least one price is required', (value) => {
      console.log(value)
      if (!value) return false;
      return Object.values(value).some((val) => val !== undefined && val !== null && val !== '');
    }),

  sizes: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one size must be selected'),

  variants: yup
    .array()
    .of(
      yup.object().shape({
        color: yup.object().shape({
          name: yup.string().required('Color name is required'),
          // code: yup
            // .string()
            // .matches(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color code')
            // .required('Color code is required'),
        }),
        previewImage: yup
          .mixed<File>()
          .required('Preview image is required')
          .test('filePresent', 'Preview image is required', (file) => !!file),
        frontImage: yup
        .mixed<File>() .required('Front image is required')
          .test('filePresent', 'Front image is required', (file) => !!file),
        backImage: yup
        .mixed<File>()
        .required('Back image is required')
          .test('filePresent', 'Back image is required', (file) => !!file),
        
      })
    )
    .min(1, 'At least one product variant is required'),
});
