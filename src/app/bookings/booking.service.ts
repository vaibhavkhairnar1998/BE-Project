import { Injectable } from "@angular/core";
import { Booking } from "./booking.modal";

@Injectable({ providedIn: "root" })
export class BookingService {
	private _bookings: Booking[] = [
		{
			id: "xyz",
			placeId: "p1",
			placeTitle: "VKs Mansion",
			guestNumber: 2,
			userId: "abc"
		}
	];
	get bookings() {
		return [...this._bookings];
	}
}
