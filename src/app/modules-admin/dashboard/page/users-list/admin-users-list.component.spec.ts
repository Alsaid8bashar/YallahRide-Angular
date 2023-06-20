import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersListComponent } from './admin-users-list.component';

describe('AdminUsersListComponent', () => {
  let component: AdminUsersListComponent;
  let fixture: ComponentFixture<AdminUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersListComponent]
    });
    fixture = TestBed.createComponent(AdminUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
