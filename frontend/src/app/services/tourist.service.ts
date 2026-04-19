import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Cottage } from '../models/cottage';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor() { }

  private httpClient = inject(HttpClient);

  getInfo(u: string | null) {
    const data = {
      username: u
    };
    return this.httpClient.post<User>("http://localhost:4000/tourist/getInfo", data)
  }

  saveFormData(formData: FormData) {
    return this.httpClient.post<boolean>("http://localhost:4000/tourist/saveData", formData);
  }

  getCottages() {
    return this.httpClient.get<Cottage[]>("http://localhost:4000/tourist/getCottages")
  }

  getCottage(c: string) {
    const data = {
      name: c
    }
    return this.httpClient.post<Cottage>("http://localhost:4000/tourist/getCottage", data)
  }

  searchCottage(name: string, location: String) {
    const data = {
      name: name,
      location: location
    };
    return this.httpClient.post<Cottage[]>("http://localhost:4000/tourist/searchCottage", data)
  }

  getUser(u: string) {
    const data = {
      username: u
    }
    return this.httpClient.post<User>("http://localhost:4000/tourist/getUser", data)
  }

  createRes(t: string, pr: number, p: number, st: Date, e: Date, n: string, l: string, o : string, r : Date) {
    const data = {
      tourist: t,
      price: pr,
      people: p,
      start: st,
      end: e,
      name: n,
      location: l,
      owner : o,
      pending : 'waiting',
      reserved : r
    }
    return this.httpClient.post<boolean>("http://localhost:4000/tourist/createRes", data)
  }

  checkRes(n: string, s: Date, e: Date) {
    const data = {
      name: n,
      start: s,
      end: e
    }
    return this.httpClient.post<boolean>("http://localhost:4000/tourist/checkRes", data)
  }

  myRes(u: String) {
    const data = {
      username : u
    };
    return this.httpClient.post<Reservation[]>("http://localhost:4000/tourist/myRes", data)
  }
}
