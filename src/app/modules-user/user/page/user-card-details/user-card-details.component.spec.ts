import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardDetailsComponent } from './user-card-details.component';

describe('UserCardDetailsComponent', () => {
  let component: UserCardDetailsComponent;
  let fixture: ComponentFixture<UserCardDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardDetailsComponent]
    });
    fixture = TestBed.createComponent(UserCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
