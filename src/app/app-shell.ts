import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ToastModule } from 'primeng/toast';
import { Auth } from 'core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css'
})
export class AppShell {
protected readonly environment = environment;

constructor(private auth: Auth, private router: Router) {
  if (this.router.url === '/') {
    if (this.auth.isAuthenticated()) {
      if (this.auth.hasRole('admin')) {
        this.router.navigateByUrl('/admin');
      } else if (this.auth.hasRole('staff')) {
        this.router.navigateByUrl('/staff');
      }
    }
  }
}
}
