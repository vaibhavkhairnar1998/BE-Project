import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { RequestsService } from './requests.service';
import { RequestedProduct } from './requestedProduct.model';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
	selector: 'app-requests',
	templateUrl: './requests.page.html',
	styleUrls: ['./requests.page.scss']
})
export class RequestsPage implements OnInit {
	requestedProductsSub: Subscription;
	requestedProducts: RequestedProduct[];
	backButtonSubscription: any;

	constructor(
		private requestsService: RequestsService,
		private platform: Platform,
		private router: Router
	) {}

	ngOnInit() {
		this.requestedProductsSub = this.requestsService.requestedProducts.subscribe(
			requestedProducts => {
				this.requestedProducts = requestedProducts;
			}
		);
	}

	ionViewWillEnter() {
		this.requestsService.getRequestedProducts().subscribe();
	}

	onNavigate(requestedProduct: RequestedProduct) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				productTitle: requestedProduct.title
			}
		};
		this.router.navigate(
			['/', 'products', 'tabs', 'requests', requestedProduct.id],
			navigationExtras
		);
	}

	ngAfterViewInit() {
		this.backButtonSubscription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp();
		});
	}

	ngOnDestroy() {
		if (this.requestedProductsSub) {
			this.requestedProductsSub.unsubscribe();
		}
	}
}
