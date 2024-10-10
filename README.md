# react-native-crypto-algorithm

[![](https://img.shields.io/badge/yarn-v1.0.2-blue)](https://www.npmjs.com/package/react-native-crypto-algorithm)
[![](https://img.shields.io/badge/native_language-Kotlin_&_Swift-green)](https://www.npmjs.com/package/react-native-crypto-algorithm)
[![](https://img.shields.io/badge/size-72.7_kB-red)](https://www.npmjs.com/package/react-native-crypto-algorithm)
[![](https://img.shields.io/badge/license-MIT-8A2BE2)](https://github.com/LamNguyen17/react-native-crypto-algorithm/blob/master/LICENSE)
[![](https://img.shields.io/badge/author-Forest_Nguyen-f59642)](https://github.com/LamNguyen17)

## Installation
```sh
npm install react-native-crypto-algorithm
```
or
```sh
yarn add react-native-crypto-algorithm
```

### Installation (iOS)

##### Using CocoaPods (React Native 0.60 and higher)

```sh
cd ios
pod install
```

##### Using React Native Link (React Native 0.59 and lower)

Run `react-native link react-native-crypto-algorithm` after which you should be able to use this library on iOS.

### Installation (Android)

##### React Native 0.60 and higher

-   Linking is done automatically

##### Using React Native Link (React Native 0.59 and lower)

-   In `android/settings.gradle`

```gradle
...
include ':react-native-crypto-algorithm'
project(':react-native-crypto-algorithm').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-crypto-algorithm/android')
```

-   In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-crypto-algorithm')
}
```
-   register module (in MainApplication.kt)

```kt
......
import com.cryptoalgorithm.CryptoAlgorithmPackage;
......

override fun getPackages(): List<ReactPackage> =
  PackageList(this).packages.apply {
    add(CryptoAlgorithmPackage());
  }
```

---
## Usage
### Methods
#### 🚀 AES
- Custom 'secretKey' -> maximum 32 characters
  . Custom 'ivKey' (optional) -> maximum 16 characters
- 🍁 `encryptAES(value: string, secretKey: string, ivKey?: string)`
- 🍁 `decryptAES(value: string, secretKey: string, ivKey?: string)`
```js
import Crypto from 'react-native-crypto-algorithm';

// Encrypt
let encryptData = await Crypto.encryptAES('my message', 'my private key', 'my iv key(optional maximum 16 characters)');

// Decrypt
let decryptData = await Crypto.decryptAES(encryptData, 'my private key', 'my iv key(optional maximum 16 characters)');
```

#### 🚀 SHA256
- 🍁 `hashSHA256(value: string)`
```js
import Crypto from 'react-native-crypto-algorithm';

// Hash SHA256
let hashData = await Crypto.hashSHA256('my hash data');
```

#### 🚀 RSA
- 🍁 `genRSAKeyPair()`
- 🍁 `encryptRSA(value: string, publicKey: string)`
- 🍁 `decryptRSA(value: string, privateKey: string)`
```js
import Crypto from 'react-native-crypto-algorithm';

// Generate RSA Key Pair
let keyPair = await Crypto.genRSAKeyPair();

// Encrypt RSA
let encryptData = await Crypto.encryptRSA('my message', keyPair.publicKey);

// Decrypt RSA
let decryptData = await Crypto.decryptRSA(encryptData, keyPair.privateKey);
```

#### 🚀 HMAC / HMAC_AES
- 🍁 `genHmacSecretKey() -> use with all HMAC & HMAC_AES`
- 🍁 `encryptHmacAes(value: string, publicKey: string) -> use only for HMAC_AES`
- 🍁 `decryptHmacAes(value: string, privateKey: string) -> use only for HMAC_AES`
- 🍁 `verifyHmac(value: string, privateKey: string) -> use only for HMAC`
```js
import Crypto from 'react-native-crypto-algorithm';

// Generate HMAC & HMAC_AES
let genHmacSecretKey = await Crypto.genHmacSecretKey();

// Encrypt HMAC_AES
let encryptData = await Crypto.encryptHmacAes('my message', genHmacSecretKey);

// Decrypt HMAC_AES
let decryptData = await Crypto.decryptHmacAes(encryptData, genHmacSecretKey);

// VerifyHmac HMAC
let verifyHmacData: boolean = await Crypto.verifyHmac('my message', genHmacSecretKey);
```

---
## API
### List of Algorithms
- [x] ```AES(Advanced Encryption Standard)```
- [x] ```SHA-256 (Secure Hash Algorithm)```
- [x] ```RSA (Rivest-Shamir-Adleman)```
- [ ] ```ChaCha20```
- [ ] ```Blowfish```
- [x] ```HMAC (Hash-based Message Authentication Code)```
- [ ] ```PBKDF2 (Password-Based Key Derivation Function 2)```
- [ ] ```ECC (Elliptic Curve Cryptography)```
- [ ] ```Scrypt```
- [ ] ```XChaCha20-Poly1305```
---
## Author
    Forest Nguyen
    Email: devlamnt176@gmail.com
---
## License
    MIT License
    Copyright (c) 2024 Forest Nguyen
---
