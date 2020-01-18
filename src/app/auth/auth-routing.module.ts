import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthPage } from "./auth.page";

const routes: Routes = [
	{
		path: "",
		component: AuthPage,
		children: [
			{
				path: "signup",
				loadChildren: "./auth/signup/signup.module#SignupPageModule"
			}
		]
	}
];
