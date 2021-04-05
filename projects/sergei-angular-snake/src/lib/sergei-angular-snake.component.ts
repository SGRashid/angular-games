import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

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
export class SergeiAngularSnakeComponent implements OnInit, OnDestroy {

  snake: any;

  delay = 1000;

  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.snake = snake;
    console.log(this.snake);
    this.move();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  move(): void {
    const subs = interval(this.delay).subscribe(this.step);
    this.subscription.add(subs);
  }

  step = (res: number): void => {
    const len = this.snake.length;
    const newPoint = { x: this.snake[len - 1].x + 1, y: this.snake[len - 1].y };
    this.snake = [...this.snake.slice(1, len), newPoint];
  }

}
