import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Profile } from '../auth/profile.model';
import { MyprofileService } from './myprofile.service';

@Component({
	selector: 'app-myprofile',
	templateUrl: './myprofile.page.html',
	styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit, OnDestroy {
	isLoading: boolean = false;
	profile: Profile;
	form: FormGroup;
	private profileSub: Subscription;

	constructor(
		private myProfileService: MyprofileService,
		private loadingCtrl: LoadingController,
		private navCtrl: NavController
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.profileSub = this.myProfileService
			.getProfile()
			.subscribe((resData) => {
				this.profile = resData;
				this.form = new FormGroup({
					name: new FormControl(this.profile.name, {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					userName: new FormControl(this.profile.userName, {
						updateOn: 'change',
						validators: [Validators.required],
					}),
					mobileNumber: new FormControl(this.profile.mobileNumber, {
						updateOn: 'change',
						validators: [
							Validators.required,
							Validators.minLength(10),
							Validators.maxLength(10),
						],
					}),
				});
				this.isLoading = false;
			});
	}

	onEditImg(event: Event) {
		console.log(event);
	}

	onUpdateProfile() {
		this.loadingCtrl
			.create({
				message: 'Updating Profile.',
			})
			.then((loadingEl) => {
				loadingEl.present();
				const profileData = JSON.stringify([
					{ propName: 'name', value: this.form.value.name },
					{ propName: 'userName', value: this.form.value.userName },
					{ propName: 'mobileNumber', value: this.form.value.mobileNumber },
				]);
				this.myProfileService
					.updateProfile(this.profile.id, profileData)
					.subscribe(() => {
						loadingEl.dismiss();
						this.navCtrl.navigateBack('/products/tabs/discover');
					});
			});
	}

	ngOnDestroy() {
		if (this.profileSub) {
			this.profileSub.unsubscribe();
		}
	}
}
