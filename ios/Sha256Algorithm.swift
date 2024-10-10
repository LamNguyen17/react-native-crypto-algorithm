import Foundation
import CryptoSwift

class Sha256Algorithm {
    func hashSHA256(value: String) -> String? {
        guard let inputData = value.data(using: .utf8) else {
            return nil
        }
        let hashedData = inputData.sha256()
        return hashedData.map { String(format: "%02x", $0) }.joined()
    }
}
