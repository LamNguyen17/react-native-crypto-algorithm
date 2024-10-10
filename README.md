# react-native-crypto-algorithm

[![](https://img.shields.io/badge/yarn-v1.0.0-blue)](https://www.npmjs.com/package/react-native-encryption-algorithm)
[![](https://img.shields.io/badge/native_language-Kotlin_&_Swift-green)](https://www.npmjs.com/package/react-native-encryption-algorithm)
[![](https://img.shields.io/badge/size-72.7_kB-red)](https://www.npmjs.com/package/react-native-encryption-algorithm)
[![](https://img.shields.io/badge/license-MIT-8A2BE2)](https://github.com/LamNguyen17/react-native-encryption-algorithm/blob/master/LICENSE)
[![](https://img.shields.io/badge/author-Forest_Nguyen-f59642)](https://github.com/LamNguyen17)

## Installation
```sh
npm install react-native-encryption-algorithm
```
or
```sh
yarn add react-native-encryption-algorithm
```

### Installation (iOS)

##### Using CocoaPods (React Native 0.60 and higher)

```sh
cd ios
pod install
```

##### Using React Native Link (React Native 0.59 and lower)

Run `react-native link react-native-encryption-algorithm` after which you should be able to use this library on iOS.

### Installation (Android)

##### React Native 0.60 and higher

-   Linking is done automatically

##### Using React Native Link (React Native 0.59 and lower)

-   In `android/settings.gradle`

```gradle
...
include ':react-native-encryption-algorithm'
project(':react-native-encryption-algorithm').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-encryption-algorithm/android')
```

-   In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-encryption-algorithm')
}
```
-   register module (in MainApplication.kt)

```kt
......
import com.encryptionalgorithm.EncryptionAlgorithmPackage;
......

override fun getPackages(): List<ReactPackage> =
  PackageList(this).packages.apply {
    add(EncryptionAlgorithmPackage());
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
import Encryption from 'react-native-encryption-algorithm';

// Encrypt
let encryptData = await Encryption.encryptAES('my message', 'my private key', 'my iv key(optional maximum 16 characters)');

// Decrypt
let decryptData = await Encryption.decryptAES(encryptData, 'my private key', 'my iv key(optional maximum 16 characters)');
```

#### 🚀 SHA256
- 🍁 `hashSHA256(value: string)`
```js
import Encryption from 'react-native-encryption-algorithm';

// Hash SHA256
let hashData = await Encryption.hashSHA256('my hash data');
```

#### 🚀 RSA
- 🍁 `genRSAKeyPair()`
- 🍁 `encryptRSA(value: string, publicKey: string)`
- 🍁 `decryptRSA(value: string, privateKey: string)`
```js
import Encryption from 'react-native-encryption-algorithm';

// Generate RSA Key Pair
let keyPair = await Encryption.genRSAKeyPair();

// Encrypt RSA
let encryptData = await Encryption.encryptRSA('my message', keyPair.publicKey);

// Decrypt RSA
let decryptData = await Encryption.decryptRSA(encryptData, keyPair.privateKey);
```

#### 🚀 HMAC / HMAC_AES
- 🍁 `genHmacSecretKey() -> use with all HMAC & HMAC_AES`
- 🍁 `encryptHmacAes(value: string, publicKey: string) -> use only for HMAC_AES`
- 🍁 `decryptHmacAes(value: string, privateKey: string) -> use only for HMAC_AES`
- 🍁 `verifyHmac(value: string, privateKey: string) -> use only for HMAC`
```js
import Encryption from 'react-native-encryption-algorithm';

// Generate HMAC & HMAC_AES
let genHmacSecretKey = await Encryption.genHmacSecretKey();

// Encrypt HMAC_AES
let encryptData = await Encryption.encryptHmacAes('my message', genHmacSecretKey);

// Decrypt HMAC_AES
let decryptData = await Encryption.decryptHmacAes(encryptData, genHmacSecretKey);

// VerifyHmac HMAC
let verifyHmacData: boolean = await Encryption.verifyHmac('my message', genHmacSecretKey);
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
