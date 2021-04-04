import { Component, Input, OnInit } from '@angular/core';

// вынеси типы в отдельный файл
type Cell = 'empty' | 'snake' | 'food' | 'enemy';
type Row = Cell[];
type Grid = Row[];

interface ICoordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {

  @Input() height: number;
  @Input() width: number;
  @Input() snake: ICoordinates[];
  @Input() food: ICoordinates[] | undefined;

  grid: Grid;

  constructor() { }

  ngOnInit(): void {
    if (!this.height) {
      this.height = this.width;
    }

    this.grid = this.getGrid(this.width, this.height);
    console.log(this.snake);
  }

  getGrid(width: number, heidht: number): Grid {
    const gridArr = [];
    for (let i = 1; i <= heidht; i++) {
      const row = this.getRow(width);
      gridArr.push(row);
    }

    return gridArr;
  }

  getRow(width: number): Row {
    const row = [];
    for (let i = 1; i <= width; i++) {
      row.push('empty');
    }
    return row;
  }

}
