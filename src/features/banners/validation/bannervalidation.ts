import * as yup from "yup";

export const addBannerValidation = yup.object().shape({
  position: yup
    .number()
    .typeError("Position must be a number")
    .required("Position is required")
    .integer("Position must be an integer")
    .min(1, "Position must be at least 1"),

  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only JPG, PNG, and GIF images are allowed", (value) => {
      if (!value || !(value instanceof File)) return false;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(value.type);
    })
    .test("fileSize", "Image must be less than 350KB", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 350 * 1024;
    }),
});
