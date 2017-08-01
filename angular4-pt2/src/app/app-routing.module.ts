import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForLoggedInGuard } from './guard/for-logged-in.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TimerComponent } from './dashboard/timer/timer.component';
import { UsersComponent } from './dashboard/users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ForLoggedInGuard],
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: '/profile',
      //   canActivate: [ForLoggedInGuard]
      // },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ForLoggedInGuard]
      },
      {
        path: 'timer',
        component: TimerComponent,
        canActivate: [ForLoggedInGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [ForLoggedInGuard]
      }
    ]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'remind-password',
    component: RemindPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
