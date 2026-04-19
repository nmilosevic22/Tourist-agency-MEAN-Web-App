import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Cottage } from '../models/cottage';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor() { }

  private httpClient = inject(HttpClient);

  getInfo(u: string) {
    const data = {
      username: u
    };
    return this.httpClient.post<User>("http://localhost:4000/owner/getInfo", data)
  }

  saveData(formdata : FormData){
    return this.httpClient.post<boolean>("http://localhost:4000/owner/saveData", formdata)
  }

  getMyCottages(u: string) {
    const data = {
      username: u
    };
    return this.httpClient.post<Cottage[]>("http://localhost:4000/owner/getMyCottages", data)
  }

  updateCottage(id : string, n : string, l : string, p : number, i? : File){

    const formData = new FormData();

    formData.append('id', id);
    formData.append('name', n);
    formData.append('location', l);
    formData.append('price', p.toString());

    if (i) {
      formData.append('image', i);
    }

    return this.httpClient.post<boolean>("http://localhost:4000/owner/updateCottage", formData)
  }

  deleteCottage(id : String) {
    const data = {
      _id : id
    };
    return this.httpClient.post<boolean>("http://localhost:4000/owner/deleteCottage", data)
  }

  createCottage(owner : string, name : string, location : string, price : string, images : File[] | undefined) {
    let formData = new FormData();

    formData.append("owner", owner);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("price", price);

    if(images) {
      images.forEach (image => {
        formData.append("images", image)
      })
    }

    return this.httpClient.post<boolean>("http://localhost:4000/owner/createCottage", formData)
  }

  myReservations(owner : string){
    const data = {
      owner : owner
    };
    return this.httpClient.post<Reservation[]>("http://localhost:4000/owner/myRes", data)
  }

  approve(id : string) {
    const data = {
      _id : id
    };
    return this.httpClient.post<boolean>("http://localhost:4000/owner/approveRes", data)
  }

  reject(id : string) {
    const data = {
      _id : id
    };
    return this.httpClient.post<boolean>("http://localhost:4000/owner/rejectRes", data)
  }

}
