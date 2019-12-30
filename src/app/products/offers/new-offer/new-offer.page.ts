import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductsService } from "../../products.service";
@Component({
	selector: "app-new-offer",
	templateUrl: "./new-offer.page.html",
	styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
	form: FormGroup;
	constructor(private productService: ProductsService) {}

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
		console.log(event.target.value);
		const Value = event.target.value;
		console.log(Value);
		this.form.get("category").setValue(Value);
	}

	onCreateOffer() {
		if (!this.form.valid) {
			return;
		}
		console.log(
			this.form.value.category,
			this.form.value.title,
			this.form.value.description,
			+this.form.value.price
		);

		this.productService.addProduct(
			this.form.value.category,
			this.form.value.title,
			this.form.value.description,
			+this.form.value.price //+ sign to convert string into number
		);
	}
}
