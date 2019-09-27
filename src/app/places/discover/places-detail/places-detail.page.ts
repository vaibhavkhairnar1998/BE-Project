import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { CreateBookingsComponent } from "../../../booking/create-bookings/create-bookings.component";
import { ActivatedRoute } from "@angular/router";
import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";

@Component({
	selector: "app-places-detail",
	templateUrl: "./places-detail.page.html",
	styleUrls: ["./places-detail.page.scss"]
})
export class PlacesDetailPage implements OnInit {
	place: Place;

	constructor(
		private navctrl: NavController,
		private route: ActivatedRoute,
		private placesService: PlacesService,
		private modalctrl: ModalController
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				this.navctrl.navigateBack("/places/tabs/discover");
				return;
			}
			this.place = this.placesService.getPlace(paramMap.get("placeId"));
		});
	}
	onBookPlace() {
		//this.router.navigateByUrl("/places/tabs/discover");
		//this.navctrl.navigateBack("/places/tabs/discover");
		this.modalctrl
			.create({ component: CreateBookingsComponent })
			.then((modalEl) => {
				modalEl.present();
			});
	}
}
