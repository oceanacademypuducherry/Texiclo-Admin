import { Base64Image } from "../features";

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
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
