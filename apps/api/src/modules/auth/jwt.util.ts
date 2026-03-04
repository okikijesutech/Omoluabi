import * as crypto from 'crypto';

export function base64urlEncode(str: string | Buffer): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function signJwt(payload: any, secret: string, expiresInSecs: number = 3600): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const exp = Math.floor(Date.now() / 1000) + expiresInSecs;
  const payloadWithExp = { ...payload, exp };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payloadWithExp));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signatureInput}.${signature}`;
}

export function verifyJwt(token: string, secret: string): any {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf8'));
  
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error('Token expired');
  }

  return payload;
}
