import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
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
    <div style="color: white;" *ngIf="_isGameOverScreenOn">GAME OVER</div>
    <div style="color: white;" *ngIf="_isGameOverScreenOn">press SPACE for start</div>
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
  isGameOn = true;
  _isGameOverScreenOn = false;

  private _delay: number;
  private _startDelay = 500;
  private _minDelay = 100;
  private _delay_step = 50;

  private _xDirection = 1;
  private _yDirection = 0;

  private _tic$ = new Subject<number>();
  private _subscription = new Subscription();

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') this._pauseOrStartGame();

    if (event.code === 'ArrowUp') this._setDirection(0, -1);
    if (event.code === 'ArrowDown') this._setDirection(0, 1);
    if (event.code === 'ArrowLeft') this._setDirection(-1, 0);
    if (event.code === 'ArrowRight') this._setDirection(1, 0);

    if (event.code === 'KeyR') this._restartGame();
  }

  constructor(private _snakeService: SergeiAngularSnakeService) { }

  ngOnInit(): void {
    this.snake = snake;
    this._delay = this._startDelay;
    this._move();
    this._addFood();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _move(): void {
    const sub = this._tic$.pipe(
      switchMap(e => of(e).pipe(delay(e)))
    )
    .subscribe(this._step);

    this._subscription.add(sub);
    this._tic$.next(this._delay);
  }

  private _step = (): void => {

    if (!this.isGameOn) {
      return;
    }

    this._isGameOverScreenOn = false;

    const len = this.snake.length;
    const newPoint = {
      x: this.snake[len - 1].x + this._xDirection,
      y: this.snake[len - 1].y + this._yDirection
    };

    if (this._isGameOver(newPoint)) return;

    // если съели еду
    if (newPoint.x === this.food.x && newPoint.y === this.food.y) {
      this._addFood();
      this.score++;
      this._delay = this._delay > this._minDelay ? this._delay - this._delay_step : this._delay;
      this.snake.push(newPoint);
      this._tic$.next(this._delay);
      return;
    }

    this.snake = [...this.snake.slice(1, len), newPoint];
    this._tic$.next(this._delay);
  }

  private _pauseOrStartGame(): void {
    this.isGameOn = !this.isGameOn;
    if (this.isGameOn) {
      this._tic$.next(0);
    }
  }

  private _setDirection(x: Direction, y: Direction): void {
    // запрещаем движение задом наперед
    if (this._xDirection === - x) return;
    if (this._yDirection === - y) return;

    this._xDirection = x;
    this._yDirection = y;
  }

  private _isGameOver(point: ICoordinates): boolean | undefined {
    if (
      point.x > this.width ||
      point.x < 0 ||
      point.y < 0 ||
      point.y > this.height
    ) {
      this._restartGame(true);
      return true;
    }

    if (this.snake.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y)) {
      this._restartGame(true);
      return true;
    }
  }

  private _restartGame(isGameOver?: boolean): void {
    if (isGameOver) {
      this._isGameOverScreenOn = true;
      this.isGameOn = false;
    };
    this.snake = snake;
    this._delay = this._startDelay;
    this._xDirection = 1;
    this._yDirection = 0;
    this._addFood();
  }

  private _addFood(): void {
    const rand = this._snakeService.random;
    this.food = {
      x: rand(this.width),
      y: rand(this.height)
    };
    if (this.snake.some(point => point.x === this.food.x && point.y === this.food.y)) {
      this._addFood();
    }
  }
}
