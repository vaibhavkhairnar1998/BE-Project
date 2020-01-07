import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookingService } from "./booking.service";
import { Booking } from "./booking.modal";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
	selector: "app-bookings",
	templateUrl: "./bookings.page.html",
	styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit, OnDestroy {
	loadedBookings: Booking[];
	private bookingsSub: Subscription;

	constructor(private bookingservice: BookingService) {}

	ngOnInit() {
		this.bookingsSub = this.bookingservice.bookings.subscribe(
			(bookings) => {
				this.loadedBookings = bookings;
			}
		);
	}
	onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
		slidingEl.close();
	}

	ngOnDestroy() {
		if (this.bookingsSub) {
			this.bookingsSub.unsubscribe();
		}
	}
}
