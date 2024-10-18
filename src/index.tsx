import { NativeModules } from 'react-native';
import { CryptoAlgorithm } from './CryptoAlgorithm';

const { CryptoAlgorithm: NativeCryptoAlgorithm } = NativeModules;


export default class Crypto implements CryptoAlgorithm{
  // Instance method to hash SHA256
  hashSHA256(value: string): Promise<string | null> {
    return NativeCryptoAlgorithm.hashSHA256(value);
  }

  // Instance method to encrypt using AES
  encryptAES(value: string, secretKey: string, ivKey?: string): Promise<string | null> {
    return NativeCryptoAlgorithm.encryptAES(value, secretKey, ivKey);
  }

  // Instance method to decrypt using AES
  decryptAES(value: string, secretKey: string, ivKey?: string): Promise<string | null> {
    return NativeCryptoAlgorithm.decryptAES(value, secretKey, ivKey);
  }

  // Instance method to generate RSA key pair
  genRSAKeyPair(): Promise<any> {
    return NativeCryptoAlgorithm.genRSAKeyPair();
  }

  // Instance method to encrypt using RSA
  encryptRSA(value: string, publicKey: string): Promise<string | null> {
    return NativeCryptoAlgorithm.encryptRSA(value, publicKey);
  }

  // Instance method to decrypt using RSA
  decryptRSA(value: any, privateKey: string): Promise<string | null> {
    return NativeCryptoAlgorithm.decryptRSA(value, privateKey);
  }

  // Instance method to generate HMAC secret key
  genHmacSecretKey(): Promise<null> {
    return NativeCryptoAlgorithm.genSecretKey('Hmac');
  }

  // Instance method to encrypt using HMAC AES
  encryptHmacAes(value: string, privateKey: string): Promise<string | null> {
    return NativeCryptoAlgorithm.encryptHmacAes(value, privateKey);
  }

  // Instance method to decrypt using HMAC AES
  decryptHmacAes(value: any, privateKey: string): Promise<string | null> {
    return NativeCryptoAlgorithm.decryptHmacAes(value, privateKey);
  }

  // Instance method to verify HMAC
  verifyHmac(value: string, privateKey: string): Promise<string | null> {
    return NativeCryptoAlgorithm.verifyHmac(value, privateKey);
  }
}
