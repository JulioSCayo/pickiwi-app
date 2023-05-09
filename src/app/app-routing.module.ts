import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RecordsComponent } from './pages/records/records.component';
import { TimerComponent } from './pages/timer/timer.component';
import { AuthGuard } from './utils/guards/auth/auth.guard';
import { NoAuthGuard } from './utils/guards/no-auth/no-auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard]},
  {path: 'timer', component: TimerComponent, canActivate: [AuthGuard] },
  {path: 'records', component: RecordsComponent, canActivate: [AuthGuard] },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
