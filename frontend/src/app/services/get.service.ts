import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cottage } from '../models/cottage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor() { }
  
  private httpClient = inject(HttpClient);

  getOwners(){
    return this.httpClient.get<number>("http://localhost:4000/users/countOwners")
  }

  getTourists(){
    return this.httpClient.get<number>("http://localhost:4000/users/countTourists")
  }

  getCottages(){
    return this.httpClient.get<number>("http://localhost:4000/users/countCottages")
  }

  getLast30(){
    return this.httpClient.get<number>("http://localhost:4000/users/last30")
  }

  getLast7(){
    return this.httpClient.get<number>("http://localhost:4000/users/last7")
  }

  getLastDay(){
    return this.httpClient.get<number>("http://localhost:4000/users/lastDay")
  }

  searchCottage(n : string, l : string){
    const data = {
      name : n,
      location : l
    };
    return this.httpClient.post<Cottage[]>("http://localhost:4000/users/searchCottage", data)
  }

  getAllCottages(){
    return this.httpClient.get<Cottage[]>("http://localhost:4000/users/allCottages")
  }

  getAllOwners(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/allOwners")
  }

  getAllTourists(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/allTourists")
  }
}

