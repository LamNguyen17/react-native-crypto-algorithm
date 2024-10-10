import Foundation
import CryptoSwift

class HmacAlgorithm {
    func calculate(key: String, data: String) -> String {
        guard let keyData = key.data(using: .utf8),
              let hmac = try? HMAC(key: keyData.bytes, variant: .sha2(.sha256)).authenticate(data.bytes) else {
            return ""
        }
        return Data(hmac).base64EncodedString()
    }
    
    func verify(key: String, data: String, hmacToVerify: String) -> Bool {
        let calculatedHmac = calculate(key: key, data: data)
        return calculatedHmac == hmacToVerify
    }
}
