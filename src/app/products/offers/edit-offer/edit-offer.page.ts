import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../products.service";
import { ModalController, NavController } from "@ionic/angular";
import { Product } from "../../product.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-edit-offer",
	templateUrl: "./edit-offer.page.html",
	styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
	product: Product;
	private productSub: Subscription;

	constructor(
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private navCtrl: NavController
	) {}
	form: FormGroup;
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
					this.form = new FormGroup({
						title: new FormControl(this.product.title, {
							updateOn: "blur",
							validators: [Validators.required]
						}),
						description: new FormControl(this.product.description, {
							updateOn: "blur",
							validators: [
								Validators.required,
								Validators.maxLength(180)
							]
						})
					});
				});
		});
	}

	onUpdateOffer() {
		console.log(this.form);
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
