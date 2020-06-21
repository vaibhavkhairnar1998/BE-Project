export interface Coordinates {
	lat: number;
	lng: number;
}

export interface ProductLocation extends Coordinates {
	staticImgUrl: string;
}
