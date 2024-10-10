import Foundation
import CryptoSwift

extension Data {
    public var bytes: [UInt8]{
        return [UInt8](self)
    }
}

class CryptoHelper {
    enum CryptoType {
        case encrypt
        case decrypt
        case verify
        case hash
    }
    enum KeyType {
        case keyPublic
        case keyPrivate
    }
    struct Aes {
        static let algorithm = "AES"
        static let emptyIvSpec = Array<UInt8>(repeating: 0x00, count: 16)
        static let emptySecretKey = Array<UInt8>(repeating: 0x00, count: 32)
    }
    struct Sha256 {
        static let algorithm = "SHA-256"
    }
    struct Rsa {
        static let algorithm = kSecAttrKeyTypeRSA as String
        static let keySize = 2048
        static let transformation = "RSA/ECB/PKCS1Padding"
    }
    struct Hmac {
        static let algorithm = "Hmac"
    }
    struct HmacAes {
        static let algorithm = "HmacSHA256"
        static let transformation = "AES/CBC/PKCS5Padding"
    }
    internal static let decryptionErrValidKey = "Invalid key or corrupted data"
    internal static let encryptionErrValidKey = "Invalid key or corrupted data"
    internal static let decryptionErrIncorrectBlockSize = "Incorrect block size"
    internal static let decryptionErrUnexpectedError = "Unexpected error"

    func genRSAKeyPair() -> (privateKeyBase64: String, publicKeyBase64: String)? {
        let attributes: [String: Any] = [
            kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
            kSecAttrKeySizeInBits as String: Rsa.keySize,
            kSecAttrIsPermanent as String: false // Not saving to keychain
        ]
        var error: Unmanaged<CFError>?
        guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else { return nil }
        guard let publicKey = SecKeyCopyPublicKey(privateKey) else { return nil }

        let privateKeyData = SecKeyCopyExternalRepresentation(privateKey, &error)! as Data
        let privateKeyBase64 = privateKeyData.base64EncodedString()
        let publicKeyData = SecKeyCopyExternalRepresentation(publicKey, &error)! as Data
        let publicKeyBase64 = publicKeyData.base64EncodedString()

        return (privateKeyBase64: privateKeyBase64, publicKeyBase64: publicKeyBase64)
    }

    func hexStringToUInt8Array(_ hex: String) -> [UInt8] {
        var byteArray = [UInt8]()
        let length = hex.count

        // Ensure the hex string has an even number of characters
        guard length % 2 == 0 else { return byteArray } // Return empty array if invalid

        var index = hex.startIndex
        for _ in 0..<length / 2 {
            let nextIndex = hex.index(index, offsetBy: 2)
            let byteString = String(hex[index..<nextIndex])

            if let byte = UInt8(byteString, radix: 16) {
                byteArray.append(byte)
            } else {
                print("Invalid hex pair: \(byteString), returning empty array.")
                return byteArray // Return empty array if conversion fails
            }

            index = nextIndex
        }

        return byteArray
    }

    func stringToKey(key: String, keyType: KeyType) -> SecKey? {
        guard let keyData = Data(base64Encoded: key) else { return nil }
        let keyDict: [String: Any] = [
            kSecAttrKeyType as String: Rsa.algorithm,
            kSecAttrKeyClass as String: (keyType == .keyPublic) ? kSecAttrKeyClassPublic : kSecAttrKeyClassPrivate
        ]
        return SecKeyCreateWithData(keyData as CFData, keyDict as CFDictionary, nil)
    }

    private func genExactlyCharacterLengthKey(key: String, length: Int) -> String {
        let bytes = Array(key.utf8)
        let hexString = bytes.map { String(format: "%02x", $0) }.joined()
        let hexLength = hexString.prefix(length).padding(toLength: length, withPad: "0", startingAt: 0)
        return String(hexLength)
    }

    func genSecretKeyHmac() -> String {
        let length = 16
        var key = [UInt8](repeating: 0, count: length)
        let result = key.withUnsafeMutableBytes {
            SecRandomCopyBytes(kSecRandomDefault, length, $0.baseAddress!)
        }
        if result != errSecSuccess {
            print("Error generating random key: \(result)")
            return ""
        }
        return key.map { String(format: "%02hhx", $0) }.joined()
    }

    func genSecretKey(algorithmType: String, secretKey: String?) -> Array<UInt8> {
        switch algorithmType {
        case CryptoHelper.Aes.algorithm:
            if let secretKey = secretKey {
                let transform = genExactlyCharacterLengthKey(key: secretKey, length: 32)
                return Array(transform.utf8)
            } else {
                return Aes.emptySecretKey
            }
        default:
            return Aes.emptySecretKey
        }
    }

    func genAESSecretKey(secretKey: String?) -> Array<UInt8> {
        if let secretKey = secretKey {
            let transform = genExactlyCharacterLengthKey(key: secretKey, length: 32)
            return Array(transform.utf8)
        } else {
            return Aes.emptySecretKey
        }
    }

    func genAESIvKey(ivKey: String?) -> Array<UInt8> {
        if let ivKey = ivKey {
            let transform = genExactlyCharacterLengthKey(key: ivKey, length: 16)
            return Array(transform.utf8)
        } else {
            return Aes.emptyIvSpec
        }
    }
}
