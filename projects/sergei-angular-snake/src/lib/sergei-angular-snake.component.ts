import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';

// типы в отдельный файл!!

type Direction = -1 | 0 | 1;
interface ICoordinates {
  x: number;
  y: number;
}

// for tests
const snake = [
  { x: 5, y: 5},
  { x: 6, y: 5},
  { x: 7, y: 5},
  { x: 8, y: 5},
  { x: 9, y: 5},
  { x: 10, y: 5},
  { x: 11, y: 5},
];

@Component({
  selector: 'lib-snake',
  template: `
    <lib-grid [width]="width" [height]="height" [snake]="snake"></lib-grid>
    <div style="color: white;" *ngIf="!isGameOn">PAUSE SCORE {{ score }}</div>
  `,
  styles: [
  ]
})
export class SergeiAngularSnakeComponent implements OnInit, OnDestroy {

  snake: any;

  width = 20;
  height = 20;
  score = 0;
  delay = 1000;
  isGameOn = true;
  xDirection = 1;
  yDirection = 0;

  subscription = new Subscription();

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') this.pauseOrStartGame();

    if (event.code === 'ArrowUp') this.setDirection(0, -1);
    if (event.code === 'ArrowDown') this.setDirection(0, 1);
    if (event.code === 'ArrowLeft') this.setDirection(-1, 0);
    if (event.code === 'ArrowRight') this.setDirection(1, 0);

    if (event.code === 'KeyR') this.restartGame();
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
    const newPoint = {
      x: this.snake[len - 1].x + this.xDirection,
      y: this.snake[len - 1].y + this.yDirection
    };

    this.isGameOver(newPoint);

    this.snake = [...this.snake.slice(1, len), newPoint];
  }

  pauseOrStartGame(): void {
    this.isGameOn = !this.isGameOn;
  }

  setDirection(x: Direction, y: Direction): void {
    // запрещаем движение задом наперед
    if (this.xDirection === - x) return;
    if (this.yDirection === - y) return;

    this.xDirection = x;
    this.yDirection = y;
  }

  isGameOver(point: ICoordinates): void {
    if (
      point.x > this.width ||
      point.x < 0 ||
      point.y < 0 ||
      point.y > this.height
    ) {
      this.restartGame(true);
      return;
    }

    if (this.snake.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y)) {
      this.restartGame(true);
      return;
    }
  }

  restartGame(isGameOver?: boolean): void {
    if (isGameOver) alert('GAME OVER');
    window.location.reload();
  }

}
