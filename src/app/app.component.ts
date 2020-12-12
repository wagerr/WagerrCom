import {AfterContentInit, Component} from '@angular/core';
import {SocketConnService} from './service/socket-conn.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from './service/auth.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'frontend';
  loaded = false;

  constructor(
    private SC: SocketConnService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {
    this.auth.getUserData();
    this.auth.getAngularUUID();
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.SC.changeRoute(ev);
      }
      window.scrollTo(0, 0);
    });
    if (!window.MediaDeviceInfo) {
      // @ts-ignore
      window.MediaDeviceInfo = {};
    }
    // this.meta.addTags([
    //   { name: 'twitter:card', content: 'summary' },
    //   { name: 'og:url', content: '/sportsbook' },
    //   { name: 'og:title', content: 'I Bet 1000 WGR on Norte Dame to Win' },
    //   { name: 'og:description', content: 'Notre Dame vs Florida State' },
    //   { name: 'og:image', content: 'https://img.wagerr.com/promo/Notre_DameFloridamoneylinehome.png' }
    // ]);
  }

  onActivate(event): void {
    window.scroll(0, 0);
  }

  ngAfterContentInit(): void {
    this.loaded = !this.loaded;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bodyStart');
  }

}
