import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {BuyModalComponent} from '../buy-modal/buy-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mobileNav  = false;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
  }

  closeMobile(): void {
    this.showMobileNav();
  }

  openBuyModal(): void {
    this.modalRef = this.modalService.show(BuyModalComponent,
      Object.assign({}, { class: 'modal-lg' }));
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
  }

  showMobileNav(): void {
    this.mobileNav = !this.mobileNav;
  }

}
