import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesDetailsComponent } from './vehicles-details.component';

describe('VehiclesDetailsComponent', () => {
  let component: VehiclesDetailsComponent;
  let fixture: ComponentFixture<VehiclesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesDetailsComponent]
    });
    fixture = TestBed.createComponent(VehiclesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
