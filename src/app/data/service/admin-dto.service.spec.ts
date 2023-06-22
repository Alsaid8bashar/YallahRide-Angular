import { TestBed } from '@angular/core/testing';

import { AdminDtoService } from './admin-dto.service';

describe('AdminDtoService', () => {
  let service: AdminDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
