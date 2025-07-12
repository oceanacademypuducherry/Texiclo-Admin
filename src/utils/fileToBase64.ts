import { Base64Image } from "../features";

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const fileToBase64Image = (file: File): Promise<Base64Image> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        base64: reader.result as string,
      });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const base64ToBlob = async (base64Data: string): Promise<Blob> => {
  const response = await fetch(base64Data);
  const blob = await response.blob();
  return blob;
};

type Base64FileInput = {
  name: string; // e.g. "image.png"
  type: string; // e.g. "image/png"
  base64: string; // data:image/png;base64,iVBORw0KGgoAAAANS...
};

export const base64ToFile = async ({
  name,
  type,
  base64,
}: Base64FileInput): Promise<File> => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], name, { type });
};
