import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  process: any;
  claim: any;
  contactsTypes: any[];

  constructor(protected processSvc: ProcessService) { }

  ngOnInit(): void {
    this.processSvc.process$
      .subscribe({
        next: (v) => {
          this.process = v;
          this.claim = v.superClaim;
          this.contactsTypes = v.contactPersons.map((t: { type: any; }) => (t.type));
        },
        error: (e) => console.error(`You have error!!!\n${e}`)
      });
  }

  reloadCurrent() {
    this.processSvc.reset.next(true);
  }

  onUpdate(e: any) {
    this.process.contactPersons = e;
    this.contactsTypes = this.process.contactPersons.map((t: { type: any; }) => (t.type));
  }

  printForm() {
    console.log('%c Form Data', 'font-weight: bold; color: darkblue;');
    console.log(this.process);
  }

}
