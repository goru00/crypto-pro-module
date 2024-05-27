const ARGS_INIT_CADES_COM = {
  O_STORE: 'CAdESCOM.Store',
  O_ATTS: 'CADESCOM.CPAttribute',
  O_SIGNED_DATA: 'CAdESCOM.CadesSignedData',
  O_SIGNER: 'CAdESCOM.CPSigner',
  O_SIGNED_XML: 'CAdESCOM.SignedXML',
  O_ABOUT: 'CAdESCOM.About',
  O_PRIVATE_KEY: 'CAdESCOM.ICPPrivateKey',
  O_PUBLIC_KEY: 'CAdESCOM.PublicKey',
  O_HASHED_DATA: 'CAdESCOM.HashedData'
};

/**
 * @constant {Number} CADESCOM_STRING_TO_UCS2LE Данные будут перекодированы в UCS - 2 little endian.
*/
const CADESCOM_STRING_TO_UCS2LE = 0x00;

/**
 * @constant {Number} CADESCOM_BASE64_TO_BINARY Данные будут перекодированы из Base64 в бинарный массив.
 */
const CADESCOM_BASE64_TO_BINARY = 0x01;

/**
 * @constant {Number} CADESCOM_LOCAL_MACHINE_STORE Локальное хранилище компьютера.
 */
const CADESCOM_LOCAL_MACHINE_STORE = 1;

/**
 * @constant {Number} CADESCOM_CURRENT_USER_STORE Хранилище текущего пользователя.
 */
const CADESCOM_CURRENT_USER_STORE = 2;

/**
* @constant {Number} CADESCOM_CONTAINER_STORE
* Хранилище сертификатов в контейнерах закрытых ключей.В данный Store попадут все сертификаты из контейнеров закрытых ключей которые
* доступны в системе в момент открытия.
*/
const CADESCOM_CONTAINER_STORE = 100;

/**
* @constant {Number} CADESCOM_CADES_DEFAULT Тип подписи по умолчанию(CAdES - X Long Type 1).
*/
const CADESCOM_CADES_DEFAULT = 0;

/**
* @constant {Number} CADESCOM_CADES_BES Тип подписи CAdES BES.
*/
const CADESCOM_CADES_BES = 1;

/**
* @constant {Number} CADESCOM_CADES_T Тип подписи CAdES - T.
*/
const CADESCOM_CADES_T = 0x5;

/**
* @constant {Number} CADESCOM_CADES_X_LONG_TYPE_1 Тип подписи CAdES - X Long Type 1.
*/
const CADESCOM_CADES_X_LONG_TYPE_1 = 0x5d;

/**
* @constant {Number} CADESCOM_ENCODE_BASE64 Кодировка BASE64.
*/
const CADESCOM_ENCODE_BASE64 = 0;

/**
* @constant {Number} CADESCOM_ENCODE_BINARY Бинарные данные.
*/
const CADESCOM_ENCODE_BINARY = 1;

/**
 * @constant {object} CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT
 */
const CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT = {
  /** @constant {Number} CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME Название документа. */
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME: 1,
  /** @constant {Number} CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION Описание документа. */
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION: 2
}

/**
 * @constant {object} CADESCOM_DISPLAY_DATA
 */
const CADESCOM_DISPLAY_DATA = {
  /** @constant {Number} CADESCOM_DISPLAY_DATA_NONE Данные не будут пересылаться в устройство. */
  CADESCOM_DISPLAY_DATA_NONE: 0,
  /** @constant {Number} CADESCOM_DISPLAY_DATA_CONTENT Отображаемые данные лежат в теле сообщения. */
  CADESCOM_DISPLAY_DATA_CONTENT: 1,
  /** @constant {Number} CADESCOM_DISPLAY_DATA_ATTRIBUTE Отображаемые данные лежат в подписанном атрибуте сообщения. */
  CADESCOM_DISPLAY_DATA_ATTRIBUTE: 2
}

/**
 * @constant {object} CADESCOM_ENCRYPTION_ALGORITHM
 */
const CADESCOM_ENCRYPTION_ALGORITHM = {
  /**
     * @constant {object} CADESCOM_ENCRYPTION_ALGORITHM_RC
     */
  CADESCOM_ENCRYPTION_ALGORITHM_RC: {
    /** @constant {Number} RC2 Алгоритм RSA RC2. */
    RC2: 0,
    /** @constant {Number} RC4 Алгоритм RSA RC4. */
    RC4: 1
  },
  /** @constant {Number} CADESCOM_ENCRYPTION_ALGORITHM_DES Алгоритм DES. */
  CADESCOM_ENCRYPTION_ALGORITHM_DES: 2,
  /** @constant {Number} CADESCOM_ENCRYPTION_ALGORITHM_3DES Алгоритм 3 DES. */
  CADESCOM_ENCRYPTION_ALGORITHM_3DES: 3,
  /** @constant {Number} CADESCOM_ENCRYPTION_ALGORITHM_AES Алгоритм AES. */
  CADESCOM_ENCRYPTION_ALGORITHM_AES: 4,
  /** @constant {Number} CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 Алгоритм ГОСТ 28147 - 89. */
  CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89: 25
}

/**
 * @constant {object} CADESCOM_HASH
 */
const CADESCOM_HASH = {
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_SHA1 Алгоритм SHA1. */
  CADESCOM_HASH_ALGORITHM_SHA1: 0,
  /** @constant {object} CADESCOM_HASH_ALGORITHM */
  CADESCOM_HASH_ALGORITHM: {
    /** @constant {Number} CADESCOM_HASH_ALGORITHM_MD2 Алгоритм MD2. */
    MD2: 1,
    /** @constant {Number} CADESCOM_HASH_ALGORITHM_MD4 Алгоритм MD4. */
    MD4: 2,
    /** @constant {Number} CADESCOM_HASH_ALGORITHM_MD5 Алгоритм MD5. */
    MD5: 3,
  },
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_SHA_256 Алгоритм SHA1 с длиной ключа 256 бит. */
  CADESCOM_HASH_ALGORITHM_SHA_256: 4,
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_SHA_384 Алгоритм SHA1 с длиной ключа 384 бита. */
  CADESCOM_HASH_ALGORITHM_SHA_384: 5,
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_SHA_512 Алгоритм SHA1 с длиной ключа 512 бит. */
  CADESCOM_HASH_ALGORITHM_SHA_512: 6,
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_CP_GOST_3411 Алгоритм ГОСТ Р 34.11 - 94. */
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 100,
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 Алгоритм ГОСТ Р 34.10 - 2012. */
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256: 101,
  /** @constant {Number} CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 Алгоритм ГОСТ Р 34.10 - 2012. */
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512: 102,
};

/**
 * @constant {object} CADESCOM_XML
 */
const CADESCOM_XML = {
  /** @constant {Number} CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED Вложенная подпись. */
  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: 0,
  /** @constant {Number} CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING Оборачивающая подпись. */
  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: 1,
  /** @constant {Number} CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE Подпись по шаблону. */
  CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: 2
};

export {
  ARGS_INIT_CADES_COM,
  CADESCOM_STRING_TO_UCS2LE,
  CADESCOM_BASE64_TO_BINARY,
  CADESCOM_LOCAL_MACHINE_STORE,
  CADESCOM_CURRENT_USER_STORE,
  CADESCOM_CONTAINER_STORE,
  CADESCOM_CADES_DEFAULT,
  CADESCOM_CADES_BES,
  CADESCOM_CADES_T,
  CADESCOM_CADES_X_LONG_TYPE_1,
  CADESCOM_ENCODE_BASE64,
  CADESCOM_ENCODE_BINARY,
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT,
  CADESCOM_DISPLAY_DATA,
  CADESCOM_ENCRYPTION_ALGORITHM,
  CADESCOM_HASH,
  CADESCOM_XML
}
