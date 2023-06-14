import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailsComponent } from './ride-details.component';

describe('RideDetailsComponent', () => {
  let component: RideDetailsComponent;
  let fixture: ComponentFixture<RideDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideDetailsComponent]
    });
    fixture = TestBed.createComponent(RideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
