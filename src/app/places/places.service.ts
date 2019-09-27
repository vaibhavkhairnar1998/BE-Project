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
			"Jabardast Ghar Hai Re Baba",
			"https://cdn.vox-cdn.com/thumbor/cU2eaFAkXnEEMjVyhWLRJoMRiwQ=/0x0:1600x1066/1220x813/filters:focal(642x458:898x714):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60283807/Perry1.0.jpg",
			150000
		),
		new Place(
			"p2",
			"APs Mansion",
			"A mansion with Waterproof Machliya",
			"https://image.shutterstock.com/image-photo/tropical-villa-600w-95787298.jpg",
			360000
		),
		new Place(
			"p3",
			"GKs Mansion",
			"Not your average city trip!",
			"https://image.shutterstock.com/image-photo/traditional-tribal-hut-kenya-people-600w-1296137005.jpg",
			150
		)
	];

	get places() {
		return [...this._places];
	}

	constructor() {}

	getPlace(id: string) {
		return { ...this._places.find((p) => p.id === id) };
	}
}
