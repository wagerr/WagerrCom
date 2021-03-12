import { Component, OnInit } from '@angular/core';
import {AccountComponent} from "../../sportsbook/sbdisplay/account/account.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";

@Component({
  selector: 'app-mmsplash',
  templateUrl: './mmsplash.component.html',
  styleUrls: ['./mmsplash.component.scss']
})
export class MmsplashComponent implements OnInit {
  bsModalRef: BsModalRef;
  leaderboard = false;
  createBracket = false;
  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
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
    return this.wsb.getUserName();
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

}
