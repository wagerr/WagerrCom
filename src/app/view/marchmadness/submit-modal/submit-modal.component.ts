import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent implements OnInit {
  confirm: boolean;
  final: any;

  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  this.final = this.wsb.marchMadness;
  }

  submitBracket(): void {
    const canSubmit = Date.now();
    if (canSubmit < 1616169600000) {
      this.confirm = !this.confirm;
      // this.wsb.submitMarchMadnessBracket(this.final);
    }
  }

  goFacebook() {
    const url = encodeURIComponent('https://wagerr.com/marchmadness/ref/5fb60d3511c049a2319ffaa7');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }

  goTwitter() {
    const url = encodeURIComponent('https://wagerr.com/marchmadness/ref/5fb60d3511c049a2319ffaa7');
    window.open(`https://twitter.com/intent/tweet?text=March Madness Free Bracket Entry over $100,000 in prizes&url=${url}`);
  }

  getChampion() {
    return this.final.bracketString.finalFour.roundSeven[0].set[0].name;
  }

  getLoser() {
    const roundSix = this.final.bracketString.finalFour.roundSix[0].set;
    if (!roundSix[0].winner) {
      return roundSix[1].name;
    }
  }

}
