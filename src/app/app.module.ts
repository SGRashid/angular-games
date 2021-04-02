import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SergeiAngularSnakeModule } from 'sergei-angular-snake';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SergeiAngularSnakeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
