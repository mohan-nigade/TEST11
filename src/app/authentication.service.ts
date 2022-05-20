import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
userLoginStatus:boolean=false;
currentUser;
currentAdmin;

  constructor(private hc:HttpClient) { }

  loginUser(userCredObj):Observable<any>{
    return this.hc.post('/user/login-user',userCredObj)
  }
  logoutUser(){
    localStorage.removeItem("token");
    this.userLoginStatus=false;
  }
}
/*
loginAdmin(AdminCredObj):Observable<any>{
  return this.hc.post('/user/login-user',AdminCredObj)
}*/