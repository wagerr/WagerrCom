import {Component, Input, OnInit} from '@angular/core';
import {SocketConnService} from '../../../service/socket-conn.service';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {CoreFunc} from '../../../service/Corefunc';
import {SbAddDeviceComponent} from '../sb-add-device/sb-add-device.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-sbbetdisplay',
  templateUrl: './sbbetdisplay.component.html',
  styleUrls: ['./sbbetdisplay.component.scss']
})
export class SbbetdisplayComponent implements OnInit {
  @Input() eventid: number;
  bsModalRef: BsModalRef;
  gotSport = 'all';
  accountSettings: any = {
    currency: 'usd',
    odds: 'euro',
    bet: 25
  };
  currentSport: string;
  openEvents: any = [];
  mobileSet = 'moneyline';
  finalEvents: any = [];
  oldEvents: any = [];
  lastSearch: string;
  unspent: any = [];
  version = +environment[environment.access].ver;
  private getSearch: string;

  constructor(private SC: SocketConnService,
              private modalService: BsModalService,
              private wsb: WgrSportsBookService,
              private router: Router) {
    this.wsb.account.subscribe((gotAccount: any) => {
      if (gotAccount && gotAccount.settings) {
        this.accountSettings = gotAccount.settings;
        this.unspent = gotAccount.betUnspent;
      }
    });
  }

  @Input() set sport(value: string) {
    this.gotSport = value;
    this.finalEvents = [];
    this.listEvents();
  }

  @Input() set search(value: string) {
    this.getSearch = value;
    this.finalEvents = [];
    this.listEvents();
  }

  ngOnInit(): void {
    this.SC.openEvents.subscribe((data: any) => {
      this.openEvents = data;
      this.listEvents();
    });
  }

  searchFinalEvents(search: string): void {
    if (search !== undefined && search !== '') {
      this.finalEvents = this.oldEvents.filter((item: any) => {
        let foundIt = false;
        item.data.forEach((event: any) => {
          foundIt = (event.tournament.toLowerCase().includes(search.toLowerCase()) ||
            event.teams.home.toLowerCase().includes(search.toLowerCase()) ||
            event.teams.away.toLowerCase().includes(search.toLowerCase())
          );
        });
        return foundIt;
      });
    } else {
      this.finalEvents = this.oldEvents;
    }
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

  getSpreadNumber(item: any, type: any): any {
    return CoreFunc.getSpreadNumber(item, type);
  }

  getSpreadPoints(item: any, type: string): any {
    return CoreFunc.getSpreadPoints(item, type);
  }

  getTotalsNumber(item: any): any {
    return CoreFunc.getTotalsNumber(item);
  }

  getTotalsPoints(item: any, type: string): any {
    return CoreFunc.getTotalsPoints(item, type);
  }

  getMLPoints(item: any, type: string): any {
    return CoreFunc.getMLPoints(item, type);
  }

  getEvents(): any {
    let filteredEvents: any = [];
    if (this.openEvents && this.openEvents.length > 0) {
      const allEvents = this.openEvents
        .filter((item) => (item.odds[0].mlHome > 0))
        .filter((item) => ((item.starting * 1000) > (+new Date() + (20 * 60000))));
      allEvents.sort((a: any, b: any) => (a.starting < b.starting) ? -1 : 1);
      if (this.gotSport !== '' && this.gotSport !== 'all') {
        filteredEvents = allEvents
          .filter((item) => (item.sport.toLowerCase() === this.gotSport));
      } else if (this.gotSport === 'all') {
        filteredEvents = allEvents.slice(0, 25);
      } else {
        filteredEvents = allEvents;
      }
    }
    if (this.getSearch !== undefined && this.getSearch !== '') {
      const preSearch = this.openEvents
        .filter((item) => (item.odds[0].mlHome > 0))
        .filter((item) => ((item.starting * 1000) > (+new Date() + (20 * 60000))));
      return preSearch.filter((event: any) => {
        return (event.tournament.toLowerCase().includes(this.getSearch.toLowerCase()) ||
          event.teams.home.toLowerCase().includes(this.getSearch.toLowerCase()) ||
          event.teams.away.toLowerCase().includes(this.getSearch.toLowerCase())
        );
      });
    }
    return filteredEvents;
  }

  listEvents(): any {
    this.finalEvents = [];
    if (this.currentSport !== this.gotSport) {
      this.currentSport = this.gotSport;
    }
    const getEvents: any = this.getEvents();
    if (getEvents && getEvents.length > 0) {
      getEvents.forEach((eachEvent) => {
        if (this.eventid > 0) {
          if (eachEvent.event_id === this.eventid) {
            this.finalEvents = this.updateFinalEvents(this.finalEvents, eachEvent);
          }
        } else {
          if (this.gotSport === 'all') {
            this.finalEvents = this.updateFinalAllEvents(this.finalEvents, eachEvent);
          } else {
            this.finalEvents = this.updateFinalEvents(this.finalEvents, eachEvent);
          }
        }
      });
    }
    this.oldEvents = this.finalEvents;
    return this.finalEvents;
  }

  isThreeWay(event: any): boolean {
    return (this.getMLPoints(event, 'Draw') > 0);
  }

  updateFinalAllEvents(data: any, eachEvent: any): any {
    let foundLeague = false;
    let leagueKey = 0;
    const currentKey = data.length - 1;
    if (data && data.length > 0) {
      if (data[currentKey].name === eachEvent.tournament) {
        foundLeague = true;
        leagueKey = currentKey;
      }
    }
    if (foundLeague) {
      let addItem = true;
      data[leagueKey].data.forEach((oneEvent: any, eventKey: number) => {
        if (eachEvent.event_id === oneEvent.event_id) {
          data[leagueKey].data[eventKey] = eachEvent;
          addItem = false;
        }
      });
      if (addItem) {
        data[leagueKey].data.push(eachEvent);
      }
    } else {
      const league = {
        name: eachEvent.tournament,
        show: true,
        data: []
      };
      league.data.push(eachEvent);
      data.push(league);
    }
    return data;
  }

  updateFinalEvents(data: any, eachEvent: any): any {
    let foundLeague = false;
    let leagueKey = 0;
    if (data && data.length > 0) {
      data.forEach((getLeagues: any, key: number) => {
        if (getLeagues.name === eachEvent.tournament) {
          foundLeague = true;
          leagueKey = key;
        }
      });
    }
    if (foundLeague) {
      let addItem = true;
      data[leagueKey].data.forEach((oneEvent: any, eventKey: number) => {
        if (eachEvent.event_id === oneEvent.event_id) {
          data[leagueKey].data[eventKey] = eachEvent;
          addItem = false;
        }
      });
      if (addItem) {
        data[leagueKey].data.push(eachEvent);
      }
    } else {
      const league = {
        name: eachEvent.tournament,
        show: true,
        data: []
      };
      league.data.push(eachEvent);
      data.push(league);
    }

    return data;
  }

  getStartTime(item: any): any {
    return (item.starting * 1000);
  }

  showLeague(i): any {
    this.finalEvents[i].show = !this.finalEvents[i].show;
  }

  gotoEvent(eventId: string): void {
    this.router.navigate(['/sportsbook/event/' + eventId]);
    window.scrollTo(0, 0);
    this.wsb.mobileNav = 'event';
    this.wsb.mobileEvent = +eventId;
  }

  availableBets(betSlip: any): boolean {
    let ret = false;
    if (this.wsb.betType === 'parlay') {
      if (betSlip.length < 5) {
        ret = true;
      }
    } else {
      if ((this.unspent.length > 0) && betSlip.length < this.unspent.length && betSlip.length < 5) {
        ret = true;
      }
    }
    return ret;
  }

  alertModal(alertMsg: string): void {
    const initialState = { msg: alertMsg};
    this.bsModalRef = this.modalService.show(AlertModalComponent, Object.assign({}, {initialState}));
  }

  addToBetSlip(event: any, type: string, selected: string, points: any, extra: any = ''): void {
    if (this.wsb.isLoggedIn()) {
      if (this.wsb.betType === 'single') {
        this.wsb.processAvailableBalance();
      }
      if (points !== 'NA') {
        let addBet = true;
        const bet: any = {
          eventid: event.event_id,
          event: event,
          type: type,
          selected: selected.toLowerCase(),
          points: points.toFixed(2),
          extra: extra,
          userBet: this.accountSettings.bet,
          status: 'created',
          potential: 0
        };
        const getBets: any = this.wsb.bets.getValue();
        if ((points > 0 && this.availableBets(getBets))) {
          getBets.forEach((eachBet) => {
            if (this.wsb.betType === 'parlay') {
              if (eachBet.eventid === bet.eventid) {
                addBet = false;
              }
            } else {
              if (eachBet.type === bet.type
                && eachBet.selected.toLowerCase() === bet.selected
                && eachBet.points === bet.points
                && eachBet.eventid === bet.eventid
              ) {
                addBet = false;
              }
            }
          });
          if (addBet && this.wsb.availableBalance > this.accountSettings.bet) {
            getBets.push(bet);
            this.wsb.bets.next(getBets);
          } else if (addBet && this.wsb.betType === 'parlay' && this.wsb.userAccount.betBalance > this.wsb.parlayBet) {
            getBets.push(bet);
            this.wsb.bets.next(getBets);
          } else if (!addBet) {
            if (this.wsb.betType === 'parlay') {
              this.alertModal('Duplicate events on the same Parlay bet slip is not allowed.');
            } else {
              this.alertModal('Duplicate bets are not allowed in the same bet slip');
            }
          } else {
            this.alertModal('Not enough available balance to add this bet');
          }
        } else {
          this.alertModal('Reached Max Bet Slip or not enough available balance');
        }
      }
    } else {
      this.alertModal('Must be logged in and have available balance to make a bet.');
    }
  }
}
