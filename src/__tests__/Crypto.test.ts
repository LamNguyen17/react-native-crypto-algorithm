it.todo('write a test');

// import { NativeModules } from 'react-native';
//
// NativeModules.CryptoAlgorithm = {
//   hashSHA256: jest.fn(),
//   encryptAES: jest.fn(),
//   decryptAES: jest.fn(),
//   genRSAKeyPair: jest.fn(),
//   encryptRSA: jest.fn(),
//   decryptRSA: jest.fn(),
//   genHmacSecretKey: jest.fn(),
//   encryptHmacAes: jest.fn(),
//   decryptHmacAes: jest.fn(),
//   verifyHmac: jest.fn(),
// };
//
// describe('Crypto', () => {
//   beforeEach(() => {
//     NativeModules.CryptoAlgorithm.hashSHA256.mockReset();
//     NativeModules.CryptoAlgorithm.encryptAES.mockReset();
//     NativeModules.CryptoAlgorithm.decryptAES.mockReset();
//     NativeModules.CryptoAlgorithm.genRSAKeyPair.mockReset();
//     NativeModules.CryptoAlgorithm.encryptRSA.mockReset();
//     NativeModules.CryptoAlgorithm.decryptRSA.mockReset();
//     NativeModules.CryptoAlgorithm.genHmacSecretKey.mockReset();
//     NativeModules.CryptoAlgorithm.encryptHmacAes.mockReset();
//     NativeModules.CryptoAlgorithm.decryptHmacAes.mockReset();
//     NativeModules.CryptoAlgorithm.verifyHmac.mockReset();
//   });
//
//   test('should hash value using SHA256', async () => {
//     const mockValue = 'Hello123';
//     const mockHash = '134563d4e440f0e418b0f382f23a2cf301af6d7f648ccfae9895018345d779a3';
//     (NativeModules.CryptoAlgorithm.hashSHA256 as jest.Mock).mockResolvedValue(mockHash); // Mock the function return value
//
//     const result = await NativeModules.CryptoAlgorithm.hashSHA256(mockValue); // Call the function
//     expect(NativeModules.CryptoAlgorithm.hashSHA256).toHaveBeenCalledWith(mockValue); // Verify the function is called with the correct value
//     expect(result).toBe(mockHash); // Verify the result
//   });
//
//   it('should encrypt value using AES', async () => {
//     const mockValue = 'Hello123';
//     const mockSecretKey = 'Alo123';
//     const mockEncrypted = 'KYd01TEkRcK+U0mVYaB5AA==';
//     (NativeModules.CryptoAlgorithm.encryptAES as jest.Mock).mockResolvedValue(mockEncrypted);
//
//     const result = await NativeModules.CryptoAlgorithm.encryptAES(mockValue, mockSecretKey);
//     expect(NativeModules.CryptoAlgorithm.encryptAES).toHaveBeenCalledWith(mockValue, mockSecretKey);
//     expect(result).toBe(mockEncrypted);
//   });
//
//   it('should decrypt value using AES', async () => {
//     const mockSecretKey = 'Alo123';
//     const mockDecrypted = 'Hello123';
//     const mockEncrypted = 'KYd01TEkRcK+U0mVYaB5AA==';
//     (NativeModules.CryptoAlgorithm.decryptAES as jest.Mock).mockResolvedValue(mockDecrypted);
//
//     const result = await NativeModules.CryptoAlgorithm.decryptAES(mockEncrypted, mockSecretKey);
//     expect(NativeModules.CryptoAlgorithm.decryptAES).toHaveBeenCalledWith(mockEncrypted, mockSecretKey);
//     expect(result).toBe(mockDecrypted);
//   });
//
//   it('should generate RSA key pair', async () => {
//     const mockKeyPair = { publicKey: 'mockPublicKey', privateKey: 'mockPrivateKey' };
//     (NativeModules.CryptoAlgorithm.genRSAKeyPair as jest.Mock).mockResolvedValue(mockKeyPair);
//
//     const result = await NativeModules.CryptoAlgorithm.genRSAKeyPair();
//     expect(NativeModules.CryptoAlgorithm.genRSAKeyPair).toHaveBeenCalled();
//     expect(result).toBe(mockKeyPair);
//   });
//
//   it('should encrypt value using RSA', async () => {
//     const mockPublicKey = 'mockPublicKey';
//     const mockData = 'Hello123';
//     const mockEncryptedData = 'eInm/VQLZM9wK7H+w8jqMeiwab6xZFx6AYSRSramC5o/k2eHbJ+9NkAM68/tYFNvrG03N3WXxIke\n' +
//       'J/AF5TbGsdgmlTsOfjnKi88ci24LCRhED0CYgJT0SNwVC4NcubMV5QbKbcdJO0S+2mMkPD3qzB83\n' +
//       '055GPlmRr4FJtGJ44ASM4W9ZGahwq32MT6VK04DBq/LGXj3bJZ8v7M7273lTYOqGCFHc+X8WOGcB\n' +
//       '1NNhhxxYbsRzLpEaK7Wa8Sv+CavpK7TwUgVVlCwL9G4WGEmCCMDDnKXH2pzspDumMOUaDUiPg005\n' +
//       '73tRWXaskPZtIk1KfDwxnRMz7rFXMiNvjU+pCA==';
//     (NativeModules.CryptoAlgorithm.encryptRSA as jest.Mock).mockResolvedValue(mockEncryptedData);
//
//     const result = await NativeModules.CryptoAlgorithm.encryptRSA(mockData, mockPublicKey);
//     expect(NativeModules.CryptoAlgorithm.encryptRSA).toHaveBeenCalledWith(mockData, mockPublicKey);
//     expect(result).toBe(mockEncryptedData);
//   });
//
//   it('should decrypt value using RSA', async () => {
//     const mockPrivateKey = 'mockPrivateKey';
//     const mockDecrypt = 'Hello123';
//     const mockEncryptedData = 'eInm/VQLZM9wK7H+w8jqMeiwab6xZFx6AYSRSramC5o/k2eHbJ+9NkAM68/tYFNvrG03N3WXxIke\n' +
//       'J/AF5TbGsdgmlTsOfjnKi88ci24LCRhED0CYgJT0SNwVC4NcubMV5QbKbcdJO0S+2mMkPD3qzB83\n' +
//       '055GPlmRr4FJtGJ44ASM4W9ZGahwq32MT6VK04DBq/LGXj3bJZ8v7M7273lTYOqGCFHc+X8WOGcB\n' +
//       '1NNhhxxYbsRzLpEaK7Wa8Sv+CavpK7TwUgVVlCwL9G4WGEmCCMDDnKXH2pzspDumMOUaDUiPg005\n' +
//       '73tRWXaskPZtIk1KfDwxnRMz7rFXMiNvjU+pCA==';
//     (NativeModules.CryptoAlgorithm.decryptRSA as jest.Mock).mockResolvedValue(mockDecrypt);
//
//     const result = await NativeModules.CryptoAlgorithm.decryptRSA(mockEncryptedData, mockPrivateKey);
//     expect(NativeModules.CryptoAlgorithm.decryptRSA).toHaveBeenCalledWith(mockEncryptedData, mockPrivateKey);
//     expect(result).toBe(mockDecrypt);
//   });
//
//   it('should generate HMAC secret key', async () => {
//     const mockSecretKey = 'mockedHmacSecretKey';
//     (NativeModules.CryptoAlgorithm.genHmacSecretKey as jest.Mock).mockResolvedValue(mockSecretKey);
//
//     const result = await NativeModules.CryptoAlgorithm.genHmacSecretKey();
//     expect(NativeModules.CryptoAlgorithm.genHmacSecretKey).toHaveBeenCalled();
//     expect(result).toBe(mockSecretKey);
//   });
//
//   it('should encrypt value using HMAC AES', async () => {
//     const mockData = 'Hello123';
//     const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
//     const mockEncryptedHmacAES = 'qUisMsd7to7zcm5y4/idNw==';
//     (NativeModules.CryptoAlgorithm.encryptHmacAes as jest.Mock).mockResolvedValue(mockEncryptedHmacAES);
//
//     const result = await NativeModules.CryptoAlgorithm.encryptHmacAes(mockData, mockPrivateKey);
//     expect(NativeModules.CryptoAlgorithm.encryptHmacAes).toHaveBeenCalledWith(mockData, mockPrivateKey);
//     expect(result).toBe(mockEncryptedHmacAES);
//   });
//
//   it('should decrypt value using HMAC AES', async () => {
//     const mockDecrypt = 'Hello123';
//     const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
//     const mockEncryptedHmacAES = 'qUisMsd7to7zcm5y4/idNw==';
//     (NativeModules.CryptoAlgorithm.decryptHmacAes as jest.Mock).mockResolvedValue(mockDecrypt);
//
//     const result = await NativeModules.CryptoAlgorithm.decryptHmacAes(mockEncryptedHmacAES, mockPrivateKey);
//     expect(NativeModules.CryptoAlgorithm.decryptHmacAes).toHaveBeenCalledWith(mockEncryptedHmacAES, mockPrivateKey);
//     expect(result).toBe(mockDecrypt);
//   });
//
//   it('should verify HMAC', async () => {
//     const mockData = 'Hello123';
//     const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
//     const mockVerifiedHmac = true;
//     (NativeModules.CryptoAlgorithm.verifyHmac as jest.Mock).mockResolvedValue(mockVerifiedHmac);
//
//     const result = await NativeModules.CryptoAlgorithm.verifyHmac(mockData, mockPrivateKey);
//     expect(NativeModules.CryptoAlgorithm.verifyHmac).toHaveBeenCalledWith(mockData, mockPrivateKey);
//     expect(result).toBe(mockVerifiedHmac);
//   });
// });
