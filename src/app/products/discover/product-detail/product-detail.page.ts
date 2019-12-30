import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
	NavController,
	ModalController,
	ActionSheetController
} from "@ionic/angular";

import { ProductsService } from "../../products.service";
import { Product } from "../../product.model";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";

@Component({
	selector: "app-place-detail",
	templateUrl: "./product-detail.page.html",
	styleUrls: ["./product-detail.page.scss"]
})
export class PlaceDetailPage implements OnInit {
	place: Product;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private modalCtrl: ModalController,
		private actionSheetCtrl: ActionSheetController
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				this.navCtrl.navigateBack("/products/tabs/discover");
				return;
			}
			this.place = this.productsService.getProduct(
				paramMap.get("placeId")
			);
		});
	}

	onBookPlace(ctgry: string) {
		// this.router.navigateByUrl('/products/tabs/discover');
		// this.navCtrl.navigateBack('/products/tabs/discover');
		// this.navCtrl.pop();
		console.log(ctgry);
		this.actionSheetCtrl
			.create({
				header: "Choose an Action",
				buttons: [
					{
						text: "Book This " + ctgry,
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
				componentProps: { selectedPlace: this.place }
			})
			.then((modalEl) => {
				modalEl.present();
				return modalEl.onDidDismiss();
			})
			.then((resultData) => {
				console.log(resultData.data, resultData.role);
				if (resultData.role === "confirm") {
					console.log("BOOKED!");
				}
			});
	}
}
