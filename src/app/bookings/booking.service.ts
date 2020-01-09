import { Injectable } from "@angular/core";
import { Booking } from "./booking.modal";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, tap, delay } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class BookingService {
	private _bookings = new BehaviorSubject<Booking[]>([]);

	get bookings() {
		return this._bookings.asObservable();
	}

	constructor(private authService: AuthService) {}

	addBooking(
		productId: string,
		productTitle: string,
		productImg: string,
		firstName: string,
		lastName: string,
		mobileNumber: number,
		gender: string
	) {
		const newBooking = new Booking(
			Math.random().toString(),
			productId,
			this.authService.userId,
			productTitle,
			productImg,
			firstName,
			lastName,
			mobileNumber,
			gender
		);
		return this.bookings.pipe(
			take(1),
			delay(1000),
			tap((bookings) => {
				this._bookings.next(bookings.concat(newBooking));
			})
		);
	}

	cancelBooking(bookingId: string) {
		return this.bookings.pipe(
			take(1),
			delay(1000),
			tap((bookings) => {
				this._bookings.next(bookings.filter((b) => b.id !== bookingId));
			})
		);
	}
}
