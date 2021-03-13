import { Component, OnInit } from '@angular/core';
import {AccountComponent} from "../../sportsbook/sbdisplay/account/account.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
const Filter = require('bad-words')

@Component({
  selector: 'app-mmsplash',
  templateUrl: './mmsplash.component.html',
  styleUrls: ['./mmsplash.component.scss']
})
export class MmsplashComponent implements OnInit {
  userAccount: any;
  bsModalRef: BsModalRef;
  leaderboard = false;
  createBracket = false;
  editUserName = false;
  username = '';
  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.wsb.account.subscribe((data: any) => {
      if (data && data.uid) {
        this.userAccount = data;
        this.getUserName();
      }
    });
  }

  filterName() {
    const filter = new Filter();
    this.username = filter.clean(this.username);
  }

  editUsername(): void {
    if (this.editUserName) {
      const userAccount: any = this.wsb.account.getValue();
      userAccount.settings.username = this.username;
      this.wsb.updateUserSetting(userAccount);
    }
    this.editUserName = !this.editUserName;
  }

  toggleLeaderBoard() {
    this.createBracket = false;
    this.leaderboard = !this.leaderboard;
  }

  toggleCreateBracket() {
    this.leaderboard = false;
    this.createBracket = !this.createBracket;
  }

  openModalAccount(): void {
    /* this is how we open a Modal Component from another component */
    // @ts-ignore
    this.bsModalRef = this.modalService.show(AccountComponent,
      // @ts-ignore
      Object.assign({}, { class: 'modal-lg', backdrop: 'static' }));
  }

  getUserName() {
    this.username = this.wsb.getUserName();
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

}
