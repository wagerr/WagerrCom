import {Component, OnInit} from '@angular/core';
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
  uid: string;

  constructor(
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.final = this.wsb.marchMadness;
    this.uid = this.wsb.getUserUID();
  }

  submitBracket(): void {
    const canSubmit = Date.now();
    if (canSubmit < 1647529200000) {
      this.confirm = !this.confirm;
      this.wsb.submitMarchMadnessBracket(this.final);
    }
  }

  getBracketCount(): number {
    return this.wsb.getMarchMadnessBracketCount();
  }

  goFacebook() {
    this.uid = this.wsb.getUserUID();
    const url = encodeURIComponent('https://wagerr.com/marchmadness/ref/' + this.uid);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    this.wsb.marchMadness = {};
    this.wsb.getMarchMadnessAccount();
    this.bsModalRef.hide();
  }

  goTwitter() {
    this.uid = this.wsb.getUserUID();
    const url = encodeURIComponent('https://wagerr.com/marchmadness/ref/' + this.uid);
    window.open(`https://twitter.com/intent/tweet?text=March%20Madness%20Pick%27em.%0D%0A%0D%0A$100,000%20prize%20pool!%0D%0A%0D%0AFree%20Bracket%20Entry.%0D%0A%0D%0A&url=${url}%0D%0A%0D%0A&hashtags=Wagerr,cryptocurrency,sportsbetting,BTC,Bitcoin,NCAA,basketball,sports,betting,MarchMadness,brackets`);
    this.wsb.marchMadness = {};
    this.wsb.getMarchMadnessAccount();
    this.bsModalRef.hide();
  }

  getChampion() {
    return this.final.bracketString.finalFour.roundSeven[0].set[0].name;
  }

  getLoser() {
    const roundSix = this.final.bracketString.finalFour.roundSix[0].set;
    const roundSeven = this.final.bracketString.finalFour.roundSeven[0].set[0];
    if (roundSix[0] === roundSeven) {
      return roundSix[1].name;
    }
    return roundSix[0].name;
  }

}
