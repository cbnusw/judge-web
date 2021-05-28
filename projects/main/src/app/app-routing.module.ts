import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './guards/not-auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  {
    path: 'contest',
    loadChildren: () => import('./pages/contest-pages/contest-pages.module').then(m => m.ContestPagesModule)
  },
  {
    path: 'problem',
    loadChildren: () => import('./pages/problem-pages/problem-pages.module').then(m => m.ProblemPagesModule)
  },
  {
    path: 'submit',
    loadChildren: () => import('./pages/submit-pages/submit-pages.module').then(m => m.SubmitPagesModule)
  },
  {
    path: 'scoreboard',
    loadChildren: () => import('./pages/score-board-pages/score-board-pages.module').then(m => m.ScoreBoardPagesModule)
  },
  {
    path: 'account',
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./pages/account-pages/account-pages.module').then(m => m.AccountPagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
