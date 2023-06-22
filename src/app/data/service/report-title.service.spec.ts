import { TestBed } from '@angular/core/testing';

import { ReportTitleService } from './report-title.service';

describe('ReportTitleService', () => {
  let service: ReportTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
