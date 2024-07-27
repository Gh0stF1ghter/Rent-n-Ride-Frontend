import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [RouterLink, MatRippleModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css'
})
export class NavButtonComponent {
  @Input() name = 'none';
  @Input() route = '/';
  @Input() iconSrc = '/';
}
