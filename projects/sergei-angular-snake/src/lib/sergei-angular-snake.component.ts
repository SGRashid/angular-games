import { Component, OnInit } from '@angular/core';

// for tests
const snake = [
  { x: 5, y: 5},
  { x: 6, y: 5},
  { x: 7, y: 5},
  { x: 8, y: 5},
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
