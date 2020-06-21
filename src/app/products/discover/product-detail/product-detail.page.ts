import {
	Component,
	OnInit,
	OnDestroy,
	Output,
	ViewChild,
	ElementRef,
	AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	NavController,
	ModalController,
	ActionSheetController,
	LoadingController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { BookingService } from '../../../bookings/booking.service';
import { AuthService } from '../../../auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-place-detail',
	templateUrl: './product-detail.page.html',
	styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit, OnDestroy {
	product: Product;
	productTitle: string;
	private productSub: Subscription;
	isLoading: boolean = false;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private modalCtrl: ModalController,
		private actionSheetCtrl: ActionSheetController,
		private bookingService: BookingService,
		private loadingCtrl: LoadingController,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.route.queryParams.subscribe((queryParams) => {
			this.productTitle = queryParams.productTitle;
			this.route.paramMap.subscribe((paramMap) => {
				if (!paramMap.has('placeId')) {
					this.navCtrl.navigateBack('/products/tabs/discover');
					return;
				}
				this.productSub = this.productsService
					.getProduct(paramMap.get('placeId'))
					.subscribe((product) => {
						this.product = product;
						this.isLoading = false;
					});
			});
		});
	}

	onBookPlace(ctgry: string) {
		// this.router.navigateByUrl('/products/tabs/discover');
		// this.navCtrl.navigateBack('/products/tabs/discover');
		// this.navCtrl.pop();
		this.actionSheetCtrl
			.create({
				header: 'Are you Sure ?',
				buttons: [
					{
						text: 'Want to Book This ' + ctgry,
						handler: () => {
							this.openBookingModal('select');
						},
					},
					{
						text: 'Cancel',
						role: 'cancel',
						cssClass: '.cancelbutton',
					},
				],
			})
			.then((actionSheetEl) => {
				actionSheetEl.present();
			});
	}

	openBookingModal(mode: 'select' | 'random') {
		let resData;
		this.modalCtrl
			.create({
				component: CreateBookingComponent,
				componentProps: { selectedPlace: this.product },
			})
			.then((modalEl) => {
				modalEl.present();
				return modalEl.onDidDismiss();
			})
			.then((resultData) => {
				resData = resultData;
				if (resultData.role === 'confirm') {
					this.loadingCtrl
						.create({ message: 'Booking Place...' })
						.then((loadingEl) => {
							loadingEl.present();
							const data = resData.data.bookingData;
							this.bookingService
								.addBooking(
									this.product.id,
									data.firstName,
									data.lastName,
									data.mobileNumber,
									data.gender
								)
								.subscribe(() => {
									loadingEl.dismiss();
								});
						});
				}
			});
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
