import { Injectable } from "@angular/core";

import { Place } from "./place.model";

@Injectable({
	providedIn: "root"
})
export class PlacesService {
	private _place: Place[] = [
		new Place(
			"p1",
			"place",
			"VKs Mansion",
			"Jabardast Ghar Hai Re Baba",
			"https://cdn.vox-cdn.com/thumbor/cU2eaFAkXnEEMjVyhWLRJoMRiwQ=/0x0:1600x1066/1220x813/filters:focal(642x458:898x714):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60283807/Perry1.0.jpg",
			150000
		),
		new Place(
			"p2",
			"place",
			"APs Mansion",
			"A mansion with Waterproof Machliya",
			"https://image.shutterstock.com/image-photo/tropical-villa-600w-95787298.jpg",
			360000
		),
		new Place(
			"p3",
			"place",
			"GKs Mansion",
			"Not your average city trip!",
			"https://image.shutterstock.com/image-photo/traditional-tribal-hut-kenya-people-600w-1296137005.jpg",
			150
		),
		new Place(
			"e1",
			"electronics",
			"Sony Cammera",
			"Not your average city trip!",
			"https://5.imimg.com/data5/XC/PF/MY-11567295/sony-a7-dslr-camera-500x500.jpg",
			15000
		),
		new Place(
			"e2",
			"electronics",
			"Canon Cammera",
			"Not your average city trip!",
			"https://cdn.thewirecutter.com/wp-content/uploads/2018/04/canon-dslrs-march-2018-2x1-lowres3496.jpg",
			25000
		),
		new Place(
			"e3",
			"electronics",
			"Nikon Cammera",
			"Not your average city trip!",
			"https://static.bhphoto.com/images/images500x500/nikon_1546b_d5500_dslr_camera_with_1482421558_1280950.jpg",
			17000
		),
		new Place(
			"e4",
			"electronics",
			"Kodak Cammera",
			"Not your average city trip!",
			"https://3.img-dpreview.com/files/p/articles/8708403693/Images/frontview-001.jpeg",
			35000
		),
		new Place(
			"a1",
			"automobiles",
			"La' Ferrari",
			"Not your average sports car!",
			"http://1.bp.blogspot.com/-bJUVMEtDcs4/Vf63lv2jfaI/AAAAAAAAAw8/h8NXO6ICvAI/s320/Screenshot_2015-09-20-21-40-38.png",
			35000000
		),
		new Place(
			"a2",
			"automobiles",
			"Lexus ES 300h",
			"Not your average luxury Sedan!",
			"https://lexusenthusiast.com/images/weblog/18-06-15-lexus-es-opening-image.jpg",
			5500000
		),
		new Place(
			"a3",
			"automobiles",
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
