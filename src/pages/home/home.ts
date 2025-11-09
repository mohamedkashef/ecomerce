import { Component } from '@angular/core';
import{ CategoryBar } from "shared/components/layout/category-bar/category-bar";
import { header } from "shared/components/layout/header/header";
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-home',
  imports: [CategoryBar,CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
slides: { image: string }[] = [];

  ngOnInit(): void {
    this.slides = [
      { image: 'assets/images/offers/offer1.jpg' },
      { image: 'assets/images/offers/offer2.jpg' },
      { image: 'assets/images/offers/offer3.jpg' }
    ];
  }

}
