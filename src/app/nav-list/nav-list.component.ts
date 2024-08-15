import { Component, NgModule } from '@angular/core';
import { NavButtonComponent } from "../nav-button/nav-button.component";
import { CommonModule } from '@angular/common';
import { ProfileFieldComponent } from "../profile-field/profile-field.component";
import { LoginButtonComponent } from "../login-button/login-button.component";

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [NavButtonComponent, CommonModule, ProfileFieldComponent, LoginButtonComponent],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  isLogged = false;
}
