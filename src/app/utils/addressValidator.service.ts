import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as baseX from 'base-x';
import sha from 'sha.js';
import { environment } from '../../environments/environment';

@Injectable()
export class AddressValidatorService {
  private addressTypes = {
    0x49: {
      type: 'p2pkh',
      network: 'mainnet'
    },

    0x41: {
      type: 'p2pkh',
      network: 'testnet'
    },

    0x3f: {
      type: 'p2sh',
      network: 'mainnet'
    },

    0x7d: {
      type: 'p2sh',
      network: 'testnet'
    }
  };

  private base58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

  constructor() {
    this.validateWgrAddress = this.validateWgrAddress.bind(this);
  }

  private sha256(payload: Buffer): Buffer {
    return Buffer.from(sha('sha256').update(payload).digest());
  }

  validateWgrAddress(control: AbstractControl): {[key: string]: any} | null {
    const address = control.value;
    if (!address) {
      return { wgr: true };
    }
    let decoded: Buffer;
    try {
      decoded = this.base58.decode(address);
    } catch (error) {
      return { wgr: true };
    }
    const { length } = decoded;
    if (length !== 25) {
      return { wgr: true };
    }
    const version = decoded.readUInt8(0);
    const checksum = decoded.slice(length - 4, length);
    const body = decoded.slice(0, length - 4);
    const expectedChecksum = this.sha256(this.sha256(body)).slice(0, 4);
    if (!checksum.equals(expectedChecksum)) {
      return { wgr: true };
    }
    const addressType = this.addressTypes[version];
    if (!addressType) {
      return { wgr: true };
    }
    if (environment[environment.access].testnet && addressType.network !== 'testnet') {
      return { wgr: true };
    } else if (!environment[environment.access].testnet &&addressType.network !== 'mainnet') {
      return { wgr: true };
    }
    return null;
  }
}
