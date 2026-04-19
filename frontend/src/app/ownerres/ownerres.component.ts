import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { OwnerService } from '../services/owner.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownerres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ownerres.component.html',
  styleUrl: './ownerres.component.css',
})
export class OwnerresComponent implements OnInit {
  constructor(private service: OwnerService, private router : Router) {}

  ngOnInit(): void {
    let u = localStorage.getItem('loggedUser');
    if (u) {
      this.logged = u;
    }
    this.service.getInfo(this.logged).subscribe((data) => {
      this.user = data;
      this.service.myReservations(this.user.username).subscribe((data) => {
        this.myRes = data;
        this.myRes.sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      });
    });
  }

  approve(id : string) {
    this.service.approve(id).subscribe(data => {
      if (data) {
        alert ("Successfully approved this reservation");
        this.ngOnInit();
      }
    })
  }
  
  reject(id : string) {
    this.service.reject(id).subscribe(data => {
      if (data) {
        alert ("Successfully rejected this reservation");
        this.ngOnInit();
      }
    })
  }

  back(){
    this.router.navigate(['/owner'])
  }

  logged = '';
  myRes: Reservation[] = [];
  user: User = new User();
}
