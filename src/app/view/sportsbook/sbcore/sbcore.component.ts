import {Component, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-sbcore',
  templateUrl: './sbcore.component.html',
  styleUrls: ['./sbcore.component.scss']
})
export class SbcoreComponent implements OnInit {
  mobileNav = 'sportlist';
  showBet = true;
  sport = 'soccer';
  searchFilter: string;
  searchBox: string;
  searchText: string;
  private subject: Subject<string> = new Subject();


  constructor(
    private wsb: WgrSportsBookService,
    private route: ActivatedRoute) {
    this.wsb.whatSport.subscribe((sportid: any) => {
      if (sportid) {
        if (sportid[0] !== this.sport) {
          this.searchBox = '';
          this.searchText = '';
          this.sport = sportid[0];
        }
      }
    });
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(searchTextValue => {
      this.searchBox = searchTextValue;
    });
  }

  searchIt(value: string): void {
    this.subject.next(value);
  }

  ngOnInit(): void {
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
