import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
	selector: 'app-bookings',
	templateUrl: './bookings.page.html',
	styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
	loadedBookings: Booking[];
	private bookingsSub: Subscription;

	constructor(
		private bookingservice: BookingService,
		private loadingCtrl: LoadingController
	) {}

	ngOnInit() {
		this.bookingsSub = this.bookingservice.bookings.subscribe(bookings => {
			this.loadedBookings = bookings;
		});
	}

	ionViewWillEnter() {
		this.bookingsSub = this.bookingservice.fetchBooking().subscribe();
	}

	onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
		slidingEl.close();
		this.loadingCtrl
			.create({ message: 'Cancelling Your Booking...' })
			.then(loadingEl => {
				loadingEl.present();
				this.bookingservice.cancelBooking(bookingId).subscribe(() => {
					loadingEl.dismiss();
				});
			});
	}

	ngOnDestroy() {
		if (this.bookingsSub) {
			this.bookingsSub.unsubscribe();
		}
	}
}
