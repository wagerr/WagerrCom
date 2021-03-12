import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent implements OnInit {
  final: any;
  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  this.final = this.wsb.marchMadness;
  }

}
