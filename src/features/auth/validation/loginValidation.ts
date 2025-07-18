import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const otpValidationSchema = yup.object().shape({
  otp: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^\d$/, "Each OTP digit must be a number")
        .required("OTP digit is required"),
    )
    .length(6, "OTP must be exactly 6 digits"),
});
