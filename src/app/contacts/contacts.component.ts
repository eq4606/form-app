import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessService } from '../process.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  @Input()
  contacts: any[];
  contactType: any[];
  addContact: boolean = false;
  isRequiredDelFlag: boolean = true;
  contact: {
    id: number;
    deliveryFlag: boolean;
    type: number | undefined;
    name: string;
    phoneNumber: number | undefined;
    email: string;
    address: string;
  } = { id: 0, deliveryFlag: false, type: undefined, name: "", phoneNumber: undefined, email: "", address: "" };

  @ViewChild('contactForm', { static: true }) form: NgForm;

  subProc: Subscription;
  subForm: Subscription | undefined;

  constructor(private processSvc: ProcessService) {
    this.contactType = this.processSvc.contactPersonType_submitedBy;
  }

  ngOnInit(): void {
    this.subProc = this.processSvc.process$
      .subscribe({
        next: (v) => {
          this.contacts = v.contactPersons;
          this.isRequiredDelFlag = !this.contacts.find(c => c.deliveryFlag == true) !== undefined;
        },
        error: (e) => console.error(`You have error!!!\n${e}`)
      });

    this.processSvc.reset.subscribe({
      next: (v) => {
        this.form.reset();
      },
      error: (e) => console.error(`You have error!!!\n${e}`)
    });

    this.processSvc.isValidForm.contacts = this.form.valid && !this.isRequiredDelFlag || false;
    this.subForm = this.form.valueChanges?.subscribe({
      next: (v) => {
        this.processSvc.isValidForm.contacts = this.form.valid || false;
        this.isRequiredDelFlag = !this.contacts.find(c => c.deliveryFlag == true);
      },
      error: (e) => console.error(`You have error!!!\n${e}`)
    });
  }

  ngOnDestroy(): void {
    this.subProc.unsubscribe();
    this.processSvc.reset.unsubscribe();
    this.subForm?.unsubscribe();
  }

  calcType(ct: any): string {
    return this.contactType.find(t => t.code == ct)?.value;
  }
  cancelEvent(): boolean {
    return false;
  }

  onSubmit(): void {
    this.contacts.push(this.contact);
    this.contact = { id: 0, deliveryFlag: false, type: undefined, name: "", phoneNumber: undefined, email: "", address: "" };
    this.addContact = false;
  }

  log(o: any) {
    console.log(o);
  }

}
