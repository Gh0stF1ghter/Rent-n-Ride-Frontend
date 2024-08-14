
import { Component, input, Input, model } from '@angular/core';
import { vehicleState } from '../api/models/apiModels/enums/vehicleState';
import { vehicleType } from '../api/models/apiModels/enums/vehicleType';
import { fuelType } from '../api/models/apiModels/enums/fuelType';
import vehicleModel from '../api/models/apiModels/vehicleModel';


@Component({
  selector: 'app-car-box',
  standalone: true,
  imports: [],
  templateUrl: './car-box.component.html',
  styleUrl: './car-box.component.scss',
})
export class CarBoxComponent {
  @Input() vehicle: vehicleModel = {
    id: '',
    plateNumber: 'null',
    isRented: false,
    odo: 0,
    rentCost: 0.0,
    vehicleState: vehicleState.none,
    vehicleType: vehicleType.none,
    fuelType: fuelType.none,
    carModel: {
      id: '',
      name: 'Mustang',
      manufacturer: {
        id: '',
        name: 'Ford',
        carModels: [],
      },
      vehicles: [],
    },
  };
}