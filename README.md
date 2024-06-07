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

4 Настроить систему для работы с криптопровайдером КриптоПро CSP. Инструкцию можно скачать [отсюда](https://gogs.npcirs.ru/goru00/crypto-pro-module/src/develop/docs/%d0%98%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f_%d0%bf%d0%be_%d1%83%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b5_%d0%9a%d1%80%d0%b8%d0%bf%d1%82%d0%be%d0%9f%d1%80%d0%be_CSP_5_0_%d0%b2_AstraLinux.docx).

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