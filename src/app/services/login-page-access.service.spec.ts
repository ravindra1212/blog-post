import { TestBed } from '@angular/core/testing';

import { LoginPageAccessService } from './login-page-access.service';

describe('LoginPageAccessService', () => {
  let service: LoginPageAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPageAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
