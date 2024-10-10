package com.cryptoalgorithm

import java.security.*

class Sha256Algorithm {
  fun hashSHA256(value: String): String? {
    return try {
      val bytes = value.toByteArray()
      val md = MessageDigest.getInstance(CryptoHelper.SHA256.ALGORITHM)
      val digest = md.digest(bytes)
      digest.joinToString("") { "%02x".format(it) }
    } catch (e: Exception) {
      null
    }
  }
}
