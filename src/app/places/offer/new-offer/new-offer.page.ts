import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
	selector: "app-new-offer",
	templateUrl: "./new-offer.page.html",
	styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
	constructor(private navctrl: NavController) {}

	ngOnInit() {}
	onPostPlace() {
		this.navctrl.navigateBack("/places/tabs/offer");
	}
}
