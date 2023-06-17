import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLayoutComponent } from './vehicle-layout.component';

describe('VehicleLayoutComponent', () => {
  let component: VehicleLayoutComponent;
  let fixture: ComponentFixture<VehicleLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleLayoutComponent]
    });
    fixture = TestBed.createComponent(VehicleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
