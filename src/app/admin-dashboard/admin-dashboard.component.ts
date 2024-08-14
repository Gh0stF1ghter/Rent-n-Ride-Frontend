import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import clientModel from '../api/models/apiModels/clientModel';
import { DashboardService } from '../api/services/dashboard/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import {
  clientModelKeys,
  vehicleClientHistoryModelKeys,
  vehicleModelKeys,
} from '../api/constants/apiModelKeys';
import pagination from '../api/models/pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import vehicleModel from '../api/models/apiModels/vehicleModel';
import vehicleClientHistoryModel from '../api/models/apiModels/vehicleClientHistoryModel';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogVehicleComponent } from '../dialog-vehicle/dialog-vehicle.component';
import createVehicleModel from '../api/models/apiModels/apiCreateModels/createVehicleModel';
import { DialogRentComponent } from '../dialog-rent/dialog-rent.component';
import rentDialogData from '../api/models/rentDialogData';
import createVehicleClientHistoryModel from '../api/models/createModels/createVehicleClientHistoryModel';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import createUserApiModel from '../api/models/apiModels/apiCreateModels/createUserApiModel';
import updateUserApiModel from '../api/models/apiModels/apiUpdateModels/updateUserApiModel';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  users: clientModel[] = [];
  clientModelKeys = clientModelKeys;
  clientTableColumns = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'balance',
    'isRenting',
    'operationButtons',
  ];

  vehicles: vehicleModel[] = [];
  vehicleModelKeys = vehicleModelKeys;
  vehicleTableColumns = [
    'plateNumber',
    'odo',
    'rentCost',
    'isRented',
    'vehicleType',
    'vehicleState',
    'fuelType',
    'carModel',
    'operationButtons',
  ];

  vehicleClientHistories: vehicleClientHistoryModel[] = [];
  vehicleClientHistoryModelKeys = vehicleClientHistoryModelKeys;
  vehicleClientHistoryTableColumns = [
    'startDate',
    'endDate',
    'vehicleId',
    'clientId',
    'operationButtons',
  ];

  pagination: pagination = {
    currentPage: 1,
    pageSize: 1000,
  };

  constructor(private service: DashboardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
    this.getVehicles();
    this.getVehicleClientHistories();
  }

  getUsers() {
    this.service.getClients(this.pagination).subscribe((response) => {
      if (response.body) {
        this.users = response.body;
        console.log(this.users);
      }
    });
  }

  getVehicles() {
    this.service.getAllVehicles(this.pagination).subscribe((response) => {
      if (response.body) {
        this.vehicles = response.body;
        console.log(this.vehicles);
      }
    });
  }

  getVehicleClientHistories() {
    this.service
      .getAllVehicleClientHistories(this.pagination)
      .subscribe((response) => {
        if (response.body) {
          this.vehicleClientHistories = response.body;
          console.log(this.vehicleClientHistories);
        }
      });
  }

  deleteVehicle(id: string) {
    this.service.deleteVehicle(id).subscribe(_ => this.ngOnInit());
  }

  deleteRent(id: string) {
    this.service
      .deleteVehicleClientHistory(id)
      .subscribe(() => this.ngOnInit());
  }

  openCreateVehicleDialog(vehicleToEdit?: vehicleModel) {
    const dialogRef = this.dialog.open(DialogVehicleComponent, {
      data: vehicleToEdit,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      var newVehicle: createVehicleModel = result;

      if (newVehicle) {
        if (vehicleToEdit) {
          this.service.updateVehicle(vehicleToEdit.id, newVehicle).subscribe(() => this.ngOnInit());
        } else {
          this.service.addVehicle(newVehicle).subscribe(() => this.ngOnInit());
        }
      }
    });
  }

  openCreateRentDialog(vehicleClientHistoryToEdit?: vehicleClientHistoryModel) {
    let rentDialogData: rentDialogData = {
      clients: this.users,
      vehicles: this.vehicles,
      vehicleClientHistoryToEdit: vehicleClientHistoryToEdit
    }

    const dialogRef = this.dialog.open(DialogRentComponent, {
      data: rentDialogData,
    });

    dialogRef.beforeClosed().subscribe((result) => {
      let newVehicleClientHistory: createVehicleClientHistoryModel = result;

      console.log('in dashboard');
        
      console.log(newVehicleClientHistory);

      if (newVehicleClientHistory) {
        if (vehicleClientHistoryToEdit) {
          this.service.updateVehicleClientHistory(
            vehicleClientHistoryToEdit.id,
            newVehicleClientHistory
          ).subscribe(() => this.ngOnInit());
        } else {
          this.service
            .addVehicleClientHistory(newVehicleClientHistory)
            .subscribe(() => this.ngOnInit());
        }
      }
    });
  }

  openCreateUserDialog(userToEdit?: clientModel) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: userToEdit
    })

    dialogRef.beforeClosed().subscribe((result) => {

      if(result) {
        if(userToEdit) {
          var updateUser: updateUserApiModel = result
          console.log(userToEdit);
          
          console.log('update user');
          console.log(updateUser);
          
          this.service.updateUser(userToEdit.id, updateUser).subscribe(() => this.ngOnInit())
        } else {
          var newUser: createUserApiModel = result

          console.log('add user');
          console.log(newUser
          );
          
          
          this.service.addUser(newUser).subscribe(()=> this.ngOnInit())
        }
      }
    });
  }

  deleteUser(id: string) {
    console.log('delete ' + id);
    
    this.service.deleteUser(id).subscribe(()=> this.ngOnInit())
  }
}
