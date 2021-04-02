import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-snake',
  template: `
    <lib-grid [width]="3"></lib-grid>
  `,
  styles: [
  ]
})
export class SergeiAngularSnakeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
