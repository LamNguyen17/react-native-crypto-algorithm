import Foundation
import CryptoSwift

class HmacAesAlgorithm {
    private let cryptoHelper = CryptoHelper()

    func encrypt(value: String, privateKey: String, ivKey: String?) -> String? {
        let iv = cryptoHelper.genAESIvKey(ivKey: ivKey)
        let key = cryptoHelper.hexStringToUInt8Array(privateKey)
        do {
            let aes = try AES(key: key, blockMode: CBC(iv: iv), padding: .pkcs7)
            let encryptedBytes = try aes.encrypt(Array(value.utf8))
            let encryptedData = Data(encryptedBytes)
            return encryptedData.base64EncodedString()
        } catch {
            print("Encryption error: \(error)")
            return nil
        }
    }


    func decrypt(value: String, privateKey: String, ivKey: String?) -> String? {
        let iv = cryptoHelper.genAESIvKey(ivKey: ivKey)
        let key = cryptoHelper.hexStringToUInt8Array(privateKey)
        guard let decodedBytes = Data(base64Encoded: value)?.bytes else {
            print("Invalid Base64 string")
            return nil
        }
        do {
            let aes = try AES(key: key, blockMode: CBC(iv: iv), padding: .pkcs7)
            let decryptedBytes = try aes.decrypt(decodedBytes)
            return String(bytes: decryptedBytes, encoding: .utf8)
        } catch {
            print("Decryption error: \(error)")
            return nil
        }
    }
}
