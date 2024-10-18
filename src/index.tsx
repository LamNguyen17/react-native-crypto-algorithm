import { NativeModules } from 'react-native';

const { CryptoAlgorithm } = NativeModules;

export default class Crypto {
  static hashSHA256 = (value: string) => {
    return CryptoAlgorithm.hashSHA256(value);
  };

  static encryptAES = (value: string, secretKey: string, ivKey?: string) => {
    return CryptoAlgorithm.encryptAES(value, secretKey, ivKey);
  };

  static decryptAES = (value: string, secretKey: string, ivKey?: string) => {
    return CryptoAlgorithm.decryptAES(value, secretKey, ivKey);
  };

  static genRSAKeyPair = () => {
    return CryptoAlgorithm.genRSAKeyPair();
  };

  static encryptRSA = (value: string, publicKey: string) => {
    return CryptoAlgorithm.encryptRSA(value, publicKey);
  };

  static decryptRSA = (value: any, privateKey: string) => {
    return CryptoAlgorithm.decryptRSA(value, privateKey);
  };

  static genHmacSecretKey = () => {
    return CryptoAlgorithm.genSecretKey('Hmac');
  };

  static encryptHmacAes = (value: string, privateKey: string)=> {
    return CryptoAlgorithm.encryptHmacAes(value, privateKey);
  };

  static decryptHmacAes = (value: any, privateKey: string) => {
    return CryptoAlgorithm.decryptHmacAes(value, privateKey);
  };

  static verifyHmac = (value: string, privateKey: string) => {
    return CryptoAlgorithm.verifyHmac(value, privateKey);
  };
}
