import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutuser',
  standalone: true,
  imports: [],
  templateUrl: './logoutuser.component.html',
  styleUrl: './logoutuser.component.css'
})
export class LogoutuserComponent {

  constructor(private router : Router) {}

  logout(){
    localStorage.removeItem("loggedUser");
    this.router.navigate(['/login'])
  }

}
