import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
	selector: "app-places-detail",
	templateUrl: "./places-detail.page.html",
	styleUrls: ["./places-detail.page.scss"]
})
export class PlacesDetailPage implements OnInit {
	constructor(private navctrl: NavController) {}

	ngOnInit() {}
	onBookPlace() {
		//this.router.navigateByUrl("/places/tabs/discover");
		this.navctrl.navigateBack("/places/tabs/discover");
	}
}
