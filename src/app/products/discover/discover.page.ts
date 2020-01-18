import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuController } from "@ionic/angular";

import { ProductsService } from "../products.service";
import { Product } from "../product.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";

@Component({
	selector: "app-discover",
	templateUrl: "./discover.page.html",
	styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit, OnDestroy {
	loadedProducts: Product[];
	allProducts: Product[];
	private productsSub: Subscription;

	constructor(
		private productsService: ProductsService,
		private menuCtrl: MenuController
	) {}

	ngOnInit() {
		this.productsSub = this.productsService.products.subscribe(
			(product) => {
				this.loadedProducts = product;
			}
		);
		// this.loadedProducts = this.productsService.products;
		this.allProducts = this.loadedProducts.filter(
			(place) => place.category === "Place"
		);
	}

	onOpenMenu() {
		this.menuCtrl.toggle();
	}
	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		console.log(event.detail);
		if (event.detail.value === "Place") {
			this.allProducts = this.loadedProducts.filter(
				(place) => place.category === event.detail.value
			);
		}
		if (event.detail.value === "Electronic") {
			this.allProducts = this.loadedProducts.filter(
				(place) => place.category === event.detail.value
			);
		}
		if (event.detail.value === "Automobile") {
			this.allProducts = this.loadedProducts.filter(
				(place) => place.category === event.detail.value
			);
		}
	}

	ngOnDestroy() {
		if (this.productsSub) {
			this.productsSub.unsubscribe();
		}
	}
}
