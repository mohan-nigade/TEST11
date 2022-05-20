import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminprofileRoutingModule } from './adminprofile-routing.module';
import { AdminprofileComponent } from './adminprofile.component';


@NgModule({
  declarations: [
    AdminprofileComponent
  ],
  imports: [
    CommonModule,
    AdminprofileRoutingModule
  ]
})
export class AdminprofileModule { }
