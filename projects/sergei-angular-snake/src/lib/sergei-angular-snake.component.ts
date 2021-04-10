import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SergeiAngularSnakeService } from './sergei-angular-snake.service';

// типы в отдельный файл!!

type Direction = -1 | 0 | 1;
type Cell = 'empty' | 'full' | 'food' | 'enemy';
type Row = Cell[];
type Grid = Row[];

interface ICoordinates {
  x: number;
  y: number;
}

export { ICoordinates, Direction, Cell, Row, Grid };

// for tests
const snake = [
  { x: 5, y: 5},
  { x: 6, y: 5},
  { x: 7, y: 5},
];

@Component({
  selector: 'lib-snake',
  template: `
    <lib-grid [width]="width"
              [height]="height"
              [snake]="snake"
              [food]="food"
    ></lib-grid>
    <div style="color: white;" *ngIf="!isGameOn">PAUSE SCORE {{ score }}</div>
    <div style="color: white;" *ngIf="isGameOverScreenOn">GAME OVER</div>
    <div style="color: white;" *ngIf="isGameOverScreenOn">press SPACE for start</div>
  `,
  styles: [
  ]
})
export class SergeiAngularSnakeComponent implements OnInit, OnDestroy {

  snake: ICoordinates[];
  food: ICoordinates;

  width = 20;
  height = 20;
  score = 0;
  delay = 500;
  isGameOn = true;
  xDirection = 1;
  yDirection = 0;
  isGameOverScreenOn = false;

  subscription = new Subscription();

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') this.pauseOrStartGame();

    if (event.code === 'ArrowUp') this.setDirection(0, -1);
    if (event.code === 'ArrowDown') this.setDirection(0, 1);
    if (event.code === 'ArrowLeft') this.setDirection(-1, 0);
    if (event.code === 'ArrowRight') this.setDirection(1, 0);

    if (event.code === 'KeyR') this.restartGame();
  }

  constructor(private snakeService: SergeiAngularSnakeService) { }

  ngOnInit(): void {
    this.snake = snake;
    this.move();
    this.addFood();
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

    this.isGameOverScreenOn = false;

    const len = this.snake.length;
    const newPoint = {
      x: this.snake[len - 1].x + this.xDirection,
      y: this.snake[len - 1].y + this.yDirection
    };

    if (this.isGameOver(newPoint)) return;
    
    // если съели еду
    if (newPoint.x === this.food.x && newPoint.y === this.food.y) {
      this.addFood();
      this.score++;
      this.snake.push(newPoint);
      return;
    }

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

  isGameOver(point: ICoordinates): boolean | undefined {
    if (
      point.x > this.width ||
      point.x < 0 ||
      point.y < 0 ||
      point.y > this.height
    ) {
      this.restartGame(true);
      return true;
    }

    if (this.snake.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y)) {
      this.restartGame(true);
      return true;
    }
  }

  restartGame(isGameOver?: boolean): void {
    if (isGameOver) {
      this.isGameOverScreenOn = true;
      this.isGameOn = false;
    };
    this.snake = snake;
    this.xDirection = 1;
    this.yDirection = 0;
    this.addFood();
  }

  addFood(): void {
    const rand = this.snakeService.random;
    this.food = {
      x: rand(this.width),
      y: rand(this.height)
    };
    if (this.snake.some(point => point.x === this.food.x && point.y === this.food.y)) {
      this.addFood();
    }
  }
}
