import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Product } from "../../products/product.model";

@Component({
	selector: "app-create-booking",
	templateUrl: "./create-booking.component.html",
	styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
	@Input() selectedPlace: Product;

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	onCancel() {
		this.modalCtrl.dismiss(null, "cancel");
	}

	onBookPlace() {
		this.modalCtrl.dismiss(
			{ message: "This is a dummy message!" },
			"confirm"
		);
	}
}
