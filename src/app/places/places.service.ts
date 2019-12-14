import { Injectable } from "@angular/core";

import { Place } from "./place.model";

@Injectable({
	providedIn: "root"
})
export class PlacesService {
	private _place: Place[] = [
		new Place(
			"p1",
			"Place",
			"VKs Mansion",
			"The Great Mansion",
			"https://static2.mansionglobal.com/production/media/article-images/b094a311fb9a7f66235d42bf65bb5e31/large_01-4110-Paces-Ferry-Rd-120.jpg",
			150000
		),
		new Place(
			"p2",
			"Place",
			"APs Mansion",
			"A mansion with swimming Pool",
			"https://image.shutterstock.com/image-photo/tropical-villa-600w-95787298.jpg",
			360000
		),
		new Place(
			"p3",
			"Place",
			"GKs Mansion",
			"Not your average mansion!",
			"https://image.shutterstock.com/image-photo/traditional-tribal-hut-kenya-people-600w-1296137005.jpg",
			150
		),
		new Place(
			"e1",
			"Electronic",
			"Sony Cammera",
			"Not your average city trip!",
			"https://5.imimg.com/data5/XC/PF/MY-11567295/sony-a7-dslr-camera-500x500.jpg",
			15000
		),
		new Place(
			"e2",
			"Electronic",
			"Canon Cammera",
			"Not your average city trip!",
			"https://cdn.thewirecutter.com/wp-content/uploads/2018/04/canon-dslrs-march-2018-2x1-lowres3496.jpg",
			25000
		),
		new Place(
			"e3",
			"Electronic",
			"Nikon Cammera",
			"Not your average city trip!",
			"https://static.bhphoto.com/images/images500x500/nikon_1546b_d5500_dslr_camera_with_1482421558_1280950.jpg",
			17000
		),
		new Place(
			"e4",
			"Electronic",
			"Kodak Cammera",
			"Not your average city trip!",
			"https://3.img-dpreview.com/files/p/articles/8708403693/Images/frontview-001.jpeg",
			35000
		),
		new Place(
			"a1",
			"Vehicle",
			"La' Ferrari",
			"Not your average sports car!",
			"http://1.bp.blogspot.com/-bJUVMEtDcs4/Vf63lv2jfaI/AAAAAAAAAw8/h8NXO6ICvAI/s320/Screenshot_2015-09-20-21-40-38.png",
			35000000
		),
		new Place(
			"a2",
			"Vehicle",
			"Lexus ES 300h",
			"Not your average luxury Sedan!",
			"https://lexusenthusiast.com/images/weblog/18-06-15-lexus-es-opening-image.jpg",
			5500000
		),
		new Place(
			"a3",
			"Vehicle",
			"Volvo XC 90",
			"Not your average luxury SUV!",
			"https://d0727dbddcb0f37a2867-55aeed0264ba8e79218119aec163ef5f.ssl.cf1.rackcdn.com/YV4A22NL9K1072600/dd627767e0240f1804304f283a1172d9.jpeg",
			3500000
		)
	];

	get places() {
		return [...this._place];
	}

	constructor() {}

	getPlace(id: string) {
		return { ...this._place.find((p) => p.id === id) };
	}
}
