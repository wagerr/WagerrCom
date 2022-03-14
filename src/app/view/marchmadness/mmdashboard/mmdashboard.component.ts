import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {QuestionairComponent} from "../questionair/questionair.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MmVerifyBracketComponent} from "../mm-verify-bracket/mm-verify-bracket.component";
const Filter = require('bad-words')

@Component({
  selector: 'app-mmdashboard',
  templateUrl: './mmdashboard.component.html',
  styleUrls: ['./mmdashboard.component.scss']
})
export class MmdashboardComponent implements OnInit {
  bsModalRef: BsModalRef;
  createBracket = false;
  viewBracket = false;
  editUserName = false;
  username = '';
  oldusername = '';
  userAccount: any;
  brackets: any = {};
  bracketHash: string;

  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService) { }

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
    this.wsb.marchMadnessFoundBracket.subscribe((bracket: any) => {
      if (bracket.final && !this.viewBracket) {
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

  toggleCreateBracket() {
    this.viewBracket = false;
    this.createBracket = !this.createBracket;
  }

  toggleViewBracket(string: any) {
    this.bracketHash = string;
    this.createBracket = false;
    this.viewBracket = !this.viewBracket;
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

  eventStarted(): boolean {
    const canSubmit = Date.now();
    return (canSubmit > 1647529200000); // TODO: Edit for MarchMadness
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
