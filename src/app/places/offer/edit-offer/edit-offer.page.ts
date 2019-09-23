import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { NavController } from "@ionic/angular";

@Component({
	selector: "app-edit-offer",
	templateUrl: "./edit-offer.page.html",
	styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
	form: FormGroup;
	constructor(private navctrl: NavController) {}

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl("old title", {
				updateOn: "blur",
				validators: [Validators.required]
			}),
			description: new FormControl("old description", {
				updateOn: "blur",
				validators: [Validators.required, Validators.maxLength(180)]
			})
		});
	}
	onSavePlace() {
		this.navctrl.navigateBack("/places/tabs/offer");
	}
}
