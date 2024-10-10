package com.cryptoalgorithm

import android.util.Base64
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.*

class CryptoHelper {
    enum class KeyType {
        PUBLIC,
        PRIVATE
    }

    enum class CryptoType {
        ENCRYPT,
        DECRYPT,
        VERIFY,
    }

    object CONSTANTS {
        const val DECRYPTION_ERR_VALID_KEY = "Invalid key or corrupted data"
        const val DECRYPTION_ERR_INCORRECT_BLOCK_SIZE = "Incorrect block size"
        const val DECRYPTION_ERR_UNEXPECTED_ERROR = "Unexpected error"
        const val KEY_256 = 256
    }

    object AES {
        const val ALGORITHM = "AES"
        const val TRANSFORMATION = "AES/CBC/PKCS5PADDING"
        val EMPTY_IV_SPEC = IvParameterSpec(ByteArray(16) { 0x00.toByte() })
        val EMPTY_SECRET_KEY = SecretKeySpec(ByteArray(32) { 0x00 }, "AES")
    }

    object SHA256 {
        const val ALGORITHM = "SHA-256"
    }

    object RSA {
        const val ALGORITHM = "RSA"
        const val TRANSFORMATION = "RSA/ECB/PKCS1Padding"
        const val KEY_SIZE = 2048
    }

    object HMAC {
        const val ALGORITHM = "Hmac"
    }

    object HMAC_AES {
        const val ALGORITHM = "HmacSHA256"
        const val TRANSFORMATION = "AES/CBC/PKCS5Padding"
    }

    private fun genExactlyCharacterLengthKey(key: String, length: Int): String {
        val bytes = key.toByteArray(Charsets.UTF_8)
        val hexString = bytes.joinToString("") { "%02x".format(it) }
        val hexLength = hexString.take(length).padEnd(length, '0');
        return hexLength;
    }

    fun convertStringToSecretKey(encodedKey: String, algorithm: String): SecretKey {
        val decodedKey = Base64.decode(encodedKey, Base64.DEFAULT)
        return SecretKeySpec(decodedKey, 0, decodedKey.size, algorithm)
    }

    fun convertSecretKeyToString(secretKey: SecretKey): String {
        return Base64.encodeToString(secretKey.encoded, Base64.DEFAULT)
    }

    fun genSecretKey(algorithmType: String, secretKey: String?): SecretKey? {
        return when (algorithmType) {
            AES.ALGORITHM -> {
                if (secretKey != null) {
                    val transform = genExactlyCharacterLengthKey(secretKey, 32)
                    SecretKeySpec(transform.toByteArray(), AES.ALGORITHM)
                } else {
                    AES.EMPTY_SECRET_KEY
                }
            }

            HMAC.ALGORITHM, HMAC_AES.ALGORITHM -> {
                val keyGen = KeyGenerator.getInstance(HMAC_AES.ALGORITHM)
                keyGen.init(CONSTANTS.KEY_256)
                return keyGen.generateKey()
            }

            else -> AES.EMPTY_SECRET_KEY
        }
    }

    fun genIvKey(ivKey: String?): IvParameterSpec {
        return if (ivKey != null) {
            val transform = genExactlyCharacterLengthKey(ivKey, 16)
            IvParameterSpec(transform.toByteArray())
        } else {
            AES.EMPTY_IV_SPEC
        }
    }
}
