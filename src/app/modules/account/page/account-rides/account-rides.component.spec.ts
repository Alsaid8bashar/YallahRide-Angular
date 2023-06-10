import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRidesComponent } from './account-rides.component';

describe('AccountRidesComponent', () => {
  let component: AccountRidesComponent;
  let fixture: ComponentFixture<AccountRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRidesComponent]
    });
    fixture = TestBed.createComponent(AccountRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
