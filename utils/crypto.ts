import crypto from 'crypto';
import { device_info_for_encryption } from './types';


//encryption function
export function encryptObject(obj: device_info_for_encryption) {
  if (typeof process.env.SECRET_KEY !== 'string') {
    throw new Error('SECRET_KEY is not defined');
  }

  const key = crypto.createHash('sha256').update(process.env.SECRET_KEY).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const stringedObject = JSON.stringify(obj);
  let encrypted = cipher.update(stringedObject, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    data: encrypted
  };
}

//decryption function
export function decryptObject(encryptedData: {
  iv: string;
  auth_tag: string;
  data: string;
}) {
  if (typeof process.env.SECRET_KEY !== 'string') {
    throw new Error('SECRET_KEY not defined or invalid');
  }

  const key = crypto.createHash('sha256').update(process.env.SECRET_KEY).digest();
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(encryptedData.iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(encryptedData.auth_tag, 'hex'));

  let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.log(JSON.parse(decrypted))

  return JSON.parse(decrypted);
}
