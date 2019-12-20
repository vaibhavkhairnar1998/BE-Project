import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";

const routes: Routes = [
	{ path: "", redirectTo: "products", pathMatch: "full" },
	{ path: "auth", loadChildren: "./auth/auth.module#AuthPageModule" },
	{
		path: "products",
		loadChildren: "./products/products.module#ProductsPageModule",
		canLoad: [AuthGuard]
	},
	{
		path: "bookings",
		loadChildren: "./bookings/bookings.module#BookingsPageModule",
		canLoad: [AuthGuard]
	},
	{
		path: "signup",
		loadChildren: "./auth/signup/signup.module#SignupPageModule"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
