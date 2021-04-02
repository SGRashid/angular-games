import { NgModule } from '@angular/core';
import { SergeiAngularSnakeComponent } from './sergei-angular-snake.component';
import { GridComponent } from './components/grid/grid.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [SergeiAngularSnakeComponent, GridComponent],
  imports: [
    BrowserModule,
  ],
  exports: [SergeiAngularSnakeComponent]
})
export class SergeiAngularSnakeModule { }
