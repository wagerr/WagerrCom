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
  accountSettings: any;
  bets: any = [];
  curCode = 'USD';
  exchangeRates: any;
  betList: any;
  coinData: any;
  totalStake = 0;
  totalPotential = 0;
  balance = 0;
  openEvents: any;
  allPlacedBets: any = [];
  allUpdatedPlacedBets: any = [];
  betsPlaced = false;
  preBalance = 0;
  allBetsComplete = false;
  version = +environment[environment.access].ver;
  isTestnet = environment[environment.access].testnet;

  constructor(private modalService: BsModalService,
              public wsb: WgrSportsBookService,
              private SC: SocketConnService
  ) {
    this.wsb.betList.subscribe((response: any) => {
      this.betList = response
        .filter((thing: any) => {
          return (thing[0].payout === false);
        });
    });
    this.wsb.placedBets.subscribe((data: any) => {
      if (data.length > 0) {
        this.allPlacedBets = data;
      }
    });
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
    clearInterval(this.intervalId);
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

  getUpdatedBetPoints(bet: any): number {
    bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    const event = this.getEventData(bet.event.event_id);
    if (bet.type === 'moneyline') {
      return this.getMLPoints(event, bet.selected);
    }
    if (bet.type === 'total') {
      return this.getTotalsPoints(event, bet.selected);
    }
    if (bet.type === 'spread') {
      return this.getSpreadPoints(event, bet.selected);
    }
    return 0;
  }

  getMLPoints(item: any, type: string): any {
    return CoreFunc.getMLPoints(item, type);
  }

  getSpreadPoints(item: any, type: string): any {
    return CoreFunc.getSpreadPoints(item, type);
  }

  getTotalsPoints(item: any, type: string): any {
    return CoreFunc.getTotalsPoints(item, type);
  }

  placeBets(): void {
    this.modalRef.hide();
    const allPlacedBets = [];
    this.bets.forEach((eachBet: any, key: number) => {
      const betData = {
        bet: eachBet,
        status: 'processing',
        hide: false,
        created: false,
        opCode: this.createOPCode(eachBet)
      };
      this.balance -= eachBet.userBet;
      allPlacedBets.push(betData);
    });
    this.wsb.processBets(allPlacedBets);
    // this.clearAll();
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
      return '<span class="text-black">' + bet.selected + ' ' + bet.extra + '</span> ' + bet.points;
    } else if (bet.type.toLowerCase() === 'spread') {
      return '<span class="text-black"> ' + bet.extra + 'pts</span> ' + bet.points;
    }
    return bet.points;
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

  createOPCode(eachBet: any): string {
    const eId = eachBet.event.event_id;
    const prefix = '42';
    const verNumber = '01';
    const txType = '03';
    const eventID = this.convertEventId(eId);
    const outcome = this.getOutcomeHex(eachBet);
    return prefix + verNumber + txType + eventID + outcome;
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

  checkBet(bet: any): void {
    if (isNaN(bet.userBet)) {
      bet.userBet = 25;
    } else if (bet.userBet < 25) {
      bet.userBet = 25;
    } else if (bet.userBet > 10000) {
      bet.userBet = 10000;
    }
    const userBet = bet.userBet.toString();
    const betSplice = userBet.split('.');
    if (betSplice.lenght > 1) {
      bet.userBet = +(betSplice[0] + '.' + betSplice[1].substring(0, 2));
    }
    this.getTotalStake();
    this.getTotalReturn();
    this.wsb.processAvailableBalance();
  }

  betMax(bet: any): void {
    const orgBet = +bet.userBet;
    bet.userBet = (+this.wsb.availableBalance + orgBet);
    if (bet.userBet > 10000) {
      bet.userBet = 10000;
    }
    const userBet = bet.userBet.toString();
    const betSplice = userBet.split('.');
    if (betSplice.length > 1) {
      bet.userBet = +(betSplice[0] + '.' + betSplice[1].substring(0, 2));
    }
    this.getTotalStake();
    this.getTotalReturn();
    this.wsb.processAvailableBalance();
  }

  getPotentialReturn(bet: any): number {
    bet.potential = bet.userBet * bet.points;
    return bet.potential;
  }

  getTotalStake(): void {
    let total = 0;
    this.bets.forEach((eachBet) => {
      total = total + (+eachBet.userBet);
    });
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
    this.wsb.bets.next([]);
  }

}
