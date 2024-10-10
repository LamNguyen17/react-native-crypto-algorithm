package com.cryptoalgorithm

import java.security.*
import java.security.spec.*
import android.util.*
import javax.crypto.*

class RsaAlgorithm {
  fun genKeyPair(): KeyPair {
    val keyGen = KeyPairGenerator.getInstance(CryptoHelper.RSA.ALGORITHM)
    keyGen.initialize(CryptoHelper.RSA.KEY_SIZE)
    return keyGen.genKeyPair()
  }

  private fun stringToKey(key: String, keyType: CryptoHelper.KeyType): Key {
    val keyBytes: ByteArray = Base64.decode(key, Base64.DEFAULT)
    val keyFactory = KeyFactory.getInstance(CryptoHelper.RSA.ALGORITHM)
    return when (keyType) {
      CryptoHelper.KeyType.PUBLIC -> {
        val keySpec = X509EncodedKeySpec(keyBytes)
        keyFactory.generatePublic(keySpec)
      }
      CryptoHelper.KeyType.PRIVATE -> {
        val keySpec = PKCS8EncodedKeySpec(keyBytes)
        keyFactory.generatePrivate(keySpec)
      }
    }
  }

  fun encrypt(value: String, publicKey: String): String? {
    if (value.isEmpty()) {
      return null
    }
    val cipher = Cipher.getInstance(CryptoHelper.RSA.TRANSFORMATION)
    cipher.init(Cipher.ENCRYPT_MODE, stringToKey(publicKey, CryptoHelper.KeyType.PUBLIC))
    val encryptedBytes = cipher.doFinal(value.toByteArray())
    return Base64.encodeToString(encryptedBytes, Base64.DEFAULT)
  }

  fun decrypt(encryptedData: String, privateKey: String): String? {
    if (encryptedData.isEmpty()) {
      return null
    }
    val cipher = Cipher.getInstance(CryptoHelper.RSA.TRANSFORMATION)
    cipher.init(Cipher.DECRYPT_MODE, stringToKey(privateKey, CryptoHelper.KeyType.PRIVATE))
    val encryptedBytes = Base64.decode(encryptedData, Base64.DEFAULT)
    val decryptedBytes = cipher.doFinal(encryptedBytes)
    return String(decryptedBytes, Charsets.UTF_8)
  }
}
