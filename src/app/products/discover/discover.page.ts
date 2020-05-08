import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-discover',
	templateUrl: './discover.page.html',
	styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
	loadedProducts: Product[];
	allProducts: Product[];
	private productsSub: Subscription;

	constructor(
		private productsService: ProductsService,
		private menuCtrl: MenuController,
		private router: Router
	) {}

	ngOnInit() {
		this.productsSub = this.productsService.products.subscribe(product => {
			this.loadedProducts = product;
			this.allProducts = this.loadedProducts.filter(
				place => place.category === 'Place'
			);
		});
		// this.loadedProducts = this.productsService.products;
	}

	ionViewWillEnter() {
		this.productsService.fetchProducts().subscribe();
	}

	onNavigate(product: Product) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				productTitle: product.title
			}
		};
		this.router.navigate(
			['/', 'products', 'tabs', 'discover', product.id],
			navigationExtras
		);
	}

	onOpenMenu() {
		this.menuCtrl.toggle();
	}

	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		if (event.detail.value === 'Place') {
			this.allProducts = this.loadedProducts.filter(
				place => place.category === event.detail.value
			);
		}
		if (event.detail.value === 'Electronic') {
			this.allProducts = this.loadedProducts.filter(
				place => place.category === event.detail.value
			);
		}
		if (event.detail.value === 'Automobile') {
			this.allProducts = this.loadedProducts.filter(
				place => place.category === event.detail.value
			);
		}
	}

	ngOnDestroy() {
		if (this.productsSub) {
			this.productsSub.unsubscribe();
		}
	}
}
