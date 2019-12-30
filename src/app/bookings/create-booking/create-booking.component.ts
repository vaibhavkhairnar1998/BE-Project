import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Product } from "../../products/product.model";
import { NgForm, FormGroup } from "@angular/forms";

@Component({
	selector: "app-create-booking",
	templateUrl: "./create-booking.component.html",
	styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
	@Input() selectedPlace: Product;
	form: FormGroup;
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
