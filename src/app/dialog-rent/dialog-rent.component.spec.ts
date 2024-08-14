import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRentComponent } from './dialog-rent.component';

describe('DialogRentComponent', () => {
  let component: DialogRentComponent;
  let fixture: ComponentFixture<DialogRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
