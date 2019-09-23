import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlacesPage } from "./places.page";

const routes: Routes = [
	{
		path: "tabs",
		component: PlacesPage,
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
							"./discover/places-detail/places-detail.module#PlacesDetailPageModule"
					}
				]
			},
			{
				path: "offer",
				children: [
					{
						path: "",
						loadChildren: "./offer/offer.module#OfferPageModule"
					},
					{
						path: "new",
						loadChildren:
							"./offer/new-offer/new-offer.module#NewOfferPageModule"
					},
					{
						path: "edit/:placeId",
						loadChildren:
							"./offer/edit-offer/edit-offer.module#EditOfferPageModule"
					},
					{
						path: ":placeId",
						loadChildren:
							"./offer/offer-booking/offer-booking.module#OfferBookingPageModule"
					}
				]
			},
			{
				path: "",
				redirectTo: "/places/tabs/discover",
				pathMatch: "full"
			}
		]
	},
	{
		path: "",
		redirectTo: "/places/tabs/discover",
		pathMatch: "full"
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlacesRoutingModule {}
