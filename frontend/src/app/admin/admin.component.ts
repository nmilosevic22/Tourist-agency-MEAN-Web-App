import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutadminComponent } from "../logoutadmin/logoutadmin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoutadminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    let u = localStorage.getItem('loggedAdmin');
    if (u) {
      this.logged = u;
      this.service.getInfo(this.logged).subscribe((data) => {
        this.user = data;
      });
    }
    this.service.getAllOwners().subscribe((data) => {
      this.allOwners = data;
    });
    this.service.getAllTourists().subscribe((d) => {
      this.allTourists = d;
    });
    this.service.rqst().subscribe((dt) => {
      this.allRqst = dt;
    });
  }

  add() {
    this.newUserForm = true;
  }

  passwordEnc(p: String) {
    //Caesar alg

    let newPass = '';
    for (let i = 0; i < p.length; i++) {
      newPass += String.fromCharCode((p.charCodeAt(i) + 3) % 127);
    }
    this.newEncPass = newPass;
  }

  checkPassword(){
      this.newPassValid = this.passwordRegex?.test(this.newPassword);
  }

  create() {
    //check if all credentials are input
    if (
      !this.newUsername ||
      !this.newPassword ||
      !this.newFirstname ||
      !this.newLastname ||
      !this.newGender ||
      !this.newType ||
      !this.newAddress ||
      !this.newContact ||
      !this.newEmail ||
      !this.newCard
    ) {
      this.message = 'Please insert all the fields.';
      return;
    }

    let inOwner = this.allOwners.some((o) => o.username == this.newUsername);
    let inTourists = this.allTourists.some(
      (t) => t.username == this.newUsername
    );
    if ((inOwner || inTourists) && this.newUsername) {
      this.message = 'Username already in use.';
      return;
    }

    let inOwnerE = this.allOwners.some((o) => o.email == this.newEmail);
    let inTouristsE = this.allTourists.some(
      (t) => t.email == this.newEmail
    );
    if ((inOwnerE || inTouristsE) && this.newEmail) {
      this.message = 'Email already in use.';
      return;
    }

    if(this.newCard){
      if(!this.checkCard(this.newCard)){
        alert('Bad credit card format');
        return;
      }
    }

    this.passwordEnc(this.newPassword);
    this.service
      .create(
        this.newUsername,
        this.newEncPass,
        this.newFirstname,
        this.newLastname,
        this.newGender,
        this.newType,
        this.newAddress,
        this.newContact,
        this.newEmail,
        this.newCard,
        this.newImage
      )
      .subscribe((data) => {
        if (data) {
          alert('Successfully created new user');
          this.newUserForm = false;
          this.newUsername = this.newPassword = this.newEncPass = this.newFirstname = this.newLastname = 
            this.newGender = this.newType = this.newAddress = this.newContact = this.newEmail = this.newCard = ''
          this.newImage = undefined;
          return;
        }
      });
  }

  approve(
    u: string,
    p: string,
    f: string,
    l: string,
    g: string,
    t: string,
    a: string,
    co: string,
    e: string,
    c: string,
    i: string
  ) {
    console.log('Approve clicked', u, p, f, l, g, t, a, co, e, c, i);

    this.service.approve(u, p, f, l, g, t, a, co, e, c, i).subscribe((data) => {
      if (data) {
        this.service.removeRqst(u).subscribe((d) => {
          if (d) {
            alert("Successfully approved user's request");
            this.ngOnInit();
          }
        });
      }
    });
  }

  deny(
    u: string,
    p: string,
    f: string,
    l: string,
    g: string,
    t: string,
    a: string,
    co: string,
    e: string,
    c: string,
    i: string
  ) {
    this.service.deny(u, p, f, l, g, t, a, co, e, c, i).subscribe((data) => {
      if (data) {
        this.service.removeRqst(u).subscribe((d) => {
          if (d) {
            alert("Successfully denied user's request");
            this.ngOnInit();
          }
        });
      }
    });
  }

  selectedFile(event: any) {
    let file: File = event.target.files[0];
    if (file) {
      this.newImage = file;
    }
  }

  imageToEdit(event: any) {
    let file: File = event.target.files[0];
    if (file) {
      this.editImage = file;
    }
  }

  delete(u: string) {
    this.service.delete(u).subscribe((data) => {
      if (data) {
        alert('Successfully deleted this user.');
        this.ngOnInit();
      }
    });
  }

  deactivate(u: string) {
    this.service.deactivate(u).subscribe((data) => {
      if (data) {
        alert('Deactivated user');
        this.ngOnInit();
      }
    });
  }

  edit(u: string) {
    this.toEdit = u;
  }

  check() {
    this.toReq = true;
  }

  back(){
    this.toEdit = '';
    this.toReq = false;
    this.newUserForm = false;
  }

  editUser() {
    //username check
    let inOwner = this.allOwners.some((o) => o.username == this.editUsername);
    let inTourists = this.allTourists.some(
      (t) => t.username == this.editUsername
    );
    if ((inOwner || inTourists) && this.editUsername) {
      this.message = 'Username already in use.';
      return;
    }

    //email check
    let inOwnerE = this.allOwners.some((o) => o.email == this.editEmail);
    let inTouristsE = this.allTourists.some(
      (t) => t.email == this.editEmail
    );
    if ((inOwnerE || inTouristsE) && this.editEmail) {
      this.message = 'Email already in use.';
      return;
    }

    //card check
    if(this.editCard){
      if(!this.checkCard(this.editCard)) {
        alert('Bad credit card format');
        return;
      }
    }
    
    //password enc
    if (this.editPassword) {
      this.passwordEnc(this.editPassword);
      this.editEncPass = this.newEncPass;
    }

    //point of sending data
    this.service
      .edit(
        this.toEdit,
        this.editUsername,
        this.editEncPass,
        this.editFirstname,
        this.editLastname,
        this.editGender,
        this.editType,
        this.editAddress,
        this.editContact,
        this.editEmail,
        this.editCard,
        this.editImage
      )
      .subscribe((data) => {
        if (data) {
          alert('Successfully edited user');
          this.editUsername = '';
          this.editPassword = '';
          this.editEncPass = '';
          this.editFirstname = '';
          this.editLastname = '';
          this.editGender = '';
          this.editType = '';
          this.editAddress = '';
          this.editContact = '';
          this.editEmail = '';
          this.editImage = undefined;
          this.editCard = '';
          this.toEdit = '';
          this.ngOnInit();
        }
      });
  }

  checkCard(card : string){
    this.dinersValid = this.dinersReg?.test(card);
    this.masterValid = this.masterReg?.test(card);
    this.visaValid = this.visaReg?.test(card);

    if(this.dinersValid == true || this.masterValid == true || this.visaValid == true) {
      return true;
    } 
    else {
      this.newCard = '';
      return false;
    }
  }

  logged = '';
  user: User = new User();

  allTourists: User[] = [];
  allOwners: User[] = [];
  allRqst: User[] = [];

  //new User information
  newUserForm = false;
  newUsername = '';
  newPassword = '';
  newPassValid : boolean | undefined;
  newEncPass = '';
  newFirstname = '';
  newLastname = '';
  newGender = '';
  newType = '';
  newAddress = '';
  newContact = '';
  newEmail = '';
  newImage: File | undefined;
  newCard = '';
  message = '';

  private passwordRegex : RegExp | undefined = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/;

  dinersValid : Boolean | undefined = false;
  masterValid : Boolean | undefined = false;
  visaValid : Boolean | undefined = false;
  private dinersReg : RegExp | undefined = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/;
  private masterReg : RegExp | undefined = /^(51|52|53|54|55)\d{14}$/
  private visaReg : RegExp | undefined = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

  toEdit = '';
  editUsername = '';
  editPassword = '';
  editEncPass = '';
  editFirstname = '';
  editLastname = '';
  editGender = '';
  editType = '';
  editAddress = '';
  editContact = '';
  editEmail = '';
  editImage: File | undefined;
  editCard = '';

  toReq = false;
}
