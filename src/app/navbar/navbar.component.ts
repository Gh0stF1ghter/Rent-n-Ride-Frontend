import { Component } from '@angular/core';
import { CurrentRentComponent } from "../current-rent/current-rent.component";
import { NavListComponent } from "../nav-list/nav-list.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CurrentRentComponent, NavListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
