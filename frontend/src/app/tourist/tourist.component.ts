import { Component, OnInit } from '@angular/core';
import { TouristService } from '../services/tourist.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutuserComponent } from "../logoutuser/logoutuser.component";

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LogoutuserComponent],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.css',
})
export class TouristComponent implements OnInit {
  constructor(private service: TouristService) {}

  logged: string | null = '';
  info: User = new User();

  edit = false;

  msg = '';

  //info for editing
  firstname: string | null = '';
  lastname: string | null = '';
  address: string | null = '';
  email: string | null = '';
  contact: string = '';
  card: string = '';
  image: File | null = null;

  dinersValid : boolean | undefined = false;
  masterValid : boolean | undefined = false;
  visaValid : boolean | undefined = false;
  private dinersReg : RegExp | undefined = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/;
  private masterReg : RegExp | undefined = /^(51|52|53|54|55)\d{14}$/
  private visaReg : RegExp | undefined = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

  contactValid : Boolean | undefined;
  private phoneReg : RegExp | undefined = /^06\d{7,8}$/;

  toUpdate: { [key: string]: any } = {};

  ngOnInit(): void {
    this.logged = localStorage.getItem('loggedUser');
    console.log(this.logged);
    this.service.getInfo(this.logged).subscribe((data) => {
      if (data) {
        this.info = data;
      }
    });
  }

  editBttn() {
    this.edit = !this.edit;
  }

  onFileSelected(event: any) {
    let file = event.target.files[0];

    let img = new Image();
    let temp = URL.createObjectURL(file);
    img.src = temp;

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width < 100 || height < 100) {
        alert('Image too small');
        event.target.value = '';
        this.image = null;
        return;
      } 
      else if (width > 300 || height > 300) {
        alert('Image too large');
        event.target.value = '';
        this.image = null;
        return;
      } 
      else {
        this.image = file;
      }
    };
  }

  checkCard(){
    if(this.card == ""){
      return true;
    }

    this.dinersValid = this.dinersReg?.test(this.card);
    this.masterValid = this.masterReg?.test(this.card);
    this.visaValid = this.visaReg?.test(this.card);

    if(this.dinersValid == true || this.masterValid == true || this.visaValid == true) {
      return true;
    } 
    else {
      this.card = '';
      return false;
    }
  }

  checkPhone(){
    if(this.contact == ''){
      return true;
    }

    this.contactValid = this.phoneReg?.test(this.contact)

    if(this.contactValid == true && this.contact != '') {
      return true;
    } else {
      this.contact = ''
      return false;
    }
  }

  saveData() {
    if (
      !this.firstname &&
      !this.lastname &&
      !this.address &&
      !this.email &&
      !this.contact &&
      !this.card &&
      !this.image
    ) {
      alert('Please insert field to update.');
      return;
    }

    if(!this.checkCard()) {
      alert ('Please insert correct form of credit card');
      return;
    }

    if(!this.checkPhone()) {
      alert ('Please insert valid phone number');
      return;
    }

    const formData = new FormData();

    formData.append('username', this.logged ?? '');

    if (this.firstname) formData.append('firstname', this.firstname);
    if (this.lastname) formData.append('lastname', this.lastname);
    if (this.address) formData.append('address', this.address);
    if (this.email) formData.append('email', this.email);
    if (this.contact) formData.append('contact', this.contact);
    if (this.card) formData.append('card', this.card);
    if (this.image) formData.append('image', this.image);

    this.service.saveFormData(formData).subscribe((res) => {
      if (res == true) {
        alert('Success');
        this.firstname =
          this.lastname =
          this.address =
          this.email =
          this.contact =
          this.card =
            '';
        this.image = null;
        this.edit = false;
        this.ngOnInit();
      } else {
        alert('Update failed. Please use unique email or username');
      }
    });
  }
}
