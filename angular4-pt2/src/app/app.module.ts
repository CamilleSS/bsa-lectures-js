import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForLoggedInGuard } from './guard/for-logged-in.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TimerComponent } from './dashboard/timer/timer.component';
import { UsersComponent } from './dashboard/users/users.component';
import { LogoutComponent } from './dashboard/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    RemindPasswordComponent,
    DashboardComponent,
    ProfileComponent,
    TimerComponent,
    UsersComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ForLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
