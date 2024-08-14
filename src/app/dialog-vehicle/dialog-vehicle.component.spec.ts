import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVehicleComponent } from './dialog-vehicle.component';

describe('DialogVehicleComponent', () => {
  let component: DialogVehicleComponent;
  let fixture: ComponentFixture<DialogVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
