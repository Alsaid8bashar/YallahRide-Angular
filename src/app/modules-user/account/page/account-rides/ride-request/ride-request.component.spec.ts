import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideRequestComponent } from './ride-request.component';

describe('RideRequestComponent', () => {
  let component: RideRequestComponent;
  let fixture: ComponentFixture<RideRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideRequestComponent]
    });
    fixture = TestBed.createComponent(RideRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
