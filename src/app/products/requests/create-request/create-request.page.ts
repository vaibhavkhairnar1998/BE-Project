import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import { RequestedProduct } from '../requestedProduct.model';

@Component({
	selector: 'app-create-request',
	templateUrl: './create-request.page.html',
	styleUrls: ['./create-request.page.scss']
})
export class CreateRequestPage implements OnInit, OnDestroy {
	requests: Request[];
	productTitle: string;
	private requestSub: Subscription;
	isBookable = false;
	isLoading: boolean = false;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private menuCtrl: MenuController,
		private requestsService: RequestsService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.route.queryParams.subscribe(queryParams => {
			this.productTitle = queryParams.productTitle;
			this.route.paramMap.subscribe(paramMap => {
				if (!paramMap.has('placeId')) {
					this.navCtrl.navigateBack('/products/tabs/requests');
					return;
				}
				this.requestSub = this.requestsService
					.getRequestsForSingleProduct(paramMap.get('placeId'))
					.subscribe(requests => {
						this.requests = requests;
						this.isLoading = false;
					});
			});
		});
	}

	onOpenMenu() {
		this.menuCtrl.toggle();
	}

	ngOnDestroy() {
		if (this.requestSub) {
			this.requestSub.unsubscribe();
		}
	}
}
