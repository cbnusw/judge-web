import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { ContestPostComponent } from './contest-post/contest-post.component';

const routes: Routes = [
  { path: 'post', canActivate: [AuthGuard], component: ContestPostComponent },
  { path: ':id', component: ContestDetailComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule { }