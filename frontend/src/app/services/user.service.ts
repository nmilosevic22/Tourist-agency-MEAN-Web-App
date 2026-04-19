import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private httpClient = inject(HttpClient);

  login(u: string, p: string){
    const data={
      username: u,
      password: p
    }
    return this.httpClient.post<User>("http://localhost:4000/users/login", data)
  }

  checkEmail(e : string){
    const data = {
      email : e
    }
    return this.httpClient.post<Boolean>("http://localhost:4000/users/emailCheck", data)
  }

  checkUsername(u : string){
    const data = {
      username : u
    }
    return this.httpClient.post<Boolean>("http://localhost:4000/users/usernameCheck", data)
  }

  sendRegData(username : string, password : string, firstname : string, lastname : string, gender : string,
    type : string, address : string, contact : string, email : string, card : string, image? : File
  )
  {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('gender', gender);
    formData.append('type', type);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('email', email); 
    if(image){
      formData.append('image', image);
    }
    formData.append('card', card);

    return this.httpClient.post<Boolean>("http://localhost:4000/register/createReq", formData)
  }


  checkOldPass(u : string, p : string){
    const data = {
      username : u,
      password : p
    };
    return this.httpClient.post<Boolean>("http://localhost:4000/users/checkOldPass", data);
  }

  changePass(u : string, p : string){
    const data = {
      username : u,
      password : p
    };
    return this.httpClient.post<Boolean>("http://localhost:4000/users/changePass", data);
  }
  
}

