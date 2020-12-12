import {Component, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {SocketConnService} from '../../../service/socket-conn.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-sbhistory',
  templateUrl: './sbhistory.component.html',
  styleUrls: ['./sbhistory.component.scss']
})
export class SbhistoryComponent implements OnInit {
  accountSettings: any;
  txlist: any;
  getSortHistory = 'all';
  pendingBets: any = [];
  completeBets: any = [];
  coinData: any;
  curCode = 'USD';
  exchangeRates: any;
  finalNet = false;
  pendingMaxSize = 5;
  pendingTotalItems = 0;
  pendingCurrentPage = 1;
  txSize = 5;
  txMaxSize = 3;
  txTotalItems = 0;
  txCurrentPage = 1;
  betList: any;
  updateTXPage = false;
  isTop = true;
  version = environment[environment.access].ver;
  isTestnet = environment[environment.access].testnet;

  constructor(private wsb: WgrSportsBookService,
              private SC: SocketConnService) {
    this.wsb.account.subscribe((gotAccount: any) => {
      if (gotAccount && gotAccount.settings) {
        this.accountSettings = gotAccount.settings;
      }
    });
    this.wsb.exchangeRates.subscribe((rates: any) => {
      this.exchangeRates = rates;
    });
    this.wsb.betList.subscribe((response: any) => {
      this.betList = response;
    });
    this.wsb.transactionList.subscribe((response: any) => {
      this.completeBets = [];
      this.pendingBets = [];
      const deposits = [];
      const depositIndex = [];
      this.txlist = response;
      this.txlist.forEach((tx: any, index: number) => {
        if (tx.type.toLowerCase() === 'bet') {
          deposits[tx.txid] = tx;
        }
        if (tx.type.toLowerCase() === 'deposit') {
          if (!deposits[tx.txid]) {
            deposits[tx.txid] = tx;
          } else {
            depositIndex.push(index);
          }
        }
      });
      depositIndex.reverse().forEach((eachIndex: number) => {
        this.txlist.splice(eachIndex, 1);
      });
    });
    this.SC.coinData.subscribe((data: any) => {
      this.coinData = data;
    });
  }

  updatePendingMaxSize(amt: number): void {
    this.pendingMaxSize = amt;
    this.pendingCurrentPage = 1;
  }

  updateTXMAxSize(amt: number): void {
    this.txSize = amt;
    this.txCurrentPage = 1;
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
      this.isTop = false;
    }
    if (navigator.userAgent.indexOf('like Mac') !== -1) {
      Name =
        'mobile';
      this.isTop = false;
    }
    return Name;
  }

  getWinnings(tx: any): string {
    let win = tx.value;
    if (this.finalNet) {
      win = win - this.getAmount(tx);
    }
    return win.toString();
  }

  toggeleNet(): void {
    this.finalNet = !this.finalNet;
  }

  sortHistory(value: string): void {
    this.getSortHistory = value;
  }

  isBet(tx: any): boolean {
    return (tx.type === 'bet' || tx.type === 'betPayout');
  }

  getTXList(): any {
    const list = this.txlist;
    list.forEach((value: any, key: number) => {
      list[key].bet = [];
      if (value.type === 'bet') {
        list[key].bet = this.getBet(value.txid);
      }
      if (value.type === 'betpayout') {
        list[key].bet = this.getCompleteBet(value.txid, value.vout);
      }
    });
    const filter = list
      .filter((thing: any) => {
        return (thing.type !== 'bet' || (thing.bet && thing.bet.betResultType === 'lose'));
      });
    let filterFinal = filter;
    if (this.getSortHistory === 'bets only') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type === 'bet' || thing.type === 'betpayout');
      });
    } else if (this.getSortHistory === 'moneyline') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.bet.legs && thing.bet.legs[0].outcome > 0 && thing.bet.legs[0].outcome < 4);
      });
    } else if (this.getSortHistory === 'total') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.bet.legs && thing.bet.legs[0].outcome > 5 && thing.bet.legs[0].outcome < 8);
      });
    } else if (this.getSortHistory === 'spread') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.bet.legs && thing.bet.legs[0].outcome > 3 && thing.bet.legs[0].outcome < 6);
      });
    } else if (this.getSortHistory === 'deposit') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type.toLowerCase() === 'deposit');
      });
    } else if (this.getSortHistory === 'withdrawal') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type.toLowerCase() === 'withdraw');
      });
    } else if (this.getSortHistory === 'won') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type.toLowerCase() === 'betpayout' && thing.bet.betResultType === 'win');
      });
    } else if (this.getSortHistory === 'lost') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type.toLowerCase() === 'bet');
      });
    } else if (this.getSortHistory === 'refund') {
      filterFinal = filter.filter((thing: any) => {
        return (thing.type.toLowerCase() === 'betpayout' && thing.bet.betResultType === 'refund');
      });
    }
    this.txTotalItems = filterFinal.length;
    if (this.txTotalItems > 0) {
      const txFinalFitler = filterFinal.slice((this.txCurrentPage - 1) * this.txSize, this.txCurrentPage * this.txSize);
      return txFinalFitler;
    }
    return [];
  }

  getToWin(towin: string, mobile = false, usd = false): string {
    if (!towin.includes('.')) {
      towin = towin + '.00';
    }
    const toWinSplit = towin.split('.');
    return toWinSplit[0] + '<span class="secondNumber">.' + ((toWinSplit[1]) ? toWinSplit[1].substr(0, 2) : '00') + '</span>' +
      ((mobile) ? '<br>' : '&nbsp;') +
      '<span class="text-white-50 font-weight-bold font10px">' + ((this.isTestnet) ? 'tWGR' : 'WGR') + '</span>' +
      ((usd) ? '<br><span class="secondNumber font-weight-normal font10px">(' + this.convertToUSD(+towin).toFixed(2) +  ' ' + this.curCode + ')</span>' : '');
  }

  convertToUSD(bet: number): number {
    let rate = bet * this.coinData.usd;
    if (this.accountSettings && this.accountSettings.currency !== 'usd') {
      this.curCode = this.accountSettings.currency.toUpperCase();
      rate = rate * this.exchangeRates.rates[this.curCode];
    }
    return rate;
  }

  filterPenBets(): any {
    const bets = [];
    this.betList.forEach((value: any) => {
      if (value[0] && value[0].data && value[0].data.completed === 'no') {
        bets.push(value[0].data);
      }
    });
    this.pendingTotalItems = bets.length;
    return bets;
  }

  filterPendingBets(): any {
    const bets = this.filterPenBets();
    this.pendingTotalItems = bets.length;
    return bets.slice((this.pendingCurrentPage - 1) * this.pendingMaxSize, this.pendingCurrentPage * this.pendingMaxSize);
  }

  getEventID(bet: any): number {
    return bet.legs[0]['event-id'];
  }

  totalAmount(): string {
    const bets = this.filterPenBets();
    let amt = 0;
    bets.forEach((eachBet: any) => {
      amt += eachBet.amount;
    });
    return amt.toFixed(2);
  }

  getBetType(bet: any, type = true): any {
    if (bet && bet.legs && bet.legs[0]) {
      const id = bet.legs[0].outcome;
      if (id === 1) {
        if (type) {
          return 'Moneyline &nbsp;<span class="text-highlight2">-</span>&nbsp;<span class="text-white-50">Home</span>';
        }
        return {
          team: 'home',
          odds: 'homeOdds'
        };
      } else if (id === 2) {
        if (type) {
          return 'Moneyline &nbsp;<span class="text-highlight2">-</span>&nbsp;<span class="text-white-50">Away</span>';
        }
        return {
          team: 'away',
          odds: 'awayOdds'
        };
      } else if (id === 3) {
        if (type) {
          return 'Moneyline &nbsp;<span class="text-highlight2">-</span> Draw';
        }
        return {
          team: 'draw',
          odds: 'drawOdds'
        };
      } else if (id === 4) {
        if (type) {
          return 'Spread &nbsp;<span class="text-highlight2">-</span>&nbsp;<span class="text-white-50">Home</span> ' +
            '<span class="text-highlight2">' + (bet.legs[0].lockedEvent.spreadPoints / ((this.version === 2) ? 100 : 10) ) + '</span>';
        }
        return {
          team: 'home',
          odds: 'spreadHomeOdds'
        };
      } else if (id === 5) {
        if (type) {
          return 'Spread &nbsp;<span class="text-highlight2">-</span>&nbsp;<span class="text-white-50">Away</span> ' +
            '<span class="text-highlight2">' + (bet.legs[0].lockedEvent.spreadPoints / ((this.version === 2) ? 100 : 10)) + '</span>';
        }
        return {
          team: 'away',
          odds: 'spreadAwayOdds'
        };
      } else if (id === 6) {
        if (type) {
          return 'Total &nbsp;<span class="text-highlight2">-</span> Over ' +
            '<span class="text-highlight2">' + (bet.legs[0].lockedEvent.totalPoints / ((this.version === 2) ? 100 : 10)) + '</span>';
        }
        return {
          team: 'over',
          odds: 'totalOverOdds'
        };
      } else if (id === 7) {
        if (type) {
          return 'Total &nbsp;<span class="text-highlight2">-</span> Under ' +
            '<span class="text-highlight2">' + (bet.legs[0].lockedEvent.totalPoints / ((this.version === 2) ? 100 : 10)) + '</span>';
        }
        return {
          team: 'under',
          odds: 'totalUnderOdds'
        };
      }
    }
  }

  getTxType(tx: any): string {
    let type: string = (tx.type) ? tx.type.toLowerCase() : 'none';
    if (type === 'bet' || type === 'betpayout') {
      type = this.getBetType(tx.bet);
    } else if (type === 'deposit') {
      type = 'DEPOSIT';
    } else if (type === 'sendtoself' || type === 'sendtoaddress' || type === 'withdraw') {
      type = 'WITHDRAWAL';
    }
    return type;
  }

  getTeamType(bet: any): string {
    if (bet && bet.legs) {
      const betType = this.getBetType(bet, false);
      if (betType.team === 'home') {
        return betType.team;
      } else if (betType.team === 'away') {
        return betType.team;
      }
      return 'all';
    }
    return 'none';
  }

  getTeam(bet: any, type: string): string {
    if (bet && bet.legs) {
      if (type === 'home') {
        return '' + bet.legs[0].lockedEvent.home;
      } else if (type === 'away') {
        return bet.legs[0].lockedEvent.away;
      }
    }
    return '';
  }

  getOdds(bet: any): any {
    if (bet && bet.legs) {
      const betType = this.getBetType(bet, false);
      return this.updateTrueOdds(bet.legs[0].lockedEvent[betType.odds] / 10000).toFixed(2);
    }
    return '';
  }

  getScore(bet: any): string {
    if (bet && bet.completed === 'yes') {
      let homeClass = 'text-white';
      let awayClass = 'text-white-50';
      const homeScore = (bet.legs[0].lockedEvent.homeScore / 10);
      const awayScore = (bet.legs[0].lockedEvent.awayScore / 10);
      if (homeScore < awayScore) {
        homeClass = 'text-white-50';
        awayClass = 'text-white';
      }
      return '<span class="' + homeClass + '">' + homeScore + '</span>' +
        '&nbsp;<span class="text-highlight2">-</span>&nbsp;' +
        '<span class="' + awayClass + '">' + awayScore + '</span>';
    }
    return '';
  }

  getWinLose(bet: any): string {
    if (bet && bet.completed && bet.completed === 'yes') {
      if (bet.betResultType.toLowerCase() === 'lose') {
        return 'lost';
      } else if (bet.betResultType.toLowerCase() === 'win') {
        return 'won';
      } else {
        return bet.betResultType.toLowerCase();
      }
    }
    return '';
  }

  getBet(txid: string): any {
    let bet: any = '';
    this.betList.forEach((value: any) => {
      if (value[0] && value[0].txid === txid) {
        bet = value[0].data;
      }
    });
    return bet;
  }

  getCompleteBet(txid: string, vout: number): any {
    let bet: any = '';
    this.betList.forEach((value: any) => {
      if (value[0] && value[0].data && value[0].payouttxid === txid && value[0].data.payoutTxOut === vout) {
        bet = value[0].data;
      }
    });
    return bet;
  }

  ngOnInit(): void {
  }

  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  getAmount(tx: any): number {
    const type = (tx.type) ? tx.type.toLowerCase() : 'none';
    if (type === 'deposit') {
      return tx.value;
    } else if (type === 'bet' || type === 'betpayout') {
      return (tx.bet.amount) ? tx.bet.amount : 0;
    }
    return -tx.debit;
  }

  getBetTypeSmall(bet: any): any {
    const id = bet.legs[0].outcome;
    if (id === 1) {
      return {
        type: 'moneyline',
        team: 'home'
      };
    } else if (id === 2) {
      return {
        type: 'moneyline',
        team: 'away'
      };
    } else if (id === 3) {
      return {
        type: 'moneyline',
        team: 'draw'
      };
    } else if (id === 4) {
      return {
        type: 'spread',
        team: 'home'
      };
    } else if (id === 5) {
      return {
        type: 'spread',
        team: 'away'
      };
    } else if (id === 6) {
      return {
        type: 'total',
        team: 'over'
      };
    } else if (id === 7) {
      return {
        type: 'total',
        team: 'under'
      };
    }
  }

  selectTeam(bet: any, selected: any): string {
    if (selected === 'home') {
      return this.getTeam(bet, selected);
    } else if (selected === 'away') {
      return this.getTeam(bet, selected);
    } else if (selected === 'draw') {
      return 'DRAW';
    }
  }

  shortType(type: string): string {
    if (type === 'moneyline') {
      return 'ML';
    } else if (type === 'spread') {
      return 'SP';
    }
    return type;
  }

  isSpread(type: string): boolean {
    return (type === 'spread');
  }

  isTotal(type: string): boolean {
    return (type === 'total');
  }

  getSpreadExtra(bet: any): number {
    // bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    // const event = this.getEventData(bet.event.event_id);
    // return this.getSpreadNumber(event, bet.selected);
    return 0;
  }

  getSpreadNumber(item: any, type: any): any {
    if (item.odds[1].spreadPoints) {
      const set = (item.odds[1].favorite === type) ? '+' : '-';
      return set + (item.odds[1].spreadPoints / 10);
    }
    return '—';
  }

  getTotalExtra(bet: any): number {
    // bet.selected = bet.selected.charAt(0).toUpperCase() + bet.selected.slice(1);
    // const event = this.getEventData(bet.event.event_id);
    // return this.getTotalsNumber(event);
    return 0;
  }

  getTotalsNumber(item: any): any {
    if (item.odds[2].totalsPoints) {
      return (item.odds[2].totalsPoints / 10);
    }
    return '—';
  }

}
