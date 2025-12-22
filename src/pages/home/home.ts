import { Component, computed, output, OutputEmitterRef, Signal, signal, WritableSignal } from '@angular/core';
import{ CategoryBar } from "shared/components/layout/category-bar/category-bar";
import { header } from "shared/components/layout/header/header";
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CategoryBar, FormsModule, CarouselModule],
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


  name:WritableSignal<string> = signal('hello from signal')
  name2:string="ali";

  nameWithPrefix:Signal<string>=computed(()=>{console.log("computed called"); return "Mr. "+this.name()})

  changeName(namee:string){
    this.name.update(name=>name+namee);
    this.name2="mohamedKahef"
  };



  changeName1(): void {
    setTimeout(() => {
      this.twowaybindingName="changed name after 1 second"
    }, 5000);
  }
  twowaybindingName:string="ahmed"

  createtodo:OutputEmitterRef<string> = output<string>();
  

}
