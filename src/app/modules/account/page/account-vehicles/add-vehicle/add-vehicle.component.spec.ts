import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleComponent } from './add-vehicle.component';

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVehicleComponent]
    });
    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
