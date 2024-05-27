"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Конвертация файловых данных в base64
 * @param {File} file переданный файл
 * @returns {string} возвращает строку в формате base64s
 */
const toBase64 = exports.toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = error => reject(error);
  });
};