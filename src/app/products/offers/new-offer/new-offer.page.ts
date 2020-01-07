import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductsService } from "../../products.service";
import { LoadingController } from "@ionic/angular";

@Component({
	selector: "app-new-offer",
	templateUrl: "./new-offer.page.html",
	styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
	form: FormGroup;
	constructor(
		private productService: ProductsService,
		private loaderCtrl: LoadingController
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			category: new FormControl(null, {
				updateOn: "change",
				validators: [Validators.required]
			}),
			title: new FormControl(null, {
				updateOn: "change",
				validators: [Validators.required]
			}),
			description: new FormControl(null, {
				updateOn: "change",
				validators: [Validators.required, Validators.maxLength(180)]
			}),
			price: new FormControl(null, {
				updateOn: "change",
				validators: [Validators.required, Validators.min(1)]
			})
		});
	}

	getCategory(event) {
		const Value = event.target.value;
		this.form.get("category").setValue(Value);
	}

	onCreateOffer() {
		if (!this.form.valid) {
			return;
		}
		this.loaderCtrl
			.create({
				message: "Creating New Place..."
			})
			.then((loadingEl) => {
				loadingEl.present();
				this.productService
					.addProduct(
						this.form.value.category,
						this.form.value.title,
						this.form.value.description,
						+this.form.value.price //+ sign to convert string into number
					)
					.subscribe(() => {
						loadingEl.dismiss();
						this.form.reset();
					});
			});
	}
}
