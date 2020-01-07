import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
	NavController,
	ModalController,
	ActionSheetController,
	LoadingController
} from "@ionic/angular";

import { ProductsService } from "../../products.service";
import { Product } from "../../product.model";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Subscription } from "rxjs";
import { BookingService } from "src/app/bookings/booking.service";

@Component({
	selector: "app-place-detail",
	templateUrl: "./product-detail.page.html",
	styleUrls: ["./product-detail.page.scss"]
})
export class PlaceDetailPage implements OnInit, OnDestroy {
	product: Product;
	private productSub: Subscription;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private modalCtrl: ModalController,
		private actionSheetCtrl: ActionSheetController,
		private bookingService: BookingService,
		private loadingCtrl: LoadingController
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				this.navCtrl.navigateBack("/products/tabs/discover");
				return;
			}
			this.productSub = this.productsService
				.getProduct(paramMap.get("placeId"))
				.subscribe((product) => {
					this.product = product;
				});
		});
	}

	onBookPlace(ctgry: string) {
		// this.router.navigateByUrl('/products/tabs/discover');
		// this.navCtrl.navigateBack('/products/tabs/discover');
		// this.navCtrl.pop();
		console.log(ctgry);
		this.actionSheetCtrl
			.create({
				header: "Are you Sure ?",
				buttons: [
					{
						text: "Want to Book This " + ctgry,
						handler: () => {
							this.openBookingModal("select");
						}
					},
					{
						text: "Cancel",
						role: "cancel",
						cssClass: ".cancelbutton"
					}
				]
			})
			.then((actionSheetEl) => {
				actionSheetEl.present();
			});
	}

	openBookingModal(mode: "select" | "random") {
		console.log(mode);
		this.modalCtrl
			.create({
				component: CreateBookingComponent,
				componentProps: { selectedPlace: this.product }
			})
			.then((modalEl) => {
				modalEl.present();
				return modalEl.onDidDismiss();
			})
			.then((resultData) => {
				console.log(resultData.data, resultData.role);
				if (resultData.role === "confirm") {
					this.loadingCtrl
						.create({ message: "Booking Place..." })
						.then((loadingEl) => {
							loadingEl.present();
							const data = resultData.data.bookingData;
							this.bookingService
								.addBooking(
									this.product.id,
									this.product.title,
									this.product.imageUrl,
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
