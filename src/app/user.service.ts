import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post("/user/create-user",userObj)
  }

  getProtectedData():Observable<any>{
    return this.hc.get("/user/get-protected-data")
  }

/* products */

getProducts():Observable<any>{

  return this.hc.get('/user/get-products');  

}

addproductToCart(productObj):Observable<any>{

  return this.hc.post('user/addToCart',productObj)

}

}
