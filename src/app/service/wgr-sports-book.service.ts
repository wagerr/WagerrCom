import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, interval, Subscription} from 'rxjs';
import * as Bip39 from 'bip39';
import {bip32, ECPair, payments, Psbt} from 'bitcoinjs-lib';
import {Socket} from 'ngx-socket-io';
import * as CryptoJS from 'crypto-js';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WgrSportsBookService {
  version = +environment[environment.access].ver;
  authID = 'nottoday';
  shareQrCode = '';
  availableBalance = 0;
  blockheight = 0;
  mobileNav = 'sportlist';
  mobileEvent = 0;
  parlayBet = 0;
  getMyBalance: Subscription;
  source = interval(30000);
  betType = 'single';
  mnemonic: any;
  account = new BehaviorSubject([]);
  bets = new BehaviorSubject([]);
  placedBets = new BehaviorSubject([]);
  getSourceToggle = true;
  whatSport = new BehaviorSubject([]);
  transactionList = new BehaviorSubject([]);
  betList = new BehaviorSubject([]);
  eventData = new BehaviorSubject([]);
  authorization = new BehaviorSubject([]);
  exchangeRates = new BehaviorSubject([]);
  qrCodeChannelSet = false;
  marchMadness: any;

  public userAccount: any = {
    mnemonicSeed: '',
    mnemonicSeedHash: '',
    addressAmt: 2,
    addresses: [],
    betAddress: '',
    betPrivKey: '',
    betUnspent: '',
    betBalance: 0,
    betFullBalance: 0,
    allAddresses: []
  };

  private coinNetwork: any;

  private wgrNetwork: any = {
    messagePrefix: '\x19' + 'Wagerr Signed Message:\n',
    bip32: {
      public: 0x022d2533,
      private: 0x0221312b
    },
    pubKeyHash: 0x49,
    scriptHash: 0x3f,
    wif: 0xC7
  };

  private wgrNetworkTestnet: any = {
    messagePrefix: '\x19' + 'Wagerr Signed Message:\n',
    bip32: {
      public: 0x3A8061A0,
      private: 0x3A805837
    },
    pubKeyHash: 0x41,
    scriptHash: 0x7D,
    wif: 0xb1
  };

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private socket: Socket) {
    this.socket
      .fromEvent<any[]>('getAddressData')
      .subscribe((data: any) => {
        this.gotAddressData(data);
      });
    this.socket
      .fromEvent<any[]>('betpushed')
      .subscribe((data: any) => {
        this.updateBets(data);
      });
    this.socket
      .fromEvent<any[]>('getEvent')
      .subscribe((data: any) => {
        this.eventData.next(data);
      });
    this.socket
      .fromEvent<any[]>('betStatus')
      .subscribe((data: any) => {
        // this.eventData.next(data);
      });
    if (environment[environment.access].testnet) {
      this.coinNetwork = this.wgrNetworkTestnet;
    } else {
      this.coinNetwork = this.wgrNetwork;
    }
  }

  updateBets(updateBet: any) {
    const allBets = this.placedBets.getValue();
    allBets.forEach((gotBet: any) => {
      if (gotBet.created === updateBet.txid) {
        gotBet.errors = [];
        gotBet.nodetxid = updateBet.sendData;
        if (gotBet.created !== false && gotBet.status !== 'completed') {
          if (gotBet.nodetxid === gotBet.created) {
            gotBet.time = Math.floor(Date.now() / 1000);
            gotBet.status = 'completed';
          } else if (gotBet.nodetxid && gotBet.nodetxid.code) {
            gotBet.created = false;
            gotBet.errors.push(updateBet.sendData);
            gotBet.nodetxid = '';
          }
        }
      }
    });
    this.placedBets.next(allBets);
  }

  getEventID(eventID: number): void {
    this.socket.emit('getEvent', eventID);
  }

  getAddressData(): void {
    this.socket.emit('getAddressData', this.userAccount.betAddress);
  }

  updateAccountBalance(newBal: number): void {
    this.userAccount.betBalance = newBal;
    this.account.next(this.userAccount);
  }

  public processAvailableBalance(): void {
    this.availableBalance = (this.userAccount.betBalance + this.userAccount.depBalance) - 0.01;
    const bets = this.bets.getValue();
    let betBalance = 0;
    if (this.betType === 'parlay' && this.parlayBet > 0) {
      betBalance = (+this.parlayBet + 0.01);
    } else {
      bets.forEach((eachBet: any) => {
        betBalance += (+eachBet.userBet + 0.01);
      });
    }
    this.availableBalance = this.availableBalance - betBalance;
  }

  public isLoggedIn(): boolean {
    const userAccount: any = this.account.getValue();
    if (userAccount) {
      return (userAccount.betAddress);
    } else {
      return false;
    }
  }

  public getMarchMadnessBracketCount(): number {
    return 0;
  }

  public getUserName(): string {
    const userAccount: any = this.account.getValue();
    if (userAccount) {
      if (userAccount && userAccount.uid) {
        if (userAccount.settings && userAccount.settings.username) {
          return userAccount.settings.username;
        }
        return "wagerr.com-" + userAccount.uid.substr(userAccount.uid.length - 5);
      }
    }
    return "wagerr.com-unknown";
  }

  public logOut(): void {
    this.cookieService.delete('asdfl3k-12u9clkjaslj');
    this.userAccount = [];
    this.bets.next([]);
    this.placedBets.next([]);
    this.transactionList.next([]);
    this.betList.next([]);
    this.account.next(this.userAccount);
  }

  public getUserBetAddress(): string {
    const userAccount: any = this.account.getValue();
    if (userAccount.betAddress) {
      return userAccount.betAddress;
    }
    return null;
  }

  public getUserUID(): string {
    const userAccount: any = this.account.getValue();
    if (userAccount.uid) {
      return userAccount.uid;
    }
    return null;
  }

  public getUserBetAddressPrivKey(): string {
    const userAccount: any = this.account.getValue();
    return (userAccount.betPrivKey) ? userAccount.betPrivKey : null;
  }

  public getUserBalance(): number {
    const userAccount: any = this.account.getValue();
    if (userAccount) {
      return userAccount.betBalance;
    }
    return 0.00000000;
  }

  public MarchMadnessFaucet(): void {
    this.socket.emit('marchMadnessFaucet', this.userAccount.betAddress);
  }

  withdraw(amount: any, address: string): void {
    const account: any = this.account.getValue();
    const unSpent = account.betUnspent;
    const betPrivKey = this.getUserBetAddressPrivKey();
    this.createRawTransaction(address, amount, unSpent, betPrivKey);
  }

  createRawTransaction(sendAddress: string, amount: any, unSpent: any, key: any): boolean {
    const userBalance = this.userAccount.betBalance;
    const userBetAddress = this.getUserBetAddress();
    const psbt = this.getPsbt({network: this.coinNetwork});
    psbt.setVersion(1);
    const wgrWif = ECPair.fromWIF(key, this.coinNetwork);
    let unspentAmt = 0;
    const unspent = [];
    unSpent.forEach((eachUnspent: any) => {
      if (unspentAmt <= amount) {
        if (eachUnspent.used && eachUnspent.used === true) {

        } else {
          psbt.addInput({
            hash: eachUnspent.txid,
            index: eachUnspent.vout,
            nonWitnessUtxo: Buffer.from(eachUnspent.hex, 'hex')
          });
          eachUnspent.used = true;
          unspent.push(eachUnspent);
          unspentAmt += (eachUnspent.value);
        }
      }
    });
    if (unspentAmt > amount) {
      const changeUnSpent = +(unspentAmt * 100000000).toFixed(0);
      const usersWithdrawAmt = +(amount * 100000000).toFixed(0);
      const changeFee = +(0.001 * 100000000).toFixed(0);
      const change = (changeUnSpent - usersWithdrawAmt) - changeFee;
      const changeFinal = change / 100000000;

      psbt.addOutput({
        address: sendAddress,
        value: usersWithdrawAmt
      });
      if (change > 0) {
        if (changeFinal >= 200 && unSpent.length <= this.userAccount.settings.input) {
          let count = +(changeFinal / 26).toFixed(0);
          let eachChange = 26;
          if (changeFinal >= 500) {
            count = +(changeFinal / 100).toFixed(0);
            eachChange = 100;
          }
          if (changeFinal >= 6000) {
            count = +(changeFinal / 1000).toFixed(0);
            eachChange = 1000;
          }
          if ((eachChange * count) > changeFinal) {
            count -= 1;
          }
          const leftChange = +(changeFinal - (eachChange * count)).toFixed(8);
          for (let j = 0; j < count; j++) {
            psbt.addOutput({
              address: userBetAddress,
              value: (eachChange * 100000000)
            });
          }
          psbt.addOutput({
            address: userBetAddress,
            value: +(leftChange * 100000000).toFixed(0)
          });
        } else {
          psbt.addOutput({
            address: userBetAddress,
            value: change
          });
        }
      }
      unspent.forEach((gotUnspent: any, index: number) => {
        psbt.signInput(index, wgrWif);
        psbt.validateSignaturesOfInput(index);
      });
      psbt.finalizeAllInputs();
      const transaction = psbt.extractTransaction();
      const signedTransaction = transaction.toHex();
      const transactionId = transaction.getId();
      const pushTX = {
        address: userBetAddress,
        txid: transactionId,
        rawtx: signedTransaction,
      };
      this.socket.emit('pushTX', pushTX);
      const getOpenUnspent = this.openUnspentBalance(unSpent);
      this.userAccount.betBalance = userBalance - amount;
      this.userAccount.betUnspent = unSpent;
      this.account.next(this.userAccount);
      return transactionId;
    }
    return false;
  }

  processBets(bets: any): void {
    const placedBets = this.placedBets.getValue();
    if (bets.length > 0) {
      bets.forEach((bet: any) => {
        placedBets.push(bet);
      });
    }
    // this.wsb.updateAccountBalance(this.balance);
    this.bets.next([]);
    this.createRawTX(placedBets);
  }

  createRawTX(bets: any): void {
    const account: any = this.account.getValue();
    const unSpent = account.betUnspent;
    const masterBalance = account.unspentBalance;
    let newBalance = masterBalance;
    const betPrivKey = this.getUserBetAddressPrivKey();
    bets.filter((item) => (item.created === false)).forEach((bet: any) => {
      if (unSpent.length > 0) {
        newBalance = newBalance - bet.betAmt;
        bet = this.createRawBetTransaction(bet, unSpent, betPrivKey);
      }
    });
    this.updateAccountBalance(newBalance);
    this.placedBets.next(bets);
  }

  createRawBetTransaction(bet: any, unSpent: any, key: any): boolean {
    const userBalance = this.userAccount.betBalance;
    const userBetAddress = this.getUserBetAddress();
    const psbt = this.getPsbt({network: this.coinNetwork});
    psbt.setVersion(1);
    const data = Buffer.from(bet.opCode, 'hex');
    const embed = payments.embed({data: [data]});
    // const dataTwo = Buffer.from(bet.opCodeTwo, 'hex');
    // const embedTwo = payments.embed({data: [data]});
    const wgrWif = ECPair.fromWIF(key, this.coinNetwork);
    let unspentAmt = 0;
    const unspent = [];
    bet.created = false;
    if (bet.betAmt >= 25 && bet.betAmt <= 10000) {
      unSpent.forEach((eachUnspent: any) => {
        if (unspentAmt <= bet.betAmt) {
          if (eachUnspent.used && eachUnspent.used === true) {

          } else {
            psbt.addInput({
              hash: eachUnspent.txid,
              index: eachUnspent.vout,
              nonWitnessUtxo: Buffer.from(eachUnspent.hex, 'hex')
            });
            eachUnspent.used = true;
            unspent.push(eachUnspent);
            unspentAmt += (eachUnspent.value);
          }
        }
      });
      if (unspentAmt > bet.betAmt) {
        const changeUnSpent = +(unspentAmt * 100000000).toFixed(0);
        const userBet = +(bet.betAmt * 100000000).toFixed(0);
        const changeFee = +(0.001 * 100000000).toFixed(0);
        const change = (changeUnSpent - userBet) - changeFee;
        const changeFinal = change / 100000000;
        psbt.addOutput({
          script: embed.output,
          value: userBet
        });
        // psbt.addOutput({
        //   script: embedTwo.output,
        // });
        if (changeFinal >= 200 && unSpent.length <= this.userAccount.settings.input) {
          let count = +(changeFinal / 26).toFixed(0);
          let eachChange = 26;
          if (changeFinal >= 500) {
            count = +(changeFinal / 100).toFixed(0);
            eachChange = 100;
          }
          if (changeFinal >= 6000) {
            count = +(changeFinal / 1000).toFixed(0);
            eachChange = 1000;
          }
          if ((eachChange * count) > changeFinal) {
            count -= 1;
          }
          const leftChange = +(changeFinal - (eachChange * count)).toFixed(8);
          for (let j = 0; j < count; j++) {
            psbt.addOutput({
              address: userBetAddress,
              value: (eachChange * 100000000)
            });
          }
          psbt.addOutput({
            address: userBetAddress,
            value: +(leftChange * 100000000).toFixed(0)
          });
        } else {
          psbt.addOutput({
            address: userBetAddress,
            value: change
          });
        }
        unspent.forEach((gotUnspent: any, index: number) => {
          psbt.signInput(index, wgrWif);
          psbt.validateSignaturesOfInput(index);
        });
        psbt.finalizeAllInputs();
        const transaction = psbt.extractTransaction();
        const signedTransaction = transaction.toHex();
        const transactionId = transaction.getId();
        const pushTX = {
          address: userBetAddress,
          txid: transactionId,
          rawtx: signedTransaction,
        };
        if (typeof transactionId === 'string') {
          this.socket.emit('pushTX', pushTX);
          this.getAddressData();
          bet.height = this.blockheight;
          bet.created = transactionId;
        }
      }
    }
    return bet;
  }

  openUnspentBalance(unspents: any): any {
    let bal = 0;
    unspents.forEach((eachUnspent: any) => {
      if (!eachUnspent.used) {
        bal += eachUnspent.value;
      }
    });
    return bal;
  }

  generateMnemonic(save: boolean = true): any {
    const mnemonic = Bip39.generateMnemonic();
    if (save) {
      this.getMnemonicData(mnemonic);
    }
    return mnemonic;
  }

  getMnemonicData(mnemonic: string, amt = 3): any {
    const mnemonicString = mnemonic.split(' ');
    const retData: any = [];
    const allAdd: any = [];
    if (mnemonicString.length === 12) {
      this.userAccount.mnemonicSeed = mnemonic;
      let i = 1;
      const seed = Bip39.mnemonicToSeedSync(mnemonic);
      const root = this.getRoot(seed, this.coinNetwork);
      const xpub = root.toBase58();
      const node = this.getNode(xpub, this.coinNetwork);
      const setDpath = environment.dpath;
      while (i < amt) {
        const getAddress = this.getAddress(node.derivePath(setDpath + (i - 1)), this.coinNetwork);
        const getPrivateKey = node.derivePath(setDpath + (i - 1)).toWIF();
        if (i === 1) {
          this.userAccount.betAddress = getAddress;
          this.userAccount.betPrivKey = getPrivateKey;
        }
        const address: any = {
          addressId: (i - 1),
          address: getAddress,
          privateKey: getPrivateKey
        };
        allAdd.push(getAddress);
        retData.push(address);
        i++;
      }
      this.userAccount.allAddresses = allAdd;
      this.userAccount.addresses = retData;
    }
    this.account.next(this.userAccount);
    this.getBetAccountData();
    return this.userAccount;
  }

  sourceToggle(set = false): void {
    if (this.getSourceToggle && !set) {
      this.getSourceToggle = false;
      this.getMyBalance.unsubscribe();
    } else if (!this.getSourceToggle && set) {
      this.getSourceToggle = true;
      this.getBetAccountData();
    }
  }

  encryptData(data: any, encryptKey = null): string {
    if (encryptKey === null) {
      encryptKey = environment.seasalt;
    }
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  cancelListen(channel: string): void {
    this.socket.removeListener(channel);
  }

  decryptData(data: any, encryptKey = null): string {
    if (encryptKey === null) {
      encryptKey = environment.seasalt;
    }
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

  getAuthorization(channel: string, postMsg: string): void {
    this.authID = this.encryptData(new Date());
    this.socket
      .fromEvent<any[]>('user-' + channel)
      .subscribe((data: any) => {
        this.authorization.next(data);
      });
    const authorizeme = {
      authId: this.authID,
      room: channel,
      msg: postMsg,
    };
    this.socket.emit('authorize', authorizeme);
  }

  getBetAccountData(): void {
    this.getMyBalance = this.source.subscribe(val => this.getBetData());
    this.getBetData();
  }

  getQrCode(): void {
    const hostname = window.location.hostname;
    this.authID = this.encryptData(new Date());
    if (!this.qrCodeChannelSet) {
      this.socket
        .fromEvent<any[]>('user-' + this.userAccount.betAddress)
        .subscribe((data: any) => {
          this.authorization.next(data);
        });
      this.qrCodeChannelSet = true;
    }
    const shareQR = {
      sdf383nl1239: this.encryptData(this.userAccount.mnemonicSeed, this.authID),
      winjaOne: this.encryptData(this.userAccount.betAddress)
    };
    const encodeData = this.encryptData(JSON.stringify(shareQR), environment.seasaltsecond);
    this.shareQrCode = window.location.protocol + '//' + hostname + '/sportsbook/?addDevice=' + encodeData;
  }

  approveUser(data: any): void {
    this.socket.emit('authorize', data);
  }

  getBetData(): void {
    this.socket.emit('getAddressData', this.userAccount.betAddress);
  }

  // Base Functions
  getRoot(seed: any, network?: any): any {
    return bip32.fromSeed(seed, network);
  }

  getAddress(node: any, network?: any): string {
    // tslint:disable-next-line:no-non-null-assertion
    return payments.p2pkh({pubkey: node.publicKey, network}).address!;
  }

  getNode(xpub: any, network?: any): any {
    return bip32.fromBase58(xpub, network);
  }

  getPsbt(network?: any): any {
    return new Psbt(network);
  }

  getBalance(data: any): void {
    // this.userAccount.betFullBalance = data.toString();
    // this.account.next(this.userAccount);
  }

  updateUserSetting(data: any): void {
    const userSettings = {
      address: data.betAddress,
      settings: data.settings
    };
    this.socket.emit('userSettings', userSettings);
    this.account.next(data);
  }

  gotAddressData(data: any): void {
    if (data.height > this.blockheight) {
      const allBets = this.placedBets.getValue();
      if (allBets.length > 0) {
        this.createRawTX(allBets);
      }
      this.blockheight = data.height;
      this.exchangeRates.next(data.exchangeRate);
      this.userAccount.betBalance = data.balance - 0.01 < 0 ? 0 : data.balance - 0.01;
      this.userAccount.unspentBalance = this.userAccount.betBalance;
      this.userAccount.betUnspent = data.unspent;
      this.userAccount.depBalance = 0;
      this.transactionList.next(data.list);
      this.betList.next(data.bets);
    }
    if (!this.userAccount.settings && !data.settings) {
      this.userAccount.settings = {
        currency: 'usd',
        odds: 'euro',
        bet: 25,
        input: '5'
      };
      const gotRefAddress = sessionStorage.getItem('ref');
      if (gotRefAddress) {
        this.userAccount.settings.ref = gotRefAddress;
      }
      this.updateUserSetting(this.userAccount);
    } else if (data.settings) {
      this.userAccount.settings = data.settings;
    }
    this.userAccount.refData = data.refData;
    this.userAccount.uid = data.uid;
    this.account.next(this.userAccount);
  }

  getTeamNameFromList(id: number): string {
    const teams = '[{"name": "CAR Panthers"},{ "name": "ARZ Cardinals" }, {"name": "HOU Texans"}, {"name": "ATL Falcons"}, {"name": "BAL Ravens"}, {"name": "BUF Bills"}, {"name": "CHI Bears"}, {"name": "CIN Bengals"}, {"name": "CLE Browns"}, {"name": "DAL Cowboys"}, {"name": "DEN Broncos"}, {"name": "DET Lions"}, {"name": "GB Packers"}, {"name": "IND Colts"}, {"name": "JAX Jaguars"}, {"name": "KC Chiefs"}, {"name": "LA Chargers"}, {"name": "LA Rams"}, {"name": "LV Raiders"}, {"name": "MIA Dolphins"}, {"name": "MIN Vikings"}, {"name": "NE Patriots"}, {"name": "NO Saints"}, {"name": "NY Giants"}, {"name": "NY Jets"}, {"name": "PHI Eagles"}, {"name": "PIT Steelers"}, {"name": "SEA Seahawks"}, {"name": "SF 49ers"}, {"name": "TB Buccaneers"}, {"name": "TEN Titans"}, {"name": "WAS Football Team"}, {"name": "ATL Hawks"}, {"name": "BKN Nets"}, {"name": "BOS Celtics"}, {"name": "CHA Hornets"}, {"name": "CHI Bulls"}, {"name": "CLE Cavaliers"}, {"name": "DAL Mavericks"}, {"name": "DEN Nuggets"}, {"name": "DET Pistons"}, {"name": "GS Warriors"}, {"name": "HOU Rockets"}, {"name": "IND Pacers"}, {"name": "LA Clippers"}, {"name": "LA Lakers"}, {"name": "MEM Grizzlies"}, {"name": "MIA Heat"}, {"name": "MIL Bucks"}, {"name": "MIN Timberwolves"}, {"name": "NO Pelicans"}, {"name": "NY Knicks"}, {"name": "OKC Thunder"}, {"name": "ORL Magic"}, {"name": "PHI 76ers"}, {"name": "PHX Suns"}, {"name": "POR Trail Blazers"}, {"name": "SA Spurs"}, {"name": "SAC Kings"}, {"name": "TOR Raptors"}, {"name": "UTA Jazz"}, {"name": "WAS Wizards"}, {"name": "Winja"}]';
    const arr = JSON.parse(teams);
    return arr[id].name;
  }

}
