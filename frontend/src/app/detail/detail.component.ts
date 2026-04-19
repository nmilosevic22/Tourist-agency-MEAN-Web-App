import { Component, OnInit } from '@angular/core';
import { TouristService } from '../services/tourist.service';
import { Cottage } from '../models/cottage';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  constructor(private service: TouristService, private router : Router) { }

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser");
    if (u) {
      this.currUser = u;
    }
    this.service.getUser(this.currUser).subscribe(data => {
      this.user = data;
    })
    let c = localStorage.getItem("cottage")
    if (c) {
      this.curr = c;
    }
    this.service.getCottage(this.curr).subscribe(data => {
      this.cottage = data;
      this.owner = this.cottage.owner;
      this.service.getUser(this.owner).subscribe(data => {
        this.cottageOwner = data;
      })
    })
  }

  curr: string = ""
  cottage: Cottage = new Cottage();
  currUser: string = ""
  user: User = new User();

  form = false;
  step = 1;
  message = ""

  today: Date = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;
  adults: number = 0
  children: number = 0;
  people: number = 0;
  nights: number = 0;
  totalPrice: number = 0;
  description: string = ""
  owner = ""
  cottageOwner : User = new User()

  dinersValid: Boolean | undefined = false;
  masterValid: Boolean | undefined = false;
  visaValid: Boolean | undefined = false;
  private dinersReg: RegExp | undefined = /(300|301|302|303)\d{12}$|(36|38)\d{13}$/
  private masterReg: RegExp | undefined = /(51|52|53|54|55)\d{14}$/
  private visaReg: RegExp | undefined = /(4539|4556|4916|4532|4929|4485|4716)\d{12}$/


  book() {
    this.form = true;
    this.step = 1;
    this.startDate = this.endDate = null;
    this.adults = this.children = 0;

  }

  checkCard() {
    this.dinersValid = this.dinersReg?.test(this.user.card);
    this.masterValid = this.masterReg?.test(this.user.card);
    this.visaValid = this.visaReg?.test(this.user.card);
  }

  calculation() {
    if (this.startDate != null && this.endDate != null) {
      let diff = this.endDate.getTime() - this.startDate.getTime();

      this.nights = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.totalPrice = this.nights * this.cottage.price;
      this.people = this.adults + this.children;
    }
    else {
      this.message = "Please insert all the fields."
    }
  }

  next() {
    this.calculation();
    this.step = 2;
  }

  backToCottages(){
    localStorage.removeItem("cottage");
    this.router.navigate(['/cottages']);
  }

  back() {
    this.message = ""
    if(this.step > 1){
      this.step--;
    }
    else {
      this.form = false;
    }
  }

  finish() {
    this.checkCard();
    if (this.dinersValid == false && this.masterValid == false && this.visaValid == false) {
      this.message = "Please insert correct form of credit card!"
      return;
    }
    else if(this.adults <= 0 && this.children <= 0){
      this.message = "Invalid number of guests."
      return;
    }
    else {
      if (this.startDate != null && this.endDate != null) {
        //check if cottage is reserved at that period of time
        this.service.checkRes(this.cottage.name, this.startDate, this.endDate).subscribe(data => {
          if (data == true) {
            this.message = "Selected date is not avaliable!"
            this.step = 1;
          }
          else {
            this.reserve();
          }
        })
      }
    }
  }

  reserve() {
    let today = new Date();
    if (this.startDate != null && this.endDate != null) {
      this.service.createRes(this.user.username, this.totalPrice, this.people, this.startDate,
        this.endDate, this.cottage.name, this.cottage.location, this.owner, today).subscribe(data => {
          if (data) {
            alert("Success")
            this.form = false;
          } else {
            alert("Fail")
          }
        })
    }
  }

}
