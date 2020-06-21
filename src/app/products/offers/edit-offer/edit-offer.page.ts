import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';

@Component({
	selector: 'app-edit-offer',
	templateUrl: './edit-offer.page.html',
	styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
	product: Product;
	private productSub: Subscription;
	isLoading: boolean = false;
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private navCtrl: NavController,
		private loadingCtrl: LoadingController
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('placeId')) {
				this.navCtrl.navigateBack('/products/tabs/offers');
				return;
			}
			this.isLoading = true;
			this.productSub = this.productsService
				.getProduct(paramMap.get('placeId'))
				.subscribe((product) => {
					this.product = product;
					this.form = new FormGroup({
						title: new FormControl(this.product.title, {
							updateOn: 'change',
							validators: [Validators.required],
						}),
						description: new FormControl(this.product.description, {
							updateOn: 'change',
							validators: [Validators.required, Validators.maxLength(180)],
						}),
						price: new FormControl(this.product.price, {
							updateOn: 'change',
							validators: [Validators.required],
						}),
					});
					this.isLoading = false;
				});
		});
	}

	onUpdateOffer() {
		this.loadingCtrl
			.create({
				message: 'Updating Product.',
			})
			.then((loadingEl) => {
				loadingEl.present();
				const productData = JSON.stringify([
					{ propName: 'title', value: this.form.value.title },
					{ propName: 'description', value: this.form.value.description },
					{ propName: 'price', value: this.form.value.price },
				]);
				this.productsService
					.updateProduct(this.product.id, productData)
					.subscribe(() => {
						loadingEl.dismiss();
						this.form.reset();
						this.navCtrl.navigateBack('/products/tabs/offers');
					});
			});
	}

	ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
	}
}
