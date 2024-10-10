package com.cryptoalgorithm

import android.util.Base64
import javax.crypto.*

class HmacAlgorithm {
  fun calculate(key: SecretKey, data: String): String {
    val mac = Mac.getInstance(CryptoHelper.HMAC_AES.ALGORITHM)
    mac.init(key)
    val hmacBytes = mac.doFinal(data.toByteArray())
    return Base64.encodeToString(hmacBytes, Base64.DEFAULT)
  }

  fun verify(key: SecretKey, data: String, hmacToVerify: String): Boolean {
    val calculatedHmac = calculate(key, data)
    return calculatedHmac == hmacToVerify
  }
}
