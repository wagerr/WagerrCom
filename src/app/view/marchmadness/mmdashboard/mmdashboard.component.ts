import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
const Filter = require('bad-words')

@Component({
  selector: 'app-mmdashboard',
  templateUrl: './mmdashboard.component.html',
  styleUrls: ['./mmdashboard.component.scss']
})
export class MmdashboardComponent implements OnInit {
  createBracket = false;
  editUserName = false;
  username = '';
  userAccount: any;
  brackets = [];

  constructor(
    private wsb: WgrSportsBookService,) { }

  ngOnInit(): void {
    this.wsb.account.subscribe((data: any) => {
      if (data && data.uid) {
        this.userAccount = data;
        this.getUserName();
      }
    });
    this.wsb.marchMadnessUser.subscribe((data: any) => {
      if (data && data.brackets) {
        this.brackets = data.brackets;
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

  toggleCreateBracket() {
    this.createBracket = !this.createBracket;
  }

  getUserName() {
    this.username = this.wsb.getUserName();
  }

  isLoggedIn(): boolean {
    return this.wsb.isLoggedIn();
  }

  getBracketChamp(bracket): string {
    const bracketDone = JSON.parse(bracket);
    return bracketDone.finalFour.roundSeven[0].set[0].name;
  }
}
