/** @fileoverview Реализация API к cadesplugin_api КриптоПро */
import CadesAdjuster from "./CadesAdjuster";
import cadesCOM from "./CadesCOM";
import { CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME, CAPICOM_CERTIFICATE_FIND, CAPICOM_CERTIFICATE_INCLUDE, CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE, CAPICOM_PROPID, CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED } from "./constants/CryptoProAPI";
import { CADESCOM_BASE64_TO_BINARY, CADESCOM_CADES_BES } from "./constants/cadesCOM";
import { toBase64 } from "./utils/toBase64";

/**
 * Класс, реализующий API к cadesplugin_api КриптоПро
 */
class CryptoProAPI {
  /**
     * Возвращает полную информацию о используемом плагине, криптопровайдере, сертификатах и т.д.
     * @async
     * @returns {Object} 
     */
  async about() {
    try {
      return await cadesCOM.oAbout();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Вощвращает информацию об используемой версии КриптоПро CSP
     * @async
     * @returns {Object}
     */
  async getCSPVersion() {
    try {
      const about = await this.about();
      const CSPVersion = await about.CSPVersion();
      return await CSPVersion.toString();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Возвращает версию браузерного плагина для взаимодействия с КриптоПро CSP
     * @async
     * @returns {Object}
     */
  async getPluginVersion() {
    try {
      const about = await this.about();
      const PluginVersion = await about.PluginVersion;
      return PluginVersion.toString();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Возвращает информацию по наименованию криптопровайдера
     * @returns {Object}
     */
  async getCSPName() {
    try {
      const about = await this.about();
      return await about.CSPName();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Возвращает составную информацию, содержающую: версия плагина, версия криптопровайдера, наименование криптопровайдера
     * @async
     * @returns {Object}
     */
  async description() {
    try {
      const CSPVersion = await this.getCSPVersion();
      const PluginVersion = await this.getPluginVersion();
      const CSPName = await this.getCSPName();
      return {
        CSPVersion,
        PluginVersion,
        CSPName
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Возвращает список сертификатов, найденных на ЖМД и на других носителях
     * @async
     * @returns {Object}
     */
  async getCertsList() {
    try {
      const _oStore = await cadesCOM.oStore();
      await _oStore.Open(
        CAPICOM_CURRENT_USER_STORE,
        CAPICOM_MY_STORE,
        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
      );

      const certificates = await _oStore.Certificates;

      if (!certificates) {
        throw new Error('Нет доступных сертификатов!');
      }

      const findCertificate = await certificates.Find(CAPICOM_CERTIFICATE_FIND.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
      const findCertsWithPrivateKey = await findCertificate.Find(
        CAPICOM_CERTIFICATE_FIND.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
        CAPICOM_PROPID.CAPICOM_PROPID_KEY_PROV_INFO
      );

      const count = await findCertsWithPrivateKey.Count;

      if (!count) {
        throw new Error('Нет сертификатов с приватным ключём');
      }

      const createCertList = [];

      for (let index = 0; index < count; index++) {
        const certApi = await findCertsWithPrivateKey.Item(index + 1);
        const certificateAdjuster = new CadesAdjuster({
          certApi,
          issuerInfo: await certApi.IssuerName,
          privateKey: await certApi.PrivateKey,
          serialNumber: await certApi.SerialNumber,
          subjectInfo: await certApi.SubjectName,
          thumbprint: await certApi.Thumbprint,
          validPeriod: {
            from: await certApi.ValidFromDate,
            to: await certApi.ValidToDate
          }
        });

        createCertList.push(certificateAdjuster);
      }

      _oStore.Close();

      return createCertList;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
     * Получить детальную информацию по подписи
     * @async
     * @param {string} thumbprint отпечаток подписи 
     * @returns 
     */
  async getCertInfo(thumbprint) {
    try {
      if (!thumbprint) {
        throw new Error('Не указано thumbprint значение сертификата')
      } else if (typeof thumbprint !== 'string') {
        throw new Error('Не валидное значение thumbprint сертификата')
      }
      const oStore = await cadesCOM.oStore()

      await oStore.Open(
        CAPICOM_CURRENT_USER_STORE,
        CAPICOM_MY_STORE,
        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
      );

      const certificates = await oStore.Certificates;
      const count = await certificates.Count;
      const findCertificate = await certificates.Find(CAPICOM_CERTIFICATE_FIND.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
      if (count) {
        const certificateItem = await findCertificate.Item(1);
        oStore.Close();

        return certificateItem;
      }
      throw new Error(
                `Произошла ошибка при получении сертификата по thumbprint значению: ${thumbprint}`,
      );
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
     * Подписать в формате base64
     * @async
     * @param {string} thumbprint сертификат (отпечаток).
     * @param {string} msg сообщение (или файл), которое собираемся подписывать
     * @param {Boolean} type тип подписи true=откреплённая false=прикреплённая  
     * @returns 
     */
  async signBase64(thumbprint, msg, type = true) {
    try {
      let oAttrs;
      let oSignedData;
      let oSigner;

      try {
        oAttrs = await cadesCOM.oAtts();
        oSignedData = await cadesCOM.oSignedData();
        oSigner = await cadesCOM.oSigner();
      } catch (err) {
        throw new Error(`Ошибка инициализации подписи: ${String(err)}`);
      }

      const cert = await this.getCertInfo(thumbprint);
      const authenticatedAttributes2 = await oSigner.AuthenticatedAttributes2;

      await oAttrs.propset_Name(CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
      await oAttrs.propset_Value(new Date())

      let msgBase64;

      try {
        msgBase64 = await toBase64(msg);
      } catch (err) {
        throw new Error(`Ошибка при преобразовании сообщения в Base64: ${String(err)}`);
      }

      const header = ';base64,';

      const msgBase64Data = msgBase64.slice(
        msgBase64.indexOf(header) + header.length
      );

      const contentType = msgBase64.slice(0, msgBase64.indexOf(header)).split(':')[1];

      try {
        await authenticatedAttributes2.Add(oAttrs);
        await oSignedData.propset_ContentEncoding(CADESCOM_BASE64_TO_BINARY);
        await oSignedData.propset_Content(msgBase64Data);
        await oSigner.propset_Certificate(cert);
        await oSigner.propset_Options(CAPICOM_CERTIFICATE_INCLUDE.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);
      } catch (err) {
        console.error(err);
        throw new Error('Ошибка при указании данных для подписи');
      }

      try {
        const signature = await oSignedData.SignCades(oSigner, CADESCOM_CADES_BES, type);
        return {
          signature,
          contentType
        }
      } catch (err) {
        throw new Error(`Ошибка при подписании данных: ${String(err)}`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new CryptoProAPI();
