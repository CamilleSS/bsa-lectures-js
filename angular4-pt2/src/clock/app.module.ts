import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClockMainComponent } from './clock-main/clock-main.component';
import { ClockComponentComponent } from './clock-component/clock-component.component';
import { TimerComponentComponent } from './timer-component/timer-component.component';
import { StopwatchComponentComponent } from './stopwatch-component/stopwatch-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockMainComponent,
    ClockComponentComponent,
    TimerComponentComponent,
    StopwatchComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    ClockMainComponent,
    ClockComponentComponent,
    TimerComponentComponent,
    StopwatchComponentComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
