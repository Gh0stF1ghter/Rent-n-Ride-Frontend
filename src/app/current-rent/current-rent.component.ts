import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-current-rent',
  standalone: true,
  imports: [MatRipple, RouterLink, CommonModule],
  templateUrl: './current-rent.component.html',
  styleUrl: './current-rent.component.scss',
})
export class CurrentRentComponent {
  isRenting = false;
}
