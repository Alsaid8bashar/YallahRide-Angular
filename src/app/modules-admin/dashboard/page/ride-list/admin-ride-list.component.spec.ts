import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRideListComponent } from './admin-ride-list.component';

describe('RideListComponent', () => {
  let component: AdminRideListComponent;
  let fixture: ComponentFixture<AdminRideListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRideListComponent]
    });
    fixture = TestBed.createComponent(AdminRideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
