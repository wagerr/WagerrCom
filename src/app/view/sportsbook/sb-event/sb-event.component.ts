import {Component, OnDestroy, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {AuthService} from '../../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketConnService} from '../../../service/socket-conn.service';

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
}
