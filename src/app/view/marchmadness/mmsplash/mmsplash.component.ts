import { Component, OnInit } from '@angular/core';
import {AccountComponent} from "../../sportsbook/sbdisplay/account/account.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {MmVerifyBracketComponent} from "../mm-verify-bracket/mm-verify-bracket.component";
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
  viewBracket = false;
  editUserName = false;
  oldusername = '';
  username = '';
  bracketHash: string;

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
    this.wsb.marchMadnessFoundBracket.subscribe((bracket: any) => {
      if (bracket.final && !this.viewBracket) {
        this.leaderboard = false;
        this.viewBracket = true;
      }
    });
  }

  filterName() {
    const filter = new Filter();
    this.username = filter.clean(this.username);
  }

  editUsername(): void {
    if (this.editUserName) {
      if (this.username != '') {
        const userAccount: any = this.wsb.account.getValue();
        userAccount.settings.username = this.username;
        this.wsb.updateUserSetting(userAccount);
      } else {
        this.username = this.oldusername;
      }
    } else {
      this.oldusername = this.username;
      this.username = '';
    }
    this.editUserName = !this.editUserName;
  }

  toggleLeaderBoard() {
    this.viewBracket = false;
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

  eventStarted(): boolean {
    const canSubmit = Date.now();
    // return (canSubmit < 1647226800000 || canSubmit > 1647529200000);
    return (canSubmit < 1647136262000 || canSubmit > 1647529200000);
  }

  showVerifyBracket(): void {
    if (this.viewBracket) {
      this.wsb.marchMadnessFoundBracket.next([]);
      this.viewBracket = false;
      this.bracketHash = null;
      this.createBracket = false;
    } else {
      this.bsModalRef = this.modalService.show(MmVerifyBracketComponent,
        // @ts-ignore
        Object.assign({}, {class: 'modal-lg', backdrop: 'static'}));
    }
  }

}
