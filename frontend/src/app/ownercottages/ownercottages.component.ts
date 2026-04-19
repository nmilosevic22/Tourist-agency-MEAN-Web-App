import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { User } from '../models/user';
import { Cottage } from '../models/cottage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownercottages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ownercottages.component.html',
  styleUrl: './ownercottages.component.css'
})
export class OwnercottagesComponent implements OnInit{

  constructor(private service : OwnerService, private router : Router) {}

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

  toEdit(id : any, p : number, n : string, l : string): void {
    this.editingCot = id;
    this.editPrice = p;
    this.editName = n;
    this.editLocation = l;
  }

  cancelEdit() {
    this.editingCot = ""
    this.editPrice = 0;
    this.editName = ''
    this.editLocation = ''
  }

  toDelete(id : string) {
    this.service.deleteCottage(id).subscribe(data => {
      if (data) {
        alert("Successfully deleted.");
        this.ngOnInit();
      }
    })
  }

  toUpdate(id : string){
    if (this.editPrice && this.editPrice <= 0) {
      alert("Invalid price.");
      return;
    }

    this.service.updateCottage(id, this.editName, this.editLocation, this.editPrice, this.editImage).subscribe(data => {
      if (data) {
        alert('Successfully updated cottage');
        this.ngOnInit()
        this.editingCot = ""
        this.editName = ""
        this.editLocation = ""
        this.editPrice = 0
      }
    })

  }

  onImage(event : any){
    this.editImage = event.target.files[0];
  }

  onImages(event : any){
    let files : FileList = event.target.files
    this.newImages = Array.from(files);
  }

  addNew() {
    this.newCotForm = true;
  }

  cancelNew() {
    this.newCotForm = false;
  }

  createCotttage(owner : string, name : string, location : string, price : string, images : File[] | undefined) {

    if (owner == "" || name == "" || location == "" || price == "") {
      alert ("Please insert all the required fields");
      return;
    }

    this.service.createCottage(owner, name, location, price, images).subscribe(data => {
      if (data) {
        alert ("Successfully created cottage.")
        this.ngOnInit();
        this.newName = ""
        this.newLocation = ""
        this.newPrice = ""
        this.newImages = [];
        
        this.cancelNew();
      }
    })

  }

  back(){
    this.router.navigate(['/owner'])
  }

  logged = ""
  user : User = new User();
  myCot : Cottage[] = []

  editingCot = ""

  editName = ""
  editLocation = ""
  editPrice : number = 0
  editImage : File | undefined

  newCotForm : boolean = false
  newName = ""
  newLocation = ""
  newPrice = ""
  newImages : File[] | undefined

}
