import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

const routes: Routes = [
  { path: ':id', component: ContestDetailComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule { }
