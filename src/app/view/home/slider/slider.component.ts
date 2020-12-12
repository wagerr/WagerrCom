import { Component, OnInit } from '@angular/core';
import {SocketConnService} from '../../../service/socket-conn.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  currentSlideId: number;
  specials: any = [];
  eventDisplay: any = [];

  constructor(private sc: SocketConnService) {
    this.sc.specials.subscribe((response: any) => {
      this.specials = response;
      this.specials.forEach((slide: any, key: number) => {
        if (slide.view === 'true') {
          this.currentSlideId = key;
        }
      });
    });
    this.sc.openEvents.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.eventDisplay = data;
      }
    });
  }
  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  ngOnInit(): void {
    interval(10000)
      .subscribe((val) => {
        this.goNextSlide();
      });
  }

  isTypeBasic(item: any): boolean {
    if (item.type === 'basic' || item.type === null) {
      return true;
    }
    return false;
  }

  isTypeftw(item: any): boolean {
    if (item.type === 'ftw') {
      return true;
    }
    return false;
  }

  isTypeftd(item: any): boolean {
    if (item.type === 'ftd') {
      return true;
    }
    return false;
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

  getLine(team: string, type: string, eventid: number): any {
    const event = this.getEventData(eventid);
    if (type === 'ml') {
      return this.updateTrueOdds(this.getMoneyLine(team, event));
    } else {
      return this.getSpread(team, event);
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
      return set + (item.odds[1].spreadPoints / 10);
    }
    return '—';
  }

  goNextSlide(): void {
    const totals = this.specials.length - 1;
    if (this.specials.lenght > 0) {
      this.specials[this.currentSlideId].view = 'false';
      this.currentSlideId++;
      if (this.currentSlideId > totals) {
        this.currentSlideId = 0;
      }
      this.specials[this.currentSlideId].view = 'true';
    }
  }
}
