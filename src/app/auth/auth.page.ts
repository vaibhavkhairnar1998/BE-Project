import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
	isLoading = false;
	form: FormGroup;

	constructor(
		private authService: AuthService,
		private router: Router,
		private loadingctrl: LoadingController,
		private alertCtrl: AlertController
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required, Validators.email]
			}),
			password: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required]
			})
		});
	}

	onSubmit() {
		this.loadingctrl
			.create({ keyboardClose: true, message: 'Logging In...' })
			.then(loadingEl => {
				loadingEl.present();
				this.authService
					.login(this.form.value.email, this.form.value.password)
					.subscribe(
						resData => {
							loadingEl.dismiss();
							this.router.navigateByUrl('/products/tabs/discover');
						},
						err => {
							loadingEl.dismiss();
							this.alertCtrl
								.create({
									header: err.error.error.message,
									message: 'Could not found a user with given credentials.',
									buttons: ['Okay']
								})
								.then(alertEl => {
									alertEl.present();
								});
						}
					);
			});
	}
}
