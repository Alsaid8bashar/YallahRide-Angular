import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTravelPreferencesComponent } from './account-travel-preferences.component';

describe('AccountTravelPreferencesComponent', () => {
  let component: AccountTravelPreferencesComponent;
  let fixture: ComponentFixture<AccountTravelPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTravelPreferencesComponent]
    });
    fixture = TestBed.createComponent(AccountTravelPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
