import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [RouterLink, MatRippleModule, CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss'
})
export class NavButtonComponent {
  @Input() name = 'none';
  @Input() route = '/';
  @Input() iconSrc = '/';
}
