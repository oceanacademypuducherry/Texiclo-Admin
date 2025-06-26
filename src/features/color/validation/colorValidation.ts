import * as yup from "yup";

export const colorValidationSchema = yup.object().shape({
  colorName: yup
    .string()
    .required("Color name is required")
    .trim()
    .min(2, "Color name must be at least 2 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Color name must only contain letters and spaces",
    ),

  selectedColor: yup
    .string()
    .required("Color value is required")
    .matches(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color"),
});
