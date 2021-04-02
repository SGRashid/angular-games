import { TestBed } from '@angular/core/testing';

import { SergeiAngularSnakeService } from './sergei-angular-snake.service';

describe('SergeiAngularSnakeService', () => {
  let service: SergeiAngularSnakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SergeiAngularSnakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
