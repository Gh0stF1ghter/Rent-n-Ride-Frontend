import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatRippleModule, CommonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent implements OnInit {
  constructor(public auth: AuthService) {}

  username: string | undefined;
  email: string | undefined;
  pictureSrc: string | undefined;

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe((user) => {
        this.username = user?.name;
        this.email = user?.email;
        this.pictureSrc = user?.picture;
      });
    }
  }
}
