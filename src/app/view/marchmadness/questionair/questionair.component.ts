import {Component, OnInit} from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-questionair',
  templateUrl: './questionair.component.html',
  styleUrls: ['./questionair.component.scss']
})
export class QuestionairComponent implements OnInit {
  confirm: boolean;
  questionThis = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Sport: new FormControl('', [
      Validators.required]),
    Team: new FormControl('', [
      Validators.required,]),
    Marketing: new FormControl(''),
  });

  constructor(
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  goBackHome() {
    this.bsModalRef.hide();
  }

  start() {
    const userAccount: any = this.wsb.account.getValue();
    userAccount.settings.email = this.questionThis.get('Email').value;
    userAccount.settings.sport = this.questionThis.get('Sport').value;
    userAccount.settings.team = this.questionThis.get('Team').value;
    userAccount.settings.marketing = this.questionThis.get('Marketing').value;
    this.wsb.updateUserSetting(userAccount);
  }

}
