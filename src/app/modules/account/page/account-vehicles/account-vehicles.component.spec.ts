import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVehiclesComponent } from './account-vehicles.component';

describe('AccountVehiclesComponent', () => {
  let component: AccountVehiclesComponent;
  let fixture: ComponentFixture<AccountVehiclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountVehiclesComponent]
    });
    fixture = TestBed.createComponent(AccountVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
