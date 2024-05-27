'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CryptoProAPI = require('./CryptoProAPI.js');

var _CryptoProAPI2 = _interopRequireDefault(_CryptoProAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Инициализация работы ЭЦП КриптоПро */
const init = async () => {
  try {
    if (window.cadesplugin === undefined) {
      // подключаем API КриптоПРО
      require('./lib/cadesplugin_api.js');
      await window.cadesplugin;
    }

    return _CryptoProAPI2.default;
  } catch (err) {
    throw new Error(err);
  }
};

exports.default = init;