"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64urlEncode = base64urlEncode;
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const crypto = __importStar(require("crypto"));
function base64urlEncode(str) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
function signJwt(payload, secret, expiresInSecs = 3600) {
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
function verifyJwt(token, secret) {
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
//# sourceMappingURL=jwt.util.js.map