"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cadesCOM = require("./constants/cadesCOM");

/** @description доп.инфа по объектам COM можно посмотреть здесь https://docs.cryptopro.ru/cades/reference/cadescom */

/**
 * Класс для работы с COM-компонентом CAdES
 */
class CadesCOM {
  constructor(args) {
    // Описывает хранилище сертификатов.
    this.O_STORE = args.O_STORE;
    this.O_ATTS = args.O_ATTS;
    this.O_SIGNED_DATA = args.O_SIGNED_DATA;
    this.O_SIGNER = args.O_SIGNER;
    // Описывает используемую версию библиотеки. Присутствуют методы для получения версии, наименования криптопровайдера и т.д.
    this.O_ABOUT = args.O_ABOUT;
    this.O_PRIVATE_KEY = args.O_PRIVATE_KEY;
    this.O_HASHED_DATA = args.O_HASHED_DATA;
  }

  /**
     * Выбирает доступный метод для текущего браузера
     * @param {string} method метод работы для используемого браузера 
     * @returns 
     */
  async createObject(method) {
    const supportedMethod = (await window.cadesplugin.CreateObject) ? await window.cadesplugin.CreateObject(method) : await window.cadesplugin.CreateObjectAsync(method);

    return supportedMethod;
  }

  /**
     * Возвращает созданный объект для взаимодействия с хранилищем
     * @returns {Object}
     */
  oStore() {
    return this.createObject(this.O_STORE);
  }

  /**
     * Возвращает созданный объект для работы с атрибутами
     * @returns {Object}
     */
  oAtts() {
    return this.createObject(this.O_ATTS);
  }

  /**
     * Возвращает созданный объект для работы с механизмом подписи
     * @returns {Object}
     */
  oSignedData() {
    return this.createObject(this.O_SIGNED_DATA);
  }

  /**
     * Возвращает созданный объект который содержит информацию по подписи
     * @returns {Object}
     */
  oSigner() {
    return this.createObject(this.O_SIGNER);
  }

  /**
     * Возвращает созданный объект который содержит обобщенную информацю (версия плагина, используемый криптопровайдер и т.д.)
     * @returns {Object}
     */
  oAbout() {
    return this.createObject(this.O_ABOUT);
  }

  /**
     * Возвращает созданный объект для получения информацию по закрытому ключу
     * @returns {Object}
     */
  oPrivateKey() {
    return this.createObject(this.O_PRIVATE_KEY);
  }

  /**
     * Возвращает созданный объект для работы с хешированными данными
     * @returns {Object}
     */
  oHashedData() {
    return this.createObject(this.O_HASHED_DATA);
  }
} /** @fileoverview COM-компонент для работы с CAdES */

const cadesCOM = new CadesCOM(_cadesCOM.ARGS_INIT_CADES_COM);

exports.default = cadesCOM;