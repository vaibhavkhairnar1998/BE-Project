import { Routes, RouterModule } from "@angular/router";

import { AuthPage } from "./auth.page";
import { NgModule } from "@angular/core";

const routes: Routes = [
	{
		path: "",
		component: AuthPage
	},
	{
		path: "signup",
		loadChildren: "./signup/signup.module#SignupPageModule"
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
