import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOneComponent } from './sign-up-one.component';

describe('SignUpOneComponent', () => {
  let component: SignUpOneComponent;
  let fixture: ComponentFixture<SignUpOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpOneComponent]
    });
    fixture = TestBed.createComponent(SignUpOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
