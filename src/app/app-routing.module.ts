import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";

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
		path: "myprofile",
		loadChildren: "./myprofile/myprofile.module#MyprofilePageModule",
		canLoad: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
