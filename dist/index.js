'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CryptoProAPI = require('./CryptoProAPI.js');

var _CryptoProAPI2 = _interopRequireDefault(_CryptoProAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// подключаем API КриптоПРО
require('./lib/cadesplugin_api.js');

/** Инициализация работы ЭЦП КриптоПро */
const init = () => {
  return new Promise((resolve, reject) => {
    if (window.cadesplugin !== undefined) {
      undefined.cadesplugin = window.cadesplugin;
      resolve(_CryptoProAPI2.default);
    }

    const scriptCryptoProWeb = document.createElement('script');
    scriptCryptoProWeb.id = 'crypto-pro';
    scriptCryptoProWeb.src = './lib/cadesplugin_api.js';
    document.body.appendChild(scriptCryptoProWeb);

    scriptCryptoProWeb.onerror = e => {
      reject(e);
    };

    scriptCryptoProWeb.onload = () => {
      undefined.cadesplugin = window.cadesplugin;
      resolve(_CryptoProAPI2.default);
    };
  });
};

exports.default = init;
