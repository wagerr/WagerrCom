import {Component, OnDestroy, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketConnService} from '../../../service/socket-conn.service';
import {CoreFunc} from "../../../service/Corefunc";

@Component({
  selector: 'app-sb-event',
  templateUrl: './sb-event.component.html',
  styleUrls: ['./sb-event.component.scss']
})
export class SbEventComponent implements OnInit, OnDestroy {
  mobileNav = 'event';
  showBet = true;
  showType = 'moneyline';
  sport = 'soccer';
  id: number;
  eventData: any;
  eventJson: any;

  constructor(
    private SC: SocketConnService,
    private wsb: WgrSportsBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get('eventid');
    if (this.id === 0) {
      this.id = this.wsb.mobileEvent;
    }
    this.SC.openEvents.subscribe((data: any) => {
      if (data.length > 0) {
        this.getEvent(data, this.id);
      }
    });
    this.wsb.eventData.subscribe((data: any) => {
      if (data && data.eventDB && data.eventDB.id === this.id) {
        this.eventJson = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.wsb.eventData.next([]);
  }

  ngOnInit(): void {
  }

  setGraph(type: string): void {
    this.showType = type;
  }

  getEvent(data: any, eventId: number): void {
    this.wsb.getEventID(eventId);
    const eventData = data
      .filter((item) => (item.event_id === eventId))
      .filter((item) => (item.odds[0].mlHome > 0))
      .filter((item) => ((item.starting * 1000) > (+new Date() + (12 * 60000))));
    this.eventData = (eventData[0]) ? eventData[0] : [];
  }

  getStartTime(item: any): any {
    return (item.starting * 1000);
  }

  getEvents(data: any): any {
    return data.events
      .filter((item) => (item.odds[0].mlHome > 0))
      .filter((item) => ((item.starting * 1000) > (+new Date() + (12 * 60000))));
  }

  mobileNavIsActive(type, set = 'active', seta = ''): string {
    return (this.mobileNav === type) ? set : seta;
  }

  setShowBet(): void {
    this.showBet = !this.showBet;
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

  isMobile(css: string): string {
    if (this.whatOS() === 'mobile') {
      return css;
    }
    return '';
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

  backToSportsBook(): void {
    this.router.navigate(['/sportsbook']);
  }

  getSocialUrl() {
    console.log('eventData', this.eventData);
    const home = 'home=' + this.processTeamName(this.eventData.teams.home);
    const away = '&away=' + this.processTeamName(this.eventData.teams.away);
    const st = '&start=' + this.eventData.starting;
    const eventID = '&wgrID=' + this.eventData.event_id;
    const sport = '&sport=' + this.eventData.sport.split(' ').join('%20');
    const tour = '&tournament=' + this.eventData.tournament.split(' ').join('%20');
    const mlh = +CoreFunc.getMLPoints(this.eventData, 'Home', false);
    const mla = +CoreFunc.getMLPoints(this.eventData, 'Away', false);
    const mld = +CoreFunc.getMLPoints(this.eventData, 'Draw', false);
    const sph = +CoreFunc.getSpreadNumber(this.eventData, 'Home', false);
    const spa = +CoreFunc.getSpreadNumber(this.eventData, 'Away', false);
    const sh = +CoreFunc.getSpreadPoints(this.eventData, 'Home', false);
    const sa = +CoreFunc.getSpreadPoints(this.eventData, 'Away', false);
    const tp = +CoreFunc.getTotalsNumber(this.eventData, false);
    const to = +CoreFunc.getTotalsPoints(this.eventData, 'Over', false);
    const tu = +CoreFunc.getTotalsPoints(this.eventData, 'Under', false);
    const ml = '&mlh=' + mlh.toFixed(2) + '&mla=' + mla.toFixed(2) + '&mld=' + mld.toFixed(2);
    const spread = '&sph=' + sph.toFixed(2) + '&spa=' + spa.toFixed(2) + '&sh=' + sh.toFixed(2) + '&sa=' + sa.toFixed(2);
    const totals = '&tp=' + tp.toFixed(2) + '&to=' + to.toFixed(2) + '&tu=' + tu.toFixed(2);
    let ref = '';
    const uid = this.wsb.getRefUID();
    if (uid != null) {
      ref = '&ref=' + uid;
    }
    const now = new Date().getTime();
    const rawURL = 'https://wagerr.com/showevent/' + now + '?' + home + away + st + eventID + sport + tour + ml + spread + totals + ref;
    return encodeURIComponent(rawURL);
  }

  goTwitter() {
    const hashtags = "," + this.eventData.sport.split(' ').join('') + "," + this.eventData.tournament.split(' ').join('');
    const home = this.eventData.teams.home;
    const away = this.eventData.teams.away;
    const url = this.getSocialUrl();
    window.open(`https://twitter.com/intent/tweet?text=${home}%20vs.%20${away}%0D%0A%0D%0AAmazing%20odds%20on%20Wagerr:%0D%0A%0D%0A&url=${url}%0D%0A%0D%0A&hashtags=Wagerr,cryptocurrency,sportsbetting,BTC,Bitcoin,odds,sports,betting${hashtags}`);
  }

  goFacebook() {
    const url = this.getSocialUrl();
  }

  processTeamName(teamname: string): string {
    let name = teamname.split(' ').join('_');
    name = name.split('é').join('e');
    name = name.split('å').join('a');
    name = name.split('á').join('a');
    name = name.split('í').join('i');
    name = name.split(' . ').join('a');
    name = name.split('ê').join('e');
    return name;
  }

}
