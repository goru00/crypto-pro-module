import CryptoProAPI from './CryptoProAPI.js';

// подключаем API КриптоПРО
require('./lib/cadesplugin_api.js');

/** Инициализация работы ЭЦП КриптоПро */
const init = () => {
  return new Promise((resolve, reject) => {
    if (window.cadesplugin !== undefined) {
      this.cadesplugin = window.cadesplugin;
      resolve(CryptoProAPI);
    }

    const scriptCryptoProWeb = document.createElement('script');
    scriptCryptoProWeb.id = 'crypto-pro';
    scriptCryptoProWeb.src = './lib/cadesplugin_api.js';
    document.body.appendChild(scriptCryptoProWeb)

    scriptCryptoProWeb.onerror = (e) => { reject(e); }

    scriptCryptoProWeb.onload = () => {
      this.cadesplugin = window.cadesplugin;
      resolve(CryptoProAPI);
    }
  });
}

export default init;
