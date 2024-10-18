export interface CryptoAlgorithm {
  hashSHA256(value: string): Promise<string|null>;
  encryptAES(value: string, secretKey: string, ivKey?: string): Promise<string|null>;
  decryptAES(value: string, secretKey: string, ivKey?: string): Promise<string|null>;
  genRSAKeyPair(): Promise<any>;
  encryptRSA(value: string, publicKey: string): Promise<string|null>;
  decryptRSA(value: string, privateKey: string): Promise<string|null>;
  genHmacSecretKey(): Promise<null>;
  encryptHmacAes(value: string, privateKey: string): Promise<string|null>;
  decryptHmacAes(value: string, privateKey: string): Promise<string|null>;
  verifyHmac(value: string, privateKey: string): Promise<string|null>;
}
