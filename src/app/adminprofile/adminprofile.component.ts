import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
  admin;

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.admin=this.authService.currentAdmin;
  }

}
