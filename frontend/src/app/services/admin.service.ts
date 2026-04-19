import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private httpClient = inject(HttpClient);

  login(u : string, p : string) {
    const data={
      username: u,
      password: p
    }
    return this.httpClient.post<User>("http://localhost:4000/admin/login", data);
  }


  getInfo (username : string) {
    const data = {
      username : username
    };
    return this.httpClient.post<User>("http://localhost:4000/admin/getInfo", data);
  }

  getAllOwners() {
    return this.httpClient.get<User[]>("http://localhost:4000/admin/allOwners");
  }

  getAllTourists() {
    return this.httpClient.get<User[]>("http://localhost:4000/admin/allTourists");
  }

  create(u : string, p : string, f : string, l : string, g : string, t : string, a : string, co : string, 
    e : string, c : string, i? : File
  ) {
    const formData = new FormData();

    formData.append("username", u);
    formData.append("password", p);
    formData.append("firstname", f);
    formData.append("lastname", l);
    formData.append("gender", g);
    formData.append("type", t);
    formData.append("address", a);
    formData.append("contact", co);
    formData.append("email", e);
    formData.append("card", c);
    
    if (i) {
      formData.append("image", i)
    }

    return this.httpClient.post<boolean>("http://localhost:4000/admin/create", formData);
  }

  approve (u : string, p : string, f : string, l : string, g : string, t : string, a : string, co : string, 
    e : string, c : string, i : string) {

    const data = {
      username : u,
      password : p,
      firstname : f,
      lastname : l,
      gender : g,
      type : t,
      address : a,
      contact : co,
      email : e,
      image : i,
      card : c
    }

    console.log(data);

    return this.httpClient.post<boolean>("http://localhost:4000/admin/approve", data);
  }

  removeRqst(u : string) {
    const data = {
      username : u
    };
    return this.httpClient.post<boolean>("http://localhost:4000/admin/removeRqst", data);
  }

  delete(username : string) {
    const data = {
      username : username
    };
    return this.httpClient.post<boolean>("http://localhost:4000/admin/delete", data);
  }

  deactivate(username : string) {
    const data = {
      username : username
    };
    return this.httpClient.post<boolean>("http://localhost:4000/admin/deactivate", data);
  }

  edit(o : string, u : string, p : string, f : string, l : string, g : string, t : string, a : string, co : string, 
    e : string, c : string, i? : File
  ) 
  {
    const formData = new FormData();

    formData.append("toEdit", o);
    formData.append("username", u);
    formData.append("password", p);
    formData.append("firstname", f);
    formData.append("lastname", l);
    formData.append("gender", g);
    formData.append("type", t);
    formData.append("address", a);
    formData.append("contact", co);
    formData.append("email", e);
    formData.append("card", c);
    
    if (i) {
      formData.append("image", i)
    }

    return this.httpClient.post<boolean>("http://localhost:4000/admin/edit", formData);
  }

  rqst() {
    return this.httpClient.get<User[]>("http://localhost:4000/admin/rqst");
  }

  deny(u : string, p : string, f : string, l : string, g : string, t : string, a : string, co : string, 
    e : string, c : string, i : string) {
      
    const data = {
      username : u,
      password : p,
      firstname : f,
      lastname : l,
      gender : g,
      type : t,
      address : a,
      contact : co,
      email : e,
      image : i,
      card : c
    }

    console.log(data);

    return this.httpClient.post<boolean>("http://localhost:4000/admin/deny", data);
  }

}