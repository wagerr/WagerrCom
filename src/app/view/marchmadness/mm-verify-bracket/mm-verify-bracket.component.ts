import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-mm-verify-bracket',
  templateUrl: './mm-verify-bracket.component.html',
  styleUrls: ['./mm-verify-bracket.component.scss']
})
export class MmVerifyBracketComponent implements OnInit {
  hash: string;

  constructor(
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.wsb.marchMadnessFoundBracket.subscribe((bracket: any) => {
      if (bracket.final) {
        this.bsModalRef.hide();
      }
    });
  }

  getBracket(): void {
    this.wsb.getMarchMadnessBracketFromHash(this.hash);
  }

  }
