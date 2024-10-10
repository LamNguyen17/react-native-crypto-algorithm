package com.cryptoalgorithm

import com.facebook.react.bridge.*
import kotlinx.coroutines.*
import java.security.*
import android.util.Base64
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.crypto.Cipher

class CryptoAlgorithmModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
  private var aesAlgorithm: AesAlgorithm = AesAlgorithm()
  private var sha256Algorithm: Sha256Algorithm = Sha256Algorithm()
  private var rsaAlgorithm: RsaAlgorithm = RsaAlgorithm()
  private var hmacAesAlgorithm: HmacAesAlgorithm = HmacAesAlgorithm()
  private var hmacAlgorithm: HmacAlgorithm = HmacAlgorithm()
  private var cryptoHelper: CryptoHelper = CryptoHelper()

  // Create a CoroutineScope for managing coroutines.
  private val activityScope = CoroutineScope(Dispatchers.Main + SupervisorJob())

  companion object {
    const val NAME = "CryptoAlgorithm"
    const val ERR_VALID_KEY = "Invalid key or corrupted data"
  }
  override fun getName(): String {
    return NAME
  }

  @ReactMethod
      fun genSecretKey(algorithmType: String, promise: Promise) {
          activityScope.launch {
              flow {
                  val secretKey = cryptoHelper.genSecretKey(algorithmType, null)
                  if (secretKey != null) {
                      emit(cryptoHelper.convertSecretKeyToString(secretKey))
                  }
              }.flowOn(Dispatchers.IO).catch {
                  promise.resolve(ERR_VALID_KEY)
              }.collect { secretKey ->
                  promise.resolve(secretKey)
              }
          }
      }

      private fun activityLaunch(
          algorithmType: String,
          cryptoType: Any,
          value: String,
          secretKey: String,
          ivKey: String?,
          promise: Promise
      ) {
          activityScope.launch {
              flow {
                  when (algorithmType) {
                      CryptoHelper.AES.ALGORITHM -> {
                          when (cryptoType) {
                              CryptoHelper.CryptoType.ENCRYPT ->
                                  emit(aesAlgorithm.encrypt(value, secretKey, ivKey))

                              CryptoHelper.CryptoType.DECRYPT ->
                                  emit(aesAlgorithm.decrypt(value, secretKey, ivKey))
                          }
                      }

                      CryptoHelper.HMAC.ALGORITHM -> {
                          when (cryptoType) {
                              CryptoHelper.CryptoType.VERIFY -> {
                                  val transformSecretKey = cryptoHelper.convertStringToSecretKey(
                                      secretKey, CryptoHelper.HMAC_AES.ALGORITHM
                                  )
                                  val calculateHmac = hmacAlgorithm.calculate(
                                      transformSecretKey, value
                                  )
                                  emit(
                                      hmacAlgorithm.verify(transformSecretKey, value, calculateHmac)
                                  )
                              }
                          }
                      }

                      CryptoHelper.HMAC_AES.ALGORITHM -> {
                          when (cryptoType) {
                              CryptoHelper.CryptoType.ENCRYPT ->
                                  emit(hmacAesAlgorithm.encrypt(value, secretKey, ivKey))

                              CryptoHelper.CryptoType.DECRYPT ->
                                  emit(hmacAesAlgorithm.decrypt(value, secretKey, ivKey))

                          }
                      }

                      CryptoHelper.RSA.ALGORITHM -> {
                          when (cryptoType) {
                              CryptoHelper.CryptoType.ENCRYPT ->
                                  emit(rsaAlgorithm.encrypt(value, secretKey))

                              CryptoHelper.CryptoType.DECRYPT ->
                                  emit(rsaAlgorithm.decrypt(value, secretKey))
                          }
                      }
                  }
              }.flowOn(Dispatchers.IO).catch {
                  promise.resolve(ERR_VALID_KEY)
              }.collect { encryptedData ->
                  promise.resolve(encryptedData)
              }
          }
      }

      @ReactMethod
      fun encryptHmacAes(value: String, secretKey: String, promise: Promise) {
          activityLaunch(
              CryptoHelper.HMAC_AES.ALGORITHM,
              CryptoHelper.CryptoType.ENCRYPT,
              value, secretKey, null, promise
          )
      }

      @ReactMethod
      fun decryptHmacAes(value: String, secretKey: String, promise: Promise) {
          activityLaunch(
              CryptoHelper.HMAC_AES.ALGORITHM,
              CryptoHelper.CryptoType.DECRYPT,
              value, secretKey, null, promise
          )
      }

      @ReactMethod
      fun verifyHmac(value: String, secretKey: String, promise: Promise) {
          activityLaunch(
              CryptoHelper.HMAC.ALGORITHM,
              CryptoHelper.CryptoType.VERIFY,
              value, secretKey, null, promise
          )
      }

      // region RSA Algorithm
      @ReactMethod
      fun genRSAKeyPair(promise: Promise) {
          activityScope.launch {
              flow {
                  val keyPairGenerate = rsaAlgorithm.genKeyPair()
                  emit(keyPairGenerate)
              }.flowOn(Dispatchers.IO).catch {
                  promise.resolve(ERR_VALID_KEY)
              }.collect { keyPairGenerate ->
                  val publicKey: PublicKey = keyPairGenerate.public
                  val privateKey: PrivateKey = keyPairGenerate.private
                  val publicKeyString = Base64.encodeToString(publicKey.encoded, Base64.DEFAULT)
                  val privateKeyString = Base64.encodeToString(privateKey.encoded, Base64.DEFAULT)
                  val result = Arguments.createMap()
                  result.putString("publicKey", publicKeyString)
                  result.putString("privateKey", privateKeyString)
                  promise.resolve(result)
              }
          }
      }

      @ReactMethod
      fun encryptRSA(value: String, publicKey: String, promise: Promise) {
          activityLaunch(
              CryptoHelper.RSA.ALGORITHM,
              CryptoHelper.CryptoType.ENCRYPT,
              value, publicKey, null, promise
          )
      }

      @ReactMethod
      fun decryptRSA(value: String, privateKey: String, promise: Promise) {
          activityLaunch(
              CryptoHelper.RSA.ALGORITHM,
              CryptoHelper.CryptoType.DECRYPT,
              value, privateKey, null, promise
          )
      }
      // endregion RSA Algorithm

      // region SHA256 Algorithm
      @ReactMethod
      fun hashSHA256(value: String, promise: Promise) {
          if (value.isEmpty()) {
              promise.resolve(ERR_VALID_KEY)
              return
          }
          activityScope.launch {
              flow {
                  val encryptedData = sha256Algorithm.hashSHA256(value)
                  emit(encryptedData)
              }.flowOn(Dispatchers.IO).catch {
                  promise.resolve(ERR_VALID_KEY)
              }.collect { encryptedData ->
                  promise.resolve(encryptedData)
              }
          }
      }
      // endregion SHA256 Algorithm

      // region AES Algorithm
      @ReactMethod
      fun encryptAES(value: String, secretKey: String, ivKey: String?, promise: Promise) {
          if (value.isEmpty() || secretKey.isEmpty()) {
              promise.resolve(ERR_VALID_KEY)
              return
          }
          activityLaunch(
              CryptoHelper.AES.ALGORITHM,
              CryptoHelper.CryptoType.ENCRYPT,
              value, secretKey, ivKey, promise
          )
      }

      @ReactMethod
      fun decryptAES(value: String, secretKey: String, ivKey: String?, promise: Promise) {
          if (value.isEmpty() || secretKey.isEmpty()) {
              promise.resolve(ERR_VALID_KEY)
              return
          }
          activityLaunch(
              CryptoHelper.AES.ALGORITHM,
              CryptoHelper.CryptoType.DECRYPT,
              value, secretKey, ivKey, promise
          )
      }
      // endregion AES Algorithm

      override fun onHostResume() {
          TODO("Not yet implemented")
      }

      override fun onHostPause() {
          TODO("Not yet implemented")
      }

      override fun onHostDestroy() {
          // Cancel the CoroutineScope to avoid memory leaks
          activityScope.cancel()
      }
}
