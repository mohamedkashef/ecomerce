import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faSearch, faLocationDot, faCartShopping, faUser, faLocationCrosshairs, faChevronDown, faMapPin, faBars } from '@fortawesome/free-solid-svg-icons';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Location } from 'core/services/location';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-header',
  imports: [CommonModule, FontAwesomeModule, PopoverModule, ButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class header {

  faLocationDot = faLocationDot;
  faSearch = faSearch;
  faCartShopping = faCartShopping;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faLocationCrosshairs = faLocationCrosshairs;
  faChevronDown = faChevronDown;
  faMapPin = faMapPin;
  faBars = faBars;


  showPopup: boolean = false;
  enterPINCode: boolean = false;
  locationPinCode: string = '';

  constructor(private locationService: Location) { }
  ngOnInit() {
    this.locationService.getCurrentLocation().subscribe({
      next: (position) => {
        console.log('Current Position:', position);
      },
      error: (error) => {
        console.error('Error getting location:', error);
      }
    });
  


  }



  

  togglePopup() {

  }

  menuOpen = false;



}
