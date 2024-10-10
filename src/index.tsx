import { NativeModules } from 'react-native';

const CryptoAlgorithmNative = NativeModules.CryptoAlgorithm;

export default class Crypto {
  static hashSHA256 = (value: string) => {
    return CryptoAlgorithmNative.hashSHA256(value);
  };

  static encryptAES = (value: string, secretKey: string, ivKey?: string) => {
    return CryptoAlgorithmNative.encryptAES(value, secretKey, ivKey);
  };

  static decryptAES = (value: string, secretKey: string, ivKey?: string) => {
    return CryptoAlgorithmNative.decryptAES(value, secretKey, ivKey);
  };

  static genRSAKeyPair = () => {
    return CryptoAlgorithmNative.genRSAKeyPair();
  };

  static encryptRSA = (value: string, publicKey: string) => {
    return CryptoAlgorithmNative.encryptRSA(value, publicKey);
  };

  static decryptRSA = (value: any, privateKey: string) => {
    return CryptoAlgorithmNative.decryptRSA(value, privateKey);
  };

  static genHmacSecretKey = () => {
    return CryptoAlgorithmNative.genSecretKey('Hmac');
  };

  static encryptHmacAes = (value: string, privateKey: string)=> {
    return CryptoAlgorithmNative.encryptHmacAes(value, privateKey);
  };

  static decryptHmacAes = (value: any, privateKey: string) => {
    return CryptoAlgorithmNative.decryptHmacAes(value, privateKey);
  };

  static verifyHmac = (value: string, privateKey: string) => {
    return CryptoAlgorithmNative.verifyHmac(value, privateKey);
  };
}
