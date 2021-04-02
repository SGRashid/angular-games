import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SergeiAngularSnakeComponent } from './sergei-angular-snake.component';

describe('SergeiAngularSnakeComponent', () => {
  let component: SergeiAngularSnakeComponent;
  let fixture: ComponentFixture<SergeiAngularSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SergeiAngularSnakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SergeiAngularSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
