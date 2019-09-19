import { TestBed } from '@angular/core/testing';

import { LoginCredentialsService } from './login-credentials.service';

describe('LoginCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCredentialsService = TestBed.get(LoginCredentialsService);
    expect(service).toBeTruthy();
  });
});
