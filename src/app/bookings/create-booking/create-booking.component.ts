import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Product } from '../../products/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-booking',
	templateUrl: './create-booking.component.html',
	styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
	@Input() selectedPlace: Product;
	form: FormGroup;
	private Value: String;

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {
		this.form = new FormGroup({
			firstName: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required],
			}),
			lastName: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required],
			}),
			mobileNumber: new FormControl(null, {
				updateOn: 'change',
				validators: [
					Validators.required,
					Validators.maxLength(10),
					Validators.minLength(10),
				],
			}),
		});
	}

	getGender(event) {
		this.Value = event.target.value;
	}

	onCancel() {
		this.modalCtrl.dismiss(null, 'cancel');
	}

	onBookPlace() {
		this.modalCtrl.dismiss(
			{
				bookingData: {
					firstName: this.form.value.firstName,
					lastName: this.form.value.lastName,
					mobileNumber: this.form.value.mobileNumber,
					gender: this.Value,
				},
			},
			'confirm'
		);
	}
}
