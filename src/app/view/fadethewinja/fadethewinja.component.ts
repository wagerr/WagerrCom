import { Component, OnInit } from '@angular/core';
import {SocketConnService} from '../../service/socket-conn.service';

@Component({
  selector: 'app-fadethewinja',
  templateUrl: './fadethewinja.component.html',
  styleUrls: ['./fadethewinja.component.scss']
})
export class FadethewinjaComponent implements OnInit {
  currentSlideId: number;
  specials: any = [];
  eventDisplay: any = [];
  event: any;
  slide: any;

  constructor(private sc: SocketConnService) {
    this.sc.specials.subscribe((response: any) => {
      this.specials = response;
      this.specials.forEach((slide: any, key: number) => {
        if (slide.type === 'ftw') {
          this.slide = slide;
          this.event = this.getEventData(slide.eventid);
        }
      });
    });
    this.sc.openEvents.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.eventDisplay = data;
        this.event = this.getEventData(this.slide.eventid);
      }
    });
  }

  ngOnInit(): void {
  }

  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  getSVG(teamname): string {
    return teamname.split(' ').join('_') + '.svg';
  }

  getEventData(eventid: number): any {
    let event = [];
    this.eventDisplay.forEach((item: any) => {
      if (+item.event_id === +eventid) {
        event = item;
      }
    });
    return event;
  }

  getTeam(team: any, n: number = 1): string {
    if (team) {
      const getTeam = team.split('-');
      return getTeam[n];
    }
    return '';
  }

  getMoneyLine(team: string, event: any): any {
    const type = this.getTeam(team, 0);
    if (type) {
      if (type === 'home') {
        return event.odds[0].mlHome / 10000;
      } else {
        return event.odds[0].mlAway / 10000;
      }
    }
    return 0;
  }

  getLine(team: string, type: string): any {
    if (type === 'ml') {
      return this.updateTrueOdds(this.getMoneyLine(team, this.event));
    } else {
      return this.getSpread(team, this.event);
    }
    return '';
  }

  getSpread(team: string, event: any): any {
    const type = this.getTeam(team, 0);
    if (type) {
      return this.getSpreadNumber(event, type);
    }
    return 0;
  }

  getSpreadNumber(item: any, type: any): any {
    if (item.odds[1].spreadPoints) {
      const set = (item.odds[1].favorite === type) ? '-' : '+';
      return set + item.odds[1].spreadPoints / 10;
    }
    return '—';
  }

}
