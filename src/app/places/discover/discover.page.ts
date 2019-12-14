import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";

@Component({
	selector: "app-discover",
	templateUrl: "./discover.page.html",
	styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit {
	loadedPlaces: Place[];
	allPlaces: Place[];
	private placesSub: Subscription;

	constructor(
		private placesService: PlacesService,
		private menuCtrl: MenuController
	) {}

	ngOnInit() {
		this.loadedPlaces = this.placesService.places;
		this.allPlaces = this.loadedPlaces.filter(
			(place) => place.catagory === "Place"
		);
	}

	onOpenMenu() {
		this.menuCtrl.toggle();
	}
	onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
		console.log(event.detail);
		if (event.detail.value === "Place") {
			this.allPlaces = this.loadedPlaces.filter(
				(place) => place.catagory === event.detail.value
			);
		}
		if (event.detail.value === "Electronic") {
			this.allPlaces = this.loadedPlaces.filter(
				(place) => place.catagory === event.detail.value
			);
		}
		if (event.detail.value === "Vehicle") {
			this.allPlaces = this.loadedPlaces.filter(
				(place) => place.catagory === event.detail.value
			);
		}
	}
}
