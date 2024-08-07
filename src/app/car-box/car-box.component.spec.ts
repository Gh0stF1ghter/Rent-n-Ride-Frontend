import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBoxComponent } from './car-box.component';

describe('CarBoxComponent', () => {
  let component: CarBoxComponent;
  let fixture: ComponentFixture<CarBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
