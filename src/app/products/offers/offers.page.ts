import { Component, OnInit } from "@angular/core";

import { ProductsService } from "../products.service";
import { Product } from "../product.model";
import { IonItemSliding } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
	selector: "app-offers",
	templateUrl: "./offers.page.html",
	styleUrls: ["./offers.page.scss"]
})
export class OffersPage implements OnInit {
	offers: Product[];

	constructor(
		private productsService: ProductsService,
		private router: Router
	) {}

	ngOnInit() {
		this.offers = this.productsService.products;
	}

	onEdit(offerId: String, slidingItem: IonItemSliding) {
		slidingItem.close();
		this.router.navigate([
			"/",
			"products",
			"tabs",
			"offers",
			"edit",
			offerId
		]);
		console.log("Edting Offer ", offerId);
	}
}
