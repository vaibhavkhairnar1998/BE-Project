import { Component, OnInit, OnDestroy } from "@angular/core";

import { ProductsService } from "../products.service";
import { Product } from "../product.model";
import { IonItemSliding } from "@ionic/angular";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-offers",
	templateUrl: "./offers.page.html",
	styleUrls: ["./offers.page.scss"]
})
export class OffersPage implements OnInit, OnDestroy {
	offers: Product[];
	private productSub: Subscription;

	constructor(
		private productsService: ProductsService,
		private router: Router
	) {}

	ngOnInit() {
		this.productSub = this.productsService.products.subscribe((product) => {
			this.offers = product;
		});
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

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
