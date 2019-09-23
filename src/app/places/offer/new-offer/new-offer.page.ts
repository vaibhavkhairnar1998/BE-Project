import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
	selector: "app-new-offer",
	templateUrl: "./new-offer.page.html",
	styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
	form: FormGroup;
	constructor(private navctrl: NavController) {}

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(null, {
				updateOn: "blur",
				validators: [Validators.required]
			}),
			description: new FormControl(null, {
				updateOn: "blur",
				validators: [Validators.required, Validators.maxLength(180)]
			}),
			price: new FormControl(null, {
				updateOn: "blur",
				validators: [Validators.required, Validators.min(1)]
			})
		});
	}

	onCreateOffer() {
		console.log(this.form);
	}
	onPostPlace() {
		this.navctrl.navigateBack("/places/tabs/offer");
	}
}
