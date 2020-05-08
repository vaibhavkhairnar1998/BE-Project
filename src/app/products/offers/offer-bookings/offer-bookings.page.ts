import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-offer-bookings',
	templateUrl: './offer-bookings.page.html',
	styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
	product: Product;
	private productSub: Subscription;
	isLoading: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private productsService: ProductsService,
		private router: Router
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('placeId')) {
				this.navCtrl.navigateBack('/products/tabs/offers');
				return;
			}
			this.isLoading = true;
			this.productSub = this.productsService
				.getProduct(paramMap.get('placeId'))
				.subscribe((product) => {
					this.product = product;
					this.isLoading = false;
				});
		});
	}

	onEdit(offerId: String) {
		this.router.navigate(['/', 'products', 'tabs', 'offers', 'edit', offerId]);
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
