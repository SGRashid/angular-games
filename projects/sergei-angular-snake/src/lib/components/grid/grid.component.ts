import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ICoordinates, Cell, Row, Grid } from '../../sergei-angular-snake.component';

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() height: number;
  @Input() width: number;
  @Input() snake: ICoordinates[];
  @Input() food: ICoordinates | undefined;

  grid: Grid;

  constructor() { }

  ngOnInit(): void {
    if (!this.height) {
      this.height = this.width;
    }

    this.grid = this.getGrid(this.width, this.height);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.grid = this.getGrid(this.width, this.height);
  }

  getGrid(width: number, heidht: number): Grid {
    const gridArr = [];
    for (let i = 1; i <= heidht; i++) {
      const row = this.getRow(width, i);
      gridArr.push(row);
    }

    return gridArr;
  }

  getRow(width: number, rowNumber: number): Row {
    const row = [];
    for (let i = 1; i <= width; i++) {
      let result = 'empty';

      this.snake.forEach(point => {
        if (point.x === i && point.y === rowNumber) {
          result = 'full';
        }
      });

      if (this.food.x === i && this.food.y === rowNumber) {
        result = 'food';
      }

      row.push(result);
    }
    return row;
  }

  getCellClass = (cell: string): string => `grid__cell_${cell}`;

}
