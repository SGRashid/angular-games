import { Component, OnInit } from '@angular/core';

//for tests
const snake = [
  { x: 1, y: 1},
  { x: 1, y: 2},
  { x: 1, y: 3},
  { x: 1, y: 4},
];

@Component({
  selector: 'lib-snake',
  template: `
    <lib-grid [width]="20" [snake]="snake"></lib-grid>
  `,
  styles: [
  ]
})
export class SergeiAngularSnakeComponent implements OnInit {

  snake: any;

  constructor() { }

  ngOnInit(): void {
    this.snake = snake;
  }

}
