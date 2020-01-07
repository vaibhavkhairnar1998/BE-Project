import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Product } from "../../products/product.model";
import {
	FormsModule,
	FormGroup,
	FormControl,
	Validators,
	NgForm
} from "@angular/forms";

@Component({
	selector: "app-create-booking",
	templateUrl: "./create-booking.component.html",
	styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
	@Input() selectedPlace: Product;
	form: FormsModule;
	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}
	private Value: String;

	getGender(event) {
		this.Value = event.target.value;
		console.log(this.Value);
	}

	onCancel() {
		this.modalCtrl.dismiss(null, "cancel");
	}

	onBookPlace(f: NgForm) {
		console.log("onbookplace", this.Value);

		this.modalCtrl.dismiss(
			{
				bookingData: {
					firstName: f.value["firstName"],
					lastName: f.value["lastName"],
					mobileNumber: +f.value["mobileNumber"],
					gender: this.Value
				}
			},
			"confirm"
		);
	}
}
