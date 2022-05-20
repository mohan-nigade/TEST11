import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //intersepting logic
    //Get token from stotage
    let token=localStorage.getItem("token");
    //if token is existed
    if(token){
      //add token to headers property of req
     let clonedReq= req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      //send to server
      return next.handle(clonedReq)
    }
    //if token not existed
    else{
      //send req without adding token
      return next.handle(req)
    }
   
  }
}