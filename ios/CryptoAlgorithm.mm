#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CryptoAlgorithm, NSObject)

RCT_EXTERN_METHOD(genSecretKey:(NSString *)algorithmType
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(encryptHmacAes:(NSString *)value
                 privateKey:(NSString *)privateKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decryptHmacAes:(NSString *)value
                 privateKey:(NSString *)privateKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(verifyHmac:(NSString *)value
                 privateKey:(NSString *)privateKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(genRSAKeyPair:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(encryptRSA:(NSString *)value
                 publicKey:(NSString *)publicKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decryptRSA:(NSString *)value
                 privateKey:(NSString *)privateKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(encryptAES:(NSString *)value
                  privateKey:(NSString *)privateKey
                  ivKey: (nullable NSString *)ivKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decryptAES:(NSString *)value
                  privateKey:(NSString *)privateKey
                  ivKey: (nullable NSString *)ivKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(hashSHA256:(NSString *)value
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// + (BOOL)requiresMainQueueSetup
// {
//   return NO;
// }

@end
