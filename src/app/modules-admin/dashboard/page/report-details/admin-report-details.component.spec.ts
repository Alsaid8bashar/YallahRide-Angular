import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportDetailsComponent } from './admin-report-details.component';

describe('AdminReportDetailsComponent', () => {
  let component: AdminReportDetailsComponent;
  let fixture: ComponentFixture<AdminReportDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
