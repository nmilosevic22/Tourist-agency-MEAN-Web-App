import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { Cottage } from '../models/cottage';
import { LogoutuserComponent } from "../logoutuser/logoutuser.component";

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoutuserComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit {

  constructor(private service: OwnerService) { }

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser");
    if (u) {
      this.logged = u;
    }
    this.service.getInfo(this.logged).subscribe(data => {
      this.user = data;
      this.service.getMyCottages(this.user.username).subscribe(data => {
        this.myCot = data;
      })
    }) 
  }

  logged = ""
  user: User = new User();
  myCot : Cottage[] = []

  firstname = ""
  lastname = ""
  address = ""
  email = ""
  contact = ""
  card = ""
  image: File | null = null

  dinersValid : boolean | undefined = false;
  masterValid : boolean | undefined = false;
  visaValid : boolean | undefined = false;
  private dinersReg : RegExp | undefined = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/;
  private masterReg : RegExp | undefined = /^(51|52|53|54|55)\d{14}$/
  private visaReg : RegExp | undefined = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

  contactValid : Boolean | undefined;
  private phoneReg : RegExp | undefined = /^06\d{7,8}$/;

  toUpdate: { [key: string]: any } = {}

  edit = false;

  onFileSelected(event: Event) {
    const img = event.target as HTMLInputElement;
    if (img.files && img.files.length > 0) {
      this.image = img.files[0];
      console.log(this.image);
    }
  }

  checkCard(){
    if(this.card == '') {
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

  editBtn() {
    this.edit = !this.edit;
  }

  saveData() {
    if (!this.firstname && !this.lastname && !this.address && !this.email && !this.contact && !this.image && !this.card) {
      alert('Please insert field to update.')
      return;
    }

    if(!this.checkCard()){
      alert('Please insert valid credit card');
      return;
    }

    if(!this.checkPhone()) {
      alert('Please insert valid phone number');
      return;
    }

    const formData = new FormData();

    formData.append('username', this.logged);

    if (this.firstname) formData.append('firstname', this.firstname);
    if (this.lastname) formData.append('lastname', this.lastname);
    if (this.address) formData.append('address', this.address);
    if (this.email) formData.append('email', this.email);
    if (this.contact) formData.append('contact', this.contact);
    if (this.card) formData.append('card', this.card);
    if (this.image) formData.append('image', this.image);

    this.service.saveData(formData).subscribe(data => {
      if (data) {
        alert("Success");
        this.firstname = this.lastname = this.address = this.email = this.contact = this.card =  '';
        this.image = null;
        this.ngOnInit();
      } else {
        alert("Fail")
      }
    })
  }

}

