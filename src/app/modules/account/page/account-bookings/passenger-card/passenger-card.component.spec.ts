import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCardComponent } from './passenger-card.component';

describe('PassengerCardComponent', () => {
  let component: PassengerCardComponent;
  let fixture: ComponentFixture<PassengerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerCardComponent]
    });
    fixture = TestBed.createComponent(PassengerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
