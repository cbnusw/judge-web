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
