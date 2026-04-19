import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutadmin',
  standalone: true,
  imports: [],
  templateUrl: './logoutadmin.component.html',
  styleUrl: './logoutadmin.component.css'
})
export class LogoutadminComponent {

  constructor(private router : Router) {}

  logout(){
    localStorage.removeItem("loggedAdmin");
    this.router.navigate(['/logadmin'])
  }

}
