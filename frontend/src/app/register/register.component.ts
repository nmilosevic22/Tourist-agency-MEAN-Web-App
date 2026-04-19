import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private service : UserService, private router : Router) {}
  
    username = ""
    password = ""
    firstname = ""
    lastname = "" 
    gender = ""
    type = ""
    address = ""
    contact = ""
    email = ""
    card = ""
    encPassword = ""

    message = ""
    validImg = true;
    invalidForm : Boolean | undefined = false

    passwordValid : boolean | undefined;
    private passwordRegex : RegExp | undefined = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;
    

    dinersValid : Boolean | undefined = false;
    masterValid : Boolean | undefined = false;
    visaValid : Boolean | undefined = false;
    private dinersReg : RegExp | undefined = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/;
    private masterReg : RegExp | undefined = /^(51|52|53|54|55)\d{14}$/
    private visaReg : RegExp | undefined = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

    contactValid : Boolean | undefined;
    private phoneReg : RegExp | undefined = /^06\d{7,8}$/;


    profile : File | undefined; 

    checkPassword(){
      this.passwordValid = this.passwordRegex?.test(this.password);
    }

    passwordEnc(p : String){
      //Caesar alg

      let newPass = ""
      for(let i = 0; i < p.length; i++) {
        newPass += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
      }
      this.encPassword = newPass;
    }

    checkCard(){
      this.dinersValid = this.dinersReg?.test(this.card);
      this.masterValid = this.masterReg?.test(this.card);
      this.visaValid = this.visaReg?.test(this.card);
    }

    checkPhone(){
      this.contactValid = this.phoneReg?.test(this.contact)
    }

    onImage(event : any) {
      let file = event.target.files[0];
      
      if(file){
        this.validImg = false;
      }

      let img = new Image();
      let temp =  URL.createObjectURL(file);
      img.src = temp;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if(file && (width < 100 || height < 100)){
          this.profile = undefined;
        }
        if(file && (width > 300 || height > 3000)){
          this.profile = undefined;
        }
        else {
          this.profile = file;
          this.validImg = true;
        }
      }

    }

    sendData(){
      this.invalidForm = false;
      this.message = "";

      if(this.username == "" || this.password == "" || this.firstname == "" || this.lastname == "" ||
        this.gender == "" || this.type == "" || this.address == "" || this.contact == "" ||
          this.email == "" || this.card == "") {
          this.invalidForm = true;
          this.message = "Please enter all required fields."
          return;
        } else if (this.passwordValid == false) {
          this.invalidForm = true;
          this.message = "Bad password format."
          return;
        } else if (this.dinersValid == false && this.masterValid == false && this.visaValid == false ) {
          this.invalidForm = true;
          this.message = "Bad credit card format";
          return;
        } else if (!this.validImg){
          this.invalidForm = true;
          this.message = "Bad image format";
          return;
        }

        this.service.checkEmail(this.email).subscribe(data => {
          if(data) {
            this.invalidForm = true;
            this.message = "Email already exists."
            return;
          } else {
            this.service.checkUsername(this.username).subscribe(data => {
              if(data) {
                this.invalidForm = true;
                this.message = "Username already exists."
                return;
              }
              //Point of sending data
              else {
                  this.passwordEnc(this.password);
                  console.log(this.encPassword);
                  this.service.sendRegData(this.username, this.encPassword, this.firstname, this.lastname, this.gender,
                    this.type, this.address, this.contact, this.email, this.card, this.profile
                  ).subscribe(data => {
                    if(data){
                      alert('Successfully sent register request. Please wait for admin to approve it.')
                      this.router.navigate(['']);
                    }
                    else {
                      alert('Registration failed.')
                    }
                  })
              }
            })
          }
        })
    }

}

