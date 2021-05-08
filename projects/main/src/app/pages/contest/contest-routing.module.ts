import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { ContestPostComponent } from './contest-post/contest-post.component';
import { ContestComponent } from './contest.component';
import { ProblemPostComponent } from './problem-post/problem-post.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { ProblemListComponent } from './problem-list/problem-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ContestComponent },
  { path: 'post', canActivate: [AuthGuard],component: ContestPostComponent },
  { path: ':id', component: ContestDetailComponent },
  { path: 'problem/post', canActivate: [AuthGuard], component: ProblemPostComponent },
  { path: 'problem/:id', canActivate: [AuthGuard], component: ProblemDetailComponent },
  { path: ':id/problem', canActivate: [AuthGuard], component: ProblemListComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule { }
