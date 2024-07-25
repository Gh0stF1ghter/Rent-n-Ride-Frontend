import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sort-field',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule, MatButtonModule],
  templateUrl: './sort-field.component.html',
  styleUrl: './sort-field.component.scss'
})
export class SortFieldComponent {
}
