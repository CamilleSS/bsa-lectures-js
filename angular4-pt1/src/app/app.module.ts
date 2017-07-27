import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClockComponentComponent } from './clock-component/clock-component.component';
import { TimerComponentComponent } from './timer-component/timer-component.component';
import { FormsModule } from '@angular/forms';
import { StopwatchComponentComponent } from './stopwatch-component/stopwatch-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponentComponent,
    TimerComponentComponent,
    StopwatchComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
