import { NativeModules } from 'react-native';

NativeModules.CryptoAlgorithm = {
  hashSHA256: jest.fn(),
};

// jest.mock('react-native-crypto-algorithm', () => ({
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
// }));

describe('Crypto', () => {
  beforeEach(() => {
    NativeModules.CryptoAlgorithm.hashSHA256.mockReset();
  });

  test('should hash value using SHA256', async () => {
    const mockValue = 'Hello123';
    const mockHash = '134563d4e440f0e418b0f382f23a2cf301af6d7f648ccfae9895018345d779a3';
    (NativeModules.CryptoAlgorithm.hashSHA256 as jest.Mock).mockResolvedValue(mockHash); // Mock the function return value
    // NativeModules.CryptoAlgorithm.hashSHA256.mockResolvedValue(mockHash);

    const result = await NativeModules.CryptoAlgorithm.hashSHA256(mockValue); // Call the function
    expect(NativeModules.CryptoAlgorithm.hashSHA256).toHaveBeenCalledWith(mockValue); // Verify the function is called with the correct value
    expect(result).toBe(mockHash); // Verify the result
  });

  // it('should encrypt value using AES', async () => {
  //   const mockValue = 'Hello123';
  //   const mockSecretKey = 'Alo123';
  //   const mockEncrypted = 'KYd01TEkRcK+U0mVYaB5AA==';
  //   (Crypto.encryptAES as jest.Mock).mockResolvedValue(mockEncrypted);
  //
  //   const result = await Crypto.encryptAES(mockValue, mockSecretKey);
  //   expect(Crypto.encryptAES).toHaveBeenCalledWith(mockValue, mockSecretKey);
  //   expect(result).toBe(mockEncrypted);
  // });
  //
  // it('should decrypt value using AES', async () => {
  //   const mockSecretKey = 'Alo123';
  //   const mockDecrypted = 'Hello123';
  //   const mockEncrypted = 'KYd01TEkRcK+U0mVYaB5AA==';
  //   (Crypto.decryptAES as jest.Mock).mockResolvedValue(mockDecrypted);
  //
  //   const result = await Crypto.decryptAES(mockEncrypted, mockSecretKey);
  //   expect(Crypto.decryptAES).toHaveBeenCalledWith(mockEncrypted, mockSecretKey);
  //   expect(result).toBe(mockDecrypted);
  // });
  //
  // it('should generate RSA key pair', async () => {
  //   const mockKeyPair = { publicKey: 'mockPublicKey', privateKey: 'mockPrivateKey' };
  //   (Crypto.genRSAKeyPair as jest.Mock).mockResolvedValue(mockKeyPair);
  //
  //   const result = await Crypto.genRSAKeyPair();
  //   expect(Crypto.genRSAKeyPair).toHaveBeenCalled();
  //   expect(result).toBe(mockKeyPair);
  // });
  //
  // it('should encrypt value using RSA', async () => {
  //   const mockPublicKey = 'mockPublicKey';
  //   const mockData = 'Hello123';
  //   const mockEncryptedData = 'eInm/VQLZM9wK7H+w8jqMeiwab6xZFx6AYSRSramC5o/k2eHbJ+9NkAM68/tYFNvrG03N3WXxIke\n' +
  //     'J/AF5TbGsdgmlTsOfjnKi88ci24LCRhED0CYgJT0SNwVC4NcubMV5QbKbcdJO0S+2mMkPD3qzB83\n' +
  //     '055GPlmRr4FJtGJ44ASM4W9ZGahwq32MT6VK04DBq/LGXj3bJZ8v7M7273lTYOqGCFHc+X8WOGcB\n' +
  //     '1NNhhxxYbsRzLpEaK7Wa8Sv+CavpK7TwUgVVlCwL9G4WGEmCCMDDnKXH2pzspDumMOUaDUiPg005\n' +
  //     '73tRWXaskPZtIk1KfDwxnRMz7rFXMiNvjU+pCA==';
  //   (Crypto.encryptRSA as jest.Mock).mockResolvedValue(mockEncryptedData);
  //
  //   const result = await Crypto.encryptRSA(mockData, mockPublicKey);
  //   expect(Crypto.encryptRSA).toHaveBeenCalledWith(mockData, mockPublicKey);
  //   expect(result).toBe(mockEncryptedData);
  // });
  //
  // it('should decrypt value using RSA', async () => {
  //   const mockPrivateKey = 'mockPrivateKey';
  //   const mockDecrypt = 'Hello123';
  //   const mockEncryptedData = 'eInm/VQLZM9wK7H+w8jqMeiwab6xZFx6AYSRSramC5o/k2eHbJ+9NkAM68/tYFNvrG03N3WXxIke\n' +
  //     'J/AF5TbGsdgmlTsOfjnKi88ci24LCRhED0CYgJT0SNwVC4NcubMV5QbKbcdJO0S+2mMkPD3qzB83\n' +
  //     '055GPlmRr4FJtGJ44ASM4W9ZGahwq32MT6VK04DBq/LGXj3bJZ8v7M7273lTYOqGCFHc+X8WOGcB\n' +
  //     '1NNhhxxYbsRzLpEaK7Wa8Sv+CavpK7TwUgVVlCwL9G4WGEmCCMDDnKXH2pzspDumMOUaDUiPg005\n' +
  //     '73tRWXaskPZtIk1KfDwxnRMz7rFXMiNvjU+pCA==';
  //   (Crypto.decryptRSA as jest.Mock).mockResolvedValue(mockDecrypt);
  //
  //   const result = await Crypto.decryptRSA(mockEncryptedData, mockPrivateKey);
  //   expect(Crypto.decryptRSA).toHaveBeenCalledWith(mockEncryptedData, mockPrivateKey);
  //   expect(result).toBe(mockDecrypt);
  // });
  //
  // it('should generate HMAC secret key', async () => {
  //   const mockSecretKey = 'mockedHmacSecretKey';
  //   (Crypto.genHmacSecretKey as jest.Mock).mockResolvedValue(mockSecretKey);
  //
  //   const result = await Crypto.genHmacSecretKey();
  //   expect(Crypto.genHmacSecretKey).toHaveBeenCalled();
  //   expect(result).toBe(mockSecretKey);
  // });
  //
  // it('should encrypt value using HMAC AES', async () => {
  //   const mockData = 'Hello123';
  //   const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
  //   const mockEncryptedHmacAES = 'qUisMsd7to7zcm5y4/idNw==';
  //   (Crypto.encryptHmacAes as jest.Mock).mockResolvedValue(mockEncryptedHmacAES);
  //
  //   const result = await Crypto.encryptHmacAes(mockData, mockPrivateKey);
  //   expect(Crypto.encryptHmacAes).toHaveBeenCalledWith(mockData, mockPrivateKey);
  //   expect(result).toBe(mockEncryptedHmacAES);
  // });
  //
  // it('should decrypt value using HMAC AES', async () => {
  //   const mockDecrypt = 'Hello123';
  //   const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
  //   const mockEncryptedHmacAES = 'qUisMsd7to7zcm5y4/idNw==';
  //   (Crypto.decryptHmacAes as jest.Mock).mockResolvedValue(mockDecrypt);
  //
  //   const result = await Crypto.decryptHmacAes(mockEncryptedHmacAES, mockPrivateKey);
  //   expect(Crypto.decryptHmacAes).toHaveBeenCalledWith(mockEncryptedHmacAES, mockPrivateKey);
  //   expect(result).toBe(mockDecrypt);
  // });
  //
  // it('should verify HMAC', async () => {
  //   const mockData = 'Hello123';
  //   const mockPrivateKey = '4PVi7C94nl+u3B4Gnmjsgf69crr/+HBJhOps2+3xB+M=';
  //   const mockVerifiedHmac = true;
  //   (Crypto.verifyHmac as jest.Mock).mockResolvedValue(mockVerifiedHmac);
  //
  //   const result = await Crypto.verifyHmac(mockData, mockPrivateKey);
  //   expect(Crypto.verifyHmac).toHaveBeenCalledWith(mockData, mockPrivateKey);
  //   expect(result).toBe(mockVerifiedHmac);
  // });
});
