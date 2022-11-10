import { TestBed } from '@angular/core/testing';

import { AnonymousRequiredGuard } from './anonymous-required.guard';

describe('AnonymousRequiredGuard', () => {
  let guard: AnonymousRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonymousRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
