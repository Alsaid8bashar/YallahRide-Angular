import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatesCardComponent } from './user-rates-card.component';

describe('UserRatesCardComponent', () => {
  let component: UserRatesCardComponent;
  let fixture: ComponentFixture<UserRatesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRatesCardComponent]
    });
    fixture = TestBed.createComponent(UserRatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
