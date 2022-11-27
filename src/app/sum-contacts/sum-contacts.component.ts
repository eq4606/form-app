import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProcessService } from '../process.service';

@Component({
  selector: 'app-sum-contacts',
  templateUrl: './sum-contacts.component.html',
  styleUrls: ['./sum-contacts.component.scss']
})
export class SumContactsComponent implements OnInit {

  @Input()
  contacts: any[];
  insured: any;

  @Output()
  updateContacts: EventEmitter<any[]>;

  constructor(private processSvc: ProcessService) {
    this.updateContacts = new EventEmitter<any[]>();
  }

  ngOnInit(): void {
    this.processSvc.process$
      .subscribe({
        next: (v) => { this.contacts = v.contactPersons; this.insured = v.insured },
        error: (e) => console.error(`You have error!!!\n${e}`),
        complete: () => console.info(`Completed!!!`)
      });
  }

  addInsured(): void {
    let contact = {
      id: 0,
      deliveryFlag: false,
      type: 0,
      name: `${this.insured.firstName} ${this.insured.lastName}`,
      phoneNumber: undefined,
      email: "",
      address: `${this.insured.address.streetName}, ${this.insured.address.cityName}`
    };
    this.contacts.push(contact);
    this.updateContacts.emit(this.contacts)
  }

  resetAll(): void {
    this.contacts = [];
    this.updateContacts.emit(this.contacts)
  }

  resetContacts(): void {
    this.contacts = this.contacts.filter(c => c.deliveryFlag);
    this.updateContacts.emit(this.contacts);
  }
}
