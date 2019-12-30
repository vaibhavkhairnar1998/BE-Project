import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../products.service";
import { ModalController, NavController } from "@ionic/angular";
import { Product } from "../../product.model";

@Component({
	selector: "app-edit-offer",
	templateUrl: "./edit-offer.page.html",
	styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
	place: Product;

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
			this.place = this.productsService.getProduct(
				paramMap.get("placeId")
			);
		});
		this.form = new FormGroup({
			title: new FormControl(this.place.title, {
				updateOn: "blur",
				validators: [Validators.required]
			}),
			description: new FormControl(this.place.description, {
				updateOn: "blur",
				validators: [Validators.required, Validators.maxLength(180)]
			})
		});
	}

	onUpdateOffer() {
		console.log(this.form);
	}
}
