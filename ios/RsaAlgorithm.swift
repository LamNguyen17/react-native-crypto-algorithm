import Foundation
import CryptoSwift

class RsaAlgorithm {
    private let cryptoHelper = CryptoHelper()

    func encryptRSA(value: String, publicKey: String) -> String? {
        guard !value.isEmpty, let key = cryptoHelper.stringToKey(key: publicKey, keyType: CryptoHelper.KeyType.keyPublic) else {
            return nil
        }
        guard let data = value.data(using: .utf8) else { return nil }

        var error: Unmanaged<CFError>?
        guard let encryptedData = SecKeyCreateEncryptedData(key, .rsaEncryptionPKCS1, data as CFData, &error) as Data? else {
            return nil
        }

        return encryptedData.base64EncodedString()
    }

    func decryptRSA(value: String, privateKey: String) -> String? {
        guard !value.isEmpty, let key = cryptoHelper.stringToKey(key: privateKey, keyType: CryptoHelper.KeyType.keyPrivate) else {
            return nil
        }
        guard let encryptedData = Data(base64Encoded: value) else { return nil }

        var error: Unmanaged<CFError>?
        guard let decryptedData = SecKeyCreateDecryptedData(key, .rsaEncryptionPKCS1, encryptedData as CFData, &error) as Data? else {
            return nil
        }
        return String(data: decryptedData, encoding: .utf8)
    }
}
