import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', canActivate: [AuthGuard], component: MainPageComponent },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
  { path: 'contests', loadChildren: () => import('./pages/contest/contest.module').then(m => m.ContestModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
