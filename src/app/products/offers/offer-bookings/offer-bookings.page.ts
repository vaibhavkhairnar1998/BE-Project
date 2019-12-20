import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

import { Product } from "../../product.model";
import { ProductsService } from "../../products.service";

@Component({
	selector: "app-offer-bookings",
	templateUrl: "./offer-bookings.page.html",
	styleUrls: ["./offer-bookings.page.scss"]
})
export class OfferBookingsPage implements OnInit {
	place: Product;

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private productsService: ProductsService
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				this.navCtrl.navigateBack("/products/tabs/offers");
				return;
			}
			this.place = this.productsService.getPlace(paramMap.get("placeId"));
		});
	}
}
