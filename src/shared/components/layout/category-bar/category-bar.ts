import { Component } from '@angular/core';
import { faListUl,faCapsules,faFlask,faSpa,faHeartPulse,faPills,faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-category-bar',
  imports: [FontAwesomeModule],
  templateUrl: './category-bar.html',
  styleUrl: './category-bar.css'
})
export class CategoryBar {

    faListUl = faListUl;
  faCapsules = faCapsules;
  faFlask = faFlask;
  faSpa = faSpa;
  faHeartPulse = faHeartPulse;
  faPills = faPills;
  faGift = faGift;
  
}
