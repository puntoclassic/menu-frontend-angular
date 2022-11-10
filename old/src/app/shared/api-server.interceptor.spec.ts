import { TestBed } from '@angular/core/testing';

import { ApiServerInterceptor } from './api-server.interceptor';

describe('ApiServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiServerInterceptor = TestBed.inject(ApiServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
