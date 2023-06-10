import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCardComponent } from './ride-card.component';

describe('RideCardComponent', () => {
  let component: RideCardComponent;
  let fixture: ComponentFixture<RideCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RideCardComponent]
    });
    fixture = TestBed.createComponent(RideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
