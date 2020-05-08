import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
	LoadingController,
	NavController,
	AlertController
} from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
	form: FormGroup;

	constructor(
		private loadingCtrl: LoadingController,
		private authService: AuthService,
		private navCtrl: NavController,
		private alertCtrl: AlertController
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			name: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required]
			}),
			userName: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required]
			}),
			mobileNumber: new FormControl(null, {
				updateOn: 'change',
				validators: [
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(10)
				]
			}),
			email: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required]
			}),
			password: new FormControl(null, {
				updateOn: 'change',
				validators: [Validators.required]
			})
		});
	}

	onSubmit() {
		if (!this.form.valid) return;
		this.loadingCtrl
			.create({
				message: 'Creating new user.'
			})
			.then(loadingEl => {
				loadingEl.present();
				this.authService
					.signup(
						this.form.value.name,
						this.form.value.userName,
						this.form.value.mobileNumber,
						this.form.value.email,
						this.form.value.password
					)
					.subscribe(
						() => {
							loadingEl.dismiss();
							this.navCtrl.navigateBack('/auth');
						},
						err => {
							loadingEl.dismiss();
							this.alertCtrl
								.create({
									header: 'Registration Failed.',
									message: err.error.error.message,
									buttons: ['Okay']
								})
								.then(alertEl => {
									alertEl.present();
								});
						}
					);
			});
	}

	navigateToLogin() {
		this.navCtrl.navigateBack('/auth');
	}
}
