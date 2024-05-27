'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @fileoverview Взаимодействие и детальная информация по сертификатам */

/**
 * Класс для взаимодействия с сертификатами на устройствах
 */
class CadesAdjuster {
  /**
     * 
     * @param {object} arg объекты для взаимодействия с сертификатами
     */
  constructor(arg) {
    const { certApi, issuerInfo, privateKey, serialNumber, thumbprint, subjectInfo, validPeriod } = arg;
    this.certApi = certApi;
    this.issuerInfo = issuerInfo;
    this.privateKey = privateKey;
    this.serialNumber = serialNumber;
    this.thumbprint = thumbprint;
    this.subjectInfo = subjectInfo;
    this.validPeriod = validPeriod;
  }

  /**
     * возвращает объект из сформированных значений в формате key: value
     * @param {object} subjectIssuer 
     * @returns {object}
     */
  getInfo(subjectIssuer) {
    if (!this[subjectIssuer]) {
      throw new Error('Не верно указан аттрибут');
    }

    const subjectIssuerArr = this[subjectIssuer].split(', ');
    const _possibleInfo = this.possibleInfo(subjectIssuer);

    const formedSubjectIssuerInfo = {};

    subjectIssuerArr.map(tag => {
      const tagArr = tag.split('=');
      tagArr[0] = `${tagArr[0]}=`;

      formedSubjectIssuerInfo[_possibleInfo[tagArr[0]]] = tagArr[1];
    });

    return formedSubjectIssuerInfo;
  }

  /**
     * Возвращает распаршенную информацию о строке subjectInfo в формате key: value
     * @returns {object}
     */
  getSubjectInfo() {
    return this.getInfo('subjectInfo');
  }

  /**
     * Возвращает объект из сформированных значений
     * @param {object} subjectIssuer 
     * @returns 
     */
  friendlyInfo(subjectIssuer) {
    if (!this[subjectIssuer]) {
      throw new Error('Не верно указан аттрибут');
    }

    const subjectIssuerArr = this[subjectIssuer].split(', ');
    const _possibleInfo = this.possibleInfo(subjectIssuer);
    const formedSubjectIssuerInfo = subjectIssuerArr.map(tag => {
      const tagArr = tag.split('=');
      tagArr[0] = `${tagArr[0]}=`;

      return {
        text: tagArr[1],
        value: _possibleInfo[tagArr[0]]
      };
    });

    return formedSubjectIssuerInfo;
  }

  /**
     * Возвращает распаршенную информацию о строке subjectInfo
     * @returns {Array}
     */
  friendlySubjectInfo() {
    return this.friendlyInfo('subjectInfo');
  }

  /**
     * Возвращает распаршенную информацию о строке issuerInfo
     * @returns {Array}
     */
  friendlyIssuerInfo() {
    return this.friendlyInfo('issuerInfo');
  }

  /**
     * Возвращает распаршенную информацию об объекте validPeriod
     * @returns {object}
     */
  friendlyValidPeriod() {
    const { from, to } = this.validPeriod;

    return {
      from: this.friendlyDate(from),
      to: this.friendlyDate(to)
    };
  }

  /**
     * Функция формирует ключи и значения в зависимости от переданного параметра
     * @param {string} subjectIssuer раздел информации 'issuerInfo' или 'subjectInfo'
     * @returns 
     */
  possibleInfo(subjectIssuer) {
    const attrs = {
      'UnstructuredName=': 'Неструктурированное имя',
      'E=': 'Email',
      'C=': 'Страна',
      'S=': 'Регион',
      'L=': 'Город',
      'STREET=': 'Адрес',
      'O=': 'Компания',
      'T=': 'Должность',
      'ОГРНИП=': 'ОГРНИП',
      'OGRNIP=': 'ОГРНИП',
      'SNILS=': 'СНИЛС',
      'СНИЛС=': 'СНИЛС',
      'INN=': 'ИНН',
      'ИНН=': 'ИНН',
      'ИНН ЮЛ=': 'ИНН_ЮЛ',
      'ОГРН=': 'ОГРН',
      'OGRN=': 'ОГРН'
    };

    switch (subjectIssuer) {
      case 'subjectInfo':
        attrs['SN='] = 'Фамилия';
        attrs['G='] = 'Имя/Отчество';
        attrs['CN='] = 'Владелец';
        attrs['OU='] = 'Отдел/подразделение';

        return attrs;
      case 'issuerInfo':
        attrs['CN='] = 'Удостоверяющий центр';
        attrs['OU='] = 'Тип';

        return attrs;

      default:
        throw new Error('Не верно указан кейс получаемых данных');
    }
  }

  /**
     * Формирует дату от переданного пареметра
     * @param {string} date строка с датой 
     * @returns 
     */
  friendlyDate(date) {
    const newDate = new Date(date);
    const [day, month, year] = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
    const [hours, minutes, seconds] = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];

    return {
      ddmmyy: `${day}/${month}/${year}`,
      hhmmss: `${hours}:${minutes}:${seconds}`
    };
  }

  /**
     * Прозиводит проверку на валидность сертификата
     * @async
     * @returns {Boolean} возвращает валидность сертификата (true/false)
     */
  async isValid() {
    try {
      const isValid = await this.certApi.IsValid();

      return await isValid.Result;
    } catch (error) {
      throw new Error(`Произошла ошибка при проверке валидности сертификата: ${error.message}`);
    }
  }
}

exports.default = CadesAdjuster;