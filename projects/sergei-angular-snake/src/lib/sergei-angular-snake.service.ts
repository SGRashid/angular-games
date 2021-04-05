import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SergeiAngularSnakeService {

  constructor() {
  }

  public random = (maxNum: number): number => Math.floor(Math.random() * maxNum + 1);
}
