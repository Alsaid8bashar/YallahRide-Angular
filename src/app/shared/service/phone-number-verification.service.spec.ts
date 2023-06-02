import { TestBed } from '@angular/core/testing';

import { PhoneNumberVerificationService } from './phone-number-verification.service';

describe('PhoneNumberVerificationService', () => {
  let service: PhoneNumberVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumberVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
