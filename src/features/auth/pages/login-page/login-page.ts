import { Component } from '@angular/core';
import { Loginform } from "features/auth/components/login-form/loginform/loginform";

@Component({
  selector: 'app-login-page',
  imports: [Loginform],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

}
