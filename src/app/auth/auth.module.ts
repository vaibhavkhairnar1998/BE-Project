import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [ AuthPage ]
} )
export class AuthPageModule { }
