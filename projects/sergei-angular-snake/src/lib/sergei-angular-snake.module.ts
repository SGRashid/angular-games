import { NgModule } from '@angular/core';
import { SergeiAngularSnakeComponent } from './sergei-angular-snake.component';
import { GridComponent } from './components/grid/grid.component';



@NgModule({
  declarations: [SergeiAngularSnakeComponent, GridComponent],
  imports: [
  ],
  exports: [SergeiAngularSnakeComponent]
})
export class SergeiAngularSnakeModule { }
