import { Component } from '@angular/core';
  import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Import specific icons you need

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  faUser = faCoffee; // Example icon usage

}
