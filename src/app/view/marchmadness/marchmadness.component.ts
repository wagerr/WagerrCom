import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {WgrSportsBookService} from "../../service/wgr-sports-book.service";
import {environment} from "../../../environments/environment";
import * as CryptoJS from 'crypto-js';
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-marchmadness',
  templateUrl: './marchmadness.component.html',
  styleUrls: ['./marchmadness.component.scss']
})
export class MarchmadnessComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private wsb: WgrSportsBookService,) { }

  ngOnInit(): void {
    const refAddress = this.route.snapshot.paramMap.get('refAddress');
    if (refAddress) {
      sessionStorage.setItem('ref', refAddress);
    }
    const getSeed = this.cookieService.get('asdfl3k-12u9clkjaslj');
    if (getSeed) {
      const seedWords = this.decryptData(getSeed);
      // this.sc.getSportBookAccountLogin(seedWords);
      this.wsb.getMnemonicData(seedWords.replace(/\s+$/, ''));
      this.wsb.getMarchMadnessAccount();
    }
    this.wsb.getMarchMadnessLeaderboard();
  }

  getBracketCount(): number {
    return this.wsb.getMarchMadnessBracketCount();
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

  public decryptData(data): string {
    const encryptKey = this.authService.userID + environment.seasalt;
    try {
      const bytes = CryptoJS.AES.decrypt(data, encryptKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
