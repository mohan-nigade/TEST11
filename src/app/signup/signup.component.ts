import { Component, OnInit } from '@angular/core';
import{FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userFormInfo:FormGroup;
  errMsg:string='';
  errStatus:boolean=false
  image:File;

  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userFormInfo=this.fb.group({
      username:['',[Validators.required,Validators.minLength(4)]],
      password:['',[Validators.required,Validators.minLength(4)]],
      city:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.minLength(6)]],
      profilePic:''
    })
  }

  get username(){
    return this.userFormInfo.get('username')
  }
  get password(){
    return this.userFormInfo.get('password')
  }
  get city(){
    return this.userFormInfo.get('city')
  }
  get email(){
    return this.userFormInfo.get('email')
  }
  get profilePic(){
    return this.userFormInfo.get('profilePic')
  }

  onFormSubmit(){
    //get user obj from form
    let userObj=this.userFormInfo.value;
    //create FormDATA object
    let formData=new FormData();
    formData.append('userObj',JSON.stringify(userObj))
    //append profilepic to formdata
    formData.append('profilePic',this.image)
    //console.log(this.userObj.value)
    this.userService.createUser(formData).subscribe({
      next:(res)=>{
        if(res.message=="User created"){
          this.errStatus=false;
          this.router.navigateByUrl('/login')
        }
        else{
          this.errStatus=true;
          this.errMsg=res.message;
        }
      },
      error:()=>{}
    })
  }
  onFileSelect(event){
    //console.log(event.target.files[0])
    this.image=event.target.files[0]
  }

}
