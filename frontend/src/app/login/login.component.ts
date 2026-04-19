import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private service : UserService, private router : Router) {}

  username = ""
  password = ""
  message = ""

  encPassword = ""

  passwordEnc(p : String){
      //Caesar alg

      let newPass = ""
      for(let i = 0; i < p.length; i++) {
        newPass += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
      }
      this.encPassword = newPass;
    }

  login(){
    this.passwordEnc(this.password);
    this.service.login(this.username, this.encPassword).subscribe(data=>{
      if(data){
        localStorage.setItem("loggedUser", data.username)

        if(data.type == "owner") {
          this.router.navigate(['owner'])
        } 
        else if (data.type == "tourist"){
          this.router.navigate(['tourist'])
        } 
        else if (data.type == "admin"){
          this.router.navigate(['admin'])
        } 
        else {
          this.message = "Error";
        }
      }
      else {
        this.message = "Invalid login."
        this.username = ""
        this.password = ""
        this.encPassword = ""
      }

    })
  }
}

