import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  isGameOn = true;

  subscription = new Subscription();

  @HostListener('document:keydown.space') pauseOrStartGame($event): void {
    this.isGameOn = !this.isGameOn;
  }

  constructor() { }

  ngOnInit(): void {
    this.snake = snake;
    this.move();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  move(): void {
    this.subscription.add(
      interval(this.delay).subscribe(this.step)
    );
  }

  step = (res: number): void => {

    if (!this.isGameOn) {
      return;
    }

    const len = this.snake.length;
    const newPoint = {x: this.snake[len - 1].x + 1, y: this.snake[len - 1].y};
    this.snake = [...this.snake.slice(1, len), newPoint];
  }

}
