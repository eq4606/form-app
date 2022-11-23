import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProcessComponent } from './process/process.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'process', component: ProcessComponent },
  { path: '**', redirectTo: 'process', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
