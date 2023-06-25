import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterCardComponent } from './rater-card.component';

describe('RaterCardComponent', () => {
  let component: RaterCardComponent;
  let fixture: ComponentFixture<RaterCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaterCardComponent]
    });
    fixture = TestBed.createComponent(RaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
