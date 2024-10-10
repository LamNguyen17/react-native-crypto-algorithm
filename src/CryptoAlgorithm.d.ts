import { NativeModules } from 'react-native';

const { CryptoAlgorithm } = NativeModules;

interface CryptoAlgorithmInterface {
  hashSHA256(value: string): Promise<string|null>;
  encryptAES(value: string, secretKey: string, ivKey?: string): Promise<string|null>;
  decryptAES(value: string, secretKey: string, ivKey?: string): Promise<string|null>;
  genRSAKeyPair(): Promise<any>;
  encryptRSA(value: string, publicKey: string): Promise<string|null>;
  decryptRSA(value: string, privateKey: string): Promise<string|null>;
}

export default CryptoAlgorithm as CryptoAlgorithmInterface;
