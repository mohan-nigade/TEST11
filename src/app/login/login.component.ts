import { Component, OnInit } from '@angular/core';
import{FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm:FormGroup;
  errStatus=false;
  errMessage;

  constructor(private fb:FormBuilder,private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      userType:['',Validators.required],
      username:['',[Validators.required,Validators.minLength(4)]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }


  get userType(){
    return this.userForm.get('userType')
  }

  get username(){
    return this.userForm.get('username')
  }

  
  get password(){
    return this.userForm.get('password')
  }

  onFormSubmit(){
    //if use type is user
    if(this.userForm.value.userType=='user'){
      this.authService.loginUser(this.userForm.value).subscribe({
        next:(res)=>{
          if(res.message=="login success"){
            this.errStatus=false;

            //get token from res obj
            let token=res.token;
            //store token in local storage
            localStorage.setItem("token",token)
            //update logiin status
            this.authService.userLoginStatus=true;
            //GET LOGGED IN USER DATA
            this.authService.currentUser=res.user;
            //navigate to userdashboard
            this.router.navigateByUrl(`/userprofile/${res.user.username}`)


          }
          else{
            //alert(res.message)
            this.errStatus=true;
            this.errMessage=res.message;

          }
        },
        error:(err)=>{
          console.log(err);
          alert(err.message)
        }
      })
    }
    if(this.userForm.value.userType=='admin'){
      
    }
  }

}
