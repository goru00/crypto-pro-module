import CryptoProAPI from './CryptoProAPI.js';

/** Инициализация работы ЭЦП КриптоПро */
const init = async () => {
  try {
    if (window.cadesplugin === undefined) {
      // подключаем API КриптоПРО
      require('./lib/cadesplugin_api.js');
      await window.cadesplugin;
    }

    return CryptoProAPI;
  } catch (err) {
    throw new Error(err);
  }
}

export default init;