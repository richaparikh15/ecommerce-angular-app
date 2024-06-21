import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class NonceService {

  generateNonce(): string {
    const nonceBytes = CryptoJS.lib.WordArray.random(16); 
    return CryptoJS.enc.Base64.stringify(nonceBytes); 
  }
}