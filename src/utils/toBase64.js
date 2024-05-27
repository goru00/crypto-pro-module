/**
 * Конвертация файловых данных в base64
 * @param {File} file переданный файл
 * @returns {string} возвращает строку в формате base64s
 */
export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });
}
