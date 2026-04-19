import { Component, OnInit } from '@angular/core';
import { TouristService } from '../services/tourist.service';
import { Reservation } from '../models/reservation';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit{

  constructor(private service : TouristService, private router : Router) {}

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser");
    if(u){
      this.logged = u;
    }
    this.service.myRes(this.logged).subscribe(data => {
      this.myRes = data;
    })
  }

  myRes : Reservation[] = []
  logged : string = ""

  back(){
    this.router.navigate(['/tourist'])
  }

}
