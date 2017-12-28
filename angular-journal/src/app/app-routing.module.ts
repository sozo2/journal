import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogregComponent } from './logreg/logreg.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogregComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }