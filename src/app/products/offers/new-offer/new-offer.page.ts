import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';
import { LoadingController, NavController } from '@ionic/angular';

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

	constructor(
		private productService: ProductsService,
		private loaderCtrl: LoadingController,
		private navCtrl: NavController
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
			image: new FormControl(null),
		});
	}

	getCategory(event) {
		const Value = event.target.value;
		this.form.get('category').setValue(Value);
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
						+this.form.value.price // + sign to convert string into number
					)
					.subscribe(() => {
						loadingEl.dismiss();
						this.form.reset();
						this.navCtrl.navigateBack('/products/tabs/offers');
					});
			});
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
}
