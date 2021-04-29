import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {BehaviorSubject, Observable} from 'rxjs';
import * as _ from 'lodash';
import {WgrSportsBookService} from './wgr-sports-book.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketConnService {
  totalUSD = new BehaviorSubject([]);
  coinData = new BehaviorSubject([]);
  bitpayUSD = new BehaviorSubject([]);
  wgrPayout = new BehaviorSubject([]);
  wgrCustom = new BehaviorSubject([]);
  wgrMarket = new BehaviorSubject([]);
  openEvents = new BehaviorSubject([]);
  allSports = new BehaviorSubject([]);
  walletInfo = new BehaviorSubject([]);
  newsFeed = new BehaviorSubject([]);
  specials = new BehaviorSubject([]);
  sportBookChat = new BehaviorSubject([]);
  sportBookAccount = new BehaviorSubject([]);
  masternodecount = new BehaviorSubject([]);
  toastAll = new BehaviorSubject([]);

  constructor(
    private socket: Socket,
    private wsb: WgrSportsBookService,
    private auth: AuthService
  ) {
    this.socket
      .fromEvent<any[]>('toast')
      .subscribe((data: any) => {
        this.toastAll.next(data);
      });
    this.socket
      .fromEvent<any[]>('totalUSD')
      .subscribe((data: any) => {
        this.totalUSD.next(data);
      });
    this.socket
      .fromEvent<any[]>('coinData')
      .subscribe((data: any) => {
        this.coinData.next(data);
      });
    this.socket
      .fromEvent<any[]>('bitpayUSD')
      .subscribe((data: any) => {
        this.bitpayUSD.next(data);
      });
    this.socket
      .fromEvent<any[]>('wgrPayout')
      .subscribe((data: any) => {
        this.wgrPayout.next(data);
      });
    this.socket
      .fromEvent<any[]>('wgrCustom')
      .subscribe((data: any) => {
        this.wgrCustom.next(data);
      });
    this.socket
      .fromEvent<any[]>('wgrMarket')
      .subscribe((data: any) => {
        this.wgrMarket.next(data);
      });
    this.socket
      .fromEvent<any[]>('openEvents')
      .subscribe((data: any) => {
        this.openEvents.next(data);
      });
    this.socket
      .fromEvent<any[]>('allSports')
      .subscribe((data: any) => {
        this.allSports.next(data);
      });
    this.socket
      .fromEvent<any[]>('walletInfo')
      .subscribe((data: any) => {
        this.walletInfo.next(data);
      });
    this.socket
      .fromEvent<any[]>('newsFeed')
      .subscribe((data: any) => {
        this.newsFeed.next(data);
      });
    this.socket
      .fromEvent<any[]>('sportsbookchat')
      .subscribe((data: any) => {
        this.sportBookChat.next(data);
      });
    this.socket
      .fromEvent<any[]>('sportsbookaccount')
      .subscribe((data: any) => {
        this.sportBookAccount.next(data);
      });
    this.socket
      .fromEvent<any[]>('masternodecount')
      .subscribe((data: any) => {
        this.masternodecount.next(data);
      });
    this.socket
      .fromEvent<any[]>('txidHEX')
      .subscribe((data: any) => {
        this.processGotTXIDHex(data);
      });
    this.socket
      .fromEvent<any[]>('specials')
      .subscribe((data: any) => {
        this.specials.next(data);
      });
    this.socket
      .fromEvent<any[]>('pushedTX')
      .subscribe((data: any) => {
      });
  }

  private processGotTXIDHex(data: any): void {
    const account: any = this.wsb.account.getValue();
    if (account.betUnspent) {
      account.betUnspent.forEach((eachUnspent: any) => {
        if (eachUnspent.tx_hash === data.txid) {
          eachUnspent.hex = data.hex;
        }
      });
      this.wsb.account.next(account);
    }
  }

  public sendBetaNotify(postIt): void {
    const data: any = {
      email: postIt,
    };
    this.socket.emit('promoNotify', data);
  }

  public changeRoute(r: any): void {
    const user = {
      createdAt: this.auth.createdAt,
      uuid: this.auth.uuid,
      data: this.auth.userCoreData,
      route: r.urlAfterRedirects
    };
    this.socket.emit('userMovement', user);
  }

  public getSportBookAccountGenerate(): void {
    // this.socket.emit('sportBookGenerate');
  }

  public getSportBookAccountLogin(mnemonic: string): void {
    // this.socket.emit('sportBookAccountCheck', mnemonic);
  }

  public getTXIDHEX(txid: any): void {
    this.socket.emit('txidHEX', txid);
  }

  public pushBet(): void {

  }

  public sendSportschat(name, msg): void {
    const data: any = {
      name: name,
      msg: msg
    };
    this.socket.emit('sportsbookmsg', data);
  }

  public login(data): void {
    const user: any = {
      username: data.username,
      password: data.password
    };
    this.socket.emit('userLogin', user);
  }

  public isLoggedIn(): boolean {
    const userAccount: any = this.sportBookAccount.getValue();
    if (userAccount.betBalance) {
      return true;
    }
    return false;
  }

  public getUserBalance(): number {
    const userAccount: any = this.sportBookAccount.getValue();
    if (userAccount.betBalance) {
      return userAccount.betBalance;
    }
    return 0.00000000;
  }
}
