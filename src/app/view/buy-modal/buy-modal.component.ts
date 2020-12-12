import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
