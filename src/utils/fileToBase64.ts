export const fileToBase64 = (file: File | null): Promise<string> | null => {
  if (file != null) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }
  return null;
};
