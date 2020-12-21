import {Component, OnInit} from '@angular/core';
import {SocketConnService} from '../../service/socket-conn.service';
import {interval} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WgrSportsBookService} from '../../service/wgr-sports-book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  activePane = 'pane0';
  totalWgrBet = '1';
  oraclesPaid = '1';
  totalBet = '1';
  newsFeed: any = {
    feedUrl: '',
    items: [],
    lastBuildDate: '',
    link: '',
    title: '',
  };
  walletInfo: any;
  openEvents: any;
  eventSet = 0;
  featureStep = 0;
  eventDisplay: any = [];
  selectOs = 'win';
  oddsDisplay = 0;
  sub: any;

  constructor(private SC: SocketConnService,
              private wsb: WgrSportsBookService,
              private router: Router,
              private route: ActivatedRoute) {
    const refAddress = this.route.snapshot.paramMap.get('refAddress');
    if (refAddress) {
      sessionStorage.setItem('ref', refAddress);
    }
  }

  ngOnInit(): void {
    this.eventSet = 0;
    this.SC.wgrCustom.subscribe((data: any) => {
      // this.totalWgrBet = this.getMil(data.totalBet);
      this.totalWgrBet = data.totalBet;
      this.oraclesPaid = this.getMil(data.totalOracleProfit);
    });
    this.SC.wgrPayout.subscribe((data: any) => {
      if (data.totalpayout && data.totalpayout.usd) {
        this.totalBet = data.totalpayout.usd;
      }
    });
    this.SC.walletInfo.subscribe((data: any) => {
      this.walletInfo = data;
    });
    this.SC.newsFeed.subscribe((data: any) => {
      this.newsFeed = data;
    });
    this.SC.openEvents.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.openEvents = data.sort(this.compareStartTime);
        this.eventDisplay = this.getEvents();
      }
    });
    this.sub = interval(5000)
      .subscribe((val) => {
        this.oddsDisplay++;
        if (this.oddsDisplay === 3) {
          this.oddsDisplay = 0;
        }
      });
    // interval(5000)
    //   .subscribe((val) => {
    //     this.featureStep++;
    //     if (this.featureStep === 4) {
    //       this.featureStep = 0;
    //     }
    //     this.activePane = 'pane' + this.featureStep;
    //   });
    this.selectOs = this.whatOS();
  }

  gotoEvent(eventId: string): void {
    this.router.navigate(['/sportsbook/event/' + eventId]);
    window.scrollTo(0, 0);
    this.wsb.mobileNav = 'event';
    this.wsb.mobileEvent = +eventId;
  }

  compareStartTime(a: any, b: any): number {
    const bandA = a.starting;
    const bandB = b.starting;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  getMil(num: number): string {
    let exp;
    exp = Math.floor(Math.log(num) / Math.log(1000));
    return (num / Math.pow(1000, exp)).toFixed(1);
  }

  getSVG(teamname): string {
    return teamname.split(' ').join('_') + '.svg';
  }

  getItems(): any {
    if (this.newsFeed.items) {
      let final = 3;
      if (this.selectOs === 'mobile') {
        final = 1;
      }
      return this.newsFeed.items.filter((item, index) => index < final);
    }
  }

  getImg(str: string): string {
    const imgExists = str.indexOf('<img src="');
    if (imgExists > -1) {
      const i = imgExists + 10;
      str = str.substr(i);
      str = str.substr(0, str.indexOf('"'));
      return str;
    }
  }

  getEvents(): any {
    let filter = this.openEvents;
    if (this.openEvents && this.openEvents.length > 0) {
      let final = 3;
      if (this.selectOs === 'mobile') {
        final = 2;
      }
      filter = this.openEvents
        .filter((item) => (item.odds[0].mlHome > 0))
        .filter((item) => ((item.starting) > ((+new Date() + (20 * 60000)) / 1000)))
        .filter((item, index) => (index >= this.eventSet && index < (this.eventSet + final)));
      this.eventSet = this.eventSet + 3;
      if (this.eventSet > 15) {
        this.eventSet = 0;
      }
    }
    return filter;
  }

  getDate(time: any): any {
    return new Date(time * 1000);
  }

  fixLeague(name: string): string {
    return name.replace(/\s/g, '<br>');
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
}
