import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import { ProductsService } from '../../products.service';

@Component({
	selector: 'app-create-request',
	templateUrl: './create-request.page.html',
	styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit, OnDestroy {
	requests: Request[];
	productTitle: string;
	productId: string;
	private requestSub: Subscription;
	isLoading: boolean = false;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private menuCtrl: MenuController,
		private requestsService: RequestsService,
		private productService: ProductsService
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.route.queryParams.subscribe((queryParams) => {
			this.productTitle = queryParams.productTitle;
			this.route.paramMap.subscribe((paramMap) => {
				if (!paramMap.has('placeId')) {
					this.navCtrl.navigateBack('/products/tabs/requests');
					return;
				}
				this.productId = paramMap.get('placeId');
				this.requestSub = this.requestsService
					.getRequestsForSingleProduct(this.productId)
					.subscribe((requests) => {
						this.requests = requests;
						this.isLoading = false;
					});
			});
		});
	}

	onOpenMenu() {
		this.menuCtrl.toggle();
	}

	onClick(event) {
		const status = event.target.innerHTML.toLowerCase();
		if (status === 'accept' || status === 'pending' || status === 'decline') {
			const productData = JSON.stringify([
				{ propName: 'isBooked', value: status },
			]);
			this.productService
				.updateProduct(this.productId, productData)
				.subscribe((p) => {
					console.log(p);
				});
		} else throw new Error('something went wrong.');
	}

	ngOnDestroy() {
		if (this.requestSub) {
			this.requestSub.unsubscribe();
		}
	}
}
