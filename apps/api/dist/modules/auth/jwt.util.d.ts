export declare function base64urlEncode(str: string | Buffer): string;
export declare function signJwt(payload: any, secret: string, expiresInSecs?: number): string;
export declare function verifyJwt(token: string, secret: string): any;
