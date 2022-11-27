import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICvp } from '../icvp';
import { ProcessService } from '../process.service';

@Component({
  selector: 'app-sum-process',
  templateUrl: './sum-process.component.html',
  styleUrls: ['./sum-process.component.scss']
})
export class SumProcessComponent implements OnInit, OnDestroy {

  insured: any;
  details: any;

  submitedByLst: ICvp[] = [];
  supClaimTypeLst: ICvp[] = [];
  claimCauseLst: ICvp[] = [];
  injTypeLst: ICvp[] = [];
  submMethodLst: ICvp[] = [];
  idTypeLst: ICvp[] = [];

  @Input()
  contactsTypes: any[];

  @ViewChild('claimForm', { static: true }) form: NgForm;

  subProc: Subscription;
  subForm: Subscription | undefined;

  constructor(private processSvc: ProcessService) {
    this.submitedByLst = this.processSvc.contactPersonType_submitedBy;
    this.supClaimTypeLst = this.processSvc.superClaimType;
    this.claimCauseLst = this.processSvc.claimCause;
    this.injTypeLst = this.processSvc.injuryType;
    this.submMethodLst = this.processSvc.submitionMethod;
    this.idTypeLst = this.processSvc.identityTypes;
    this.subProc = new Subscription();
  }

  ngOnInit(): void {
    this.processSvc.process$.subscribe({
      next: (v) => {
        this.insured = v.insured; this.details = v.superClaim;
      },
      error: (e) => console.error(`You have error!!!\n${e}`)
    });

    this.processSvc.reset.subscribe({
      next: (v) => {
        this.form.reset();
      },
      error: (e) => console.error(`You have error!!!\n${e}`)
    });

    this.processSvc.isValidForm.sumproc = this.form.valid || false;
    this.subForm = this.form.valueChanges?.subscribe({
      next: (v) => {
        this.processSvc.isValidForm.sumproc = this.form.valid || false;
      },
      error: (e) => console.error(`You have error!!!\n${e}`)
    });
  }

  ngOnDestroy(): void {
    this.subProc.unsubscribe();
    this.processSvc.reset.unsubscribe();
    this.subForm?.unsubscribe();
  }

}
