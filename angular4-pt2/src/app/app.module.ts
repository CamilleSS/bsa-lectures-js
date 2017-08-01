import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppModule as ClockModule } from '../clock/app.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForLoggedInGuard } from './guards/for-logged-in.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ClockComponent } from './dashboard/clock/clock.component';
import { UsersComponent } from './dashboard/users/users.component';
import { SortPipe } from './pipes/sort.pipe';
import { ForLoggedOutGuard } from './guards/for-logged-out.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    RemindPasswordComponent,
    DashboardComponent,
    ProfileComponent,
    ClockComponent,
    UsersComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClockModule
  ],
  providers: [
    ForLoggedInGuard,
    ForLoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
