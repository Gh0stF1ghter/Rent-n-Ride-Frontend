import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-profile-field',
  standalone: true,
  imports: [CommonModule, MatRipple],
  templateUrl: './profile-field.component.html',
  styleUrl: './profile-field.component.css'
})
export class ProfileFieldComponent {
  isLogged = false
}
