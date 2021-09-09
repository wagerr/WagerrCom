import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SocketConnService} from '../../../service/socket-conn.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {AuthService} from '../../../service/auth.service';
import {environment} from '../../../../environments/environment';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {DepositComponent} from './deposit/deposit.component';
import {AccountComponent} from './account/account.component';
import {Router} from '@angular/router';
import {SbAddDeviceComponent} from '../sb-add-device/sb-add-device.component';
import {SbAddDeviceCodeComponent} from '../sb-add-device-code/sb-add-device-code.component';
import {AffiliateComponent} from '../affiliate/affiliate.component';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LogoutModalComponent} from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-sbdisplay',
  templateUrl: './sbdisplay.component.html',
  styleUrls: ['./sbdisplay.component.scss']
})
export class SbdisplayComponent implements OnInit, AfterViewInit {
  bsModalRef: BsModalRef;
  sport = 'all';
  showBet = true;
  isMobileNav = false;
  importSeed = true;
  sbAccount: any = {};
  setSocialCreate = false;
  encryptSecretKey = 'wgr#1Betting';
  bets = 0;
  elementType = 'url';
  sportsDisplay = [];
  activeSportDisplay = [];
  searchBox: string;
  private subject: Subject<string> = new Subject();


  constructor(
    private sc: SocketConnService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private wsb: WgrSportsBookService,
    public authService: AuthService,
    private router: Router
  ) {
    this.sc.openEvents.subscribe((data: any) => {
      // this.openEvents = data;
      if (data) {
        const allSports = [];
        data.forEach((eachEvent: any) => {
          allSports.push(eachEvent.sport);
        });
        this.activeSportDisplay = allSports.filter((item: string, pos: number) => {
          return allSports.indexOf(item) === pos;
        });
      }
    });
    this.sc.allSports.subscribe((data: any) => {
      this.sportsDisplay = [];
      if (data) {
        let i = 0;
        data.forEach((item) => {
          const gotIt: any = {
            id: i,
            name: item,
            active: this.isSportActive(item)
          };
          i++;
          this.sportsDisplay.push(gotIt);
        });
        this.sportsDisplay.sort((n1, n2) => {
          return n2.active - n1.active;
        });
      }
    });
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(searchTextValue => {
      this.searchBox = searchTextValue;
    });
  }

  searchIt(value: string): void {
    this.subject.next(value);
  }

  checkMobileNav(): void {
    this.isMobileNav = false;
  }

  openModalAddDevice(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(SbAddDeviceComponent);
  }

  openModalAddDeviceQR(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(SbAddDeviceCodeComponent);
  }

  openModalWithdraw(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(WithdrawComponent);
  }

  openModalDeposit(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(DepositComponent);
  }

  openModalAccount(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    // @ts-ignore
    this.bsModalRef = this.modalService.show(AccountComponent,
      // @ts-ignore
      Object.assign({}, { class: 'modal-lg', backdrop: 'static' }));
  }

  openModalEarn(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(AffiliateComponent,
      Object.assign({}, {}));
  }

  isSportActive(sport: string): boolean {
    let ret = false;
    this.activeSportDisplay.forEach((item: any) => {
      if (item === sport) {
        ret = true;
      }
    });
    return ret;
  }

  socialCreate(): string {
    if (this.authService.isLoggedIn && !this.setSocialCreate) {
      this.wsb.generateMnemonic();
      this.setSocialCreate = true;
    }
    return '';
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.wsb.whatSport.next([this.sport]);
    this.wsb.bets.next([]);
    const getSeed = this.cookieService.get('asdfl3k-12u9clkjaslj');
    if (getSeed) {
      const seedWords = this.decryptData(getSeed);
      // this.sc.getSportBookAccountLogin(seedWords);
      this.wsb.getMnemonicData(seedWords.replace(/\s+$/, ''));
    }
    this.wsb.bets.subscribe((data: any) => {
      if (data) {
        this.bets = data.length;
      }
    });
  }

  isLoggedIn(): boolean {
    const isLoggedIn = this.wsb.isLoggedIn();
    if (isLoggedIn) {
      return true;
    }
    return false;
  }

  logOut(): void {
    this.showMobileNav();
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(LogoutModalComponent,
      Object.assign({}, { }));
  }

  showMobileNav(): void {
    this.isMobileNav = !this.isMobileNav;
  }

  isTestnet(): boolean {
    return environment[environment.access].testnet;
  }

  getSport(id): void {
    this.searchBox = '';
    this.sport = id;
    this.wsb.whatSport.next([this.sport]);
    this.setMobileNav('sportsbook');
    this.router.navigate(['/sportsbook']);
  }

  mobileNavIsActive(type, set = 'active', seta = ''): string {
    return (this.wsb.mobileNav === type) ? set : seta;
  }

  getMobileNav(type: string): boolean {
    return this.wsb.mobileNav === type;
  }

  setMobileNav(type): void {
    window.scrollTo(0, 0);
    this.isMobileNav = false;
    this.wsb.mobileNav = type;
  }

  setShowBet(): void {
    this.showBet = !this.showBet;
  }

  encryptUid(data): string {
    const encryptKey = environment.seasalt;
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  whatOS(): string {
    let Name = '';
    if (navigator.userAgent.indexOf('Win') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Android') !== -1) {
      Name =
        'mobile';
    }
    if (navigator.userAgent.indexOf('like Mac') !== -1) {
      Name =
        'mobile';
    }
    return Name;
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

  GoogleLogin(): any {
    const loggedIn = this.authService.GoogleAuth();
  }
}
