import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cottage } from '../models/cottage';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private service : GetService, private router : Router) {}

  ngOnInit(): void {
    this.getOwners();
    this.getTourists();
    this.getCottages();
    this.getLast30();
    this.getLast7();
    this.getLastDay();
    this.getAllCottages();
    this.getAllOwners();
    this.getAllTourists();
  }

  owners = 0;
  tourists = 0;
  cottages = 0;

  allCottages : Cottage[] = []
  allOwners : User[] = []
  allTourists: User[] = []

  last30 = 0;
  last7 = 0;
  lastDay = 0;

  searchName = "";
  searchLocation = "";
  searchedCottages : Cottage[] = []
  visible = false;

  getAllCottages(){
    this.service.getAllCottages().subscribe(data => {
      this.allCottages = data;
    })
  }

  getAllOwners(){
    this.service.getAllOwners().subscribe(data => {
      this.allOwners = data;
    })
  }

  getAllTourists(){
    this.service.getAllTourists().subscribe(data => {
      this.allTourists = data;
    })
  }

  getOwners(){
    this.service.getOwners().subscribe(count => {
      this.owners = count;
    })
  }

  getTourists(){
    this.service.getTourists().subscribe(count => {
      this.tourists = count;
    })
  }

  getCottages(){
    this.service.getCottages().subscribe(count => {
      this.cottages = count;
    })
  }

  getLast30(){
    this.service.getLast30().subscribe(count => {
      this.last30 = count;
    })
  }

  getLast7(){
    this.service.getLast7().subscribe(count => {
      this.last7 = count;
    })
  }

  getLastDay() {
    this.service.getLastDay().subscribe(count => {
      this.lastDay = count;
    })
  }

  sortCottageByName(){
    this.allCottages.sort((a,b) => a.name.localeCompare(b.name));
  }

  sortCottageByLocation(){
    this.allCottages.sort((a,b) => a.location.localeCompare(b.location));
  }

  searchCottage(){
    this.visible = true;
    this.searchedCottages = [];
    this.service.searchCottage(this.searchName, this.searchLocation).subscribe(data => {
      this.searchedCottages = data;
    })
  }

  toLogin(){
    this.router.navigate(['/login'])
  }

  toRegister(){
    this.router.navigate(['/register'])
  }

}

