import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  user;
  productsData;
  cartProducts;

  constructor(private authService:AuthenticationService,private userService:UserService) { }

  ngOnInit(): void {
    this.user=this.authService.currentUser;
  }

  getPrivateData(){
    this.userService.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message)
      }
    })
  }

  getAllProducts(){

    this.userService.getProducts().subscribe({

      next:(products)=>{

        this.productsData = products.payload;

        console.log(this.productsData)

      }

    })

  }

   // add to cart



   addToCart(productObj,username){



    this.userService.addproductToCart({productObj,username}).subscribe({

      next:(res)=>{

        this.cartProducts =res.data;

      }

    })

  }


  

}
