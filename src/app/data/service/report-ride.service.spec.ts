import { TestBed } from '@angular/core/testing';

import { ReportRideService } from './report-ride.service';

describe('ReportRideService', () => {
  let service: ReportRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
