import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
	selector: "app-edit-offer",
	templateUrl: "./edit-offer.page.html",
	styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
	constructor(private navctrl: NavController) {}

	ngOnInit() {}
	onSavePlace() {
		this.navctrl.navigateBack("/places/tabs/offer");
	}
}
