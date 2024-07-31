import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { sort } from '../api/models/enums/sort';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-field',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sort-field.component.html',
  styleUrl: './sort-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortFieldComponent {
  @Output() sortMethodChanged = new EventEmitter<sort>()
  @Output() orderReversed = new EventEmitter<void>()

  sortControl = new FormControl(0);

  sortFields = {
    "cost": sort.cost,
    "name": sort.name,
    "odo": sort.odo
  }

  fieldToSortBy = sort.name

  changeSortField(field: sort | null) {
    if(field) {
      this.sortMethodChanged.emit(field)
    }
  }
}
