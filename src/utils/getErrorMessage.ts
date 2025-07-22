/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/formUtils.ts
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

export const getErrorMessage = (
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined,
): string | null => {
  if (!error) return null;
  if (typeof error === "string") return error;
  if ("message" in error) return error.message as string;
  return null;
};

export const getVariantFieldError = (
  errors: FieldErrors,
  index: number,
  field:
    | "color.name"
    | "color.code"
    | "variantImage"
    | "frontImage"
    | "backImage",
): string | null => {
  const variant = (errors?.variants as any)?.[index];
  if (!variant) return null;

  const fieldParts = field.split(".");
  let current = variant;
  for (const part of fieldParts) {
    current = current?.[part];
    if (!current) break;
  }

  return typeof current?.message === "string" ? current.message : null;
};
