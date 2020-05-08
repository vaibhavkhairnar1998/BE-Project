import {
	Component,
	OnInit,
	OnDestroy,
	ViewChildren,
	QueryList,
} from '@angular/core';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import {
	IonItemSliding,
	AlertController,
	LoadingController,
	IonRouterOutlet,
	Platform,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.page.html',
	styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
	offers: Product[];
	private productSub: Subscription;
	backButtonSubscription;
	@ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

	constructor(
		private productsService: ProductsService,
		private router: Router,
		private loadingCtrl: LoadingController,
		private platform: Platform,
		private alertController: AlertController
	) {}

	ngOnInit() {
		this.productSub = this.productsService.myProducts.subscribe((product) => {
			this.offers = product;
		});
	}

	ionViewWillEnter() {
		this.productsService.fetchMyProducts().subscribe();
	}

	onDelete(offerId: String, slidingItem: IonItemSliding) {
		slidingItem.close();
		this.alertController
			.create({
				header: 'Are You Sure ?',
				message: 'Want To Delete This Offer',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: (blah) => {},
					},
					{
						text: 'Delete',
						handler: () => {
							this.loadingCtrl
								.create({ message: 'Cancelling your booking.' })
								.then((loadingEl) => {
									loadingEl.present();
									this.productsService.deleteProduct(offerId).subscribe(() => {
										loadingEl.dismiss();
									});
								});
						},
					},
				],
			})
			.then((alertEl) => {
				alertEl.present();
			});
	}

	ngAfterViewInit() {
		this.backButtonSubscription = this.platform.backButton.subscribe(() => {
			navigator['app'].exitApp();
		});
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
