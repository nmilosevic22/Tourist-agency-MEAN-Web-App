import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  constructor(private service : UserService, private router : Router) {}


  username = "";
  oldPass = "";
  newPass = "";
  repeatPass = "";

  encOldPass = ""
  encNewPass = ""

  message = ""

  private passwordRegex : RegExp | undefined = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;
  newPasswordValid : boolean | undefined;
  repeatPasswordValid : boolean | undefined;

  checkNewPassword(){
      this.newPasswordValid = this.passwordRegex?.test(this.newPass);
  }

  checkRepeatPassword(){
      this.repeatPasswordValid = this.passwordRegex?.test(this.repeatPass);
  }

  passwordOldEnc(p : String){
      //Caesar alg

      let newP = ""
      for(let i = 0; i < p.length; i++) {
        newP += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
      }
      this.encOldPass = newP;
    }

    passwordNewEnc(p : String){
      //Caesar alg

      let newP = ""
      for(let i = 0; i < p.length; i++) {
        newP += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
      }
      this.encNewPass = newP;
    }

  changePass(){
    if(this.username == "" || this.oldPass == "" || this.newPass == "" || this.repeatPass == "") {
      this.message = "Please insert all the fields below."
    } 
    
    else {
      if(this.newPass != this.repeatPass) {
        this.message = "Please repeat new password correctly";
      } 
      else {
          if(this.oldPass == this.newPass) {
            this.message = "Your new password should not be same as old one."
          } 
          else {
              this.passwordOldEnc(this.oldPass);
              this.service.checkOldPass(this.username, this.encOldPass).subscribe(data => {
                if(data == false) {
                  this.message = "Please insert your old password correctly."
                } 
                else {
                  this.message = "";
                  this.passwordNewEnc(this.newPass);
                  this.service.changePass(this.username, this.encNewPass).subscribe(data => {
                      if(data == false) {
                        this.message = "Failed to update password";
                      } else {
                        alert("Password changed successfully")
                        this.router.navigate(['']);
                      }
                  })
                }


          })}
      }
    }

  }

}
