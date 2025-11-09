import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from '../../shared/components/layout/header/header';
import { Footer } from '../../shared/components/layout/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,header,Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
