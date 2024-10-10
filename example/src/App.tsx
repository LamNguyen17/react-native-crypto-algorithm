import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import Crypto from 'react-native-crypto-algorithm';

export default function App() {
  const [encrypt, setEncrypt] = useState<string | null>(null);
  const [decrypt, setDecrypt] = useState<string | null>(null);
  const [hashSHA, setHashSHA256] = useState<string | null>(null);
  const [encryptRSA, setEncryptRSA] = useState<string | null>(null);
  const [decryptRSA, setDecryptRSA] = useState<string | null>(null);
  const [keyRSA, setKeyRSA] = useState(null);
  const [keyHmac, setKeyHmac] = useState<string | null>(null);
  const [encryptHmac, setEncryptHmac] = useState<string | null>(null);
  const [decryptHmac, setDecryptHmac] = useState<string | null>(null);
  const [verifyHmac, setVerifyHmac] = useState<string | null>(null);

  useEffect(() => {
    getCrypto().then();
    getHashSHA256().then();
    getCryptoRSA().then();
    getHmacKey().then();
  }, []);

  const getHmacKey = async () => {
    const key = await Crypto.genHmacSecretKey();
    console.log('getHmacKey:', key);
    setKeyHmac(key);
    await getCryptoHmacAes(key);
    await getCryptoHmac(key);
  }

  const getCryptoHmacAes = async (secretKey: string) => {
    const encryptData = await Crypto.encryptHmacAes('Hello123', secretKey);
    const decryptData = await Crypto.decryptHmacAes(encryptData, secretKey);
    setEncryptHmac(encryptData);
    setDecryptHmac(decryptData);
    console.log('getEncryptionHmacAes:', secretKey, ' - ', encryptData, ' - ', decryptData);

  }

  const getCryptoHmac = async (secretKey: string) => {
    const verify = await Crypto.verifyHmac('Hello123', secretKey);
    setVerifyHmac(`${verify}`);
  }

  const getCryptoRSA = async () => {
    const keyPair = await Crypto.genRSAKeyPair();
    setKeyRSA(keyPair);
    const encryptData = await Crypto.encryptRSA('Hello123', keyPair.publicKey);
    const decryptData = await Crypto.decryptRSA(encryptData, keyPair.privateKey);
    setEncryptRSA(encryptData);
    setDecryptRSA(decryptData);
    // console.log('getEncryptionRSA :', keyPair.publicKey);
  };

  const getCrypto = async () => {
    const encryptData = await Crypto.encryptAES('Hello123', 'Alo123');
    const decryptData = await Crypto.decryptAES(`${encryptData}`, 'Alo123');
    setEncrypt(encryptData);
    setDecrypt(decryptData);
    // console.log('getEncryption_encryptData :', encryptData);
  };

  const getHashSHA256 = async () => {
    const hashSHA256Data = await Crypto.hashSHA256('Hello123');
    setHashSHA256(hashSHA256Data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Section title='AES'>
          <Text style={styles.title}
                numberOfLines={8}>Encrypt: <Text style={styles.text}>{encrypt}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Decrypt: <Text style={styles.text}>{decrypt}</Text></Text>
        </Section>
        <Section title='SHA256'>
          <Text style={styles.title}
                numberOfLines={8}>Hash SHA-256: <Text style={styles.text}>{hashSHA}</Text></Text>
        </Section>
        <Section title='RSA'>
          <Text style={styles.title}
                numberOfLines={8}>KeyPair public RSA: <Text
            style={styles.text}>{`${keyRSA?.publicKey}`}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>KeyPair private RSA: <Text
            style={styles.text}>{`${keyRSA?.privateKey}`}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Encrypt RSA: <Text style={styles.text}>{encryptRSA}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Decrypt RSA: <Text style={styles.text}>{decryptRSA}</Text></Text>
        </Section>
        <Section title='HMAC & AES'>
          <Text style={styles.title}
                numberOfLines={8}>SecretKey HMAC: <Text
            style={styles.text}>{`${keyHmac}`}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Encrypt HMAC: <Text style={styles.text}>{encryptHmac}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Decrypt HMAC: <Text style={styles.text}>{decryptHmac}</Text></Text>
        </Section>
        <Section title='HMAC'>
          <Text style={styles.title}
                numberOfLines={8}>SecretKey HMAC: <Text
            style={styles.text}>{keyHmac}</Text></Text>
          <Text style={styles.title}
                numberOfLines={8}>Verify HMAC: <Text
            style={styles.text}>{verifyHmac}</Text></Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ children, title }: any): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    paddingHorizontal: 16,
  },
  title: {
    color: 'red',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontWeight: '400',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
});
