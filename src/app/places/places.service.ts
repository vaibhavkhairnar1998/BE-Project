import { Injectable } from "@angular/core";

import { Place } from "./place.model";
@Injectable({
	providedIn: "root"
})
export class PlacesService {
	private _places: Place[] = [
		new Place(
			"p1",
			"VKs Mansion",
			"Jhakass Ghar hai re babu",
			"https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80",
			150000
		),
		new Place(
			"p2",
			"APs Mansion",
			"Jhakass Ghar hai re babu bhaiya",
			"https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80",
			360000
		),
		new Place(
			"p3",
			"GKs Mansion",
			"Ye RAJU mera paisa de",
			"https://thumbs.dreamstime.com/b/african-hut-9830088.jpg",
			150
		)
	];

	get places() {
		return [...this._places];
	}

	constructor() {}
}
