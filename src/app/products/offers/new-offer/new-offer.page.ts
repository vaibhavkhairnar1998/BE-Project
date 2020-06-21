import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
	LoadingController,
	NavController,
	IonSlides,
	ModalController,
} from '@ionic/angular';

import { ProductsService } from '../../products.service';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ProductLocation } from '../../product-location.model';

function base64toBlob(base64Data, contentType) {
	contentType = contentType || '';
	const sliceSize = 1024;
	const byteCharacters = window.atob(base64Data);
	const bytesLength = byteCharacters.length;
	const slicesCount = Math.ceil(bytesLength / sliceSize);
	const byteArrays = new Array(slicesCount);

	for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		const begin = sliceIndex * sliceSize;
		const end = Math.min(begin + sliceSize, bytesLength);

		const bytes = new Array(end - begin);
		for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, { type: contentType });
}

@Component({
	selector: 'app-new-offer',
	templateUrl: './new-offer.page.html',
	styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
	form: FormGroup;
	@ViewChild(IonSlides, null) slides: IonSlides;
	slideOpts = { allowTouchMove: false };

	constructor(
		private productService: ProductsService,
		private loaderCtrl: LoadingController,
		private navCtrl: NavController,
		private modalCtrl: ModalController
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			category: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required],
			}),
			title: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required],
			}),
			description: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required, Validators.maxLength(180)],
			}),
			price: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required, Validators.min(1)],
			}),
			location: new FormControl(null, { validators: [Validators.required] }),
			image: new FormControl(null),
		});
	}

	onLocationPicked(location: ProductLocation) {
		this.form.patchValue({ location: location });
	}

	onImagePicked(imageData: string | File) {
		let imageFile;
		if (typeof imageData === 'string') {
			try {
				imageFile = base64toBlob(
					imageData.replace('data:image/jpeg;base64,', ''),
					'image/jpeg'
				);
			} catch (error) {
				console.log(error);
				return;
			}
		} else {
			imageFile = imageData;
		}
		this.form.patchValue({ image: imageFile });
	}

	onCreateOffer() {
		if (!this.form.valid) {
			return;
		}
		this.loaderCtrl
			.create({
				message: 'Creating New Place...',
			})
			.then((loadingEl) => {
				loadingEl.present();
				this.productService
					.addProduct(
						this.form.value.category,
						this.form.value.title,
						this.form.value.description,
						+this.form.value.price, // + sign to convert string into number
						this.form.value.location
					)
					.subscribe(() => {
						loadingEl.dismiss();
						this.form.reset();
						this.navCtrl.navigateBack('/products/tabs/offers');
					});
			});
	}

	async nextStep() {
		await this.slides.slideNext();
	}

	async prevStep() {
		await this.slides.slidePrev();
	}

	validateDetailForm(): boolean {
		for (let control in this.form.controls) {
			if (!(control === 'location' || control === 'image'))
				if (this.form.controls[control].status === 'INVALID') return true;
		}
		return false;
	}
}
