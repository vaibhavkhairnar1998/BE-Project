import { Component, OnInit } from "@angular/core";
import { BookingService } from "./booking.service";
import { Booking } from "./booking.modal";
import { IonItemSliding } from "@ionic/angular";

@Component({
	selector: "app-bookings",
	templateUrl: "./bookings.page.html",
	styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit {
	loadedBookings: Booking[];

	constructor(private bookingservice: BookingService) {}

	ngOnInit() {
		this.loadedBookings = this.bookingservice.bookings;
	}
	onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
		slidingEl.close();
	}
}
