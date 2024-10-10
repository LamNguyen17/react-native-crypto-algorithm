import Foundation
import RxSwift

@objc(CryptoAlgorithm)
class CryptoAlgorithm: NSObject {
private let disposeBag = DisposeBag()
    private let cryptoHelper = CryptoHelper()
    private let aesAlgorithm = AesAlgorithm()
    private let sha256Algorithm = Sha256Algorithm()
    private let rsaAlgorithm = RsaAlgorithm()
    private let hmacAesAlgorithm = HmacAesAlgorithm()
    private let hmacAlgorithm = HmacAlgorithm()

    @objc(genSecretKey:withResolver:withRejecter:)
    func genSecretKey(_ algorithmType: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        Observable.just(algorithmType)
            .flatMap { data -> Observable<String> in
                return Observable.create { observer in
                    let genKey = self.cryptoHelper.genSecretKeyHmac()
                    observer.onNext(genKey)
                    observer.onCompleted()
                    return Disposables.create()
                }
            }
            .subscribe(on: ConcurrentDispatchQueueScheduler(qos: .userInitiated))
            .observe(on: MainScheduler.instance) // Observe result on main thread
            .subscribe(
                onNext: { data in
                    resolve(data)
                },
                onError: { error in
                    resolve(error.localizedDescription)
                }
            )
            .disposed(by: disposeBag)
    }

    @objc(verifyHmac:privateKey:withResolver:withRejecter:)
    func verifyHmac(_ value: String, privateKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        Observable.just(value)
            .flatMap { data -> Observable<Bool> in
                return Observable.create { observer in
                    let calculateHmac = self.hmacAlgorithm.calculate(key: privateKey, data: value)
                    let isVerify = self.hmacAlgorithm.verify(key: privateKey, data: value, hmacToVerify: calculateHmac)
                    observer.onNext(isVerify)
                    observer.onCompleted()
                    return Disposables.create()
                }
            }
            .subscribe(on: ConcurrentDispatchQueueScheduler(qos: .userInitiated))
            .observe(on: MainScheduler.instance) // Observe result on main thread
            .subscribe(
                onNext: { data in
                    resolve(data)
                },
                onError: { error in
                    resolve(error.localizedDescription)
                }
            )
            .disposed(by: disposeBag)
    }

    @objc(encryptHmacAes:privateKey:withResolver:withRejecter:)
    func encryptHmacAes(_ value: String, privateKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.HmacAes.algorithm, cryptoType: CryptoHelper.CryptoType.encrypt, value: value, privateKey: privateKey, ivKey: nil, resolve: resolve, reject: reject)
    }

    @objc(decryptHmacAes:privateKey:withResolver:withRejecter:)
    func decryptHmacAes(_ value: String, privateKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.HmacAes.algorithm, cryptoType: CryptoHelper.CryptoType.decrypt, value: value, privateKey: privateKey, ivKey: nil, resolve: resolve, reject: reject)
    }

    @objc(genRSAKeyPair:withRejecter:)
    func genRSAKeyPair(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        Observable.create { observer in
            let keyPair = self.cryptoHelper.genRSAKeyPair()
            guard let privateKeyBase64 = keyPair?.privateKeyBase64, let publicKeyBase64 = keyPair?.publicKeyBase64 else {
                return Disposables.create()
            }
            let result = [
                "privateKey": privateKeyBase64,
                "publicKey": publicKeyBase64
            ] as [String: Any]
            observer.onNext(result)
            observer.onCompleted()
            return Disposables.create()
        }
        .subscribe(on: ConcurrentDispatchQueueScheduler(qos: .userInitiated)) // Perform on background thread
        .observe(on: MainScheduler.instance) // Observe result on main thread
        .subscribe(
            onNext: { result in
                resolve(result)
            },
            onError: { error in
                resolve(error.localizedDescription)
            }
        )
        .disposed(by: disposeBag)
    }

    @objc(encryptRSA:publicKey:withResolver:withRejecter:)
    func encryptRSA(_ value: String, publicKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.Rsa.algorithm, cryptoType: CryptoHelper.CryptoType.encrypt, value: value, privateKey: publicKey, ivKey: nil, resolve: resolve, reject: reject)
    }

    @objc(decryptRSA:privateKey:withResolver:withRejecter:)
    func decryptRSA(_ value: String, privateKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.Rsa.algorithm, cryptoType: CryptoHelper.CryptoType.decrypt, value: value, privateKey: privateKey, ivKey: nil, resolve: resolve, reject: reject)
    }

    @objc(hashSHA256:withResolver:withRejecter:)
    func hashSHA256(_ value: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.Sha256.algorithm, cryptoType: CryptoHelper.CryptoType.hash, value: value, privateKey: "", ivKey: nil, resolve: resolve, reject: reject)
    }

    @objc(encryptAES:privateKey:ivKey:withResolver:withRejecter:)
    func encryptAES(_ value: String, privateKey: String, ivKey: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.Aes.algorithm, cryptoType: CryptoHelper.CryptoType.encrypt, value: value, privateKey: privateKey, ivKey: ivKey, resolve: resolve, reject: reject)
    }

    @objc(decryptAES:privateKey:ivKey:withResolver:withRejecter:)
    func decryptAES(_ value: String, privateKey: String, ivKey: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        activityLaunch(algorithmType: CryptoHelper.Aes.algorithm, cryptoType: CryptoHelper.CryptoType.decrypt, value: value, privateKey: privateKey, ivKey: ivKey, resolve: resolve, reject: reject)
    }


    private func activityLaunch(
        algorithmType: String, cryptoType: CryptoHelper.CryptoType, value: String, privateKey: String, ivKey: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
            Observable.just(value)
                .flatMap { data -> Observable<String> in
                    switch algorithmType {
                    case CryptoHelper.Aes.algorithm:
                        switch cryptoType {
                        case CryptoHelper.CryptoType.encrypt:
                            return Observable.create { observer in
                                guard let encryptedData = self.aesAlgorithm.encrypt(value: data, privateKey: privateKey, ivKey: ivKey) else {
                                    observer.onError(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                                    return Disposables.create()
                                }
                                observer.onNext(encryptedData)
                                observer.onCompleted()
                                return Disposables.create()
                            }
                        case CryptoHelper.CryptoType.decrypt:
                            return Observable.create { observer in
                                let decryptedData = self.aesAlgorithm.decrypt(value: data, privateKey: privateKey, ivKey: ivKey)
                                if decryptedData == CryptoHelper.decryptionErrValidKey ||
                                    decryptedData == CryptoHelper.decryptionErrIncorrectBlockSize ||
                                    decryptedData == CryptoHelper.decryptionErrUnexpectedError {
                                    observer.onError(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: [NSLocalizedDescriptionKey: decryptedData]))
                                } else {
                                    observer.onNext(decryptedData)
                                    observer.onCompleted()
                                }
                                return Disposables.create()
                            }
                        default:
                            return Observable.error(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                        }
                    case CryptoHelper.Sha256.algorithm:
                        switch cryptoType {
                        case CryptoHelper.CryptoType.hash:
                            return Observable.create { observer in
                                guard let hashData = self.sha256Algorithm.hashSHA256(value: data) else {
                                    observer.onError(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                                    return Disposables.create()
                                }
                                observer.onNext(hashData)
                                observer.onCompleted()
                                return Disposables.create()
                            }
                        default:
                            return Observable.error(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                        }
                    case CryptoHelper.Rsa.algorithm:
                        switch cryptoType {
                        case CryptoHelper.CryptoType.encrypt:
                            return Observable.create { observer in
                                let encryptedData = self.rsaAlgorithm.encryptRSA(value: data, publicKey: privateKey)
                                if encryptedData == CryptoHelper.encryptionErrValidKey {
                                    observer.onError(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                                } else {
                                    observer.onNext(encryptedData ?? "")
                                    observer.onCompleted()
                                }
                                return Disposables.create()
                            }
                        case CryptoHelper.CryptoType.decrypt:
                            return Observable.create { observer in
                                let decryptData = self.rsaAlgorithm.decryptRSA(value: data, privateKey: privateKey)
                                if decryptData == CryptoHelper.decryptionErrValidKey {
                                    observer.onError(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: nil))
                                } else {
                                    observer.onNext(decryptData ?? "")
                                    observer.onCompleted()
                                }
                                return Disposables.create()
                            }
                        default:
                            return Observable.error(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: nil))
                        }
                    case CryptoHelper.HmacAes.algorithm:
                        switch cryptoType {
                        case CryptoHelper.CryptoType.encrypt:
                            return Observable.create { observer in
                                guard let encryptedData = self.hmacAesAlgorithm.encrypt(value: data, privateKey: privateKey, ivKey: ivKey) else {
                                    observer.onError(NSError(domain: CryptoHelper.encryptionErrValidKey, code: 0, userInfo: nil))
                                    return Disposables.create()
                                }
                                observer.onNext(encryptedData)
                                observer.onCompleted()
                                return Disposables.create()
                            }
                        case CryptoHelper.CryptoType.decrypt:
                            return Observable.create { observer in
                                let decryptedData = self.hmacAesAlgorithm.decrypt(value: data, privateKey: privateKey, ivKey: ivKey)
                                if decryptedData == CryptoHelper.decryptionErrValidKey ||
                                    decryptedData == CryptoHelper.decryptionErrIncorrectBlockSize ||
                                    decryptedData == CryptoHelper.decryptionErrUnexpectedError {
                                    observer.onError(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: nil))
                                } else {
                                    observer.onNext(decryptedData ?? "")
                                    observer.onCompleted()
                                }
                                return Disposables.create()
                            }
                        default:
                            return Observable.error(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: nil))
                        }
                    default:
                        return Observable.error(NSError(domain: CryptoHelper.decryptionErrValidKey, code: 0, userInfo: nil))
                    }
                }
                .subscribe(on: ConcurrentDispatchQueueScheduler(qos: .userInitiated))
                .observe(on: MainScheduler.instance) // Observe result on main thread
                .subscribe(
                    onNext: { data in
                        resolve(data)
                    },
                    onError: { error in
                        resolve(error.localizedDescription)
                    }
                )
                .disposed(by: disposeBag)

        }
}
