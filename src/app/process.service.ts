import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ICvp } from './icvp';
import { IProcess } from './iprocess';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  process$: Observable<IProcess> = of({
    superClaim: {
      superClaimNum: 500040204,
      superClaimStatus: {
        code: 1,
        value: "פתוחה"
      },
      superClaimType: undefined,
      eventDate: undefined,
      claimCause: 2,
      injuryType: undefined,
      submitedBy: 1,
      submitionMethod: undefined,
    },
    insured: {
      address: {
        cityName: 'רעננה',
        streetName: 'הדקלים',
      },
      identityType: 1,
      age: 30,
      lastName: "כהן",
      identity: 312536945,
      firstName: "אסף",
    },
    contactPersons: [{
      id: 1,
      deliveryFlag: false,
      type: 1,
      name: "ניקיטה ג'ין",
      phoneNumber: 557686553,
      email: '',
      address: '',
    }]
  });

  contactPersonType_submitedBy: ICvp[] = [
    { code: 0, value: 'מבוטח' },
    { code: 1, value: 'סוכן' },
    { code: 2, value: 'בן/בת זוג' },
  ]
  superClaimType: ICvp[] = [
    { code: 1, value: "התביעה אושרה" },
    { code: 2, value: "התביעה נדחתה" },
    { code: 4, value: "טרם התקבלה החלטה" }
  ]
  claimCause: ICvp[] = [
    { code: 1, value: "תאונה" },
    { code: 2, value: "מחלה" },
    { code: 5, value: "תאונת עבודה" },
    { code: 6, value: "אחר" },
  ]
  injuryType: ICvp[] = [
    { code: 1, value: "אגן" },
    { code: 2, value: "גפיים" },
    { code: 5, value: "ראש" },
    { code: 6, value: "גב" },
    { code: 7, value: "לב" },
    { code: 9, value: "נפש" },
  ]
  submitionMethod: ICvp[] = [
    { code: 1, value: 'דואר' },
    { code: 2, value: 'דיגיטל' },
    { code: 3, value: 'פקס' },
  ]
  identityTypes: ICvp[] = [
    { code: 1, value: 'ת.ז.' },
    { code: 2, value: 'דרכון' },
    { code: 3, value: 'מבוטח' },
    { code: 4, value: 'מפעל' }
  ]

  reset: Subject<boolean>;
  isValidForm = { 'contacts': false, 'sumproc': false };
  contacts: any[];

  constructor() {
    this.reset = new Subject<boolean>();
  }

  async getProcess() {
    this.process$.subscribe({
      next: (v) => {
        return v as IProcess;
      },
      error: (e) => console.error(`You have error!\n${e}`)
    });
  }

  getContactPersonType_submitedBy(): ICvp[] {
    return this.contactPersonType_submitedBy;
  }
  getSuperClaimType(): ICvp[] {
    return this.superClaimType;
  }
  getClaimCause(): ICvp[] {
    return this.claimCause;
  }
  getInjuryType(): ICvp[] {
    return this.injuryType;
  }
  getSubmitionMethod(): ICvp[] {
    return this.submitionMethod;
  }
  getIdentityTypes(): ICvp[] {
    return this.identityTypes;
  }
}
