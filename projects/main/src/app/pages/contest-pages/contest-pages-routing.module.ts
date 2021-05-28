import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { ContestDetailPageComponent } from './contest-detail-page/contest-detail-page.component';
import { ContestFormPageComponent } from './contest-form-page/contest-form-page.component';
import { ContestProblemListPageComponent } from './contest-problem-list-page/contest-problem-list-page.component';
import { MyContestListPageComponent } from './my-contest-list-page/my-contest-list-page.component';

const routes: Routes = [
  { path: 'list/me', canActivate: [AuthGuard], component: MyContestListPageComponent },
  { path: 'register', canActivate: [AuthGuard], component: ContestFormPageComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: ContestFormPageComponent },
  { path: 'detail/:id', component: ContestDetailPageComponent },
  { path: ':id/problems', canActivate: [AuthGuard], component: ContestProblemListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestPagesRoutingModule {
}
