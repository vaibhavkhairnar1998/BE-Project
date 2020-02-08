import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../../products.service";
import { NavController, LoadingController } from "@ionic/angular";
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
		private navCtrl: NavController,
		private router: Router,
		private loadingCtrl: LoadingController
	) {}
	form: FormGroup;
	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				// this.navCtrl.navigateBack("/products/tabs/offer");
				this.router.navigate(["/products/tabs/offers"]);
				return;
			}
			this.productSub = this.productsService
				.getProduct(paramMap.get("placeId"))
				.subscribe((product) => {
					this.product = product;
					this.form = new FormGroup({
						title: new FormControl(this.product.title, {
							updateOn: "change",
							validators: [Validators.required]
						}),
						description: new FormControl(this.product.description, {
							updateOn: "change",
							validators: [
								Validators.required,
								Validators.maxLength(180)
							]
						}),
						price: new FormControl(this.product.price, {
							updateOn: "change",
							validators: [Validators.required]
						})
					});
				});
		});
	}

	onUpdateOffer() {
		this.loadingCtrl
			.create({
				message: "Updating Product..."
			})
			.then((loadingEl) => {
				loadingEl.present();
				this.productsService
					.updateProduct(
						this.product.id,
						this.form.value.title,
						this.form.value.description,
						this.form.value.price
					)
					.subscribe(() => {
						loadingEl.dismiss();
						this.form.reset();
						this.router.navigate(["/products/tabs/offers"]);
					});
			});
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
