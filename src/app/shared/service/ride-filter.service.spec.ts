import { TestBed } from '@angular/core/testing';

import { RideFilterService } from './ride-filter.service';

describe('RideFilterService', () => {
  let service: RideFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
