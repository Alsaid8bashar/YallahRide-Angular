import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContentLayout } from './admin-content-layout.component';

describe('AdminContentTypeComponent', () => {
  let component: AdminContentLayout;
  let fixture: ComponentFixture<AdminContentLayout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminContentLayout]
    });
    fixture = TestBed.createComponent(AdminContentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
