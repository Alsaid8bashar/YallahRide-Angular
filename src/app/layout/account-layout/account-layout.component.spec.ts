import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLayoutComponent } from './account-layout.component';

describe('AccountLayoutComponent', () => {
  let component: AccountLayoutComponent;
  let fixture: ComponentFixture<AccountLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLayoutComponent]
    });
    fixture = TestBed.createComponent(AccountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
