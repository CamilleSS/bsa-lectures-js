import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForLoggedInGuard } from './guards/for-logged-in.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ClockComponent } from './dashboard/clock/clock.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ForLoggedOutGuard } from './guards/for-logged-out.guard';

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
        path: 'clock',
        component: ClockComponent,
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
    component: RegistrationComponent,
    canActivate: [ForLoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ForLoggedOutGuard]
  },
  {
    path: 'remind-password',
    component: RemindPasswordComponent,
    canActivate: [ForLoggedOutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
