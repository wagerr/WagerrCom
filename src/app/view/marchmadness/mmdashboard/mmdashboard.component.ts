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
  oldusername = '';
  userAccount: any;
  brackets: any = {};

  constructor(
    private wsb: WgrSportsBookService,) { }

  ngOnInit(): void {
    this.wsb.getMarchMadnessLeaderboard();
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
    return bracket[0].finalFour.roundSeven[0].set[0].name;
  }
}
