import { Component, OnInit } from '@angular/core';
import { TouristService } from '../services/tourist.service';
import { Cottage } from '../models/cottage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cottages.component.html',
  styleUrl: './cottages.component.css'
})
export class CottagesComponent implements OnInit{

  constructor(private service : TouristService, private router : Router) {}

  ngOnInit(): void {
    this.service.getCottages().subscribe(data => {
      this.cottages = data;
      this.searched = data;
    })
  }

  cottages : Cottage[] = []
  searched : Cottage[] = []

  searchName = "";
  searchLocation = "";

  searchCottage(){
    this.service.searchCottage(this.searchName, this.searchLocation).subscribe(cottages => {
      this.searched = cottages;
    })
  }

  cottageDetails(name : string) {
    localStorage.setItem("cottage", name);
  }

  sortByName(){
    this.searched.sort((a,b) => a.name.localeCompare(b.name))
  }

  sortByLocation(){
    this.searched.sort((a,b) => a.location.localeCompare(b.location))
  }

  reset(){
    this.searched = this.cottages;
    this.searchName = ""
    this.searchLocation = ""
  }

  back(){
    this.router.navigate(['/tourist'])
  }

}
