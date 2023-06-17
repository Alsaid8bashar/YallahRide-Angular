import { TestBed } from '@angular/core/testing';

import { CarJSONService } from './car-json.service';

describe('CarJSONService', () => {
  let service: CarJSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarJSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
