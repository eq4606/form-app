import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessComponent } from './process/process.component';
import { SumProcessComponent } from './sum-process/sum-process.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SumContactsComponent } from './sum-contacts/sum-contacts.component';
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProcessComponent,
    SumProcessComponent,
    ContactsComponent,
    SumContactsComponent,
    PhoneNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
