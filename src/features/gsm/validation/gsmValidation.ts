import * as yup from "yup";

export const addGsmValidation = yup.object().shape({
  gsm: yup
    .number()
    .typeError("GSM must be a number")
    .required("GSM is required")
    .positive("GSM must be a positive number")
    .min(1, "GSM must be at least 1")
    .max(1200, "GSM must be less than 1200"),
});
export const updateGsmValidation = yup.object().shape({
  gsm: yup
    .number()
    .typeError("GSM must be a number")
    .required("GSM is required")
    .positive("GSM must be a positive number")
    .min(1, "GSM must be at least 1")
    .max(1200, "GSM must be less than 1200"),
});
