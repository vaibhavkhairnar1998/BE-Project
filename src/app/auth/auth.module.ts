import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AuthPage } from "./auth.page";
import { AuthRoutingModule } from "./auth-routing.module";

// const routes: Routes = [
// 	{
// 		path: "",
// 		component: AuthPage
// 	}
// ];

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AuthRoutingModule],
	declarations: [AuthPage]
})
export class AuthPageModule {}
