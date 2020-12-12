import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {environment} from '../../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WgrSportsBookService} from '../../../../service/wgr-sports-book.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../../service/auth.service';
import * as CryptoJS from 'crypto-js';
import {BuyModalComponent} from '../../../buy-modal/buy-modal.component';
import {SbAddDeviceComponent} from '../../sb-add-device/sb-add-device.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isModal = 'signin';
  printSeed = false;
  mnemonicWords = new FormGroup({
    word1: new FormControl('', Validators.required),
    word2: new FormControl('', Validators.required),
    word3: new FormControl('', Validators.required),
    word4: new FormControl('', Validators.required),
    word5: new FormControl('', Validators.required),
    word6: new FormControl('', Validators.required),
    word7: new FormControl('', Validators.required),
    word8: new FormControl('', Validators.required),
    word9: new FormControl('', Validators.required),
    word10: new FormControl('', Validators.required),
    word11: new FormControl('', Validators.required),
    word12: new FormControl('', Validators.required),
  });
  startGenMnemonic: any;
  genMnemonic: any;

  constructor(
    private cookieService: CookieService,
    private wsb: WgrSportsBookService,
    public modalRef: BsModalRef,
    private modalService: BsModalService,
    public authService: AuthService) {
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  ngOnInit(): void {
    this.printSeed = false;
    const getSeed = this.cookieService.get('asdfl3k-12u9clkjaslj');
    if (getSeed) {
      const seedWords = this.decryptData(getSeed);
      this.wsb.getMnemonicData(seedWords.replace(/\s+$/, ''));
    }
  }

  import(): void {
    let sendWords = '';
    const allWords: any = this.mnemonicWords.value;
    for (const key of Object.keys(allWords)) {
      sendWords = sendWords + allWords[key] + ' ';
    }
    this.setSeedCookie(sendWords.replace(/\s+$/, ''));
    // this.sc.getSportBookAccountLogin(sendWords);
    this.wsb.getMnemonicData(sendWords.replace(/\s+$/, ''));
    this.modalRef.hide();
  }

  scanqrcode(): void {
    this.modalRef.hide();
    this.modalRef = this.modalService.show(SbAddDeviceComponent);
  }

  accountsEnabled(): boolean {
    return (environment[environment.access].accountEnabled);
  }

  whatModal(type: string): boolean {
    return (type === this.isModal);
  }

  modalSwitch(type: string): void {
    if (this.modalRef) {
      this.modalRef.setClass('modal-lg');
      if (type === 'signin-anon') {
        this.modalRef.setClass('');
      }
      if (type === 'create-anon') {
        this.startGenMnemonic = this.wsb.generateMnemonic(false);
        const splitGenMnemonic = this.startGenMnemonic.split(' ');
        this.genMnemonic = this.mnemonicWords.value;
        splitGenMnemonic.forEach((value: any, key: number) => {
          this.genMnemonic['word' + (key + 1)] = value;
        });
        // this.setSeedCookie(getGenMnemonic.replace(/\s+$/, ''));
        this.modalRef.setClass('');
      }
      if (type === 'load-account') {
        this.wsb.getMnemonicData(this.startGenMnemonic);
        this.setSeedCookie(this.startGenMnemonic.replace(/\s+$/, ''));

      }
      this.isModal = type;
    }
  }

  loadAccount(): void {
    this.modalRef.hide();
    this.modalRef = this.modalService.show(BuyModalComponent,
      Object.assign({}, {class: 'modal-lg'}));
  }

  setSeedCookie(seedWords): void {
    this.cookieService.set('asdfl3k-12u9clkjaslj', this.wsb.encryptData(seedWords, this.authService.userID + environment.seasalt), 1825);
  }

  public decryptData(data): string {
    const encryptKey = this.authService.userID + environment.seasalt;
    try {
      const bytes = CryptoJS.AES.decrypt(data, encryptKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}
