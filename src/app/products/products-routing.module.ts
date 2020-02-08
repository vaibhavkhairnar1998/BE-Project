import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductsPage } from "./products.page";

const routes: Routes = [
	{
		path: "tabs",
		component: ProductsPage,
		children: [
			{
				path: "discover",
				children: [
					{
						path: "",
						loadChildren:
							"./discover/discover.module#DiscoverPageModule"
					},
					{
						path: ":placeId",
						loadChildren:
							"./discover/product-detail/product-detail.module#PlaceDetailPageModule"
					}
				]
			},
			{
				path: "offers",
				children: [
					{
						path: "",
						loadChildren: "./offers/offers.module#OffersPageModule"
					},
					{
						path: "new",
						loadChildren:
							"./offers/new-offer/new-offer.module#NewOfferPageModule"
					},
					{
						path: "edit/:placeId",
						loadChildren:
							"./offers/edit-offer/edit-offer.module#EditOfferPageModule"
					},
					{
						path: ":placeId",
						loadChildren:
							"./offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule"
					}
				]
			},
			{
				path: "",
				redirectTo: "/products/tabs/discover",
				pathMatch: "full"
			},
			{
				path: "requests",
				children: [
					{
						path: "",
						loadChildren:
							"./requests/requests.module#RequestsPageModule"
					},
					{
						path: ":placeId",
						loadChildren:
							"./requests/create-request/create-request.module#CreateRequestPageModule"
					}
				]
			}
		]
	},

	{
		path: "",
		redirectTo: "/products/tabs/discover",
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule {}
