import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {SocketConnService} from '../../../service/socket-conn.service';
import {AccountComponent} from '../sbdisplay/account/account.component';
import {environment} from '../../../../environments/environment';
import {CoreFunc} from '../../../service/Corefunc';


@Component({
  selector: 'app-sbbetslip',
  templateUrl: './sbbetslip.component.html',
  styleUrls: ['./sbbetslip.component.scss']
})
export class SbbetslipComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  accountSettings: any = {
    currency: 'usd',
    odds: 'euro',
    bet: 25
  };
  bets: any = [];
  curCode = 'USD';
  exchangeRates: any;
  betList: any;
  coinData: any;
  totalMatches = 0;
  totalStake = 0;
  totalPotential = 0;
  balance = 0;
  parlayPoints = 0;
  openEvents: any;
  allPlacedBets: any = [];
  allUpdatedPlacedBets: any = [];
  betsPlaced = false;
  preBalance = 0;
  allBetsComplete = false;
  version = +environment[environment.access].ver;
  isTestnet = environment[environment.access].testnet;
  prefix = '42';
  prefixTwo = '43';
  verNumber = '01';

  constructor(private modalService: BsModalService,
              public wsb: WgrSportsBookService,
              private SC: SocketConnService
  ) {
    this.wsb.betList.subscribe((response: any) => {
      this.betList = response
        .filter((thing: any) => {
          return (thing[0] && thing[0].payout === false);
        });
    });
    this.wsb.placedBets.subscribe((data: any) => {
      if (data.length > 0) {
        this.allPlacedBets = data;
      }
    });
    this.wsb.account.subscribe((gotAccount: any) => {
      if (gotAccount && gotAccount.settings) {
        this.accountSettings = gotAccount.settings;
      }
    });
  }

  slipType(type: string): void {
    if (this.version === 2) {
      this.clearAll();
      this.wsb.betType = type;
      if (type === 'parlay') {
        this.wsb.parlayBet = this.accountSettings.bet;
      }
    }
  }

  getAllPlacedBets(): any {
    const now = Math.floor(Date.now() / 1000);
    this.allPlacedBets.forEach((eachBet: any, key: number) => {
      if (eachBet.status === 'completed') {
        const timeLapse = now - eachBet.time;
        if (timeLapse >= 120) {
          eachBet.hide = true;
        }
      }
    });
    return this.allPlacedBets;
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    this.wsb.bets.subscribe((data: any) => {
      this.bets = data;
      this.processAvailableBalance();
      this.getTotalStake();
      this.getTotalReturn();
    });
    this.wsb.exchangeRates.subscribe((rates: any) => {
      this.exchangeRates = rates;
    });
    this.wsb.account.subscribe((data: any) => {
      this.balance = data.betBalance;
      this.preBalance = data.depBalance;
      this.processAvailableBalance();
      if (data && data.settings) {
        this.accountSettings = data.settings;
      }
    });
    this.SC.coinData.subscribe((data: any) => {
      this.coinData = data;
    });
    this.SC.openEvents.subscribe((data: any) => {
      this.openEvents = data;
    });
  }

  processAvailableBalance(): void {
    this.wsb.processAvailableBalance();
  }

  closeBetView(): void {
    this.modalRef.hide();
    // this.allPlacedBets = [];
    // this.wsb.placedBets.next([]);
    // this.wsb.bets.next([]);
  }

  openModal(template: TemplateRef<any>): void {
    this.allBetsComplete = false;
    const config = {
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(template, config);
  }

  getEventData(eventId: number): any {
    const event = this.openEvents.filter((item) => (item.event_id === eventId));
    return event[0];
  }

  getSpreadExtra(bet: any): number {
    bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    const event = this.getEventData(bet.event.event_id);
    return this.getSpreadNumber(event, bet.selected);
  }

  getSpreadNumber(item: any, type: any): any {
    return CoreFunc.getSpreadNumber(item, type);
  }

  getTotalExtra(bet: any): number {
    bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    const event = this.getEventData(bet.event.event_id);
    return this.getTotalsNumber(event);
  }

  getTotalsNumber(item: any): any {
    return CoreFunc.getTotalsNumber(item);
  }

  getPotentialReturn(bet: any): number {
    bet.potential = bet.userBet * bet.points;
    return bet.potential;
  }

  getPotentialReturnParlay(): number {
    return this.wsb.parlayBet * this.parlayPoints;
  }

  getUpdatedBetPointsParlay(bets: any): number {
    let amount = 1;
    bets.forEach((bet: any) => {
      let odds = 0;
      bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
      const event = this.getEventData(bet.event.event_id);
      if (bet.type === 'moneyline') {
        odds = this.getMoneylineOdds(event, bet.selected);
      }
      if (bet.type === 'total') {
        odds = this.getTotalsOdds(event, bet.selected);
      }
      if (bet.type === 'spread') {
        odds = this.getSpreadOdds(event, bet.selected);
      }
      amount = amount * odds;
    });
    if (bets.length > 0) {
      this.parlayPoints = amount;
      return amount;
    }
    return 0;
  }

  getUpdatedBetPoints(bet: any): number {
    bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    const event = this.getEventData(bet.event.event_id);
    if (bet.type === 'moneyline') {
      return this.getMoneylineOdds(event, bet.selected);
    }
    if (bet.type === 'total') {
      return this.getTotalsOdds(event, bet.selected);
    }
    if (bet.type === 'spread') {
      return this.getSpreadOdds(event, bet.selected);
    }
    return 0;
  }

  getMoneylineOdds(item: any, type: string): any {
    return CoreFunc.getMLPoints(item, type);
  }

  getSpreadOdds(item: any, type: string): any {
    return CoreFunc.getSpreadPoints(item, type);
  }

  getTotalsOdds(item: any, type: string): any {
    return CoreFunc.getTotalsPoints(item, type);
  }

  placeBetsSingle(): void {
    this.modalRef.hide();
    const allPlacedBets = [];
    this.bets.forEach((eachBet: any, key: number) => {
      const betData = {
        bet: eachBet,
        betAmt: eachBet.userBet,
        type: 'single',
        status: 'processing',
        hide: false,
        created: false,
        opCode: this.createOPCodeSingle(eachBet),
        opCodeTwo: this.createOPCodeSingle(eachBet, 1)
      };
      this.balance -= eachBet.userBet;
      allPlacedBets.push(betData);
    });
    this.wsb.processBets(allPlacedBets);
    // this.clearAll();
  }

  createOPCodeSingle(eachBet: any, id: number = 0): string {
    const eId = eachBet.event.event_id;
    const txType = '03';
    const eventID = this.convertEventId(eId);
    const outcome = this.getOutcomeHex(eachBet);
    let output = txType + eventID + outcome;
    if (id > 0) {
      output = '43' + '02' + output + this.convertEventId(id);
    } else {
      output = this.prefix + this.verNumber + output;
    }
    return output
  }

  placeBetsParley(): void {
    this.modalRef.hide();
    const allPlacedBets = [];
    const betData = {
      bet: this.bets,
      betAmt: this.wsb.parlayBet,
      points: this.parlayPoints,
      type: 'parlay',
      status: 'processing',
      hide: false,
      created: false,
      opCode: this.createOPCodeParley(this.bets)
    };
    this.balance -= this.wsb.parlayBet;
    allPlacedBets.push(betData);
    this.wsb.processBets(allPlacedBets);
    this.wsb.parlayBet = this.accountSettings.bet;
    this.parlayPoints = 0;
  }

  createOPCodeParley(allBets: any): string {
    const txType = '0c';
    const legCount = ('0' + allBets.length).slice(-2);
    let eventLegs = '';
    allBets.forEach((bet: any) => {
      const eventID = this.convertEventId(bet.event.event_id);
      const outcome = this.getOutcomeHex(bet);
      eventLegs = eventLegs + eventID + outcome;
    })
    return this.prefix + this.verNumber + txType + legCount + eventLegs;

  }

  convertEventId(val): any {
    // tslint:disable-next-line:no-bitwise
    val &= 0xFFFFFFFF;
    const hex = val.toString(16).toUpperCase();
    const a = ('00000000' + hex).slice(-8);
    const array = a.toString().match(/.{1,2}/g);
    return array[3] + array[2] + array[1] + array[0];
  }

  getOutcomeHex(eachBet: any): string {
    if (eachBet.type.toLowerCase() === 'moneyline') {
      return (eachBet.selected.toLowerCase() === 'home') ? '01' : ((eachBet.selected.toLowerCase() === 'away') ? '02' : '03');
    }
    if (eachBet.type.toLowerCase() === 'spread') {
      return (eachBet.selected.toLowerCase() === 'home') ? '04' : '05';
    }
    if (eachBet.type.toLowerCase() === 'total') {
      return (eachBet.selected.toLowerCase() === 'over') ? '06' : '07';
    }
    return '';
  }

  getBetTeam(bet: any): string {
    if (bet.selected.toLowerCase() === 'home' || bet.selected.toLowerCase() === 'away') {
      return bet.event.teams[bet.selected.toLowerCase()];
    } else {
      return bet.event.teams.home + ' <span class="text-highlight">vs</span> ' + bet.event.teams.away;
    }
  }

  openModalAccount(): void {
    /* this is how we open a Modal Component from another component */
    this.modalRef = this.modalService.show(AccountComponent,
      Object.assign({}, {class: 'modal-lg'}));
  }

  getBetAmt(bet: any): number {
    const userBet = bet.userBet.toString();
    const betSplice = userBet.split('.');

    if (betSplice.length > 1) {
      bet.userBet = betSplice[0] + '.' + betSplice[1].substring(0, 2);
    }
    return +bet.userBet;
  }

  getBetType(bet: any): string {
    return bet.type;
  }

  getBetPoints(bet: any): string {
    if (bet.type.toLowerCase() === 'total') {
      return '<span class="text-black">' + bet.selected + ' ' + bet.extra + '</span>';
    } else if (bet.type.toLowerCase() === 'spread') {
      return '<span class="text-black"> ' + bet.extra + 'pts</span>';
    }
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

  convertToUSD(bet: number): number {
    let rate = bet * this.coinData.usd;
    if (this.accountSettings && this.accountSettings.currency !== 'usd') {
      this.curCode = this.accountSettings.currency.toUpperCase();
      rate = rate * this.exchangeRates.rates[this.curCode];
    }
    return rate;
  }

  placeBetsDisabled(): boolean {
    return (this.bets.length === 0) || (this.totalStake > (this.balance + this.preBalance));
  }

  placeParleyBetsDisabled(): boolean {
    return (this.bets.length < 2) || (this.wsb.parlayBet > (this.balance + this.preBalance));
  }

  getHomeTeam(event: any): string {
    return event.teams.home;
  }

  getAwayTeam(event: any): string {
    return event.teams.away;
  }

  selectTeam(event: any, selected: any): string {
    if (selected === 'Home') {
      return this.getHomeTeam(event);
    } else if (selected === 'Away') {
      return this.getAwayTeam(event);
    } else if (selected === 'Draw') {
      return 'DRAW';
    }
  }

  shortType(type: string): string {
    if (type === 'moneyline') {
      return 'ML';
    } else if (type === 'spread') {
      return 'SP';
    } else if (type === 'total') {
      return 'TOT';
    }
    return type;
  }

  shortSelected(selected: string): string {
    if (selected === 'Over') {
      return 'Over';
    }
    return 'Under';
  }

  isSpread(type: string): boolean {
    return (type === 'spread');
  }

  isTotal(type: string): boolean {
    return (type === 'total');
  }

  deleteBet(i: number): void {
    const allBets = this.wsb.bets.getValue();
    allBets.splice(i, 1);
    this.wsb.bets.next(allBets);
  }

  checkBetParlay(): void {
    this.wsb.parlayBet = this.checkBetAmount(+this.wsb.parlayBet, 3000);
  }

  checkBetAmount(amt: number, max = 10000): number {
    if (isNaN(amt)) {
      amt = 25;
    } else if (amt < 25) {
      amt = 25;
    } else if (amt > max) {
      amt = max;
    }
    const userBet = amt.toString();
    const betSplice = userBet.split('.');
    if (betSplice.length > 1) {
      amt = +(betSplice[0] + '.' + betSplice[1].substring(0, 2));
    }
    return amt;
  }

  checkBet(bet: any): void {
    bet.userBet = this.checkBetAmount(bet.userBet);
    this.getTotalStake();
    this.getTotalReturn();
    this.wsb.processAvailableBalance();
  }

  betMaxParlay(): void {
    if (!this.placeParleyBetsDisabled()) {
      this.wsb.parlayBet = this.betMaxAmount(this.wsb.parlayBet, 3000);
      this.wsb.processAvailableBalance();
    }
  }

  betMaxAmount(amt: number, max = 10000): number {
    const orgBet = +amt;
    amt = (+this.wsb.availableBalance + orgBet);
    if (amt > max) {
      amt = max;
    }
    const userBet = amt.toString();
    const betSplice = userBet.split('.');
    if (betSplice.length > 1) {
      amt = +(betSplice[0] + '.' + betSplice[1].substring(0, 2));
    }
    return amt;
  }

  betMax(bet: any): void {
    bet.userBet = this.betMaxAmount(bet.userBet);
    this.getTotalStake();
    this.getTotalReturn();
    this.wsb.processAvailableBalance();
  }

  getTotalStake(): void {
    let total = 0;
    this.bets.forEach((eachBet) => {
      total = total + (+eachBet.userBet);
    });
    this.totalMatches = this.bets.length;
    this.totalStake = total;
  }

  getTotalReturn(): void {
    let total = 0;
    this.bets.forEach((eachBet) => {
      total = total + ((+eachBet.userBet) * (+eachBet.points));
    });
    this.totalPotential = total;
  }

  clearAll(): void {
    this.wsb.parlayBet = this.accountSettings.bet;
    this.parlayPoints = 0;
    this.wsb.bets.next([]);
  }

  goTwitter(bet: any) {
    const type = bet.bet.type;
    const homeTeam = bet.bet.event.teams.home.split(' ').join('_');
    const awayTeam = bet.bet.event.teams.away.split(' ').join('_');
    let price = bet.bet.points;
    if (this.accountSettings.odds && this.accountSettings.odds === 'us') {
      price = this.wsb.usOdds(bet.bet.points);
    }
    const selected = bet.bet.selected.toLowerCase();
    const title = bet.bet.extra;
    const now = new Date().getTime();
    const rawURL = 'https://wagerr.com/ninja/' + now + '?ref=' + this.wsb.getUserUID() + '&t=' + type + '&h=' + homeTeam + '&a=' + awayTeam + '&title=' + title + '&price=' + price + '&select=' + selected;
    const url = encodeURIComponent(rawURL);
    window.open(`https://twitter.com/intent/tweet?text=Check%20out%20the%20odds%20I%20just%20got%20at%20&url=${url}%0D%0A%0D%0A&hashtags=Wagerr,cryptocurrency,sportsbetting,BTC,Bitcoin,odds,sports,betting`);
  }

}
