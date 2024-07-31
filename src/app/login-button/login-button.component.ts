import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss'
})
export class LoginButtonComponent {
  /**
   *
   */
  constructor(public auth:AuthService) {}
}
