import { TestBed } from '@angular/core/testing';

import { QuizLeaveGuard } from './quiz-leave.guard';

describe('QuizLeaveGuard', () => {
  let guard: QuizLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuizLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
