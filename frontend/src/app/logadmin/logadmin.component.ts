import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logadmin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './logadmin.component.html',
  styleUrl: './logadmin.component.css',
})
export class LogadminComponent {
  constructor(private service: AdminService, private router: Router) {}

  login() {
    if (this)
    this.passwordEnc(this.password);
    this.service.login(this.username, this.encPassword).subscribe((data) => {
      if (data && data.type == 'admin') {
        localStorage.setItem('loggedAdmin', data.username);
        this.message = ''
        this.router.navigate(['admin']);
      } else {
        this.message = 'Invalid admin credentials'
      }
    });
  }

  passwordEnc(p: String) {
    //Caesar alg

    let newPass = '';
    for (let i = 0; i < p.length; i++) {
      newPass += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
    }
    this.encPassword = newPass;
  }

  username = '';
  password = '';
  encPassword = '';
  message = '';
}
