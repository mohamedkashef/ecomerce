import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from 'core/models/RegisterRequest';
import { Api } from 'core/services/api';
import { Auth } from 'core/services/auth';
import { Config } from 'core/services/config';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {



  private apiservice = inject(Api);
  private config = inject(Config);
  private messageService = inject(MessageService);
  private authService = inject(Auth);



  userRegistrForm: FormGroup;
  private endpoint = this.config.apiConfig;

  constructor() {
    this.userRegistrForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^(?!\\s*$)[a-zA-Z ]+$')]),
      email: new FormControl(''),
      password: new FormControl(''),
      rePassword: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  get name() {
    return this.userRegistrForm.get('name');
  }

  get email() {
    return this.userRegistrForm.get('email');
  }

  get password() {
    return this.userRegistrForm.get('password');
  }

  get rePassword() {
    return this.userRegistrForm.get('rePassword');
  }

  get phone() {
    return this.userRegistrForm.get('phone');
  }

  submitRegister() {
    console.log(this.userRegistrForm.value);
    this.authService.registration(this.userRegistrForm.value as RegisterRequest).subscribe({
      next:(response)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration done successfully!'
        });
        console.log('Registration successful:', response);
      },
      error:(error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
      }
    });

    // this.apiservice.post(this.endpoint.auth.register, this.userRegistrForm.value , { skipLogging: false }).subscribe({
    //   next: (response) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'Registration done successfully!'
    //     });
    //     console.log('Registration successful:', response);
    //   },
    //   error: (error) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: error.message
    //     });
    //   }
    // });
  }


}
