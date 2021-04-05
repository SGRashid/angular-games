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

  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.snake = snake;
    this.move();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  move(): void {
    const subs = interval(500).subscribe(res => console.log(res));
    this.subscription.add(subs);
  }

}
