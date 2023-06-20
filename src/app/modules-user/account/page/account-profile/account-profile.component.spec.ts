import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent', () => {
  let component: AccountProfileComponent;
  let fixture: ComponentFixture<AccountProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountProfileComponent]
    });
    fixture = TestBed.createComponent(AccountProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
