import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailsCardComponent } from './ride-details-card.component';

describe('RideDetailsCardComponent', () => {
  let component: RideDetailsCardComponent;
  let fixture: ComponentFixture<RideDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideDetailsCardComponent]
    });
    fixture = TestBed.createComponent(RideDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
