# crypto-pro-module

Модуль для работы с ЭЦП КриптоПро.

- [CryptoProModule](#crypto-pro-module)
    - [Требования (Requirements)](#требования-requirements)
    - [Установка (Installation)](#установка-installation)
    - [Использование (Usage)](#использование-usage)
        - [Доступные методы модуля](#доступные-методы-модуля)
        - [Пример использования модуля](#пример-использования-модуля)

---

## Требования (Requirements)

- Node.js v12+

## Установка (Installation)

1 Установить и подключить библиотеку на стороне клиента [crypto-pro-module](https://gogs.npcirs.ru/goru00/crypto-pro-module).
2 Добавить библиотеку в **package.json** (вручную), указав после # тег версии

```json
"dependencies": {
  "@npcirs/crypto-pro-module": "git+ssh://git@gogs.npcirs.ru:goru00/crypto-pro-module.git#0.1.0",
}
```

3 Выполнить установку модулей

```bash
npm install @npcirs/crypto-pro-module
```

4 Настроить систему для работы с криптопровайдером КриптоПро CSP. Инструкцию можно скачать [отсюда](https://gogs.npcirs.ru/goru00/crypto-pro-module/src/master/docs/Инструкция_по_установке_КриптоПро_CSP_5_0_в_AstraLinux.docx).

## Использование (Usage)

### Доступные методы модуля

#### `async about()`

Возвращает полную информацию о используемом плагине, криптопровайдере, сертификатах и т.д.

#### `async getCSPVersion()`

Возвращает информацию об используемой версии КриптоПро CSP.

#### `async getPluginVersion()`

Возвращает версию браузерного плагина для взаимодействия с КриптоПро CSP.

#### `async getCSPName()`

Возвращает информацию по наименованию криптопровайдера.

#### `async description()`

Возвращает составную информацию, содержающую: версия плагина, версия криптопровайдера, наименование криптопровайдера.

#### `async getCertsList()`

Возвращает список сертификатов, найденных на ЖМД и на других носителях.

#### `async getCertInfo(thumbprint)`

Получить детальную информацию по подписи.

* param {string} thumbprint - отпечаток подписи

#### `async signBase64(thumbprint, msg, type = true)`

Подписать в формате base64.

* param {string} thumbprint - сертификат (отпечаток).
* param {string} msg - сообщение (или файл), которое собираемся подписывать.
* param {boolean} type - тип подписи true=откреплённая false=прикреплённая.


### Пример использования модуля

Подключение модуля
```js
...
import ccpa from '@npcirs/crypto-pro-module';
...
const certsApi = await ccpa();
...
```
Получение информацию по сертификатам
```js
import { useMemo, useState } from "react";
import ccpa from '@npcirs/crypto-pro-module';

const useGetCert = (thumbprint) => {
    const [certificate, setCertificate] = useState('');

    useMemo(async () => {
        const certsApi = await ccpa();
        const certsList = await certsApi.getCertsList();

        const findCert = certsList.find(
            (item) => item.thumbprint === thumbprint
        );

        setCertificate(findCert);
    }, [thumbprint]);

    return certificate;
}

export default useGetCert;
```
Получение списка сертификатов
```js
const useGetCertsList = () =>
useMemo(async () => {
  const certsApi = await ccpa();
  const certsList = await certsApi.getCertsList();
  return certsList.map(
    ({
      subjectInfo,
      thumbprint,
    }) => ({
      label: extract(subjectInfo, 'CN='),
      thumbprint,
    }),
  );
}, []);
```
Подписание данных
```
Стоит учесть, что полученную подпись в формате base64 необходимо конвертировать в Blob.
```
```js
import ccpa from '@npcirs/crypto-pro-module';
import { base64ToBlob, extractFilename } from 'utils/helpers';

const signFile = async (thumbprint, file) => {
    if (file) {
        const certsApi = await ccpa();

        const { signature, contentType } = await certsApi.signBase64(thumbprint, file);

        const blob = await base64ToBlob(signature, contentType);

        return { blob, filename: `${extractFilename(file.name)}.sig` }
    }
    return null;
}

export {
    signFile
};
```